// src/components/CookieBanner.jsx
import { useState } from "react";
import {
  COOKIE_CONSENT_EVENT,
  COOKIE_CONSENT_KEY,
} from "../lib/metaPixel.js";

const saveChoice = (choice) => {
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, choice);
  } catch {
    // La elección sigue aplicándose durante esta visita aunque el navegador bloquee el almacenamiento.
  }
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: choice }));
};

const CookieBanner = () => {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return !localStorage.getItem(COOKIE_CONSENT_KEY);
    } catch {
      return true;
    }
  });
  const handleAccept = () => {
    saveChoice("accepted");
    setVisible(false);
  };

  const handleReject = () => {
    saveChoice("rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-consent">
      <section
        className="cookie-consent__panel"
        role="region"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-description"
      >
        <header className="cookie-consent__header">
          <span className="eyebrow">Privacidad</span>
          <h2 id="cookie-consent-title">Cookies en 40+</h2>
          <p id="cookie-consent-description">
            Usamos cookies necesarias para que el sitio funcione y, con tu permiso,
            cookies de medición para mejorar nuestras campañas.
          </p>
        </header>
        <footer className="cookie-consent__footer">
          <div className="cookie-consent__actions">
            <button type="button" className="cookie-consent__reject" onClick={handleReject}>
              Rechazar
            </button>
            <button type="button" className="cookie-consent__accept" onClick={handleAccept}>
              Aceptar cookies
            </button>
          </div>
        </footer>
      </section>
    </div>
  );
};

export default CookieBanner;
