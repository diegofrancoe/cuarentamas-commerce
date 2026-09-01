import { Link, useLocation } from "react-router-dom";
import SiteHeader from "./SiteHeader.jsx";
import { legalPages } from "../content/legalContent.js";
import { businessInfo } from "../config/businessInfo.js";

const LAST_UPDATED = "31 de agosto de 2026";

const LegalPage = () => {
  const location = useLocation();
  const page = legalPages[location.pathname];

  if (!page) return null;

  return (
    <main className="legal-page">
      <SiteHeader />
      <article className="legal-shell">
        <header className="legal-hero">
          <span className="eyebrow">{page.eyebrow}</span>
          <h1>{page.title}</h1>
          <p>{page.intro}</p>
          <small>Última actualización: {LAST_UPDATED}</small>
        </header>

        <div className="legal-body">
          {page.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}

          <aside className="legal-contact">
            <span className="eyebrow">¿Necesitas ayuda?</span>
            <h2>Estamos para escucharte.</h2>
            <div>
              <a href={`mailto:${businessInfo.email}`}>{businessInfo.email}</a>
              <a href={`https://wa.me/${businessInfo.whatsapp}`} target="_blank" rel="noreferrer">
                {businessInfo.phoneDisplay}
              </a>
            </div>
          </aside>

          <nav className="legal-related" aria-label="Información relacionada">
            <Link to="/terminos-y-condiciones">Términos</Link>
            <Link to="/politica-de-datos">Datos personales</Link>
            <Link to="/envios-cambios-y-devoluciones">Envíos y devoluciones</Link>
            <a href="https://www.sic.gov.co/" target="_blank" rel="noreferrer">Protección al consumidor · SIC ↗</a>
          </nav>
        </div>
      </article>
    </main>
  );
};

export default LegalPage;
