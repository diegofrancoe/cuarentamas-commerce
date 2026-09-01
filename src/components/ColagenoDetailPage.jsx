import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { businessInfo } from "../config/businessInfo.js";
import SiteHeader from "./SiteHeader.jsx";
import productFront from "../assets/editorial/hero-producto-final.png";
import productBack from "../assets/product_detail_figma_back_trimmed.png";

const product = {
  id: "colageno-40",
  name: "Colágeno Hidrolizado 40+",
  price: 69900,
};

const formatPrice = (value) => new Intl.NumberFormat("es-CO").format(value);

const ColagenoDetailPage = () => {
  const { addToCart, openCart } = useCart();
  const [side, setSide] = useState("both");
  const [quantity, setQuantity] = useState(1);
  const activeImage = side === "front" ? productFront : productBack;
  const totalPrice = product.price * quantity;
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description:
      "Péptidos de colágeno bovino hidrolizado tipo I y III, de sabor neutro, en presentación de 200 g.",
    image: new URL(productFront, window.location.origin).href,
    brand: { "@type": "Brand", name: businessInfo.brand },
    manufacturer: { "@type": "Organization", name: businessInfo.manufacturer },
    sku: "COLAGENO-40-200G",
    offers: {
      "@type": "Offer",
      url: window.location.href,
      priceCurrency: "COP",
      price: "69900",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: businessInfo.legalName },
    },
  };

  const handleAdd = () => {
    addToCart({ ...product, image: productFront }, quantity);
    openCart();
  };

  return (
    <main className="product-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <section className="product-hero">
        <SiteHeader />

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
              Creado para quienes saben que cuidarse es seguir honrando la vida.
              Una fórmula de sabor neutro, pensada para acompañar tu bienestar diario
              con un hábito sencillo que cabe en tu rutina.
            </p>

            <div className="product-facts">
              <span><strong>200 g</strong>Contenido neto</span>
              <span><strong>20</strong>Porciones aprox.</span>
              <span><strong>Libre</strong>de GMO</span>
            </div>

            <div className="product-howto">
              <span>Tu ritual diario</span>
              <p>
                Mezcla 10 g en agua, café, té, jugo o smoothie. Elige el momento que mejor funciona para ti<br />
                <span className="product-howto__frequency">y disfrútalo una vez al día.</span>
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
              Agregar a mi rutina <span aria-hidden="true">↗</span>
            </button>
            <p className="product-buybox__note">
              IVA incluido · Envíos a toda Colombia
            </p>
          </div>
        </div>
      </section>

      <section className="product-information" aria-labelledby="product-information-title">
        <div className="product-information__heading">
          <div>
            <span className="eyebrow">Información del producto</span>
            <h2 id="product-information-title">Lo que contiene tu 40+.</h2>
          </div>
          <p>
            Información tomada de la etiqueta del empaque. Revisa siempre el producto recibido
            antes de consumirlo y conserva el envase para consultar sus indicaciones.
          </p>
        </div>

        <div className="product-information__grid">
          <article className="product-information__card product-information__card--nutrition">
            <span className="product-information__number">01</span>
            <h3>Información nutricional</h3>
            <p className="product-information__portion">
              Tamaño de porción: 2 cucharaditas (10 g) · 20 porciones aprox.
            </p>
            <div className="nutrition-table-wrap">
              <table className="nutrition-table">
                <thead>
                  <tr><th>Nutriente</th><th>Por porción</th></tr>
                </thead>
                <tbody>
                  <tr><td>Calorías</td><td>36 kcal</td></tr>
                  <tr><td>Grasa total</td><td>0 g</td></tr>
                  <tr><td>Carbohidratos totales</td><td>0 g</td></tr>
                  <tr><td>Azúcares totales y añadidos</td><td>0 g</td></tr>
                  <tr><td>Proteína</td><td>9,2 g</td></tr>
                  <tr><td>Sodio</td><td>2 mg</td></tr>
                </tbody>
              </table>
            </div>
          </article>

          <article className="product-information__card">
            <span className="product-information__number">02</span>
            <h3>Ingredientes y uso</h3>
            <dl className="product-information__list">
              <div><dt>Ingredientes</dt><dd>Péptidos de colágeno y colágeno hidrolizado.</dd></div>
              <div>
                <dt>Cómo tomarlo</dt>
                <dd>
                  Disuelve 10 g —aproximadamente 2 cucharaditas— en 100 mL de agua.
                  Tómalo una vez al día, preferiblemente en la mañana.
                </dd>
              </div>
              <div><dt>Sabor</dt><dd>Neutro.</dd></div>
            </dl>
          </article>

          <article className="product-information__card product-information__card--warning">
            <span className="product-information__number">03</span>
            <h3>Advertencias y conservación</h3>
            <ul>
              <li>No excedas la dosis recomendada.</li>
              <li>No consumir durante el embarazo o la lactancia.</li>
              <li>Mantener fuera del alcance de los niños.</li>
              <li>Conservar en un lugar fresco y seco, protegido de la luz y el calor.</li>
              <li>Este producto no reemplaza una alimentación balanceada ni un estilo de vida saludable.</li>
            </ul>
          </article>
        </div>

        <div className="product-traceability">
          <div><span>Fabricado en Colombia por</span><strong>{businessInfo.manufacturer}</strong></div>
          <div><span>Notificación sanitaria</span><strong>{businessInfo.sanitaryNotification}</strong></div>
          <div><span>Atención al cliente</span><a href={`mailto:${businessInfo.email}`}>{businessInfo.email}</a></div>
          <Link to="/envios-cambios-y-devoluciones">Ver envíos, cambios y devoluciones →</Link>
        </div>
      </section>
    </main>
  );
};

export default ColagenoDetailPage;
