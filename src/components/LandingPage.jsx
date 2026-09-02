import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SiteHeader from "./SiteHeader.jsx";
import BrandLogo from "./BrandLogo.jsx";
import productBack from "../assets/product_detail_figma_back_trimmed.png";
import heroProduct from "../assets/editorial/hero-producto-final.png";
import heroPodium from "../assets/editorial/hero-fondo-naranja.png";
import coffeeRecipeImage from "../assets/editorial/receta-cafe-manana.webp";
import smoothieRecipeImage from "../assets/editorial/receta-smoothie-citrico.webp";
import infusionRecipeImage from "../assets/editorial/receta-agua-infusion.webp";
import ritualCover from "../assets/editorial/ritual-40-cover.jpg";
import { businessInfo } from "../config/businessInfo.js";

const benefits = [
  "100% puro",
  "Sin azúcares añadidos",
  "Sabor neutro",
  "20 porciones",
  "Hecho en Colombia",
];

const recipes = [
  {
    number: "01",
    title: "Café de la mañana",
    copy: "Una forma simple de empezar tu mañana.",
    image: coffeeRecipeImage,
    ingredients: [
      "1 taza de café caliente",
      "1 scoop de 40+",
      "100 mL de leche o bebida vegetal",
      "Canela opcional",
    ],
    preparation: [
      "Prepara el café caliente.",
      "Agrega 1 scoop de 40+.",
      "Incorpora la leche o bebida vegetal.",
      "Mezcla bien y, si quieres, añade canela.",
    ],
  },
  {
    number: "02",
    title: "Smoothie cítrico",
    copy: "Una mezcla vibrante para variar tu rutina.",
    image: smoothieRecipeImage,
    ingredients: [
      "1/2 taza de mango",
      "1/2 taza de jugo de naranja natural",
      "1 scoop de 40+",
      "100 mL de agua",
      "Hielo al gusto",
    ],
    preparation: [
      "Licúa el mango, el jugo de naranja, el agua y el 40+.",
      "Agrega hielo al gusto.",
      "Sirve y disfruta.",
    ],
  },
  {
    number: "03",
    title: "Agua o infusión",
    copy: "Una opción fresca, ligera y muy simple.",
    image: infusionRecipeImage,
    ingredients: [
      "1 scoop de 40+",
      "250 mL de agua fría",
      "Jugo de 1/2 limón",
      "Rodajas de limón",
      "Hielo al gusto",
    ],
    preparation: [
      "Sirve el agua fría en un vaso.",
      "Agrega el 40+ y mezcla bien.",
      "Añade el jugo de limón y el hielo.",
      "Decora con rodajas de limón.",
    ],
  },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeRecipe, setActiveRecipe] = useState(null);
  const [recipePosition, setRecipePosition] = useState(null);
  const recipeCloseRef = useRef(null);
  const recipeDialogRef = useRef(null);
  const recipeTriggerRef = useRef(null);
  const recipeCardRef = useRef(null);

  const closeRecipe = useCallback(() => {
    setActiveRecipe(null);
    setRecipePosition(null);
    window.requestAnimationFrame(() => recipeTriggerRef.current?.focus());
  }, []);

  const openRecipe = (recipe, event) => {
    recipeTriggerRef.current = event.currentTarget;
    recipeCardRef.current = event.currentTarget.closest(".recipe-card");
    setActiveRecipe(recipe);
  };

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

  useEffect(() => {
    if (!activeRecipe) return undefined;

    recipeCloseRef.current?.focus();

    const closeOnEscape = (event) => {
      if (event.key === "Escape") closeRecipe();
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeRecipe, closeRecipe]);

  useLayoutEffect(() => {
    if (!activeRecipe) return undefined;

    const updateRecipePosition = () => {
      const card = recipeCardRef.current;
      if (!card) return;

      const cardRect = card.getBoundingClientRect();
      const viewportPadding = 16;
      const gap = 18;
      const modalWidth = Math.min(420, window.innerWidth - viewportPadding * 2);
      const measuredHeight = recipeDialogRef.current?.getBoundingClientRect().height;
      const modalHeight = measuredHeight || Math.min(window.innerHeight * 0.72, 620);
      const availableLeft = cardRect.left - modalWidth - gap;
      const availableRight = cardRect.right + gap;

      let left;
      let placement;

      if (availableLeft >= viewportPadding) {
        left = availableLeft;
        placement = "left";
      } else if (availableRight + modalWidth <= window.innerWidth - viewportPadding) {
        left = availableRight;
        placement = "right";
      } else {
        left = Math.min(
          Math.max(cardRect.left, viewportPadding),
          window.innerWidth - modalWidth - viewportPadding,
        );
        placement = "overlap";
      }

      const top = Math.min(
        Math.max(cardRect.top + 16, viewportPadding),
        Math.max(viewportPadding, window.innerHeight - modalHeight - viewportPadding),
      );

      setRecipePosition({ left, top, placement });
    };

    updateRecipePosition();
    const frame = window.requestAnimationFrame(updateRecipePosition);
    window.addEventListener("resize", updateRecipePosition);
    window.addEventListener("scroll", updateRecipePosition, true);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateRecipePosition);
      window.removeEventListener("scroll", updateRecipePosition, true);
    };
  }, [activeRecipe]);

  const goToProduct = () => navigate("/producto/colageno-hidrolizado-40");
  const goToExperience = () => navigate("/comparte-tu-experiencia");

  return (
    <main className="landing-page">
      <section className="landing-hero" id="inicio">
        <SiteHeader light />

        <div className="landing-hero__grid">
          <div className="landing-hero__copy">
            <span className="eyebrow">Bienestar diario para tu rutina</span>
            <h1>Volver a ti puede empezar<br /><em>con algo simple.</em></h1>
            <p>
              Colágeno hidrolizado 40+ para acompañar tu bienestar diario con un
              hábito fácil de integrar a tus días.
            </p>
            <div className="hero-actions">
              <button type="button" className="button button--orange" onClick={goToProduct}>
                Empezar mi ritual <span aria-hidden="true">↗</span>
              </button>
              <button
                type="button"
                className="text-link"
                onClick={() => document.querySelector("#formas-de-usarlo")?.scrollIntoView({ behavior: "smooth" })}
              >
                Descubrir cómo tomarlo <span aria-hidden="true">↓</span>
              </button>
            </div>
            <div className="hero-proof">
              <span className="hero-proof__dot" />
              <span>Sabor neutro · fácil de mezclar · una vez al día</span>
            </div>
          </div>

          <div className="landing-hero__visual product-campaign">
            <div className="product-campaign__artwork">
              <img
                src={heroPodium}
                alt=""
                width="1003"
                height="1568"
                className="product-campaign__podium"
                aria-hidden="true"
              />
              <span className="product-campaign__contact-shadow" aria-hidden="true" />
              <span className="product-campaign__impact-ring" aria-hidden="true" />
              <Link
                className="product-campaign__pack"
                to="/producto/colageno-hidrolizado-40"
                aria-label="Ver Colágeno Hidrolizado 40+"
              >
                <img
                  src={heroProduct}
                  alt=""
                  width="632"
                  height="1005"
                  className="product-campaign__pack-image"
                  fetchPriority="high"
                  aria-hidden="true"
                />
                <img
                  src={heroProduct}
                  alt=""
                  width="632"
                  height="1005"
                  className="product-campaign__pack-shine"
                  aria-hidden="true"
                />
              </Link>
              <img
                src={heroPodium}
                alt=""
                width="1003"
                height="1568"
                className="product-campaign__podium-front"
                aria-hidden="true"
              />
            </div>
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
          <span className="eyebrow">Un hábito que sí cabe en tu día</span>
          <h2>Una porción.<br />Muchas formas de disfrutarlo.</h2>
          <p>
            Déjalo visible, mézclalo con algo que ya disfrutas y encuentra el momento que mejor funciona para ti.
          </p>
        </div>

        <div className="recipe-grid">
          {recipes.map((recipe, index) => (
            <article className={`recipe-card reveal reveal--delay-${index + 1}`} data-reveal key={recipe.title}>
              <div className="recipe-card__image-wrap">
                <img
                  src={recipe.image}
                  alt={`Preparación: ${recipe.title}`}
                  loading="lazy"
                  decoding="async"
                />
                <span className="recipe-card__number">{recipe.number}</span>
              </div>
              <div className="recipe-card__body">
                <h3>{recipe.title}</h3>
                <p>{recipe.copy}</p>
                <button
                  type="button"
                  className="recipe-card__cta"
                  onClick={(event) => openRecipe(recipe, event)}
                  aria-label={`Ver receta: ${recipe.title}`}
                >
                  Ver receta <i aria-hidden="true">→</i>
                </button>
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
            <span className="eyebrow eyebrow--light">Cuidarte también es honrar tu vida</span>
            <h2>Dale a tu cuerpo una forma simple de seguir acompañándote.</h2>
            <div className="why-list">
              <span><b>01</b> Colágeno bovino tipo I y III</span>
              <span><b>02</b> 100% puro</span>
              <span><b>03</b> Sin grasa, azúcar ni maltodextrina</span>
            </div>
            <button type="button" className="button button--cream" onClick={goToProduct}>
              Conocer mi 40+ <span aria-hidden="true">→</span>
            </button>
          </div>
          <div className="why-panel__product">
            <span className="why-panel__orange-shape" />
            <img
              src={productBack}
              alt="Información nutricional del Colágeno Hidrolizado 40+"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="landing-footer__cta">
          <button
            type="button"
            className="landing-ritual"
            data-reveal
            onClick={goToExperience}
            aria-label="Conocer el e-book Ritual 40+ y compartir mi experiencia"
          >
            <span className="landing-ritual__badge">E-book de regalo</span>
            <span className="landing-ritual__cover">
              <img
                src={ritualCover}
                alt="Portada del e-book Ritual 40+"
                className="landing-ritual__image"
                loading="lazy"
                decoding="async"
              />
              <img
                src={ritualCover}
                alt=""
                className="landing-ritual__shine landing-ritual__shine--entry"
                aria-hidden="true"
              />
              <img
                src={ritualCover}
                alt=""
                className="landing-ritual__shine landing-ritual__shine--hover"
                aria-hidden="true"
              />
            </span>
            <span className="landing-ritual__note">
              <strong>Un detalle para agradecerte</strong>
              <span>Recíbelo al compartir tu historia</span>
            </span>
          </button>
          <div className="landing-footer__cta-copy">
            <span className="eyebrow eyebrow--light">Tu experiencia también cuenta</span>
            <h2>Comparte tu historia y recibe el e-book Ritual 40+.</h2>
            <p>
              Una guía para volver a ti, con un recetario digital, un mini planner
              y formas simples de disfrutar tu 40+.
            </p>
            <button type="button" className="button button--orange" onClick={goToExperience}>
              Compartir y recibir mi e-book <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
        <div className="landing-footer__bottom">
          <BrandLogo className="brand-mark--footer" />
          <div className="landing-footer__identity">
            <p>Colágeno hidrolizado creado para acompañar tu bienestar, todos los días.</p>
            <span>© 2026 Cuarentamas</span>
          </div>
          <nav className="footer-contact" aria-label="Contacto directo">
            <span className="footer-group-label">Hablemos</span>
            <div>
              <a href={`https://wa.me/${businessInfo.whatsapp}`} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
              <a href={`mailto:${businessInfo.email}`}>Correo</a>
              <a href="https://www.instagram.com/cuarentamas_official/" target="_blank" rel="noreferrer">
                Instagram
              </a>
            </div>
          </nav>
          <nav className="footer-links" aria-label="Información del sitio">
            <span className="footer-group-label">Información</span>
            <div>
              <Link to="/envios-cambios-y-devoluciones">Envíos</Link>
              <Link to="/politica-de-datos">Datos</Link>
              <Link to="/terminos-y-condiciones">Términos</Link>
            </div>
          </nav>
        </div>
      </footer>

      {activeRecipe && (
        <div
          className="recipe-modal"
          role="presentation"
          data-placement={recipePosition?.placement || "left"}
          style={recipePosition ? {
            "--recipe-modal-left": `${recipePosition.left}px`,
            "--recipe-modal-top": `${recipePosition.top}px`,
          } : undefined}
        >
          <section
            ref={recipeDialogRef}
            className="recipe-modal__dialog"
            role="dialog"
            aria-labelledby="recipe-modal-title"
          >
            <button
              type="button"
              ref={recipeCloseRef}
              className="recipe-modal__close"
              onClick={closeRecipe}
              aria-label="Cerrar receta"
            >
              ×
            </button>
            <div className="recipe-modal__heading">
              <span className="eyebrow">Del e-book Ritual 40+</span>
              <h2 id="recipe-modal-title">{activeRecipe.title}</h2>
              <p>{activeRecipe.copy}</p>
            </div>
            <div className="recipe-modal__content">
              <div>
                <h3>Ingredientes</h3>
                <ul>
                  {activeRecipe.ingredients.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Preparación</h3>
                <ol>
                  {activeRecipe.preparation.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
};

export default LandingPage;
