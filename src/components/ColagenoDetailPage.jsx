import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import SiteHeader from "./SiteHeader.jsx";
import productFront from "../assets/editorial/hero-producto-final.png";
import productBack from "../assets/product_detail_figma_back_trimmed.png";

const product = {
  id: "colageno-40",
  name: "Colágeno Hidrolizado 40+",
  price: 69900,
};

const formatPrice = (value) => new Intl.NumberFormat("es-CO").format(value);

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  description: "Péptidos de colágeno bovino tipo I y III, de sabor neutro y fáciles de integrar a la rutina diaria.",
  brand: { "@type": "Brand", name: "40+" },
  sku: "COLAGENO-40-200G",
  offers: {
    "@type": "Offer",
    priceCurrency: "COP",
    price: "69900",
    availability: "https://schema.org/InStock",
  },
};

const ColagenoDetailPage = () => {
  const { addToCart, openCart } = useCart();
  const [side, setSide] = useState("both");
  const [quantity, setQuantity] = useState(1);
  const activeImage = side === "front" ? productFront : productBack;
  const totalPrice = product.price * quantity;

  const handleAdd = () => {
    addToCart({ ...product, image: productFront }, quantity);
    openCart();
  };

  return (
    <main className="product-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <section className="product-hero">
        <SiteHeader logoVariant="green" />

        <div className="product-hero__grid">
          <div className="product-gallery product-detail-stage">
            <span className="product-detail-stage__orange" />
            <span className="product-detail-stage__powder" />
            {side === "both" ? (
              <div className="product-gallery__duo" aria-label="Frente e información nutricional del producto">
                <img
                  src={productBack}
                  alt="Información nutricional del Colágeno Hidrolizado 40+"
                  className="product-gallery__duo-pack product-gallery__duo-pack--back"
                />
                <img
                  src={productFront}
                  alt="Frente del Colágeno Hidrolizado 40+"
                  className="product-gallery__duo-pack product-gallery__duo-pack--front"
                />
              </div>
            ) : (
              <img
                key={side}
                src={activeImage}
                alt={side === "front" ? "Frente del Colágeno Hidrolizado 40+" : "Información nutricional del Colágeno Hidrolizado 40+"}
                className={`product-gallery__main product-swap product-swap--${side} ${side === "front" ? "product-gallery__main--front" : "product-gallery__main--back"}`}
              />
            )}
            <div className="product-detail-stage__facts" aria-hidden="true">
              <span>Tipo I + III</span>
              <span>10 g / día</span>
              <span>Sin azúcar</span>
            </div>
            <div className="product-gallery__thumbs" aria-label="Vistas del producto">
              <button type="button" aria-pressed={side === "both"} className={side === "both" ? "is-active" : ""} onClick={() => setSide("both")}>
                <span className="product-gallery__thumb-duo" aria-hidden="true">
                  <img src={productBack} alt="" />
                  <img src={productFront} alt="" className="product-gallery__thumb-front" />
                </span>
                <span>Ambos</span>
              </button>
              <button type="button" aria-pressed={side === "front"} className={side === "front" ? "is-active" : ""} onClick={() => setSide("front")}>
                <img src={productFront} alt="Vista frontal" className="product-gallery__thumb-front" />
                <span>Frente</span>
              </button>
              <button type="button" aria-pressed={side === "back"} className={side === "back" ? "is-active" : ""} onClick={() => setSide("back")}>
                <img src={productBack} alt="Vista posterior" />
                <span>Información</span>
              </button>
            </div>
          </div>

          <div className="product-buybox">
            <span className="eyebrow">Péptidos de colágeno · Tipo I y III</span>
            <h1>Colágeno<br />Hidrolizado <em>40+</em></h1>
            <p className="product-buybox__lead">
              Una fórmula sencilla, de sabor neutro, creada para acompañar tu piel,
              huesos y articulaciones sin complicar tu rutina.
            </p>

            <div className="product-facts">
              <span><strong>200 g</strong>Contenido neto</span>
              <span><strong>20</strong>Porciones aprox.</span>
              <span><strong>Libre</strong>de GMO</span>
            </div>

            <div className="product-howto">
              <span>Cómo tomarlo</span>
              <p>
                Mezcla 10 g en agua, café, té, jugo o smoothie.<br />
                <span className="product-howto__frequency">Una vez al día.</span>
              </p>
            </div>

            <div className="product-purchase">
              <div className="product-price">
                <span>Total</span>
                <strong>${formatPrice(totalPrice)} <small>COP</small></strong>
                <span className="product-price__tax">IVA incluido</span>
              </div>
              <div className="quantity-control" aria-label="Seleccionar cantidad">
                <button type="button" onClick={() => setQuantity((current) => Math.max(1, current - 1))} aria-label="Reducir cantidad">−</button>
                <span>{quantity}</span>
                <button type="button" onClick={() => setQuantity((current) => current + 1)} aria-label="Aumentar cantidad">+</button>
              </div>
            </div>

            <button type="button" className="button button--orange product-buy-button" onClick={handleAdd}>
              Agregar y continuar <span aria-hidden="true">↗</span>
            </button>
            <p className="product-buybox__note">
              Compra segura · Envíos a toda Colombia
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ColagenoDetailPage;
