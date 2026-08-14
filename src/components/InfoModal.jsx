// src/components/InfoModal.jsx
import React from "react";

const InfoModal = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-3xl shadow-xl max-w-lg w-full mx-4 p-6 md:p-8 text-[#124948] relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-sm md:text-base px-2 py-1 rounded-full border border-[#124948]/20"
          aria-label="Cerrar"
        >
          ✕
        </button>
        <h3 className="text-lg md:text-xl font-semibold mb-4 text-center">
          {title}
        </h3>
        <div className="text-sm md:text-base leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
