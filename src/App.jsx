import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import ColagenoDetailPage from "./components/ColagenoDetailPage.jsx";
import ExperiencePage from "./components/ExperiencePage.jsx";
import Cart from "./components/Cart.jsx";
import CookieBanner from "./components/CookieBanner.jsx";
import SeoHead from "./components/SeoHead.jsx";
import MetaPixel from "./components/MetaPixel.jsx";
import LegalPage from "./components/LegalPage.jsx";
import "./App.css";

const AppContent = () => (
  <div className="app-shell">
    <SeoHead />
    <MetaPixel />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/producto/colageno-hidrolizado-40" element={<ColagenoDetailPage />} />
      <Route path="/comparte-tu-experiencia" element={<ExperiencePage />} />
      <Route path="/terminos-y-condiciones" element={<LegalPage />} />
      <Route path="/politica-de-datos" element={<LegalPage />} />
      <Route path="/envios-cambios-y-devoluciones" element={<LegalPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    <Cart />
    <CookieBanner />
  </div>
);

const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;
