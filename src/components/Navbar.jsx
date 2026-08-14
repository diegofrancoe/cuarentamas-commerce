// src/components/Navbar.jsx
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { isMembresiaEnabled } from "../config/siteConfig";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Navega al home (si hace falta) y luego hace scroll a la sección
  const goHomeAndScroll = (id) => {
    const doScroll = () => {
      if (id === "inicio" || id === "top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(doScroll, 350);
    } else {
      doScroll();
    }
  };

  const handleSectionClick = (id) => {
    setIsMobileMenuOpen(false);
    goHomeAndScroll(id);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();

    // En móvil/tablet el 40+ abre el menú
    if (window.innerWidth < 768) {
      setIsMobileMenuOpen((prev) => !prev);
      return;
    }

    // En escritorio, 40+ lleva al inicio del home
    handleSectionClick("inicio");
  };

  // 👉 Productos siempre navega a /productos
  const goToProductosPage = () => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setSearchText("");
    navigate("/productos");
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  };

  const handleProductosClick = (e) => {
    e.preventDefault();
    goToProductosPage();
  };

  // 👉 Sobre nosotros: navega a /sobre-nosotros
  const goToSobreNosotrosPage = () => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setSearchText("");
    navigate("/sobre-nosotros");
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  };

  // 👉 Membresía: navega a /membresia
  const goToMembresiaPage = () => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setSearchText("");

    if (isMembresiaEnabled) {
      navigate("/membresia");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 50);
      return;
    }

    goHomeAndScroll("membresia");
  };

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const normalize = (str) =>
      str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    const q = normalize(searchText.trim());
    if (!q) return;

    // Si buscan productos / colágeno, los mandamos a /productos
    if (
      q.includes("producto") ||
      q.includes("productos") ||
      q.includes("colageno") ||
      q.includes("colágeno")
    ) {
      goToProductosPage();
      return;
    }

    // Si buscan sobre nosotros → página /sobre-nosotros
    if (
      q.includes("sobre") ||
      q.includes("nosotros") ||
      q.includes("quienes") ||
      q.includes("somos") ||
      q.includes("info")
    ) {
      goToSobreNosotrosPage();
      return;
    }

    // Si buscan membresía / correo
    if (
      q.includes("membres") ||
      q.includes("correo") ||
      q.includes("email")
    ) {
      goToMembresiaPage();
      return;
    }

    // Si buscan inicio / home → volvemos al home
    if (q.includes("inicio") || q.includes("home")) {
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
      setSearchText("");
      goHomeAndScroll("inicio");
      return;
    }

    alert(
      "No encontramos resultados para esa búsqueda. Prueba con: inicio, productos, sobre nosotros o membresía."
    );
  };

  return (
    <header className="sticky top-0 z-40 bg-[#124948] text-[#F6F0DD]">
      {/* NAV principal */}
      <nav className="max-w-6xl mx-auto h-16 md:h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* LOGO 40+ */}
        <button
          onClick={handleLogoClick}
          className="flex items-center focus:outline-none focus:ring-0 focus-visible:outline-none"
          aria-label="Ir al inicio o abrir menú"
          type="button"
        >
          <span className="font-semibold text-[22px] md:text-[24px] tracking-[0.02em] text-[#F6F0DD]">
            40+
          </span>
        </button>

        {/* LINKS CENTRALES (solo escritorio) */}
        <ul className="hidden md:flex items-center gap-10 text-[14px] lg:text-[15px] font-medium tracking-[0.03em]">
          <li>
            <button
              type="button"
              onClick={() => handleSectionClick("inicio")}
              className="hover:opacity-80 transition-opacity"
            >
              Inicio
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={handleProductosClick}
              className="hover:opacity-80 transition-opacity"
            >
              Productos
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={goToSobreNosotrosPage}
              className="hover:opacity-80 transition-opacity"
            >
              Sobre nosotros
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={goToMembresiaPage}
              className="hover:opacity-80 transition-opacity"
            >
              Membresía
            </button>
          </li>
        </ul>

        {/* ICONOS DERECHA: BUSCAR + MEMBRESÍA */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Buscar */}
          <button
            type="button"
            onClick={toggleSearch}
            className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-[#F6F0DD]/45 flex items-center justify-center hover:bg-[#F6F0DD]/10 transition focus:outline-none focus:ring-0 focus-visible:outline-none"
            aria-label="Buscar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[18px] h-[18px] md:w-5 md:h-5 text-[#F6F0DD]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="11" cy="11" r="6" />
              <path d="m16 16 4 4" />
            </svg>
          </button>

          {/* Botón de membresía / usuario */}
          <button
            type="button"
            onClick={goToMembresiaPage}
            className="relative w-10 h-10 md:w-11 md:h-11 rounded-full border border-[#F6F0DD]/45 flex items-center justify-center hover:bg-[#F6F0DD]/10 transition focus:outline-none focus:ring-0 focus-visible:outline-none"
            aria-label="Ir a membresía"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[20px] h-[20px] md:w-6 md:h-6 text-[#F6F0DD]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="M12 12c1.93 0 3.5-1.57 3.5-3.5S13.93 5 12 5 8.5 6.57 8.5 8.5 10.07 12 12 12z" />
              <path d="M5 19.5C5.81 16.94 8.58 15 12 15s6.19 1.94 7 4.5" />
            </svg>
          </button>
        </div>
      </nav>

      {/* MENÚ DESPLEGABLE MÓVIL (cuando se toca 40+) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#124948] border-t border-[#F6F0DD]/15">
          <ul className="max-w-6xl mx-auto px-6 py-4 space-y-3 text-base font-medium tracking-[0.02em]">
            <li>
              <button
                type="button"
                onClick={() => handleSectionClick("inicio")}
                className="w-full text-left py-1 hover:opacity-80 transition-opacity"
              >
                Inicio
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={handleProductosClick}
                className="w-full text-left py-1 hover:opacity-80 transition-opacity"
              >
                Productos
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={goToSobreNosotrosPage}
                className="w-full text-left py-1 hover:opacity-80 transition-opacity"
              >
                Sobre nosotros
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={goToMembresiaPage}
                className="w-full text-left py-1 hover:opacity-80 transition-opacity"
              >
                Membresía
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Barra de búsqueda desplegable */}
      {isSearchOpen && (
        <div className="bg-[#0f3a3a] border-t border-[#F6F0DD]/20">
          <form
            onSubmit={handleSearchSubmit}
            className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-3"
          >
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Busca: inicio, productos, sobre nosotros, membresía…"
              className="flex-1 rounded-full px-4 py-2 text-sm md:text-base text-[#124948] placeholder:text-[#124948]/60 outline-none border border-transparent focus:border-[#F6F0DD]/70 bg-[#F6F0DD]"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-full bg-[#EB632F] text-white text-sm md:text-base font-semibold hover:bg-[#f07944] transition-colors"
            >
              Buscar
            </button>
          </form>
        </div>
      )}
    </header>
  );
};

export default Navbar;
