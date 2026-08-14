// api/membresia-contacto.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { nombre, email, celular, ciudad, direccion, mensaje } = req.body || {};

  if (!nombre || !email || !celular || !ciudad || !direccion) {
    return res
      .status(400)
      .json({ error: "Por favor completa todos los campos obligatorios." });
  }

  const { N8N_MEMBRESIA_WEBHOOK_URL, N8N_MEMBRESIA_WEBHOOK_TOKEN } =
    process.env;

  if (!N8N_MEMBRESIA_WEBHOOK_URL) {
    console.error("Falta N8N_MEMBRESIA_WEBHOOK_URL en entorno.");
    return res
      .status(500)
      .json({ error: "Configuración de membresía incompleta en el servidor." });
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

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error(
      "Error enviando lead de membresía a n8n:",
      error.response?.data || error.message
    );
    return res
      .status(500)
      .json({ error: "No se pudo procesar la membresía en este momento." });
  }
}
