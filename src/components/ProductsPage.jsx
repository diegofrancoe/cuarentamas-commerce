// src/components/ProductsPage.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import productoFront from "../assets/producto_front.png";
import MembershipBanner from "./MembershipBanner";

const ProductsPage = () => {
  const navigate = useNavigate();

  // SEO técnico para esta página
  useEffect(() => {
    const title =
      "Productos 40+ | Bienestar y suplementos diseñados para mayores de 40";
    const description =
      "Descubre suplementos 40+ creados para bienestar real después de los 40. Fórmulas transparentes, de calidad y pensadas para tu energía, articulaciones y vitalidad diaria.";

    document.title = title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);
  }, []);

  const handleViewColageno = () => {
    navigate("/producto/colageno-hidrolizado-40");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="bg-[#F6F0DD] pt-8 pb-14">
      {/* CONTENIDO CON ANCHO LIMITADO */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        {/* ENCABEZADO */}
        <header className="mb-8 md:mb-10">
          <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-[#8C7C5C] mb-2">
            Productos 40+
          </p>

          {/* Título principal visual */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#124948] mb-3">
            Bienestar 40+
          </h1>

          {/* Descripción introductoria */}
          <p className="text-sm md:text-base text-[#244D4B] max-w-2xl">
            Fórmulas creadas para quienes quieren cuidar su cuerpo después de
            los 40 con transparencia, ciencia y bienestar diario. Aquí
            encuentras soluciones reales, simples y hechas para acompañarte a
            largo plazo.
          </p>
        </header>

        {/* GRID DE PRODUCTOS */}
        <section className="space-y-6 md:space-y-8">
          {/* 🟩 PRODUCTO 1 — Colágeno Hidrolizado 40+ */}
          <article className="rounded-3xl border border-[#E5D4B3] bg-[#FDF5E5] px-3 py-5 md:px-6 md:py-6 shadow-sm">
            <div className="grid gap-4 md:gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1.1fr)] items-center">
              {/* IMAGEN ENORME, CONTORNO COMPACTO */}
              <div className="flex justify-center">
                <img
                  src={productoFront}
                  alt="Colágeno Hidrolizado 40+"
                  className="
                    w-[300px]
                    sm:w-[380px]
                    md:w-[460px]
                    lg:w-[520px]
                    xl:w-[600px]
                    h-auto
                    object-contain
                    drop-shadow-2xl
                  "
                />
              </div>

              {/* Texto producto */}
              <div>
                <p className="text-[11px] tracking-[0.3em] uppercase text-[#8C7C5C] mb-2">
                  Fórmula principal
                </p>

                {/* H3 producto */}
                <h3 className="text-2xl md:text-3xl font-extrabold text-[#124948] mb-1">
                  Colágeno Hidrolizado 40+
                </h3>

                {/* Subtítulo producto */}
                <p className="text-sm md:text-base text-[#244D4B] mb-3">
                  Articulaciones, huesos y piel que te acompañan al ritmo de tus
                  40+.
                </p>

                {/* Descripción */}
                <p className="text-sm md:text-base text-[#244D4B] leading-relaxed mb-4">
                  Péptidos de colágeno bovino tipo I y III diseñados para apoyar
                  tus articulaciones, huesos y piel en la etapa 40+. Sin azúcar
                  añadida, sin gluten y sin maltodextrina. Sabor neutro, fácil
                  de mezclar.
                </p>

                {/* Bullets beneficios */}
                <ul className="text-sm text-[#244D4B] space-y-1.5 mb-5 list-disc pl-5">
                  <li>
                    Contribuye al mantenimiento de articulaciones saludables.
                  </li>
                  <li>Aporta proteína que apoya la elasticidad de la piel.</li>
                  <li>Fácil de integrar en tu rutina diaria.</li>
                  <li>
                    Ideal para un estilo de vida activo después de los 40.
                  </li>
                </ul>

                {/* Info técnica */}
                <div className="mb-5">
                  <p className="text-[11px] tracking-[0.3em] uppercase text-[#8C7C5C] mb-1">
                    Info técnica
                  </p>
                  <ul className="text-sm text-[#244D4B] space-y-1">
                    <li>Contenido: 200 g (aprox. 20 porciones)</li>
                    <li>10 g de colágeno por porción</li>
                    <li>Sabor neutro</li>
                  </ul>
                </div>

                {/* Precio + CTA */}
                <div className="mb-5">
                  <p className="text-[11px] tracking-[0.3em] uppercase text-[#8C7C5C] mb-1">
                    Precio unidad
                  </p>
                  <p className="text-3xl md:text-4xl font-extrabold text-[#124948] leading-tight">
                    $ 69.900
                  </p>
                  <p className="text-[11px] text-[#7A6A4D] mt-1">
                    Impuestos incluidos. El costo de envío se calcula en el
                    checkout.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleViewColageno}
                  className="inline-flex items-center justify-center px-6 md:px-7 py-3 rounded-full bg-[#EB632F] text-white text-sm md:text-base font-semibold shadow-md hover:shadow-lg hover:translate-y-[1px] transition"
                >
                  Ver detalle y comprar
                </button>
              </div>
            </div>
          </article>

          {/* 🟧 OTROS PRODUCTOS (COMING SOON) */}
          <div className="grid gap-5 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* 🟩 PRODUCTO 2 — 40+ Peso Consciente */}
            <ComingSoonCard
              title="40+ Peso Consciente"
              subtitle="Tu peso, tu ritmo, tu bienestar metabólico después de los 40"
              badge="Próximamente"
              description="Una fórmula diseñada para apoyar la gestión de peso en la etapa 40+, enfocada en bienestar metabólico, energía diaria y hábitos sostenibles. Pensada para acompañar tu proceso sin extremos, desde la consciencia y el autocuidado."
            />

            {/* 🟩 PRODUCTO 3 — 40+ Ritual Mañana – Shots */}
            <ComingSoonCard
              title="40+ Ritual Mañana – Shots"
              subtitle="Comienza tus mañanas con energía, claridad y propósito"
              badge="Próximamente"
              description="Shots listos para tomar que acompañan tu mañana con ingredientes pensados para activar energía, claridad mental y enfoque sostenible a lo largo del día. Un impulso noble para tu rutina de 40+."
            />

            {/* 🟩 PRODUCTO 4 — 40+ Ritual Noche – Shots */}
            <ComingSoonCard
              title="40+ Ritual Noche – Shots"
              subtitle="Tu momento para recuperar, descansar y reconectar contigo"
              badge="Próximamente"
              description="Una fórmula nocturna diseñada para acompañar la recuperación, el descanso profundo y la relajación natural en la etapa 40+. Ideal para completar tu stack de bienestar diario."
            />
          </div>
        </section>

        {/* 🟩 BANNER: Ingredientes que importan */}
        <section className="mt-10 md:mt-12">
          <div className="rounded-3xl bg-[#F2E4C8] border border-[#E0CDAA] px-5 py-8 md:px-8 md:py-10 shadow-sm">
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#8C7C5C] mb-2">
              Ingredientes que importan
            </p>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#124948] mb-3">
              Fabricados con estándares de calidad que honran tu cuerpo 40+
            </h2>
            <p className="text-sm md:text-base text-[#244D4B] leading-relaxed max-w-3xl">
              Trabajamos con fabricantes que cumplen normas internacionales y
              seleccionamos materias primas con foco en seguridad, trazabilidad
              y transparencia. Porque cuidar tu bienestar no es una moda: es una
              decisión de largo plazo.
            </p>
          </div>
        </section>
      </div>

      {/* BANNER DE MEMBRESÍA A ANCHO COMPLETO */}
      <section className="mt-10 md:mt-12">
        <MembershipBanner />
      </section>
    </main>
  );
};

/* --- Tarjeta reutilizable para productos "Coming soon" --- */

const ComingSoonCard = ({ title, subtitle, description, badge }) => {
  return (
    <article className="rounded-3xl border border-dashed border-[#E0CDAA] bg-[#FFF7E6] px-4 py-5 md:px-5 md:py-6 flex flex-col justify-between shadow-sm">
      <div>
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#F2E4C8] text-[11px] font-semibold tracking-[0.16em] uppercase text-[#8C7C5C] mb-3">
          {badge}
        </span>
        {/* H3 de producto futuro */}
        <h3 className="text-lg md:text-xl font-semibold text-[#124948] mb-1">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs md:text-sm text-[#244D4B] mb-2">
            {subtitle}
          </p>
        )}
        <p className="text-sm md:text-[15px] text-[#244D4B] leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#124948] text-[#F6F0DD] text-xs font-bold">
          40+
        </span>
        <span className="text-xs md:text-sm font-medium text-[#EB632F]">
          Coming Soon ✨
        </span>
      </div>
    </article>
  );
};

export default ProductsPage;
