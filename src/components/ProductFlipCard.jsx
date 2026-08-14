// src/components/ProductFlipCard.jsx
import React, { useState } from "react";
import productoFront from "../assets/producto_front.png";
import productoBack from "../assets/producto_back.png";
import "./ProductFlipCard.css";

const ProductFlipCard = ({ className = "" }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`perspective ${className}`}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={`relative
          w-[260px] sm:w-[320px] md:w-[380px] lg:w-[420px] xl:w-[460px]
          h-auto mx-auto
          card-soft-shadow rounded-[32px] bg-[#F6F0DD]
          preserve-3d
          ${isFlipped ? "rotate-y-180" : ""}
        `}
      >
        {/* Cara frontal */}
        <div className="absolute inset-0 backface-hidden flex items-center justify-center p-4">
          <img
            src={productoFront}
            alt="Colágeno Hidrolizado 40+ frente"
            className="w-full h-auto rounded-[32px]"
          />
        </div>

        {/* Cara trasera */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center p-4">
          <img
            src={productoBack}
            alt="Colágeno Hidrolizado 40+ reverso"
            className="w-full h-auto rounded-[32px]"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFlipCard;
