// server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import crypto from "node:crypto";
import { verifyTurnstile } from "./turnstile.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// 🔑 Datos de la app en Tiendanube (Partners)
const APP_ID = process.env.TIENDANUBE_APP_ID;
const APP_SECRET = process.env.TIENDANUBE_APP_SECRET;
const REDIRECT_URI = process.env.TIENDANUBE_REDIRECT_URI;

// 🏬 Datos de la tienda (los que vienen del callback /apps/authorize/token)
const STORE_ID = process.env.TIENDANUBE_STORE_ID;
const ACCESS_TOKEN = process.env.TIENDANUBE_ACCESS_TOKEN;

// 🧴 Producto que vendes desde la landing
const PRODUCT_ID = process.env.TIENDANUBE_PRODUCT_ID;
const VARIANT_ID = process.env.TIENDANUBE_VARIANT_ID;

// 🌐 URL pública de la tienda demo (por si la necesitamos luego)
const STORE_FRONT_URL = process.env.TIENDANUBE_STORE_FRONT_URL;

const EXPERIENCE_WEBHOOK_URL = process.env.EXPERIENCE_WEBHOOK_URL;
const EXPERIENCE_WEBHOOK_TOKEN = process.env.EXPERIENCE_WEBHOOK_TOKEN;
const PUBLIC_SITE_URL = (process.env.PUBLIC_SITE_URL || "https://cuarentamas.com").replace(/\/+$/, "");
const ENABLE_TIENDANUBE_CHECKOUT = process.env.ENABLE_TIENDANUBE_CHECKOUT === "true";
const ENABLE_TIENDANUBE_ADMIN_ROUTES =
  process.env.ENABLE_TIENDANUBE_ADMIN_ROUTES === "true";
const ALLOWED_ORIGINS = (
  process.env.ALLOWED_ORIGINS ||
  "http://localhost:5173,http://127.0.0.1:5173,http://localhost:4177,http://127.0.0.1:4177"
).split(",").map((origin) => origin.trim()).filter(Boolean);
const oauthStates = new Map();
const experienceRequestBuckets = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const cleanString = (value) =>
  typeof value === "string" ? value.trim() : "";
const getClientIp = (req) =>
  cleanString(req.headers["x-forwarded-for"]).split(",")[0] ||
  cleanString(req.socket?.remoteAddress) ||
  "unknown";
const isExperienceRateLimited = (key) => {
  const now = Date.now();

  if (experienceRequestBuckets.size > 1000) {
    for (const [bucketKey, bucketValue] of experienceRequestBuckets) {
      if (bucketValue.resetAt <= now) experienceRequestBuckets.delete(bucketKey);
    }
  }

  const bucket = experienceRequestBuckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    experienceRequestBuckets.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  bucket.count += 1;
  return bucket.count > RATE_LIMIT_MAX_REQUESTS;
};

// ----------------- Middlewares -----------------
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
      return callback(new Error("Origen no permitido por CORS."));
    },
  })
);
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.setHeader("X-Permitted-Cross-Domain-Policies", "none");
  if (req.path.startsWith("/api/")) {
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("X-Robots-Tag", "noindex, nofollow");
  }
  next();
});
app.use(express.json({ limit: "32kb" }));

// ----------------- Logs de sanity check -----------------
console.log("🔑 Tiendanube APP ID definido:", !!APP_ID);
console.log("🔑 Tiendanube APP SECRET definido:", !!APP_SECRET);
console.log("🏬 Tiendanube STORE_ID definido:", !!STORE_ID);
console.log("🔐 Tiendanube ACCESS_TOKEN definido:", !!ACCESS_TOKEN);
console.log("🧴 PRODUCT_ID definido:", !!PRODUCT_ID);
console.log("🧴 VARIANT_ID definido:", !!VARIANT_ID);

// --------------------------------------------------------
//  Health check
// --------------------------------------------------------
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "API de Cuarentamas funcionando ✅",
  });
});

// --------------------------------------------------------
//  OAuth Tiendanube – instalar / reinstalar la app
// --------------------------------------------------------
app.get("/tiendanube/install", (req, res) => {
  if (!ENABLE_TIENDANUBE_ADMIN_ROUTES) {
    return res.status(404).send("Ruta no disponible.");
  }

  if (!APP_ID || !APP_SECRET || !REDIRECT_URI) {
    return res
      .status(500)
      .send("La integración de Tiendanube no está configurada.");
  }

  const state = crypto.randomBytes(24).toString("hex");
  oauthStates.set(state, Date.now() + 10 * 60 * 1000);
  res.cookie("tiendanube_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    maxAge: 10 * 60 * 1000,
  });

  const installUrl = `https://www.tiendanube.com/apps/authorize?client_id=${APP_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&response_type=code&state=${state}`;

  return res.redirect(installUrl);
});

