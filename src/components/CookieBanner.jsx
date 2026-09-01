// src/components/CookieBanner.jsx
import { useEffect, useRef, useState } from "react";
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
  const dialogRef = useRef(null);
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return !localStorage.getItem(COOKIE_CONSENT_KEY);
    } catch {
      return true;
    }
  });
  useEffect(() => {
    if (!visible) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const dialog = dialogRef.current;
    const focusable = dialog?.querySelectorAll("button, a[href]") ?? [];
    focusable[0]?.focus();

    const handleKeyDown = (event) => {
      if (event.key !== "Tab" || focusable.length < 2) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [visible]);

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
    <div className="cookie-consent" role="presentation">
      <section
        ref={dialogRef}
        className="cookie-consent__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-description"
      >
        <header className="cookie-consent__header">
          <span className="eyebrow">Tu privacidad importa</span>
          <h2 id="cookie-consent-title">Tú eliges cómo usamos las cookies.</h2>
          <p id="cookie-consent-description">
            Usamos almacenamiento local y tecnologías similares para que el sitio
            funcione y, solo con tu autorización, para medir nuestras campañas.
          </p>
        </header>

        <div className="cookie-consent__details">
          <article>
            <span>01</span>
            <h3>Cookies necesarias</h3>
            <p>
              Recuerdan tu elección y mantienen funciones básicas del sitio. Siempre
              están activas y no se utilizan para publicidad.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Análisis y publicidad</h3>
            <p>
              Solo si aceptas se carga Meta Pixel. Puede registrar visitas y navegación
              para medir campañas. Si rechazas, este recurso no se carga.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Tu elección queda guardada</h3>
            <p>
              Después de aceptar o rechazar, este aviso no volverá a aparecer en este
              navegador, salvo que borres los datos guardados del sitio.
            </p>
          </article>
        </div>

        <footer className="cookie-consent__footer">
          <small>Información vigente desde el 31 de agosto de 2026.</small>
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
