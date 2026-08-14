// src/components/ColagenoDetailPage.jsx
import { useState } from "react";
import { useCart } from "../context/CartContext";

import figmaBackground from "../assets/product_detail_figma_background.png";
import figmaProductFront from "../assets/product_detail_figma_front_trimmed.png";
import figmaProductBack from "../assets/product_detail_figma_back_trimmed.png";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Qué tipo de colágeno es el Colágeno Hidrolizado 40+?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Es un colágeno bovino tipo I y III, en forma de péptidos hidrolizados.",
      },
    },
    {
      "@type": "Question",
      name: "¿El Colágeno Hidrolizado 40+ tiene azúcar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. No contiene azúcares añadidos.",
      },
    },
  ],
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Colágeno Hidrolizado 40+",
  description:
    "Colágeno hidrolizado en polvo, fácil de integrar a la rutina diaria.",
  image: [
    "https://cuarentamas.com/images/producto_front.png",
    "https://cuarentamas.com/images/producto_back.png",
  ],
  brand: {
    "@type": "Brand",
    name: "40+",
  },
  sku: "COLAGENO-40-200G",
  offers: {
    "@type": "Offer",
    url: "https://cuarentamas.com/producto/colageno-hidrolizado-40",
    priceCurrency: "COP",
    price: "69900",
    availability: "https://schema.org/InStock",
  },
};