app.get("/tiendanube/callback", async (req, res) => {
  if (!ENABLE_TIENDANUBE_ADMIN_ROUTES) {
    return res.status(404).send("Ruta no disponible.");
  }

  const { code, state } = req.query;

  if (!code) {
    return res.status(400).send("Falta el parámetro 'code'");
  }

  const stateCookie = req.headers.cookie
    ?.split(";")
    .map((cookie) => cookie.trim().split("="))
    .find(([name]) => name === "tiendanube_oauth_state")?.[1];
  const stateExpiresAt = stateCookie ? oauthStates.get(stateCookie) : null;
  if (!state || !stateCookie || state !== stateCookie || !stateExpiresAt || stateExpiresAt < Date.now()) {
    return res.status(400).send("La autorización expiró o no es válida. Inicia el proceso nuevamente.");
  }
  oauthStates.delete(stateCookie);
  res.clearCookie("tiendanube_oauth_state");

  try {
    const tokenUrl = "https://www.tiendanube.com/apps/authorize/token";

    const body = new URLSearchParams({
      client_id: APP_ID,
      client_secret: APP_SECRET,
      grant_type: "authorization_code",
      code,
    });

    const { data } = await axios.post(tokenUrl, body.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const userId = data.user_id;
    const scopes = data.scope;

    console.log("✅ user_id (STORE_ID):", userId);
    console.log("✅ scopes otorgados:", scopes);

    res.send(`
      <html>
        <head><meta charset="utf-8" /></head>
        <body style="font-family: system-ui; padding: 24px;">
          <h1>✅ Devolución de llamada recibida</h1>
          <p>La autorización se completó correctamente.</p>
          <p>
            El token no se muestra ni se registra por seguridad. La integración
            debe almacenar la credencial mediante un mecanismo secreto del servidor.
          </p>
        </body>
      </html>
    `);
  } catch (error) {
    console.error(
      "❌ Error al intercambiar code por token:",
      error.response?.data || error.message
    );
    res.status(500).send("Error al procesar el callback de Tiendanube");
  }
});

// --------------------------------------------------------
//  Debug: listar productos (para ver product_id / variant_id)
// --------------------------------------------------------
app.get("/api/tiendanube/products", async (req, res) => {
  if (!ENABLE_TIENDANUBE_ADMIN_ROUTES) {
    return res.status(404).json({ error: "Ruta no disponible." });
  }

  if (!STORE_ID || !ACCESS_TOKEN) {
    return res.status(500).json({
      error:
        "Falta STORE_ID o ACCESS_TOKEN. Revisa tu .env (TIENDANUBE_STORE_ID / TIENDANUBE_ACCESS_TOKEN).",
    });
  }

  try {
    const url = `https://api.tiendanube.com/v1/${STORE_ID}/products`;

    const { data } = await axios.get(url, {
      headers: {
        Authentication: `bearer ${ACCESS_TOKEN}`,
        "User-Agent": "CuarentamasApp (cuarentamas.com)",
        "Content-Type": "application/json",
      },
    });

    res.json(data);
  } catch (error) {
    console.error(
      "❌ Error al obtener productos:",
      error.response?.data || error.message
    );
    res
      .status(500)
      .json({ error: "Error al obtener productos desde Tiendanube" });
  }
});

// --------------------------------------------------------
//  Experiencia 40+ – contacto y solicitud del e-book Ritual 40+
// --------------------------------------------------------
app.post("/api/experiencia", async (req, res) => {
  if (!req.is("application/json")) {
    return res.status(415).json({ error: "El contenido debe enviarse como JSON." });
  }

  if (isExperienceRateLimited(getClientIp(req))) {
    res.setHeader("Retry-After", "3600");
    return res.status(429).json({
      error: "Has realizado varios intentos. Espera un momento antes de volver a enviar.",
    });
  }

  const {
    nombre,
    email,
    celular = "",
    ciudad = "",
    experiencia,
    consentimiento,
    autorizacionTestimonio = false,
    sitioWeb = "",
    iniciadoEn,
    turnstileToken,
  } = req.body || {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const cleanName = cleanString(nombre);
  const cleanEmail = cleanString(email).toLowerCase();
  const cleanExperience = cleanString(experiencia);
  const elapsed = Date.now() - Number(iniciadoEn);

  if (cleanString(sitioWeb) || !Number.isFinite(elapsed) || elapsed < 1500) {
    return res.json({ ok: true, message: "Experiencia recibida." });
  }

  const turnstile = await verifyTurnstile({
    token: turnstileToken,
    remoteIp: getClientIp(req),
  });
  if (!turnstile.success) {
    const statusCode = turnstile.code === "not-configured" ? 503 : 403;
    return res.status(statusCode).json({
      error:
        statusCode === 503
          ? "El formulario está temporalmente en configuración. Inténtalo más tarde."
          : "No pudimos validar la verificación de seguridad. Inténtalo de nuevo.",
    });
  }

  if (!cleanName || !cleanEmail || !cleanExperience || consentimiento !== true) {
    return res.status(400).json({
      error: "Completa los campos obligatorios y autoriza el envío del e-book.",
    });
  }

  if (!emailPattern.test(cleanEmail)) {
    return res.status(400).json({ error: "Ingresa un correo electrónico válido." });
  }

  if (cleanExperience.length < 20) {
    return res.status(400).json({
      error: "Cuéntanos un poco más sobre tu experiencia con 40+.",
    });
  }

  if (
    cleanName.length > 120 ||
    cleanEmail.length > 254 ||
    cleanString(celular).length > 30 ||
    cleanString(ciudad).length > 100 ||
    cleanExperience.length > 2000
  ) {
    return res.status(400).json({ error: "Uno de los campos supera la longitud permitida." });
  }

  if (!EXPERIENCE_WEBHOOK_URL) {
    console.error("❌ Falta EXPERIENCE_WEBHOOK_URL en .env");
    return res.status(500).json({
      error: "El formulario no está disponible en este momento. Inténtalo más tarde.",
    });
  }

  try {
    const ebookPath = "/downloads/ebook-ritual-40.pdf";
    const payload = {
      submissionId: crypto.randomUUID(),
      source: "web-experiencia-ritual-40",
      formVersion: "2026-08-31",
      nombre: cleanName,
      email: cleanEmail,
      celular: cleanString(celular),
      ciudad: cleanString(ciudad),
      direccion: "",
      mensaje: cleanExperience,
      experiencia: cleanExperience,
      consentimiento: true,
      autorizacionTestimonio: autorizacionTestimonio === true,
      politicaDatosVersion: "2026-08-31",
      ebook: "Ritual 40+",
      ebookRequested: true,
      ebookPath,
      ebookUrl: `${PUBLIC_SITE_URL}${ebookPath}`,
      contactEmail: "contacto@cuarentamas.com",
      submittedAt: new Date().toISOString(),
      pageUrl: req.headers.referer || "",
      userAgent: req.headers["user-agent"] || "",
      ip: getClientIp(req),
    };

    const headers = { "Content-Type": "application/json" };
    if (EXPERIENCE_WEBHOOK_TOKEN) {
      headers["x-make-apikey"] = EXPERIENCE_WEBHOOK_TOKEN;
    }

    await axios.post(EXPERIENCE_WEBHOOK_URL, payload, {
      headers,
      timeout: 15000,
    });

    console.log("📩 Experiencia 40+ enviada al servicio configurado.");
    return res.json({ ok: true, message: "Experiencia enviada correctamente." });
  } catch (error) {
    console.error(
      "❌ Error al enviar la experiencia al servicio configurado:",
      error.message,
    );
    return res.status(500).json({
      error: "No pudimos enviar tu experiencia en este momento. Inténtalo de nuevo.",
    });
  }
});

// --------------------------------------------------------
//  Checkout híbrido: crear Draft Order en Tiendanube
// --------------------------------------------------------
app.post("/api/checkout", async (req, res) => {
  if (!ENABLE_TIENDANUBE_CHECKOUT) {
    return res.status(404).json({ error: "Ruta no disponible." });
  }

  const { items = [], customerEmail } = req.body || {};

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "El carrito está vacío" });
  }

  if (!STORE_ID || !ACCESS_TOKEN || !VARIANT_ID) {
    return res.status(500).json({
      error:
        "Falta STORE_ID, ACCESS_TOKEN o VARIANT_ID. Revisa tu server/.env.",
    });
  }

  const fallbackEmail = "actualiza-tu-correo@cuarentamas.com";
  const contactEmail =
    typeof customerEmail === "string" && customerEmail.trim()
      ? customerEmail.trim()
      : fallbackEmail;

  try {
    const quantity = Math.min(
      99,
      items.reduce((sum, item) => sum + Math.max(0, Number(item.quantity) || 0), 0),
    );
    if (!quantity) return res.status(400).json({ error: "La cantidad no es válida" });

    const draftOrderPayload = {
      contact_name: "Cliente",
      contact_lastname: "Cuarentamas",
      contact_email: contactEmail,
      payment_status: "unpaid",
      sale_channel: "Landing Cuarentamas",
      products: [
        {
          variant_id: Number(VARIANT_ID),
          quantity,
        },
      ],
    };

    const url = `https://api.tiendanube.com/v1/${STORE_ID}/draft_orders`;

    const { data } = await axios.post(url, draftOrderPayload, {
      headers: {
        Authentication: `bearer ${ACCESS_TOKEN}`,
        "User-Agent": "CuarentamasApp (cuarentamas.com)",
        "Content-Type": "application/json",
      },
    });

    const checkoutUrl = data.checkout_url;

    if (!checkoutUrl) {
      console.warn("La respuesta de Tiendanube no incluyó una URL de checkout.");
      return res.status(502).json({
        error: "Tiendanube no devolvió una URL de checkout.",
      });
    }

    return res.json({
      ok: true,
      checkoutUrl,
    });
  } catch (error) {
    console.error(
      "❌ Error al crear draft order:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      error: "No se pudo crear el checkout en Tiendanube",
    });
  }
});

// --------------------------------------------------------
//  Arranque del servidor
// --------------------------------------------------------
app.listen(PORT, () => {
  console.log(`🚀 API de Cuarentamas escuchando en http://localhost:${PORT}`);
});
