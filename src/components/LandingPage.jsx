import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SiteHeader from "./SiteHeader.jsx";
import productBack from "../assets/product_detail_figma_back_trimmed.png";
import heroProduct from "../assets/editorial/producto-front-hd.png";
import heroPodium from "../assets/editorial/producto-pedestal-only.png";
import ritualImage from "../assets/editorial/ritual-manana-40plus.jpg";
import greenTable from "../assets/editorial/mesa-verde.jpg";
import routineImage from "../assets/editorial/cafe-manana.jpg";

const benefits = [
  "9,2 g de proteína por porción",
  "Sin azúcares añadidos",
  "Sabor neutro",
  "20 porciones",
  "Hecho en Colombia",
];

const recipes = [
  {
    number: "01",
    title: "Café de la mañana",
    copy: "Añade 10 g a tu café y mezcla hasta integrar. Sin cambiar el sabor de tu ritual.",
    image: routineImage,
    position: "center",
  },
  {
    number: "02",
    title: "Smoothie cítrico",
    copy: "Combínalo con mango, naranja, hielo y tu bebida favorita.",
    image: ritualImage,
    position: "68% center",
  },
  {
    number: "03",
    title: "Agua o infusión",
    copy: "Una porción en agua, té o aromática. Simple, práctico y todos los días.",
    image: greenTable,
    position: "16% center",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const goToProduct = () => navigate("/producto/colageno-hidrolizado-40");

  return (
    <main className="landing-page">
      <section className="landing-hero" id="inicio">
        <SiteHeader light />

        <div className="landing-hero__grid">
          <div className="landing-hero__copy">
            <span className="eyebrow">Colágeno hidrolizado · 200 g</span>
            <h1>Tu ritual diario,<br /><em>más simple.</em></h1>
            <p>
              Péptidos de colágeno tipo I y III, de sabor neutro y fáciles de
              integrar en lo que ya disfrutas cada mañana.
            </p>
            <div className="hero-actions">
              <button type="button" className="button button--orange" onClick={goToProduct}>
                Comprar 40+ <span aria-hidden="true">↗</span>
              </button>
              <button
                type="button"
                className="text-link"
                onClick={() => document.querySelector("#formas-de-usarlo")?.scrollIntoView({ behavior: "smooth" })}
              >
                Ver cómo tomarlo <span aria-hidden="true">↓</span>
              </button>
            </div>
            <div className="hero-proof">
              <span className="hero-proof__dot" />
              <span>Fórmula simple · sin gluten · sin azúcar</span>
            </div>
          </div>

          <div className="landing-hero__visual product-campaign">
            <img src={heroPodium} alt="" className="product-campaign__podium" aria-hidden="true" />
            <span className="product-campaign__landing-shadow" aria-hidden="true" />
            <img src={heroProduct} alt="Doypack de Colágeno Hidrolizado 40+" className="product-campaign__pack" />
            <div className="product-campaign__facts" aria-label="Información principal del producto">
              <span><strong>200 g</strong><small>Contenido neto</small></span>
              <span><strong>20</strong><small>Porciones aprox.</small></span>
              <span><strong>Libre</strong><small>de GMO</small></span>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-middle" id="formas-de-usarlo">
        <div className="section-intro reveal" data-reveal>
          <span className="eyebrow">Cómo hacerlo tuyo</span>
          <h2>Una cucharada.<br />Muchas formas de disfrutarla.</h2>
          <p>
            No necesitas cambiar tu rutina. Solo elegir el momento que mejor te funciona.
          </p>
        </div>

        <div className="recipe-grid">
          {recipes.map((recipe, index) => (
            <article className={`recipe-card reveal reveal--delay-${index + 1}`} data-reveal key={recipe.title}>
              <div className="recipe-card__image-wrap">
                <img src={recipe.image} alt="" style={{ objectPosition: recipe.position }} />
                <span className="recipe-card__number">{recipe.number}</span>
              </div>
              <div className="recipe-card__body">
                <h3>{recipe.title}</h3>
                <p>{recipe.copy}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="benefit-marquee benefit-marquee--lower" aria-label="Características del producto">
          <div className="benefit-marquee__track">
            {[...benefits, ...benefits].map((benefit, index) => (
              <span key={`${benefit}-${index}`}>{benefit}<i aria-hidden="true">✦</i></span>
            ))}
          </div>
        </div>

        <div className="why-panel reveal" data-reveal>
          <div className="why-panel__copy">
            <span className="eyebrow eyebrow--light">Lo esencial, bien hecho</span>
            <h2>Solo lo que necesitas para volverlo parte de tu día.</h2>
            <div className="why-list">
              <span><b>01</b> Colágeno bovino tipo I y III</span>
              <span><b>02</b> 9,2 g de proteína por porción</span>
              <span><b>03</b> Sin grasa, azúcar ni maltodextrina</span>
            </div>
            <button type="button" className="button button--cream" onClick={goToProduct}>
              Conocer el producto <span aria-hidden="true">→</span>
            </button>
          </div>
          <div className="why-panel__product">
            <span className="why-panel__orange-shape" />
            <img src={productBack} alt="Información nutricional del Colágeno Hidrolizado 40+" />
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="landing-footer__cta">
          <span className="eyebrow eyebrow--light">Tu bienestar empieza en lo cotidiano</span>
          <h2>Haz espacio para un hábito que sí cabe en tu día.</h2>
          <button type="button" className="button button--orange" onClick={goToProduct}>
            Quiero mi 40+ <span aria-hidden="true">↗</span>
          </button>
        </div>
        <div className="landing-footer__bottom">
          <div className="brand-mark brand-mark--footer"><span>40</span><sup>+</sup></div>
          <p>Colágeno hidrolizado hecho en Colombia.</p>
          <div className="footer-links">
            <a href="https://www.instagram.com/cuarentamas_official/" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://wa.me/573209099105" target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
          <span>© {new Date().getFullYear()} Cuarenta Más</span>
        </div>
      </footer>
    </main>
  );
};

export default LandingPage;
