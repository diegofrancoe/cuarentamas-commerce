// src/components/CookieBanner.jsx
import React, { useState } from "react";

const COOKIE_KEY = "cm_cookies_choice"; // para recordar la decisión

const CookieBanner = () => {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem(COOKIE_KEY);
    return !stored;
  });

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem(COOKIE_KEY, "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4">
      <div className="max-w-4xl w-full bg-[#124948] text-[#F6F0DD] rounded-2xl shadow-xl p-4 md:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="text-xs md:text-sm leading-relaxed">
          <p className="font-semibold text-[11px] md:text-xs tracking-[0.18em] uppercase mb-1">
            Política de cookies
          </p>
          <p>
            En cuarentamas.com usamos cookies propias y de terceros{" "}
            (técnicas, de análisis y publicitarias) para recordar tus
            preferencias, analizar el tráfico del sitio y optimizar nuestras
            campañas y tu experiencia de compra.
          </p>
          <p className="mt-1 text-[11px] md:text-xs text-[#F6F0DD]/80">
            Puedes aceptar todas las cookies o gestionar y eliminar su uso
            desde la configuración de tu navegador en cualquier momento.
          </p>
        </div>

        <div className="flex md:flex-col gap-2 md:w-52">
          <button
            type="button"
            onClick={handleAccept}
            className="flex-1 md:w-full inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#F6F0DD] text-[#124948] text-xs md:text-sm font-semibold hover:bg-white transition"
          >
            Aceptar cookies
          </button>
          <button
            type="button"
            onClick={handleReject}
            className="flex-1 md:w-full inline-flex items-center justify-center px-4 py-2 rounded-full border border-[#F6F0DD]/70 text-[#F6F0DD] text-xs md:text-sm font-medium hover:bg-white/10 transition"
          >
            Rechazar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
