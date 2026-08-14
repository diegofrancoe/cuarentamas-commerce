// src/components/ReviewSection.jsx
import React from "react";

const reviews = [
  {
    name: "María L.",
    age: "44 años",
    text: "Lo empecé a tomar hace algunas semanas y siento las articulaciones menos rígidas. Me gusta que sea una fórmula limpia, sin cosas raras.",
  },
  {
    name: "Andrés J.",
    age: "48 años",
    text: "El sabor neutro es un hit, lo mezclo con mi café de la mañana y listo. Siento que estoy haciendo algo por mi cuerpo todos los días.",
  },
  {
    name: "Paola U.",
    age: "42 años",
    text: "Lo que más me convenció fue que no tiene azúcares ni maltodextrina. Me gusta leer etiquetas y esta es muy transparente.",
  },
  {
    name: "Fernanda R.",
    age: "46 años",
    text: "El envío llegó rápido y bien empacado. Estoy empezando la rutina 40+ y me gusta que el producto sea claro con la información.",
  },
];

const StarRow = () => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={`star-${i}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        className="w-4 h-4 md:w-4.5 md:h-4.5 text-[#F5A623] fill-current"
      >
        <path d="M10 1.5l2.47 4.98 5.5.8-3.98 3.88.94 5.49L10 14.75l-4.93 2.9.94-5.49L2.03 7.28l5.5-.8L10 1.5z" />
      </svg>
    ))}
  </div>
);

const ReviewSection = () => {
  return (
    <section
      id="reseñas"
      className="bg-[#F6F0DD] px-4 py-12 md:py-16 border-t border-[#E8D9C0]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Título */}
        <div className="text-center mb-8 md:mb-10">
          <p className="text-[11px] md:text-xs tracking-[0.28em] uppercase text-[#124948]/70 mb-2">
            EXPERIENCIAS 40+
          </p>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#124948]">
            Lo que dicen quienes ya empezaron su rutina 40+
          </h2>
          <p className="mt-3 text-sm md:text-base text-[#244D4B] max-w-2xl mx-auto">
            Reseñas recopiladas de nuestras primeras personas en
            comenzar con Colágeno Hidrolizado 40+.
          </p>
        </div>

        {/* Carrusel / grid de tarjetas */}
        <div className="md:hidden -mx-4 px-4 overflow-x-auto pb-3 snap-x snap-mandatory">
          <div className="flex gap-4">
            {reviews.map((review) => (
              <article
                key={review.name}
                className="snap-center min-w-[260px] max-w-[280px] bg-white rounded-3xl shadow-md border border-[#F0E0C1] px-4 py-4 flex flex-col justify-between"
              >
                <div className="mb-3">
                  <StarRow />
                  <p className="mt-3 text-sm text-[#244D4B] leading-relaxed">
                    {review.text}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#F0E0C1] flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#124948]">
                      {review.name}
                    </p>
                    <p className="text-xs text-[#6C5A3C]">
                      {review.age}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#F6F0DD] border border-[#E4D4BC] text-[10px] font-semibold text-[#124948]">
                    Reseña verificada
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Versión desktop: grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviews.map((review) => (
            <article
              key={review.name}
              className="bg-white rounded-3xl shadow-md border border-[#F0E0C1] px-4 py-5 flex flex-col justify-between h-full"
            >
              <div className="mb-4">
                <StarRow />
                <p className="mt-3 text-sm text-[#244D4B] leading-relaxed">
                  {review.text}
                </p>
              </div>
              <div className="pt-3 border-t border-[#F0E0C1] flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#124948]">
                    {review.name}
                  </p>
                  <p className="text-xs text-[#6C5A3C]">
                    {review.age}
                  </p>
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#F6F0DD] border border-[#E4D4BC] text-[11px] font-semibold text-[#124948]">
                  Reseña verificada
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
