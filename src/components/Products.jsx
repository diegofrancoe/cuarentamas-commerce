import React from "react";
import ProductFlipCard from "./ProductFlipCard";

const Products = () => {
  return (
    <section className="products-section">
      <h2 className="text-center text-xl font-bold mt-12 mb-4">Nuestro producto estrella</h2>
      <p className="text-center text-gray-700 mb-8 max-w-xl mx-auto">
        Fórmula avanzada de colágeno hidrolizado diseñada para apoyar la salud de las articulaciones, piel, cabello y uñas.
      </p>

      <div className="flex justify-center">
        <ProductFlipCard />
      </div>
    </section>
  );
};

export default Products;
