import axios from "axios";
import { randomUUID } from "node:crypto";
import { verifyTurnstile } from "../server/turnstile.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const cleanString = (value) => (typeof value === "string" ? value.trim() : "");
const MAX_LENGTHS = { nombre: 120, email: 254, celular: 30, ciudad: 100, experiencia: 2000 };
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MAX_BODY_BYTES = 32 * 1024;
const requestBuckets = new Map();

const getClientIp = (req) =>
  cleanString(req.headers["x-forwarded-for"]).split(",")[0] ||
  cleanString(req.socket?.remoteAddress) ||
  "unknown";

const isRateLimited = (key) => {
  const now = Date.now();

  if (requestBuckets.size > 1000) {
    for (const [bucketKey, bucketValue] of requestBuckets) {
      if (bucketValue.resetAt <= now) requestBuckets.delete(bucketKey);
    }
  }

  const bucket = requestBuckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    requestBuckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  bucket.count += 1;
  return bucket.count > RATE_LIMIT_MAX_REQUESTS;
};

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Método no permitido." });
  }

  if (!cleanString(req.headers["content-type"]).toLowerCase().startsWith("application/json")) {
    return res.status(415).json({ error: "El contenido debe enviarse como JSON." });
  }

  const contentLength = Number(req.headers["content-length"] || 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return res.status(413).json({ error: "La solicitud supera el tamaño permitido." });
  }

  if (isRateLimited(getClientIp(req))) {
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
  const cleanName = cleanString(nombre);
  const cleanEmail = cleanString(email).toLowerCase();
  const cleanExperience = cleanString(experiencia);
  const elapsed = Date.now() - Number(iniciadoEn);

  if (cleanString(sitioWeb) || !Number.isFinite(elapsed) || elapsed < 1500) {
    return res.status(200).json({ ok: true, message: "Experiencia recibida." });
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

  if (!EMAIL_PATTERN.test(cleanEmail)) {
    return res.status(400).json({ error: "Ingresa un correo electrónico válido." });
  }

  if (cleanExperience.length < 20) {
    return res.status(400).json({
      error: "Cuéntanos un poco más sobre tu experiencia con 40+.",
    });
  }

  if (
    cleanName.length > MAX_LENGTHS.nombre ||
    cleanEmail.length > MAX_LENGTHS.email ||
    cleanString(celular).length > MAX_LENGTHS.celular ||
    cleanString(ciudad).length > MAX_LENGTHS.ciudad ||
    cleanExperience.length > MAX_LENGTHS.experiencia
  ) {
    return res.status(400).json({ error: "Uno de los campos supera la longitud permitida." });
  }

  const webhookUrl = process.env.EXPERIENCE_WEBHOOK_URL;
  const webhookToken = process.env.EXPERIENCE_WEBHOOK_TOKEN;

  if (!webhookUrl) {
    console.error("Falta EXPERIENCE_WEBHOOK_URL en el entorno.");
    return res.status(500).json({
      error: "El formulario no está disponible en este momento. Inténtalo más tarde.",
    });
  }

  try {
    const ebookPath = "/downloads/ebook-ritual-40.pdf";
    const publicSiteUrl = cleanString(
      process.env.PUBLIC_SITE_URL || "https://cuarentamas.com",
    ).replace(/\/+$/, "");
    const payload = {
      submissionId: randomUUID(),
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
      ebookUrl: `${publicSiteUrl}${ebookPath}`,
      contactEmail: "contacto@cuarentamas.com",
      submittedAt: new Date().toISOString(),
      pageUrl: req.headers.referer || "",
      userAgent: req.headers["user-agent"] || "",
      ip: getClientIp(req),
    };

    const headers = { "Content-Type": "application/json" };
    if (webhookToken) {
      headers.Authorization = `Bearer ${webhookToken}`;
    }

    await axios.post(webhookUrl, payload, {
      headers,
      timeout: 15000,
    });

    return res.status(200).json({
      ok: true,
      message: "Experiencia enviada correctamente.",
    });
  } catch (error) {
    console.error(
      "Error enviando la experiencia al servicio configurado:",
      error.message,
    );
    return res.status(500).json({
      error: "No pudimos enviar tu experiencia en este momento. Inténtalo de nuevo.",
    });
  }
}
