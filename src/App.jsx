// src/App.jsx
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductSection from "./components/ProductSection";
import BenefitsSection from "./components/BenefitsSection";
import FaqSection from "./components/FaqSection"; // Preguntas frecuentes 40+
import SitioSection from "./components/SitioSection"; // Sección Sitio 40+
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import FloatingCart from "./components/FloatingCart";
import Cart from "./components/Cart";
import ColagenoDetailPage from "./components/ColagenoDetailPage";
import FlotingSocialBotton from "./components/FlotingSocialBotton";
import TermsPage from "./components/TermsPage";
import PrivacyPage from "./components/PrivacyPage";
import CookieBanner from "./components/CookieBanner";
import ProductsPage from "./components/ProductsPage";
import AboutPage from "./components/AboutPage";
import MembresiaPage from "./components/MembresiaPage";
import { isMembresiaEnabled } from "./config/siteConfig";
import SeoHead from "./components/SeoHead";

import "./App.css";

// HOME / LANDING
function LandingHome() {
  return (
    <>
      <Hero />

      <main className="flex flex-col bg-[#F8F1E3]">
        {/* Producto principal */}
        <ProductSection />

        {/* Beneficios */}
        <BenefitsSection />

        {/* FAQ / Footer según frame de Figma */}
        <FaqSection />

        {/*
          Secciones anteriores del home, temporalmente fuera del flujo Figma:
          <KnowledgeSection />
          <VideoSection />
          <ReviewSection />
          <MembershipBanner />
        */}
      </main>
    </>
  );
}

// Layout principal con rutas
function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isProductDetail =
    location.pathname === "/producto/colageno-hidrolizado-40";
  const usesFigmaFrameLayout = isHome || isProductDetail;

  return (
    <div className="min-h-screen bg-[#F8F1E3] flex flex-col">
      <SeoHead />
      {/* En home y producto, los frames de Figma controlan su propio layout. */}
      {!usesFigmaFrameLayout && <Navbar />}

      {/* Contenido según la ruta */}
      <div className="flex-1">
        <Routes>
          {/* Home / landing */}
          <Route path="/" element={<LandingHome />} />

          {/* Página de productos (listado) */}
          <Route path="/productos" element={<ProductsPage />} />

          {/* Página de detalle del colágeno */}
          <Route
            path="/producto/colageno-hidrolizado-40"
            element={<ColagenoDetailPage />}
          />

          {/* Sobre nosotros */}
          <Route
            path="/sobre-nosotros"
            element={<AboutPage />}
          />

          {/* Membresía 40+ (solo habilitada cuando el flujo esté listo) */}
          {isMembresiaEnabled && (
            <Route
              path="/membresia"
              element={<MembresiaPage />}
            />
          )}

          {/* Páginas legales */}
          <Route
            path="/terminos-y-condiciones"
            element={<TermsPage />}
          />
          <Route
            path="/politica-de-datos"
            element={<PrivacyPage />}
          />
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
          {/* Cuando tengas la ruta real de cookies la puedes agregar aquí */}
          {/* <Route path="/politica-de-cookies" element={<CookiesPage />} /> */}
        </Routes>
      </div>

      {/* Sitio 40+ al final de las demás páginas genéricas. */}
      {!usesFigmaFrameLayout && <SitioSection />}

      {/* Footer global para páginas internas; home/producto usan frames de Figma. */}
      {!usesFigmaFrameLayout && <Footer />}

      {/* Botones flotantes */}
      {!usesFigmaFrameLayout && <FloatingCart />}
      <Cart />
      {!usesFigmaFrameLayout && <FloatingWhatsApp />}
      {!usesFigmaFrameLayout && <FlotingSocialBotton />}

      {/* Banner de cookies en todo el sitio */}
      <CookieBanner />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
