// src/components/MembresiaPage.jsx
import React, { useEffect, useState } from "react";

const MembresiaPage = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    celular: "",
    ciudad: "",
    direccion: "",
    mensaje: "",
  });

  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const coinTicks = Array.from({ length: 36 }, (_, i) => i);
  const coinRidges = Array.from({ length: 72 }, (_, i) => i);

  useEffect(() => {
    const previousTitle = document.title;
    document.title =
      "Membresía 40+ en Colombia | Beneficios y Membresía de Bienestar";

    const upsertMeta = (name, content, isProperty = false) => {
      const selector = isProperty
        ? `meta[property="${name}"]`
        : `meta[name="${name}"]`;
      let tag = document.head.querySelector(selector);
      const existed = !!tag;
      const previousContent = tag?.getAttribute("content");

      if (!tag) {
        tag = document.createElement("meta");
        if (isProperty) {
          tag.setAttribute("property", name);
        } else {
          tag.setAttribute("name", name);
        }
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
      return { tag, existed, previousContent };
    };

    const metaDescription = upsertMeta(
      "description",
      "Conoce la Membresía 40+: beneficios exclusivos, promociones y contenido de bienestar para hombres y mujeres mayores de 40 años en Colombia."
    );
    const ogTitle = upsertMeta(
      "og:title",
      "Membresía 40+ | Membresía de Bienestar",
      true
    );
    const ogDescription = upsertMeta(
      "og:description",
      "Únete a la Membresía 40+ y recibe beneficios, ofertas y contenido experto para fortalecer tu bienestar después de los 40.",
      true
    );

    const existingLd = document.getElementById("membresia-faq-jsonld");
    if (existingLd) existingLd.remove();

    const faqJsonLd = document.createElement("script");
    faqJsonLd.id = "membresia-faq-jsonld";
    faqJsonLd.type = "application/ld+json";
    faqJsonLd.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Qué incluye la Membresía 40+?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Incluye promociones especiales por correo, contenido educativo sobre bienestar 40+ y recomendaciones prácticas para fortalecer hábitos de salud.",
          },
        },
        {
          "@type": "Question",
          name: "¿La Membresía 40+ reemplaza una consulta médica?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. La membresía entrega información y beneficios comerciales; no reemplaza diagnóstico ni tratamiento profesional.",
          },
        },
        {
          "@type": "Question",
          name: "¿Puedo cancelar la membresía cuando quiera?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sí. Puedes darte de baja de las comunicaciones en cualquier momento a través de los canales de contacto de 40+.",
          },
        },
      ],
    });
    document.head.appendChild(faqJsonLd);

    return () => {
      document.title = previousTitle;

      [metaDescription, ogTitle, ogDescription].forEach((metaRef) => {
        if (!metaRef.existed) {
          metaRef.tag.remove();
          return;
        }
        if (typeof metaRef.previousContent === "string") {
          metaRef.tag.setAttribute("content", metaRef.previousContent);
        } else {
          metaRef.tag.removeAttribute("content");
        }
      });

      faqJsonLd.remove();
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const resp = await fetch("/api/membresia-contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        throw new Error(data.error || "No se pudo enviar el formulario.");
      }

      setStatus("success");
      setFormData({
        nombre: "",
        email: "",
        celular: "",
        ciudad: "",
        direccion: "",
        mensaje: "",
      });
    } catch (err) {
      console.error("Error al enviar membresía:", err);
      setStatus("error");
      setErrorMsg(
        err.message ||
          "Ocurrió un error al enviar tu membresía. Inténtalo de nuevo."
      );
    }
  };

  return (
    <main className="bg-[#F6F0DD]">
      <section className="bg-[#124948] text-[#F6F0DD] border-b border-[#0E3A35]">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-14">
          <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-[#F6F0DD]/70 mb-3">
            Membresía 40+
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
            Membresía 40+ para bienestar, constancia y resultados.
          </h1>
          <p className="max-w-3xl text-sm md:text-base text-[#F6F0DD]/90 leading-relaxed">
            Recibe información útil, promociones y contenido especializado para
            apoyar tu bienestar físico y emocional después de los 40, con un
            enfoque claro, responsable y sin ruido.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-12 space-y-10 md:space-y-12">
        <div className="grid gap-6 md:gap-8 md:grid-cols-2 items-stretch">
          <div className="bg-gradient-to-br from-[#124948] to-[#1E6B5A] text-[#F6F0DD] rounded-3xl p-6 md:p-7 shadow-lg flex flex-col justify-between overflow-hidden relative">
            <div className="absolute -top-16 -right-14 w-52 h-52 rounded-full bg-[#F6F0DD]/10 blur-2xl" />
            <div className="absolute -bottom-20 -left-16 w-56 h-56 rounded-full bg-[#EB632F]/20 blur-2xl" />

            <div className="space-y-4 relative z-10">
              <p className="text-xs md:text-sm tracking-[0.22em] uppercase text-[#F6F0DD]/80">
                Membresía anual 40+
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold leading-snug">
                Membresía
              </h2>
              <p className="text-sm md:text-base text-[#F6F0DD]/90 leading-relaxed">
                Accede a beneficios exclusivos, recomendaciones prácticas y
                contenidos diseñados para hombres y mujeres mayores de 40 años
                en Colombia.
              </p>
            </div>

            <div className="relative z-10 mt-6 mb-5">
              <div className="relative mx-auto w-[300px] h-[220px] md:w-[360px] md:h-[250px]">
                <div className="absolute left-[14px] top-[18px] md:left-[22px] md:top-[18px] z-10 rotate-[-8deg]">
                  <img
                    src="/moneda-real-40plus.png"
                    alt="Moneda Membresía Silver 40+"
                    className="w-44 h-44 md:w-52 md:h-52 object-contain drop-shadow-[0_16px_20px_rgba(0,0,0,0.35)]"
                  />
                </div>

                <div className="absolute left-[116px] top-[18px] md:left-[148px] md:top-[18px] z-20 rotate-[8deg]">
                  <div className="relative">
                    <div className="absolute left-1/2 top-[88%] -translate-x-1/2 w-36 h-9 md:w-44 md:h-11 rounded-full bg-black/35 blur-md" />
                    <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-full bg-gradient-to-br from-[#FFEAAE] via-[#DFAE4D] to-[#9D621B] border-[4px] border-[#F3CF82] shadow-[0_18px_24px_rgba(0,0,0,0.35)]">
                      <div className="absolute inset-[-4px] rounded-full bg-[repeating-conic-gradient(from_0deg,#e9bb61_0deg_2deg,#8b5517_2deg_5deg)] opacity-65" />
                      <div className="absolute inset-[3px] rounded-full bg-gradient-to-br from-[#FCE4A3] via-[#D69F42] to-[#8A5316]" />
                      <div className="absolute inset-[10px] rounded-full border border-[#FFEAB8]/90" />
                      <div className="absolute inset-[16px] rounded-full border border-[#A4661E]/60" />
                      <div className="absolute inset-[22px] rounded-full border border-[#F8D98F]/45" />

                      {coinRidges.map((ridge) => (
                        <span
                          key={`ridge-${ridge}`}
                          className="absolute left-1/2 top-1/2 w-[1px] h-[5px] md:h-[6px] rounded-full bg-[#6F4411]/70"
                          style={{
                            transform: `translate(-50%, -50%) rotate(${ridge * 5}deg) translateY(-109px)`,
                          }}
                        />
                      ))}

                      {coinTicks.map((tick) => (
                        <span
                          key={tick}
                          className="absolute left-1/2 top-1/2 w-[2px] h-[7px] md:h-[8px] rounded-full bg-[#9F631C]/80"
                          style={{
                            transform: `translate(-50%, -50%) rotate(${tick * 10}deg) translateY(-99px)`,
                          }}
                        />
                      ))}

                      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_24%_18%,rgba(255,255,255,0.82),transparent_36%),radial-gradient(circle_at_74%_82%,rgba(89,53,14,0.45),transparent_48%)]" />
                      <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_230deg,transparent_0deg,rgba(255,255,255,0.45)_24deg,transparent_58deg,transparent_360deg)]" />
                      <div className="absolute inset-[16px] rounded-full bg-[linear-gradient(170deg,rgba(255,255,255,0.35),transparent_45%,rgba(76,43,10,0.22)_95%)]" />

                      <div className="absolute inset-0 flex flex-col items-center justify-center text-[#124948]">
                        <span className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-bold">
                          Membresía
                        </span>
                        <span className="text-4xl md:text-5xl font-black leading-none mt-1 drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]">
                          40+
                        </span>
                        <span className="text-[10px] md:text-[11px] tracking-[0.12em] uppercase font-semibold mt-2">
                          Membresía anual
                        </span>
                        <span className="text-[#9A5F1D] text-sm mt-1">★ ★ ★</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mx-auto mt-3 w-[300px] md:w-[360px] flex items-start justify-between text-xs tracking-[0.18em] uppercase text-[#F6F0DD]/80">
                <span>Membresía Silver</span>
                <span className="text-right">Membresía Gold (próximamente)</span>
              </div>
            </div>

            <ul className="relative z-10 mt-2 space-y-2 text-sm md:text-base text-[#F6F0DD]/90">
              <li>• Promociones y ofertas especiales por correo.</li>
              <li>• Contenido exclusivo sobre bienestar 40+.</li>
              <li>• Recomendaciones y recordatorios para tu rutina.</li>
            </ul>
          </div>

          <div className="bg-[#FDF5E5] rounded-3xl p-6 md:p-7 shadow-sm border border-[#E8D9C0]">
            <h3 className="text-lg md:text-xl font-semibold text-[#124948] mb-1">
              Completa tus datos para unirte a Membresía 40+
            </h3>
            <p className="text-xs md:text-sm text-[#244D4B] mb-4">
              Esta información se usa para enviarte novedades, ofertas y
              recursos de bienestar 40+. Puedes darte de baja cuando quieras.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-[#124948] mb-1"
                >
                  Nombre completo*
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full rounded-full border border-[#D8C3A2] bg-white px-4 py-2.5 text-sm md:text-base text-[#124948] outline-none focus:border-[#124948] focus:ring-0"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#124948] mb-1"
                >
                  Correo electrónico*
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-full border border-[#D8C3A2] bg-white px-4 py-2.5 text-sm md:text-base text-[#124948] outline-none focus:border-[#124948] focus:ring-0"
                />
              </div>

              <div>
                <label
                  htmlFor="celular"
                  className="block text-sm font-medium text-[#124948] mb-1"
                >
                  Celular*
                </label>
                <input
                  id="celular"
                  name="celular"
                  type="tel"
                  required
                  value={formData.celular}
                  onChange={handleChange}
                  placeholder="3001234567"
                  className="w-full rounded-full border border-[#D8C3A2] bg-white px-4 py-2.5 text-sm md:text-base text-[#124948] outline-none focus:border-[#124948] focus:ring-0"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="ciudad"
                    className="block text-sm font-medium text-[#124948] mb-1"
                  >
                    Ciudad*
                  </label>
                  <input
                    id="ciudad"
                    name="ciudad"
                    type="text"
                    required
                    value={formData.ciudad}
                    onChange={handleChange}
                    className="w-full rounded-full border border-[#D8C3A2] bg-white px-4 py-2.5 text-sm md:text-base text-[#124948] outline-none focus:border-[#124948] focus:ring-0"
                  />
                </div>
                <div>
                  <label
                    htmlFor="direccion"
                    className="block text-sm font-medium text-[#124948] mb-1"
                  >
                    Dirección*
                  </label>
                  <input
                    id="direccion"
                    name="direccion"
                    type="text"
                    required
                    value={formData.direccion}
                    onChange={handleChange}
                    className="w-full rounded-full border border-[#D8C3A2] bg-white px-4 py-2.5 text-sm md:text-base text-[#124948] outline-none focus:border-[#124948] focus:ring-0"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="mensaje"
                  className="block text-sm font-medium text-[#124948] mb-1"
                >
                  ¿Quieres contarnos algo más? (opcional)
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={3}
                  value={formData.mensaje}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#D8C3A2] bg-white px-4 py-2.5 text-sm md:text-base text-[#124948] outline-none focus:border-[#124948] focus:ring-0 resize-none"
                />
              </div>

              {status === "success" && (
                <p className="text-xs md:text-sm text-[#1B6A4A]">
                  ¡Gracias por suscribirte! Te estaremos escribiendo muy pronto.
                </p>
              )}

              {status === "error" && (
                <p className="text-xs md:text-sm text-[#B2432F]">
                  {errorMsg ||
                    "Ocurrió un error al enviar tu información. Inténtalo más tarde."}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-full bg-[#EB632F] text-white font-semibold py-2.5 md:py-3 text-sm md:text-base shadow-md hover:shadow-lg hover:translate-y-[1px] transition disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === "loading"
                  ? "Enviando..."
                  : "Quiero unirme a Membresía 40+"}
              </button>

              <p className="text-[11px] text-[#7A6A4D] mt-1">
                Al enviar tus datos aceptas recibir comunicaciones de 40+ en tu
                correo electrónico. Puedes darte de baja en cualquier momento.
              </p>
            </form>
          </div>
        </div>

        <section
          aria-label="Preguntas rápidas sobre Membresía 40+"
          className="bg-[#FDF5E5] border border-[#E8D9C0] rounded-3xl p-5 md:p-6"
        >
          <h2 className="text-xl md:text-2xl font-bold text-[#124948] mb-4">
            Preguntas rápidas de Membresía 40+
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                q: "¿Qué incluye la membresía?",
                a: "Promociones por correo, contenido especializado y recomendaciones útiles para tu rutina de bienestar.",
              },
              {
                q: "¿Es un servicio médico?",
                a: "No. Es un programa de acompañamiento e información, no reemplaza evaluación ni tratamiento profesional.",
              },
              {
                q: "¿Puedo cancelarla?",
                a: "Sí, en cualquier momento puedes solicitar baja de comunicaciones mediante los canales oficiales de 40+.",
              },
            ].map((item) => (
              <article
                key={item.q}
                className="h-full rounded-2xl border border-[#E2D1B8] bg-[#F6F0DD] px-4 py-4"
              >
                <h3 className="text-sm md:text-base font-semibold text-[#124948] mb-2">
                  {item.q}
                </h3>
                <p className="text-sm md:text-base text-[#244D4B]">{item.a}</p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
};

export default MembresiaPage;
