import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import socialImage from "../assets/editorial/ritual-manana-40plus.jpg";

const DEFAULT_META = {
  title: "40+",
  description:
    "40+ es una marca de bienestar para mayores de 40 años en Colombia. Descubre Colágeno Hidrolizado 40+, contenido educativo y acompañamiento responsable.",
};

const META_BY_PATH = {
  "/": {
    title: "40+",
    description:
      "Conoce 40+: fórmulas limpias, respaldo técnico y bienestar real para hombres y mujeres mayores de 40 años en Colombia.",
  },
  "/productos": {
    title: "Productos 40+ | Suplementos para bienestar después de los 40",
    description:
      "Explora 40+, una propuesta de bienestar diario con fórmulas transparentes, responsables y fáciles de integrar a tu rutina.",
  },
  "/producto/colageno-hidrolizado-40": {
    title: "Colágeno Hidrolizado 40+ | Péptidos tipo I y III en Colombia",
    description:
      "Colágeno Hidrolizado 40+ con fórmula limpia, sin azúcares añadidos y fácil de integrar a una rutina de bienestar diario.",
  },
  "/comparte-tu-experiencia": {
    title: "Comparte tu experiencia con 40+ | Recibe el e-book Ritual 40+",
    description:
      "Cuéntanos cómo 40+ hace parte de tu rutina y recibe en tu correo el e-book Ritual 40+.",
  },
  "/sobre-nosotros": {
    title: "Sobre 40+ | Ciencia, transparencia y bienestar consciente",
    description:
      "Conoce la historia de 40+, nuestro enfoque de calidad y compromiso con el bienestar físico y emocional de personas mayores de 40 años.",
  },
  "/membresia": {
    title: "Membresía 40+ | Beneficios, contenidos y acompañamiento",
    description:
      "Únete a la Membresía 40+ para recibir beneficios exclusivos, contenido de bienestar y acompañamiento enfocado en tu etapa de vida.",
  },
  "/terminos-y-condiciones": {
    title: "Términos y Condiciones | 40+",
    description:
      "Consulta los términos y condiciones de uso y compra de 40+ en Colombia.",
  },
  "/politica-de-datos": {
    title: "Política de Datos | 40+",
    description:
      "Revisa la política de tratamiento de datos personales de 40+.",
  },
  "/envios-cambios-y-devoluciones": {
    title: "Envíos, cambios y devoluciones | 40+",
    description:
      "Consulta la cobertura, costos de envío y proceso de cambios, devoluciones y garantías de 40+.",
  },
};

const upsertMeta = (selector, setAttrs) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  setAttrs(el);
};

const upsertCanonical = (href) => {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

const SeoHead = () => {
  const location = useLocation();

  useEffect(() => {
    const meta = META_BY_PATH[location.pathname] || DEFAULT_META;
    const baseUrl = window.location.origin;
    const canonical = `${baseUrl}${location.pathname}`;
    const shareImage = new URL(socialImage, baseUrl).href;

    document.title = meta.title;

    upsertMeta('meta[name="description"]', (el) => {
      el.setAttribute("name", "description");
      el.setAttribute("content", meta.description);
    });
    upsertMeta('meta[name="robots"]', (el) => {
      el.setAttribute("name", "robots");
      el.setAttribute("content", "index, follow");
    });
    upsertMeta('meta[property="og:type"]', (el) => {
      el.setAttribute("property", "og:type");
      el.setAttribute("content", "website");
    });
    upsertMeta('meta[property="og:title"]', (el) => {
      el.setAttribute("property", "og:title");
      el.setAttribute("content", meta.title);
    });
    upsertMeta('meta[property="og:description"]', (el) => {
      el.setAttribute("property", "og:description");
      el.setAttribute("content", meta.description);
    });
    upsertMeta('meta[property="og:url"]', (el) => {
      el.setAttribute("property", "og:url");
      el.setAttribute("content", canonical);
    });
    upsertMeta('meta[property="og:site_name"]', (el) => {
      el.setAttribute("property", "og:site_name");
      el.setAttribute("content", "40+");
    });
    upsertMeta('meta[property="og:image"]', (el) => {
      el.setAttribute("property", "og:image");
      el.setAttribute("content", shareImage);
    });
    upsertMeta('meta[property="og:image:alt"]', (el) => {
      el.setAttribute("property", "og:image:alt");
      el.setAttribute("content", "Ritual diario de bienestar con 40+");
    });
    upsertMeta('meta[name="twitter:card"]', (el) => {
      el.setAttribute("name", "twitter:card");
      el.setAttribute("content", "summary_large_image");
    });
    upsertMeta('meta[name="twitter:title"]', (el) => {
      el.setAttribute("name", "twitter:title");
      el.setAttribute("content", meta.title);
    });
    upsertMeta('meta[name="twitter:description"]', (el) => {
      el.setAttribute("name", "twitter:description");
      el.setAttribute("content", meta.description);
    });
    upsertMeta('meta[name="twitter:image"]', (el) => {
      el.setAttribute("name", "twitter:image");
      el.setAttribute("content", shareImage);
    });
    upsertCanonical(canonical);

    const existingSchema = document.getElementById("schema-base-site");
    if (existingSchema) existingSchema.remove();

    if (location.pathname === "/") {
      const schema = document.createElement("script");
      schema.id = "schema-base-site";
      schema.type = "application/ld+json";
      schema.text = JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            name: "40+",
            alternateName: "cuarentamas",
            url: baseUrl,
            email: "contacto@cuarentamas.com",
            sameAs: [
              "https://www.instagram.com/cuarentamas_official/",
              "https://www.facebook.com/cuarentamascom/",
            ],
          },
          {
            "@type": "WebSite",
            name: "40+",
            url: baseUrl,
            inLanguage: "es-CO",
          },
        ],
      });
      document.head.appendChild(schema);
    }
  }, [location.pathname]);

  return null;
};

export default SeoHead;
