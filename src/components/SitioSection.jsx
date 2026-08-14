// src/components/SitioSection.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

import iconVisa from "../assets/icon_visa.png";
import iconMastercard from "../assets/icon_mastercard.png";
import iconAmerican from "../assets/icon_american.png";
import iconBold from "../assets/icon_bold.png";

const SitioSection = () => {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const paymentIcons = [
    { src: iconVisa, alt: "Visa" },
    { src: iconMastercard, alt: "Mastercard" },
    { src: iconAmerican, alt: "American Express" },
    { src: iconBold, alt: "Bold" },
  ];

  return (
    <section className="bg-[#0E4943] text-[#F6F0DD] py-10 md:py-12 mt-10">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Grid principal */}
        <div className="grid gap-8 md:gap-12 md:grid-cols-[1.1fr,1.2fr,1.2fr] items-start">
          {/* Marca / ubicación */}
          <div>
            <p className="text-3xl md:text-4xl font-semibold tracking-tight">
              40+
            </p>
            <p className="mt-1 text-sm md:text-base text-[#F6F0DD]/80">
              Bogotá, Colombia
            </p>
          </div>

          {/* Sitio 40+ */}
          <div>
            <p className="text-xs md:text-sm tracking-[0.22em] uppercase text-[#D9CBB0]/80 mb-3">
              Sitio 40+
            </p>
            <ul className="space-y-1.5 text-sm md:text-base">
              <li>
                <button
                  type="button"
                  onClick={() => goTo("/")}
                  className="hover:underline"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => goTo("/productos")}
                  className="hover:underline"
                >
                  Productos 40+
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    goTo("/producto/colageno-hidrolizado-40")
                  }
                  className="hover:underline"
                >
                  Colágeno Hidrolizado 40+
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => goTo("/")}
                  className="hover:underline"
                >
                  Membresía 40+
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    goTo("/");
                  }}
                  className="hover:underline"
                >
                  Preguntas frecuentes 40+
                </button>
              </li>
            </ul>
          </div>

          {/* Información legal */}
          <div>
            <p className="text-xs md:text-sm tracking-[0.22em] uppercase text-[#D9CBB0]/80 mb-3">
              Información legal
            </p>
            <ul className="space-y-1.5 text-sm md:text-base">
              <li>
                <button
                  type="button"
                  onClick={() => goTo("/terminos-y-condiciones")}
                  className="hover:underline"
                >
                  Términos y condiciones
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => goTo("/politica-de-datos")}
                  className="hover:underline"
                >
                  Política de tratamiento de datos
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => goTo("/politica-de-cookies")}
                  className="hover:underline"
                >
                  Política de cookies
                </button>
              </li>
              <li className="mt-2 text-[#F6F0DD]/80">
                contacto@cuarentamas.com
              </li>
            </ul>
          </div>
        </div>

        {/* Medios de pago */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          {paymentIcons.map((icon) => (
            <div
              key={icon.alt}
              className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-[#D9CBB0]/60 bg-white shadow-sm"
            >
              <img
                src={icon.src}
                alt={icon.alt}
                className="h-5 md:h-6 object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SitioSection;
