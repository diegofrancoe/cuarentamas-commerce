// src/components/FaqSection.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import faqBackground from "../assets/faq_footer_background.png";
import faqProduct from "../assets/faq_footer_product.png";

const AVENIR_FALLBACK = "Avenir, Inter, system-ui, sans-serif";

const faqTypography = {
  heavy: {
    fontFamily: `"Avenir Heavy", ${AVENIR_FALLBACK}`,
    fontWeight: 900,
  },
  blackOblique: {
    fontFamily: `"Avenir Black Oblique", "Avenir Black", ${AVENIR_FALLBACK}`,
    fontStyle: "italic",
    fontWeight: 900,
  },
};

const faqs = [
  {
    id: "contenido",
    question: "¿Qué contiene 40+?",
    answer:
      "Colágeno hidrolizado puro en polvo, de sabor neutro y fácil de mezclar. Está pensado para una rutina diaria simple, sin azúcares añadidos ni gluten.",
    desktop: { left: 97, top: 314, width: 680 },
  },
  {
    id: "preparacion",
    question: "¿Cómo se toma?",
    answer:
      "Mezcla la porción sugerida en agua, café, jugo, smoothie o tu preparación favorita. Su sabor neutro permite integrarlo sin cambiar tu rutina.",
    desktop: { left: 100, top: 420, width: 560 },
  },
  {
    id: "duracion",
    question: "¿Cuánto dura el doypack?",
    answer:
      "La duración depende de la frecuencia de consumo y de la porción diaria. Revisa la tabla nutricional y las indicaciones del empaque antes de usarlo.",
    desktop: { left: 97, top: 526, width: 680 },
  },
  {
    id: "envios-pagos",
    question: "¿Cómo funcionan los envíos y pagos?",
    answer:
      "Los envíos se realizan en Colombia y los medios de pago disponibles se muestran durante el checkout. Si necesitas ayuda, puedes escribirnos por WhatsApp.",
    desktop: { left: 97, top: 636, width: 780 },
  },
];

const SocialIcon = ({ type, className = "h-12 w-12" }) => {
  if (type === "facebook") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
        <path d="M13.5 9H15V6.5h-1.5C10.9 6.5 10 8.3 10 10.3V12H8v2.5h2v5h2.5v-5H15V12h-2.5v-1.7c0-.9.4-1.3 1-1.3z" />
      </svg>
    );
  }

  if (type === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <circle cx="12" cy="12" r="3.3" />
        <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.04 4C9.96 4 5 8.96 5 15.02c0 2.32.76 4.46 2.04 6.2L5 28l6.94-2.02A10.98 10.98 0 0 0 16.04 26C22.1 26 27 21.04 27 14.98 27 8.96 22.12 4 16.04 4zm5.9 15.52c-.24.68-1.4 1.3-1.94 1.34-.52.04-1.02.2-3.48-.72-2.93-1.16-4.8-4.16-4.94-4.36-.16-.2-1.18-1.57-1.18-3 0-1.42.72-2.12.98-2.4.26-.28.56-.34.74-.34h.54c.18 0 .42-.06.64.48.24.58.82 2 .9 2.14.08.14.12.3.02.48-.1.18-.16.3-.32.48-.16.18-.34.4-.48.54-.16.16-.32.34-.14.66.18.32.82 1.34 1.76 2.18 1.2 1.06 2.18 1.4 2.5 1.54.32.14.5.12.68-.08.18-.2.78-.9.98-1.2.2-.3.4-.24.68-.14.28.1 1.8.86 2.1 1.02.3.16.5.24.58.38.08.14.08.8-.16 1.48z" />
    </svg>
  );
};

