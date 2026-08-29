import { Link, useLocation, useNavigate } from "react-router-dom";
import BrandLogo from "./BrandLogo.jsx";

const SiteHeader = ({ light = false, logoVariant = "cream" }) => {
  const location = useLocation();
  const navigate = useNavigate();

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
      <BrandLogo to="/" variant={logoVariant} />

      <nav className="site-nav" aria-label="Navegación principal">
        <Link to="/">Inicio</Link>
        <Link to="/producto/colageno-hidrolizado-40">Producto</Link>
        <button type="button" onClick={goToRecipes}>Cómo tomarlo</button>
      </nav>

    </header>
  );
};

export default SiteHeader;
