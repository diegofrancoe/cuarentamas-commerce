import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "./SiteHeader.jsx";
import ritualCover from "../assets/editorial/ritual-40-cover.jpg";
import TurnstileWidget from "./TurnstileWidget.jsx";

const createInitialForm = () => ({
  nombre: "",
  email: "",
  celular: "",
  ciudad: "",
  experiencia: "",
  consentimiento: false,
  autorizacionTestimonio: false,
  sitioWeb: "",
  iniciadoEn: Date.now(),
});

const ExperiencePage = () => {
  const [form, setForm] = useState(createInitialForm);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const updateField = (event) => {
    const { name, value, checked, type } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTurnstileToken = useCallback((token) => {
    setTurnstileToken(token);
    if (token) {
      setMessage("");
      setStatus((current) => (current === "error" ? "idle" : current));
    }
  }, []);

  const handleTurnstileError = useCallback((errorMessage) => {
    setTurnstileToken("");
    setMessage(errorMessage);
    setStatus("error");
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/experiencia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, turnstileToken }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || "No pudimos enviar tu experiencia.");
      }

      setStatus("success");
      setMessage(
        "Recibimos tu experiencia. Revisa tu correo: allí recibirás el e-book Ritual 40+.",
      );
      setForm(createInitialForm());
      setTurnstileToken("");
      setTurnstileResetKey((current) => current + 1);
    } catch (error) {
      setStatus("error");
      setMessage(
        error.message ||
          "No pudimos enviar tu experiencia en este momento. Inténtalo de nuevo o escríbenos a contacto@cuarentamas.com.",
      );
      setTurnstileToken("");
      setTurnstileResetKey((current) => current + 1);
    }
  };

  return (
    <main className="experience-page">
      <SiteHeader />

      <section className="experience-shell">
        <div className="experience-intro">
          <span className="eyebrow eyebrow--light">Tu experiencia también cuenta</span>
          <h1>Cuéntanos tu historia con 40+.</h1>
          <p>
            Queremos conocer cómo has integrado 40+ a tu rutina y qué ha significado
            este hábito para ti.
          </p>
          <div className="experience-gift">
            <div className="experience-gift__cover">
              <img src={ritualCover} alt="Portada del e-book Ritual 40+" />
            </div>
            <div className="experience-gift__copy">
              <span>E-book de regalo</span>
              <h2>Ritual 40+: una guía para volver a ti.</h2>
              <p>
                Comparte tu experiencia y recíbelo en tu correo. Incluye un
                recetario digital, un mini planner y cinco formas simples de tomar 40+.
              </p>
            </div>
          </div>
        </div>

        <div className="experience-form-wrap">
          <span className="eyebrow">Queremos leerte</span>
          <h2>Comparte tu experiencia</h2>
          <p className="experience-form-wrap__intro">
            Déjanos tus datos y cuéntanos cómo 40+ acompaña tus días.
          </p>

          {status === "success" ? (
            <div className="experience-success" role="status">
              <span aria-hidden="true">✓</span>
              <h3>Gracias por compartir tu historia.</h3>
              <p>{message}</p>
              <button
                type="button"
                className="button button--orange"
                onClick={() => {
                  setStatus("idle");
                  setMessage("");
                  setTurnstileResetKey((current) => current + 1);
                }}
              >
                Enviar otra experiencia
              </button>
            </div>
          ) : (
            <form className="experience-form" onSubmit={handleSubmit}>
              <label className="form-honeypot" aria-hidden="true">
                <span>Sitio web</span>
                <input
                  type="text"
                  name="sitioWeb"
                  value={form.sitioWeb}
                  onChange={updateField}
                  tabIndex="-1"
                  autoComplete="off"
                />
              </label>
              <div className="experience-fields-two">
                <label className="experience-field">
                  <span>Nombre completo *</span>
                  <input
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={updateField}
                    autoComplete="name"
                    maxLength="120"
                    required
                  />
                </label>
                <label className="experience-field">
                  <span>Correo electrónico *</span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={updateField}
                    autoComplete="email"
                    maxLength="254"
                    required
                  />
                </label>
              </div>

              <div className="experience-fields-two">
                <label className="experience-field">
                  <span>Celular</span>
                  <input
                    type="tel"
                    name="celular"
                    value={form.celular}
                    onChange={updateField}
                    autoComplete="tel"
                    maxLength="30"
                  />
                </label>
                <label className="experience-field">
                  <span>Ciudad</span>
                  <input
                    type="text"
                    name="ciudad"
                    value={form.ciudad}
                    onChange={updateField}
                    autoComplete="address-level2"
                    maxLength="100"
                  />
                </label>
              </div>

              <label className="experience-field">
                <span>¿Cómo ha sido tu experiencia con 40+? *</span>
                <textarea
                  name="experiencia"
                  value={form.experiencia}
                  onChange={updateField}
                  placeholder="Cuéntanos cómo lo integraste a tu rutina, qué te ha gustado y qué ha significado para ti."
                  minLength="20"
                  maxLength="2000"
                  required
                />
              </label>

              <label className="experience-consent">
                <input
                  type="checkbox"
                  name="consentimiento"
                  checked={form.consentimiento}
                  onChange={updateField}
                  required
                />
                <span>
                  He leído la <Link to="/politica-de-datos">política de tratamiento de datos</Link> y
                  autorizo a 40+ a responderme y enviarme el e-book Ritual 40+.
                </span>
              </label>

              <label className="experience-consent experience-consent--optional">
                <input
                  type="checkbox"
                  name="autorizacionTestimonio"
                  checked={form.autorizacionTestimonio}
                  onChange={updateField}
                />
                <span>
                  Autorizo de manera opcional la publicación de mi experiencia en
                  canales de 40+. Entiendo que podrán contactarme antes de publicarla.
                </span>
              </label>

              <TurnstileWidget
                onTokenChange={handleTurnstileToken}
                onError={handleTurnstileError}
                resetKey={turnstileResetKey}
              />

              <button
                type="submit"
                className="button button--orange experience-submit"
                disabled={status === "loading" || !turnstileToken}
              >
                {status === "loading" ? "Enviando..." : "Enviar mi experiencia"}
                {status !== "loading" && <span aria-hidden="true">↗</span>}
              </button>

              {status === "error" && (
                <p className="experience-status experience-status--error" role="alert">
                  {message} Si el problema continúa, escríbenos a{" "}
                  <a href="mailto:contacto@cuarentamas.com">contacto@cuarentamas.com</a>.
                </p>
              )}
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default ExperiencePage;
