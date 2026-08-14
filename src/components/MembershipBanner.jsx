// src/components/MembershipBanner.jsx
import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    id: "pertenencia",
    tag: "EXPERIENCIA BIENESTAR 40+",
    title: "Experiencia Bienestar 40+",
    text: "Accede a una experiencia enfocada en salud preventiva, nutrición consciente y hábitos sostenibles para mejorar energía, descanso y calidad de vida.",
    micro: "Bienestar continuo con enfoque práctico y resultados sostenibles.",
    icon: "ring", // ícono tipo sello / premium
  },
  {
    id: "beneficios",
    tag: "OFERTAS Y PROMOCIONES",
    title: "Ofertas y Promociones",
    text: "Recibe descuentos exclusivos, promociones estacionales y beneficios comerciales diseñados para optimizar tu inversión en suplementación y autocuidado.",
    micro: "Más valor por compra para mantener constancia en tu rutina.",
    icon: "shield", // ahorro / protección
  },
  {
    id: "comodidad",
    tag: "COMPRA PREFERENCIAL",
    title: "Compra preferencial y acceso anticipado a lanzamientos",
    text: "Disfruta prioridad en novedades, acceso anticipado a lanzamientos y comunicación directa con la marca.",
    micro: "Proceso de compra más ágil y mejor experiencia de membresía.",
    icon: "truck", // envíos
  },
  {
    id: "contenido",
    tag: "VIDA SALUDABLE 40+",
    title: "Vida Saludable",
    text: "Obtén guías prácticas, recetas funcionales, educación en suplementación y recomendaciones de estilo de vida para fortalecer tu bienestar de forma sostenible.",
    micro: "Contenido accionable para transformar información en hábitos.",
    icon: "book", // conocimiento
  },
];

const MembershipBanner = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Actualiza el índice activo mientras el usuario hace scroll horizontal
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const { scrollLeft, clientWidth } = el;
      if (clientWidth === 0) return;
      const index = Math.round(scrollLeft / clientWidth);
      setActiveIndex(index);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSlide = (index) => {
    const el = containerRef.current;
    if (!el) return;
    const { clientWidth } = el;
    el.scrollTo({
      left: clientWidth * index,
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  return (
    <section
      id="membresia"
      className="bg-[#0D4A45] text-white py-10 md:py-12"
    >
      <div className="w-full">
        {/* Etiqueta superior */}
        <p className="text-center text-[11px] md:text-xs tracking-[0.28em] uppercase text-white/70 mb-6 px-4 md:px-8">
          Membresía 40+
        </p>

        {/* Carrusel horizontal */}
        <div
          ref={containerRef}
          className="
            relative
            flex
            overflow-x-auto
            snap-x snap-mandatory
            scroll-smooth
            gap-0
            pb-6
            [-webkit-overflow-scrolling:touch]
            scrollbar-thin
            scrollbar-thumb-transparent
            scrollbar-track-transparent
          "
        >
          {slides.map((slide) => (
            <article
              key={slide.id}
              className="
                snap-start
                flex-shrink-0
                w-full
                bg-[#10544E]
                border-y border-white/8
                px-6 md:px-12 lg:px-16
                py-7 md:py-9
                flex
                flex-col
                justify-between
                min-h-[300px] md:min-h-[350px]
                relative
              "
            >
              {/* Cabecera + icono */}
              <div className="flex items-start justify-between gap-4 mb-4 md:mb-5">
                <div>
                  <div className="inline-flex items-center px-4 py-1 rounded-full border border-white/15 text-[11px] md:text-xs tracking-[0.18em] uppercase text-white/70 mb-3">
                    {slide.tag}
                  </div>
                  <h3 className="text-[1.6rem] md:text-[2.05rem] lg:text-[2.35rem] font-semibold leading-[1.15]">
                    {slide.title}
                  </h3>
                  <p className="mt-2 text-[11px] md:text-xs tracking-[0.16em] uppercase text-white/70">
                    Membresía Silver
                  </p>
                </div>
                <CardIcon type={slide.icon} />
              </div>

              {/* Texto principal */}
              <p className="text-[1rem] md:text-[1.2rem] lg:text-[1.35rem] text-white/85 leading-relaxed mb-4 md:mb-6 max-w-[56rem]">
                {slide.text}
              </p>

              {/* Micro línea */}
              <p className="text-[0.92rem] md:text-[1rem] italic text-white/70 max-w-[52rem] pr-32 md:pr-44">
                {slide.micro}
              </p>

              <span className="absolute bottom-5 right-6 md:bottom-6 md:right-8 text-[10px] md:text-[11px] tracking-[0.12em] uppercase text-[#D4B36A] whitespace-nowrap">
                Membresía Gold próximamente
              </span>
            </article>
          ))}
        </div>

        {/* Puntos indicadores */}
        <div className="flex justify-center gap-2 mb-6">
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => scrollToSlide(index)}
                className={`
                  h-2 w-2 rounded-full
                  transition
                  ${isActive ? "bg-white" : "bg-white/35"}
                `}
                aria-label={`Ir al beneficio ${index + 1}`}
              />
            );
          })}
        </div>

        {/* CTA principal */}
        <div
          className="
            px-4 md:px-8
            mt-1
            flex
            justify-center
          "
        >
          <Link
            to="/membresia"
            className="
              inline-flex
              items-center
              justify-center
              rounded-full
              bg-[#EB632F]
              px-6 md:px-8
              py-3
              text-sm md:text-base
              font-semibold
              text-white
              shadow-md
              hover:shadow-lg
              hover:translate-y-[1px]
              transition
              whitespace-nowrap
            "
          >
            Ir a Membresía 40+
          </Link>
        </div>
      </div>
    </section>
  );
};

// Iconos minimalistas, sin fondo ni contorno
const CardIcon = ({ type }) => {
  const common = "w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 text-white"; // tamaño grande

  if (type === "ring") {
    // círculo tipo sello
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="7" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }

  if (type === "shield") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3l6 2v6c0 3.5-2.4 6.6-6 8-3.6-1.4-6-4.5-6-8V5l6-2z" />
        <path d="M10 11l2 2 3-3" />
      </svg>
    );
  }

  if (type === "truck") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="7" width="11" height="8" rx="1" />
        <path d="M13 9h4l3 3v3h-3" />
        <circle cx="7" cy="17" r="1.6" />
        <circle cx="17" cy="17" r="1.6" />
      </svg>
    );
  }

  if (type === "book") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 4h7a3 3 0 0 1 3 3v13H8a3 3 0 0 0-3 3V4z" />
        <path d="M12 4h7a3 3 0 0 1 3 3v13h-7" />
      </svg>
    );
  }

  return null;
};

export default MembershipBanner;
