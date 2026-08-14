// src/components/FlotingSocialBotton.jsx
import React from "react";
import { useCart } from "../context/CartContext.jsx";

const FlotingSocialBotton = () => {
  const { isCartOpen } = useCart();

  if (isCartOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-3.5">
      {/* Instagram */}
      <a
        href="https://www.instagram.com/cuarentamas_official/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ir a Instagram de Cuarenta Más"
        className="w-[60px] h-[60px] rounded-full bg-[#124948] text-[#F6F0DD] shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <rect x="4" y="4" width="16" height="16" rx="4" />
          <circle cx="12" cy="12" r="3.3" />
          <circle cx="17" cy="7" r="0.9" fill="currentColor" />
        </svg>
      </a>

      {/* Facebook */}
      <a
        href="https://www.facebook.com/cuarentamascom/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Ir a Facebook de Cuarenta Más"
        className="w-[60px] h-[60px] rounded-full bg-[#124948] text-[#F6F0DD] shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M13.5 9H15V6.5h-1.5C10.9 6.5 10 8.3 10 10.3V12H8v2.5h2v5h2.5v-5H15V12h-2.5v-1.7c0-.9.4-1.3 1-1.3z" />
        </svg>
      </a>
    </div>
  );
};

export default FlotingSocialBotton;
