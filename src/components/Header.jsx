// src/components/Header.jsx
import React, { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const isOnLanding = () => {
    const path = window.location.pathname;
    return path === "/producto" || path === "/producto/";
  };

  const scrollToSection = (id) => {
    const doScroll = () => {
      if (id === "top" || id === "inicio") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    };

    if (!isOnLanding()) {
      const hash = id && id !== "top" ? `#${id}` : "";
      window.location.href = `/producto${hash}`;
    } else {
      doScroll();
    }
  };

  const handleMenuClick = (id) => {
    scrollToSection(id);
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (window.innerWidth < 768) {
      setIsMobileMenuOpen((prev) => !prev);
    } else {
      scrollToSection("inicio");
    }
  };

  // Navegación a la ficha de colágeno
  const goToColagenoDetail = () => {
    window.location.href = "/producto/colageno-hidrolizado-40";
  };

  // Navegación a Sobre nosotros
  const goToAboutPage = () => {
    window.location.href = "/sobre-nosotros";
  };

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = searchText.toLowerCase();

    if (q.includes("producto") || q.includes("colágeno") || q.includes("colageno")) {
      goToColagenoDetail();
      return;
    }

    if (q.includes("sobre") || q.includes("nosotros") || q.includes("quiénes")) {
      goToAboutPage();
      return;
    }

    if (q.includes("membresia") || q.includes("membresía")) {
      scrollToSection("membresia");
      return;
    }

    scrollToSection("inicio");
  };

  return (
    <header className="w-full bg-[#124948] text-[#F6F0DD] sticky top-0 z-30">
      <div className="max-w-6xl mx-auto h-16 md:h-20 px-4 lg:px-8 flex items-center justify-between">
        {/* LOGO 40+ */}
        <button
          onClick={handleLogoClick}
          className="flex items-center"
          aria-label="Ir al inicio / abrir menú"
        >
          <span className="text-[22px] md:text-[24px] font-semibold tracking-[0.02em]">
            40+
          </span>
        </button>

        {/* MENÚ DESKTOP */}
        <nav className="hidden md:flex items-center gap-10 text-[14px] lg:text-[15px] font-medium tracking-[0.03em]">
          <button
            onClick={() => scrollToSection("inicio")}
            className="hover:opacity-80 transition-opacity"
          >
            Inicio
          </button>
          <button
            onClick={goToColagenoDetail}
            className="hover:opacity-80 transition-opacity"
          >
            Productos
          </button>
          <button
            onClick={goToAboutPage}
            className="hover:opacity-80 transition-opacity"
          >
            Sobre nosotros
          </button>
          <button
            onClick={() => scrollToSection("membresia")}
            className="hover:opacity-80 transition-opacity"
          >
            Membresía
          </button>
        </nav>

        {/* ICONOS DERECHA: LUPA + USUARIO */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Lupa / búsqueda */}
          <button
            className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-[#F6F0DD]/45 flex items-center justify-center hover:bg-white/10 transition"
            aria-label="Buscar"
            onClick={toggleSearch}
          >
            <svg
              className="w-[18px] h-[18px] md:w-5 md:h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="6" />
              <line x1="16" y1="16" x2="20" y2="20" />
            </svg>
          </button>

          {/* Usuario / cuenta */}
          <button
            className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-[#F6F0DD]/45 flex items-center justify-center hover:bg-white/10 transition"
            aria-label="Cuenta"
          >
            <svg
              className="w-[20px] h-[20px] md:w-6 md:h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="9" r="3.1" />
              <path d="M7.5 18.2C8.6 16.5 10.2 15.5 12 15.5c1.8 0 3.4 1 4.5 2.7" />
            </svg>
          </button>
        </div>
      </div>

      {/* MENÚ DESPLEGABLE EN MÓVIL */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#124948] border-t border-[#F6F0DD]/15">
          <nav className="max-w-6xl mx-auto px-4 py-3 space-y-2 text-base font-medium tracking-[0.02em]">
            <button
              className="block w-full text-left py-2 hover:opacity-80 transition-opacity"
              onClick={() => handleMenuClick("inicio")}
            >
              Inicio
            </button>
            <button
              className="block w-full text-left py-2 hover:opacity-80 transition-opacity"
              onClick={() => {
                setIsMobileMenuOpen(false);
                goToColagenoDetail();
              }}
            >
              Productos
            </button>
            <button
              className="block w-full text-left py-2 hover:opacity-80 transition-opacity"
              onClick={() => {
                setIsMobileMenuOpen(false);
                goToAboutPage();
              }}
            >
              Sobre nosotros
            </button>
            <button
              className="block w-full text-left py-2 hover:opacity-80 transition-opacity"
              onClick={() => handleMenuClick("membresia")}
            >
              Membresía
            </button>
          </nav>
        </div>
      )}

      {/* BARRA DE BÚSQUEDA DESPLEGABLE (debajo de la barra) */}
      {isSearchOpen && (
        <div className="bg-[#0f3a3a] border-t border-[#F6F0DD]/20">
          <form
            onSubmit={handleSearchSubmit}
            className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3"
          >
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Busca: inicio, productos, sobre nosotros, membresía..."
              className="flex-1 rounded-full px-4 py-2 text-sm md:text-base text-[#124948] outline-none bg-[#F6F0DD]"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-full bg-[#FF8A3D] text-sm md:text-base font-semibold"
            >
              Buscar
            </button>
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;