const ColagenoDetailPage = () => {
  const { addToCart, openCart } = useCart();
  const [selectedImage, setSelectedImage] = useState("front");
  const [quantity, setQuantity] = useState(1);

  const selectedProductImage =
    selectedImage === "front" ? figmaProductFront : figmaProductBack;

  const decreaseQty = () => setQuantity((q) => Math.max(1, q - 1));
  const increaseQty = () => setQuantity((q) => q + 1);

  const handleAddToCart = () => {
    addToCart(
      {
        id: "colageno-40",
        name: "Colágeno Hidrolizado 40+",
        price: 69900,
        image: selectedProductImage,
      },
      quantity,
    );
    openCart();
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <main className="min-h-screen bg-[#124948]">
        <section className="relative mx-auto w-full max-w-[1440px] overflow-hidden bg-[#124948] lg:aspect-[1440/900]">
          <img
            src={figmaBackground}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="relative z-10 grid min-h-[900px] gap-8 px-6 py-10 text-[#F6F0DD] md:px-10 md:py-12 lg:min-h-0 lg:grid-cols-[43%_57%] lg:gap-0 lg:px-0 lg:py-0">
            <div className="relative flex flex-col items-center justify-start lg:block">
              <button
                type="button"
                onClick={() => setSelectedImage(selectedImage)}
                className="group mt-3 block w-full max-w-[520px] lg:absolute lg:left-[76px] lg:top-[18px] lg:mt-0 lg:w-[505px]"
                aria-label="Ver producto principal"
              >
                <img
                  src={selectedProductImage}
                  alt="Doypack de Colágeno Hidrolizado 40+"
                  className="pointer-events-none block w-full rotate-[20deg] select-none object-contain drop-shadow-[60px_40px_40px_rgba(0,0,0,0.55)] transition duration-300 group-hover:scale-[1.01]"
                />
              </button>

              <div className="mt-8 flex items-center justify-center gap-8 lg:absolute lg:left-[138px] lg:top-[650px] lg:mt-0">
                <ProductThumb
                  image={figmaProductFront}
                  label="Frente del producto"
                  active={selectedImage === "front"}
                  imageClassName="rotate-[20deg]"
                  onClick={() => setSelectedImage("front")}
                />
                <ProductThumb
                  image={figmaProductBack}
                  label="Reverso del producto"
                  active={selectedImage === "back"}
                  onClick={() => setSelectedImage("back")}
                />
              </div>
            </div>

            <div className="flex flex-col lg:pl-[2.2%] lg:pr-[8.5%] lg:pt-[86px]">
              <h1 className="max-w-[760px] font-['Avenir',Inter,sans-serif] text-[34px] font-black leading-[1.05] tracking-[0.12em] text-[#D9D2B8] md:text-[44px] lg:text-[46px]">
                Colágeno Hidrolizado{" "}
                <span className="text-[#DF5C20]">40+</span>
              </h1>

              <p className="mt-5 max-w-[620px] font-['Avenir',Inter,sans-serif] text-[18px] leading-[1.14] tracking-[0.12em] text-[#F6F0DD] md:text-[20px]">
                Fórmula simple, fácil de integrar y pensada para acompañar tu
                rutina diaria.
              </p>

              <p className="mt-7 font-['Avenir',Inter,sans-serif] text-[20px] font-black leading-[1.1] tracking-[0.12em] text-[#978240]">
                Precio por unidad
              </p>
              <p className="mt-4 font-['Avenir',Inter,sans-serif] text-[40px] font-black leading-[1.1] tracking-[0.12em] text-[#F6F0DD]">
                $ 69.900 <span className="text-[#978240]">COP</span>
              </p>

              <h2 className="mt-7 font-['Avenir',Inter,sans-serif] text-[20px] font-black leading-[1.1] tracking-[0.12em]">
                Beneficios principales
              </h2>
              <ul className="mt-4 max-w-[690px] list-disc pl-6 font-['Avenir',Inter,sans-serif] text-[17px] leading-[1.13] tracking-[0.12em] text-[#F6F0DD] md:text-[18px]">
                <li>Apoya articulaciones y movilidad.</li>
                <li>Acompaña el cuidado de la piel, cabello y uñas.</li>
                <li>Fórmula simple para tu rutina diaria.</li>
                <li>Sin azúcares añadidos, sin gluten y sin maltodextrina.</li>
              </ul>

              <h2 className="mt-7 font-['Avenir',Inter,sans-serif] text-[20px] font-black leading-[1.1] tracking-[0.12em]">
                Modo de uso
              </h2>
              <p className="mt-4 max-w-[670px] font-['Avenir',Inter,sans-serif] text-[17px] leading-[1.14] tracking-[0.12em] text-[#F6F0DD] md:text-[18px]">
                Tomar 1 porción diaria (10 g) disuelta en agua, café, té o tu
                bebida favorita. Sabor neutro y fácil de mezclar.
              </p>

              <div className="mt-8 grid max-w-[760px] gap-5 md:grid-cols-2">
                <InfoBox
                  title="Información:"
                  items={[
                    "Contenido neto: 200 g",
                    "Porciones aprox.: 20",
                    "Porción diaria: 10 g",
                    "Colágeno: bovino I y III",
                  ]}
                />
                <InfoBox
                  title="Perfil nutricional:"
                  items={[
                    "Proteína: 9,2 g",
                    "Energía: 36 kcal",
                    "Grasa total: 0 g",
                    "Sodio: 2 mg",
                  ]}
                />
              </div>

              <div className="mt-7 grid max-w-[760px] gap-6 md:grid-cols-2 md:items-end">
                <div className="justify-self-center">
                  <p className="mb-3 text-center font-['Avenir',Inter,sans-serif] text-[18px] font-black leading-[1.1] tracking-[0.12em]">
                    Cantidad
                  </p>
                  <div className="flex h-[39px] w-[190px] items-center justify-between rounded-full bg-[#EDE3CB] px-8 font-['Avenir',Inter,sans-serif] text-[23px] font-black leading-none tracking-[0.1em] text-[#244A34]">
                    <button
                      type="button"
                      onClick={decreaseQty}
                      className="transition hover:text-[#DF5C20]"
                      aria-label="Reducir cantidad"
                    >
                      -
                    </button>
                    <span>{quantity}</span>
                    <button
                      type="button"
                      onClick={increaseQty}
                      className="transition hover:text-[#DF5C20]"
                      aria-label="Aumentar cantidad"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex h-[59px] w-full max-w-[287px] items-center justify-center justify-self-center rounded-full bg-[#DF5C20] font-['Avenir',Inter,sans-serif] text-[32px] font-black italic leading-none tracking-[0.03em] text-white/95 shadow-[10px_10px_5px_rgba(0,0,0,0.55)] transition hover:bg-[#EB632F]"
                >
                  COMPRAR
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

const ProductThumb = ({ image, label, active, imageClassName = "", onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex h-[150px] w-[150px] items-center justify-center rounded-[32px] border transition md:h-[170px] md:w-[170px] ${
      active
        ? "border-[#978240] bg-white/10 shadow-[24px_24px_34px_rgba(0,0,0,0.38)]"
        : "border-transparent bg-transparent hover:border-[#978240]/70"
    }`}
  >
    <img
      src={image}
      alt={label}
      className={`h-[128px] object-contain md:h-[150px] ${imageClassName}`}
    />
  </button>
);

const InfoBox = ({ title, items }) => (
  <div className="rounded-[40px] border border-[#978240] bg-[#244A34]/20 px-6 py-6 font-['Avenir',Inter,sans-serif]">
    <h3 className="mb-5 text-[22px] font-black leading-[1.1] tracking-[0.1em] text-[#9B823E]">
      {title}
    </h3>
    <ul className="list-disc pl-5 text-[15px] font-black leading-[1.1] tracking-[0.08em] text-[#F6F0DD]">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);

export default ColagenoDetailPage;
