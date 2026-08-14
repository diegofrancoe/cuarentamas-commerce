// api/tiendanube-checkout.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { items = [], total, customerEmail } = req.body || {};

  console.log("🛒 [Vercel] /api/tiendanube-checkout – carrito recibido:");
  console.log(JSON.stringify({ items, total, customerEmail }, null, 2));

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
      "📦 [Vercel] Payload que enviamos a /draft_orders:",
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

    console.log("✅ [Vercel] Draft order creado en Tiendanube:");
    console.log(JSON.stringify(data, null, 2));

    const checkoutUrl = data.checkout_url;

    if (!checkoutUrl) {
      console.warn(
        "⚠️ La respuesta no trajo checkout_url, devolviendo data cruda"
      );
      return res.status(200).json({
        ok: true,
        data,
        checkoutUrl: null,
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
      details: error.response?.data || error.message,
    });
  }
}