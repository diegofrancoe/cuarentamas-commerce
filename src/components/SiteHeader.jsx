import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const SiteHeader = ({ light = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount, openCart } = useCart();

  const goToRecipes = () => {
    if (location.pathname !== "/") {
      navigate("/");
      window.setTimeout(() => document.querySelector("#formas-de-usarlo")?.scrollIntoView({ behavior: "smooth" }), 80);
      return;
    }
    document.querySelector("#formas-de-usarlo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`site-header ${light ? "site-header--light" : ""}`}>
      <Link to="/" className="brand-mark" aria-label="Cuarenta Más, ir al inicio">
        <span>40</span><sup>+</sup>
      </Link>

      <nav className="site-nav" aria-label="Navegación principal">
        <Link to="/">Inicio</Link>
        <Link to="/producto/colageno-hidrolizado-40">Producto</Link>
        <button type="button" onClick={goToRecipes}>Cómo tomarlo</button>
      </nav>

      <button type="button" className="cart-pill" onClick={openCart} aria-label={`Abrir carrito, ${cartCount} productos`}>
        <span>Carrito</span>
        <span className="cart-pill__count">{cartCount}</span>
      </button>
    </header>
  );
};

export default SiteHeader;
