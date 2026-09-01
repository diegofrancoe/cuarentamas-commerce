// api/tiendanube-checkout.js
import axios from "axios";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Método no permitido." });
  }

  if (process.env.ENABLE_TIENDANUBE_CHECKOUT !== "true") {
    return res.status(404).json({ error: "Ruta no disponible." });
  }

  if (!String(req.headers["content-type"] || "").toLowerCase().startsWith("application/json")) {
    return res.status(415).json({ error: "El contenido debe enviarse como JSON." });
  }

  const contentLength = Number(req.headers["content-length"] || 0);
  if (Number.isFinite(contentLength) && contentLength > 32 * 1024) {
    return res.status(413).json({ error: "La solicitud supera el tamaño permitido." });
  }

  const { items = [], customerEmail } = req.body || {};

  const STORE_ID = process.env.TIENDANUBE_STORE_ID;
  const ACCESS_TOKEN = process.env.TIENDANUBE_ACCESS_TOKEN;
  const VARIANT_ID = process.env.TIENDANUBE_VARIANT_ID;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "El carrito está vacío" });
  }

  if (!STORE_ID || !ACCESS_TOKEN || !VARIANT_ID) {
    console.error("❌ Faltan variables en el entorno de producción:", {
      STORE_ID,
      ACCESS_TOKEN: !!ACCESS_TOKEN,
      VARIANT_ID,
    });
    return res.status(500).json({
      error:
        "Falta STORE_ID, ACCESS_TOKEN o VARIANT_ID. Revisa tus variables de entorno en Vercel.",
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
    if (!quantity) {
      return res.status(400).json({ error: "La cantidad no es válida" });
    }

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

    return res.status(200).json({
      ok: true,
      checkoutUrl,
    });
  } catch (error) {
    console.error(
      "❌ [Vercel] Error al crear draft order:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      error: "No se pudo crear el checkout en Tiendanube",
    });
  }
}
