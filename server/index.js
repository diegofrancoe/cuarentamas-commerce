// server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

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

// n8n webhook para procesar membresías (email automático + Google Sheets + Drive)
const N8N_MEMBRESIA_WEBHOOK_URL = process.env.N8N_MEMBRESIA_WEBHOOK_URL;
const N8N_MEMBRESIA_WEBHOOK_TOKEN = process.env.N8N_MEMBRESIA_WEBHOOK_TOKEN;

// ----------------- Middlewares -----------------
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

// ----------------- Logs de sanity check -----------------
console.log("🔑 Tiendanube APP ID definido:", !!APP_ID);
console.log("🔑 Tiendanube APP SECRET definido:", !!APP_SECRET);
console.log("🏬 Tiendanube STORE_ID definido:", !!STORE_ID);
console.log("🔐 Tiendanube ACCESS_TOKEN definido:", !!ACCESS_TOKEN);
console.log("🧴 PRODUCT_ID definido:", !!PRODUCT_ID);
console.log("🧴 VARIANT_ID definido:", !!VARIANT_ID);

console.log(
  "🧩 N8N_MEMBRESIA_WEBHOOK_URL definido:",
  !!N8N_MEMBRESIA_WEBHOOK_URL
);
console.log(
  "🧩 N8N_MEMBRESIA_WEBHOOK_TOKEN definido:",
  !!N8N_MEMBRESIA_WEBHOOK_TOKEN
);

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
  if (!APP_ID || !REDIRECT_URI) {
    return res
      .status(500)
      .send("APP_ID o REDIRECT_URI no configurados en .env");
  }

  const state = "cstm-state-cuarentamas";

  const installUrl = `https://www.tiendanube.com/apps/authorize?client_id=${APP_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&response_type=code&state=${state}`;

  return res.redirect(installUrl);
});

app.get("/tiendanube/callback", async (req, res) => {
  const { code, store_id, state } = req.query;

  console.log("🌐 Callback de Tiendanube recibido con query:", req.query);

  if (!code) {
    return res.status(400).send("Falta el parámetro 'code'");
  }

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

    console.log("🟢 Respuesta de /apps/authorize/token:");
    console.log(JSON.stringify(data, null, 2));

    const accessToken = data.access_token;
    const userId = data.user_id;
    const scopes = data.scope;

    console.log("✅ access_token:", accessToken);
    console.log("✅ user_id (STORE_ID):", userId);
    console.log("✅ scopes otorgados:", scopes);

    console.log(`
⚠️ Copia estos valores nuevos en tu archivo server/.env:

TIENDANUBE_STORE_ID=${userId}
TIENDANUBE_ACCESS_TOKEN=${accessToken}

Luego reinicia "npm run server".
    `);

    res.send(`
      <html>
        <head><meta charset="utf-8" /></head>
        <body style="font-family: system-ui; padding: 24px;">
          <h1>✅ Devolución de llamada recibida</h1>
          <p>Revisa la consola del servidor (VS Code).</p>
          <ul>
            <li><strong>code:</strong> ${code}</li>
            <li><strong>store_id (desde query):</strong> ${
              store_id || "(vacío)"
            }</li>
            <li><strong>estado (state):</strong> ${state || "(vacío)"}</li>
          </ul>
          <p>
            En la consola verás el <code>access_token</code>, el
            <code>user_id</code> y los <code>scopes</code> otorgados.
            Copia <strong>TIENDANUBE_STORE_ID</strong> y
            <strong>TIENDANUBE_ACCESS_TOKEN</strong> a tu archivo
            <code>.env</code> y vuelve a levantar el servidor.
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

    console.log("📦 Productos de Tiendanube recibidos:");
    console.log(JSON.stringify(data, null, 2));

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
//  Membresía 40+ – envío de formulario a n8n
// --------------------------------------------------------
app.post("/api/membresia-contacto", async (req, res) => {
  const { nombre, email, celular, ciudad, direccion, mensaje } = req.body || {};

  console.log("📝 /api/membresia-contacto – datos recibidos:");
  console.log(JSON.stringify(req.body, null, 2));

  if (!nombre || !email || !celular || !ciudad || !direccion) {
    return res.status(400).json({
      error:
        "Faltan campos obligatorios (nombre, email, celular, ciudad, dirección).",
    });
  }

  if (!N8N_MEMBRESIA_WEBHOOK_URL) {
    console.error("❌ Falta N8N_MEMBRESIA_WEBHOOK_URL en .env");
    return res.status(500).json({
      error:
        "La configuración de membresía no está completa. Intenta más tarde.",
    });
  }

  try {
    const payload = {
      source: "web-membresia",
      nombre,
      email,
      celular,
      ciudad,
      direccion,
      mensaje: mensaje || "",
      submittedAt: new Date().toISOString(),
      pageUrl: req.headers.referer || "",
      userAgent: req.headers["user-agent"] || "",
      ip:
        req.headers["x-forwarded-for"]?.toString().split(",")[0]?.trim() || "",
    };

    const headers = { "Content-Type": "application/json" };
    if (N8N_MEMBRESIA_WEBHOOK_TOKEN) {
      headers.Authorization = `Bearer ${N8N_MEMBRESIA_WEBHOOK_TOKEN}`;
    }

    await axios.post(N8N_MEMBRESIA_WEBHOOK_URL, payload, {
      headers,
      timeout: 60000,
    });

    console.log("📩 Lead de membresía enviado a n8n correctamente.");
    return res.json({ ok: true, message: "Membresía enviada correctamente" });
  } catch (error) {
    console.error(
      "❌ Error al enviar lead de membresía a n8n:",
      error.response?.data || error.message || error
    );
    return res.status(500).json({
      error:
        "No se pudo procesar tu membresía. Inténtalo de nuevo más tarde.",
    });
  }
});

// --------------------------------------------------------
//  Checkout híbrido: crear Draft Order en Tiendanube
// --------------------------------------------------------
app.post("/api/checkout", async (req, res) => {
  const { items = [], total, customerEmail } = req.body || {};

  console.log("🛒 /api/checkout – carrito recibido:");
  console.log(JSON.stringify({ items, total, customerEmail }, null, 2));

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
    const quantity = 1;

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

    console.log(
      "📦 Payload que enviaremos a /draft_orders:",
      JSON.stringify(draftOrderPayload, null, 2)
    );

    const url = `https://api.tiendanube.com/v1/${STORE_ID}/draft_orders`;

    const { data } = await axios.post(url, draftOrderPayload, {
      headers: {
        Authentication: `bearer ${ACCESS_TOKEN}`,
        "User-Agent": "CuarentamasApp (cuarentamas.com)",
        "Content-Type": "application/json",
      },
    });

    console.log("✅ Draft order creado en Tiendanube:");
    console.log(JSON.stringify(data, null, 2));

    const checkoutUrl = data.checkout_url;

    if (!checkoutUrl) {
      console.warn(
        "⚠️ La respuesta no trajo checkout_url, devolviendo data cruda"
      );
      return res.json({
        ok: true,
        data,
        checkoutUrl: null,
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
      details: error.response?.data || error.message,
    });
  }
});

// --------------------------------------------------------
//  Arranque del servidor
// --------------------------------------------------------
app.listen(PORT, () => {
  console.log(`🚀 API de Cuarentamas escuchando en http://localhost:${PORT}`);
});