const FaqSection = () => {
  const [openQuestionId, setOpenQuestionId] = useState(null);
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const toggleQuestion = (id) => {
    setOpenQuestionId((prev) => (prev === id ? null : id));
  };

  const goToProduct = () => {
    navigate("/producto/colageno-hidrolizado-40");
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
  };

  return (
    <section id="faq" className="bg-[#F8F1E3]">
      <div className="relative mx-auto hidden aspect-[1440/900] w-full max-w-[1440px] overflow-hidden bg-[#F8F1E3] lg:block">
        <img
          src={faqBackground}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute max-w-none select-none"
          style={{
            left: "-18px",
            top: "-336px",
            width: "1668px",
            height: "1668px",
            transform: "scaleX(-1)",
            transformOrigin: "center center",
          }}
        />

        <h2
          className="absolute left-[97px] top-[98px] w-[603px] text-[50px] leading-[1.15] tracking-[8px] text-[#9B823E] opacity-95"
          style={faqTypography.heavy}
        >
          Dudas frecuentes
        </h2>

        <p
          className="absolute left-[100px] top-[193px] w-[555px] text-[29px] leading-[1.15] tracking-[2.9px] text-[#244A34]/90"
          style={faqTypography.heavy}
        >
          Información clara para que elijas{" "}
          <span className="text-[#DE5E20]">40+</span> con confianza.
        </p>

        {faqs.map((item) => {
          const isOpen = openQuestionId === item.id;

          return (
            <div
              key={item.id}
              className="absolute"
              style={{
                left: `${item.desktop.left}px`,
                top: `${item.desktop.top}px`,
                width: `${item.desktop.width}px`,
              }}
            >
              <button
                type="button"
                onClick={() => toggleQuestion(item.id)}
                className="inline-flex items-baseline gap-4 text-left text-[#244A34] transition-opacity hover:opacity-85"
              >
                <span
                  className="text-[25px] leading-[1.15] tracking-[2.35px]"
                  style={faqTypography.heavy}
                >
                  {item.question}
                </span>
                <span
                  className="shrink-0 text-[25px] leading-[1.15] tracking-[2.35px] text-[#DC5D21]"
                  style={faqTypography.heavy}
                  aria-hidden="true"
                >
                  {isOpen ? "-" : "+"}
                </span>
              </button>

              {isOpen && (
                <p className="mt-3 max-w-[600px] text-[15px] leading-[1.32] tracking-[0.5px] text-[#244A34]/80">
                  {item.answer}
                </p>
              )}
            </div>
          );
        })}

        <div className="absolute left-[250px] top-[706px] flex w-[290px] items-center justify-center gap-8 text-[#9B823E]/45">
          <a
            href="https://www.facebook.com/cuarentamascom/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ir a Facebook de Cuarenta Más"
            className="transition-opacity hover:opacity-80"
          >
            <SocialIcon type="facebook" />
          </a>
          <a
            href="https://www.instagram.com/cuarentamas_official/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ir a Instagram de Cuarenta Más"
            className="transition-opacity hover:opacity-80"
          >
            <SocialIcon type="instagram" />
          </a>
          <a
            href="https://wa.me/573209099105"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escribir por WhatsApp"
            className="transition-opacity hover:opacity-80"
          >
            <SocialIcon type="whatsapp" className="h-11 w-11" />
          </a>
        </div>

        <p
          className="absolute left-[206px] top-[775px] w-[415px] text-center text-[22px] leading-[1.15] tracking-[2.2px] text-[#9B823E]/60"
          style={faqTypography.heavy}
        >
          © {currentYear} cuarentamas.
          <br />
          Todos los derechos reservados.
        </p>

        <img
          src={faqProduct}
          alt="Doypack de Colágeno Hidrolizado 40+ con información nutricional"
          className="pointer-events-none absolute max-w-none select-none"
          style={{
            left: "830px",
            top: "54px",
            width: "585px",
            height: "auto",
            filter: "drop-shadow(60px 40px 40px rgba(0,0,0,0.7))",
          }}
        />

        <button
          type="button"
          onClick={goToProduct}
          className="absolute left-[970px] top-[768px] flex h-[72px] w-[271px] items-center justify-center rounded-[76px] bg-[#DF5C20] text-center text-[28px] leading-none tracking-[-0.84px] text-white/95 shadow-[10px_10px_10px_rgba(0,0,0,0.6)] transition hover:bg-[#EB632F]"
          style={faqTypography.blackOblique}
        >
          COMPRAR 40+
        </button>
      </div>

      <div className="relative overflow-hidden bg-[#F8F1E3] lg:hidden">
        <img
          src={faqBackground}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-95"
        />
        <div className="relative z-10 px-7 py-12 text-[#244A34]">
          <h2 className="text-[34px] leading-[1.15] tracking-[0.16em] text-[#9B823E]" style={faqTypography.heavy}>
            Dudas frecuentes
          </h2>
          <p className="mt-8 text-[20px] leading-[1.2] tracking-[0.1em] text-[#244A34]/90" style={faqTypography.heavy}>
            Información clara para que elijas <span className="text-[#DE5E20]">40+</span> con confianza.
          </p>

          <div className="mt-10 space-y-8">
            {faqs.map((item) => {
              const isOpen = openQuestionId === item.id;

              return (
                <div key={item.id}>
                  <button
                    type="button"
                    onClick={() => toggleQuestion(item.id)}
                    className="flex w-full items-start justify-between gap-4 text-left"
                  >
                    <span className="text-[21px] leading-[1.18] tracking-[0.1em]" style={faqTypography.heavy}>
                      {item.question}
                    </span>
                    <span className="text-[24px] leading-none text-[#DC5D21]" style={faqTypography.heavy} aria-hidden="true">
                      {isOpen ? "-" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="mt-4 text-[15px] leading-[1.45] tracking-[0.04em] text-[#244A34]/80">
                      {item.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-12 flex justify-center">
            <img
              src={faqProduct}
              alt="Doypack de Colágeno Hidrolizado 40+ con información nutricional"
              className="w-[72%] max-w-[380px] drop-shadow-[36px_24px_28px_rgba(0,0,0,0.5)]"
            />
          </div>

          <button
            type="button"
            onClick={goToProduct}
            className="mx-auto mt-9 flex h-[60px] w-[230px] items-center justify-center rounded-[76px] bg-[#DF5C20] text-[22px] text-white shadow-[10px_10px_10px_rgba(0,0,0,0.45)]"
            style={faqTypography.blackOblique}
          >
            COMPRAR 40+
          </button>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
