// src/components/AboutPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isMembresiaEnabled } from "../config/siteConfig";

const faqItems = [
  {
    question: "¿Para quién están diseñados los productos 40+?",
    answer:
      "Para hombres y mujeres mayores de 40 años que buscan mejorar energía, vitalidad, sueño, digestión y equilibrio general de forma natural.",
  },
  {
    question: "¿Los productos 40+ son medicamentos?",
    answer:
      "No. Son suplementos alimenticios y soluciones homeopáticas que complementan el bienestar, pero no reemplazan tratamientos médicos.",
  },
  {
    question: "¿Puedo consumirlos si tomo otros tratamientos?",
    answer:
      "En la mayoría de los casos sí, pero recomendamos consultar con un profesional de salud si tomas medicamentos permanentes.",
  },
  {
    question: "¿Tienen efectos secundarios?",
    answer:
      "Son productos seguros dentro de su categoría; sin embargo, cada organismo reacciona de forma distinta. Suspende su uso si notas molestias.",
  },
  {
    question: "¿Cuándo veré resultados?",
    answer:
      "Muchos usuarios reportan cambios positivos entre 2 y 6 semanas, dependiendo del producto y hábitos de vida.",
  },
  {
    question: "¿Dónde puedo comprar los productos 40+?",
    answer:
      "Puedes adquirirlos directamente en nuestra página web. Realizamos envíos a todo Colombia.",
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer:
      "Aceptamos tarjeta débito, crédito, PSE, pagos en efectivo y billeteras digitales disponibles en Colombia.",
  },
];

const FaqItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      className="w-full text-left bg-[#F6F0DD] border border-[#E4D4BC] rounded-2xl px-4 sm:px-6 py-3.5 shadow-sm hover:bg-[#F2E7CF] transition"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm md:text-base font-semibold text-[#124948]">
          {question}
        </p>
        <span className="flex-shrink-0 w-7 h-7 rounded-full border border-[#D3C2A4] flex items-center justify-center text-xs text-[#124948]">
          {open ? "˄" : "˅"}
        </span>
      </div>
      {open && (
        <p className="mt-2 text-sm md:text-base text-[#244D4B]">
          {answer}
        </p>
      )}
    </button>
  );
};

