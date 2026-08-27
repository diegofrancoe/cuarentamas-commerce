import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import ColagenoDetailPage from "./components/ColagenoDetailPage.jsx";
import Cart from "./components/Cart.jsx";
import CookieBanner from "./components/CookieBanner.jsx";
import SeoHead from "./components/SeoHead.jsx";
import "./App.css";

const AppContent = () => (
  <div className="app-shell">
    <SeoHead />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/producto/colageno-hidrolizado-40" element={<ColagenoDetailPage />} />
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