const AboutPage = () => {
  const navigate = useNavigate();

  const goToProductos = () => {
    navigate("/productos");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToMembresia = () => {
    if (isMembresiaEnabled) {
      navigate("/membresia");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    navigate("/");
    setTimeout(() => {
      const el = document.getElementById("membresia");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  return (
    <main className="bg-[#F6F0DD]">
      {/* HERO */}
      <section
        id="hero"
        className="bg-[#124948] text-[#F6F0DD] border-b border-[#0E3A35]"
      >
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-14">
          <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-[#F6F0DD]/70 mb-3">
            Sobre nosotros
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
            Ciencia, conciencia y transparencia para tu bienestar.
          </h1>
          <p className="max-w-3xl text-sm md:text-base text-[#F6F0DD]/90 leading-relaxed">
            En 40+ diseñamos productos y experiencias para ayudarte a cuidar tu
            salud y tu energía con información clara y fórmulas limpias.
          </p>
        </div>
      </section>

      {/* CONTENIDO */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-12 space-y-10 md:space-y-12">
        {/* QUIÉNES SOMOS */}
        <section id="quienes-somos" className="space-y-4 md:space-y-5">
          <p className="text-xs md:text-sm tracking-[0.24em] uppercase text-[#AC9873]">
            Quiénes somos
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#124948]">
            ¿Quiénes somos?
          </h2>
          <p className="text-sm md:text-base text-[#244D4B] leading-relaxed">
            En <strong>40+</strong> acompañamos a hombres y mujeres mayores de
            40 años en Colombia que desean fortalecer su bienestar físico y
            emocional con{" "}
            <strong>
              suplementos alimenticios y soluciones homeopáticas seguras
            </strong>
            .
          </p>
          <p className="text-sm md:text-base text-[#244D4B] leading-relaxed">
            Creemos que después de los 40 inicia una etapa de mayor conciencia,
            donde la energía, la vitalidad y el equilibrio se vuelven
            esenciales. Por eso desarrollamos productos creados para responder a
            las <strong>necesidades reales del cuerpo adulto</strong>.
          </p>
          <p className="text-sm md:text-base text-[#244D4B] leading-relaxed">
            Nuestro propósito es construir una comunidad que vive el bienestar
            como un estilo de vida.{" "}
            <strong>
              No vendemos solo productos: vendemos la tranquilidad de sentirte
              bien cada día.
            </strong>
          </p>
        </section>

        {/* LO QUE NOS MUEVE */}
        <section
          id="lo-que-nos-mueve"
          className="bg-[#F2E4C8] border border-[#E4D4BC] rounded-3xl p-5 md:p-6 shadow-sm space-y-3"
        >
          <h3 className="text-lg md:text-xl font-semibold text-[#124948]">
            Lo que nos mueve
          </h3>
          <p className="text-sm md:text-base text-[#244D4B] leading-relaxed">
            Acompañamos la etapa 40+ con{" "}
            <strong>
              productos honestos, información clara y seguimiento real
            </strong>
            . Queremos que tomes decisiones informadas sobre tu cuerpo, tus
            hábitos y tu energía.
          </p>
          <p className="text-sm md:text-base text-[#244D4B] leading-relaxed">
            Cada fórmula está diseñada para recordarte algo esencial:{" "}
            <strong>todavía estás a tiempo de construir tu mejor versión.</strong>
          </p>
        </section>

        {/* CALIDAD */}
        <section id="calidad" className="space-y-5 md:space-y-6">
          <div className="space-y-3">
            <p className="text-xs md:text-sm tracking-[0.24em] uppercase text-[#AC9873]">
              Calidad
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#124948]">
              Calidad que respalda tu bienestar.
            </h2>
            <p className="text-sm md:text-base text-[#244D4B] leading-relaxed">
              En 40+ trabajamos con altos estándares de calidad para ofrecer{" "}
              <strong>suplementos confiables, efectivos y seguros</strong>,
              elaborados con materias primas certificadas y procesos
              responsables.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-[#FDF5E5] rounded-2xl p-4 md:p-5 shadow-sm border border-[#E8D9C0]">
              <h4 className="font-semibold text-[#124948] mb-2 text-sm md:text-base">
                Ingredientes y formulaciones
              </h4>
              <ul className="list-disc pl-4 text-sm md:text-base text-[#244D4B] space-y-1.5">
                <li>
                  Ingredientes de alta calidad seleccionados para el cuerpo
                  adulto.
                </li>
                <li>
                  Formulaciones especializadas para personas mayores de 40 años.
                </li>
                <li>Desarrollo responsable con enfoque en seguridad.</li>
              </ul>
            </div>

            <div className="bg-[#FDF5E5] rounded-2xl p-4 md:p-5 shadow-sm border border-[#E8D9C0]">
              <h4 className="font-semibold text-[#124948] mb-2 text-sm md:text-base">
                Procesos y transparencia
              </h4>
              <ul className="list-disc pl-4 text-sm md:text-base text-[#244D4B] space-y-1.5">
                <li>Procesos regulados según normativas locales.</li>
                <li>Transparencia total en beneficios y uso.</li>
                <li>Producción consciente y sostenible.</li>
              </ul>
            </div>
          </div>

          <p className="text-sm md:text-base text-[#244D4B] leading-relaxed">
            <strong>Es nuestra promesa diaria de bienestar.</strong>
          </p>
        </section>

        {/* PREGUNTAS FRECUENTES */}
        <section id="faq" className="space-y-4 md:space-y-5">
          <div>
            <p className="text-xs md:text-sm tracking-[0.24em] uppercase text-[#AC9873] mb-1">
              Preguntas frecuentes
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#124948]">
              Lo que más nos preguntan sobre 40+.
            </h2>
          </div>

          <div className="space-y-3.5">
            {faqItems.map((item) => (
              <FaqItem
                key={item.question}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        </section>
      </section>

      {/* BANNER FINAL CTA */}
      <section className="bg-[#124948] text-[#F6F0DD]">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-7 md:py-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          <div className="space-y-1 max-w-xl">
            <h3 className="text-lg md:text-xl font-semibold">
              ¿Listo para cuidar tu bienestar 40+?
            </h3>
            <p className="text-sm md:text-base text-[#F6F0DD]/85">
              Descubre nuestras fórmulas y recibe acompañamiento simple y
              honesto para esta etapa.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={goToProductos}
              className="inline-flex items-center justify-center rounded-full bg-[#EB632F] px-6 py-2.5 md:px-7 md:py-2.5 text-sm md:text-base font-semibold text-white shadow-md hover:shadow-lg hover:translate-y-[1px] transition"
            >
              Ver productos 40+
            </button>
            <button
              type="button"
              onClick={goToMembresia}
              className="inline-flex items-center justify-center rounded-full border border-[#F6F0DD]/70 px-6 py-2.5 md:px-7 md:py-2.5 text-sm md:text-base font-semibold text-[#F6F0DD] hover:bg-[#F6F0DD]/10 transition"
            >
              Membresía 40+
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
