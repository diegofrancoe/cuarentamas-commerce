import { useEffect, useRef, useState } from "react";

import benefitsBackground from "../assets/benefits/benefits-background.png";
import benefitsProduct from "../assets/benefits/benefits-product.png";
import rutinaBg from "../assets/benefits/card-rutina-bg.png";
import rutinaOverlay from "../assets/benefits/card-rutina-overlay.png";
import skinBg from "../assets/benefits/card-skin-bg.png";
import skinOverlay from "../assets/benefits/card-skin-overlay.png";
import bonesBg from "../assets/benefits/card-bones-bg.png";
import bonesOverlay from "../assets/benefits/card-bones-overlay.png";
import jointsBg from "../assets/benefits/card-joints-bg.png";
import jointsOverlay from "../assets/benefits/card-joints-overlay.png";
import enjoyBg from "../assets/benefits/card-enjoy-bg.png";
import enjoyOverlay from "../assets/benefits/card-enjoy-overlay.png";

const FRAME_WIDTH = 1440;
const FRAME_HEIGHT = 900;
const DESIGN_HEIGHT = 1024;
const HEIGHT_SCALE = FRAME_HEIGHT / DESIGN_HEIGHT;
const AVENIR_FALLBACK = "Avenir, Inter, system-ui, sans-serif";

const benefitTypography = {
  sectionTitle: {
    fontFamily: `"Avenir Heavy", ${AVENIR_FALLBACK}`,
    fontWeight: 900,
  },
  sectionBody: {
    fontFamily: `"Avenir Book", ${AVENIR_FALLBACK}`,
    fontWeight: 400,
  },
  cardTitle: {
    fontFamily: `"Avenir Black", ${AVENIR_FALLBACK}`,
    fontWeight: 900,
  },
  cardBody: {
    fontFamily: `"Avenir Medium", ${AVENIR_FALLBACK}`,
    fontWeight: 500,
  },
};

const routineCard = {
  title: "RUTINA DIARIA",
  description: "Intégralo a tu mañana de forma simple y práctica.",
  color: "#DC5D21",
  bg: rutinaBg,
  overlay: rutinaOverlay,
  style: { left: "1058px", top: "107px", width: "236px", height: "354px" },
  image: { left: "12px", top: "9px", width: "212px", height: "253px" },
  overlayStyle: { left: "-57px", top: "-74px", width: "392px", height: "392px" },
  cardShadow: "56.661px 37.774px 33.052px rgba(0,0,0,0.25)",
  overlayFilter: "drop-shadow(9.444px 1.889px 3.777px rgba(0,0,0,0.25))",
};

const benefitCards = [
  {
    title: "PIEL, CABELLO Y UÑAS",
    description: "Apoya tu cuidado diario desde una fórmula simple.",
    color: "#083F78",
    bg: skinBg,
    overlay: skinOverlay,
    style: { left: "113px", top: "528px", width: "236px", height: "354px" },
    image: { left: "12px", top: "12px", width: "213px", height: "252px" },
    overlayStyle: { left: "-33px", top: "-45px", width: "311px", height: "308px" },
    cardShadow: "58.462px 38.974px 34.103px rgba(0,0,0,0.25)",
    overlayFilter: "drop-shadow(9.744px 1.949px 3.897px rgba(0,0,0,0.25))",
  },
  {
    title: "HUESOS Y SOPORTE",
    description: "Un apoyo diario para tu estructura y bienestar.",
    color: "#9B823E",
    bg: bonesBg,
    overlay: bonesOverlay,
    style: { left: "434px", top: "533px", width: "235px", height: "352px" },
    image: { left: "12px", top: "12px", width: "210px", height: "245px" },
    overlayStyle: { left: "-62px", top: "-36px", width: "376px", height: "376px" },
    cardShadow: "58.576px 39.05px 34.169px rgba(0,0,0,0.25)",
    overlayFilter: "drop-shadow(9.763px 1.953px 3.905px rgba(0,0,0,0.25))",
  },
  {
    title: "ARTICULACIONES",
    description: "Para moverte y mejor en tu día a día.",
    color: "#4AA4AA",
    bg: jointsBg,
    overlay: jointsOverlay,
    style: { left: "754px", top: "533px", width: "237px", height: "356px" },
    image: { left: "13px", top: "12px", width: "210px", height: "252px" },
    overlayStyle: { left: "-33px", top: "12px", width: "261px", height: "252px" },
    cardShadow: "58.7px 39.133px 34.241px rgba(0,0,0,0.25)",
    overlayFilter: "drop-shadow(10px 0 5.87px rgba(0,0,0,0.25))",
  },
  {
    title: "FÁCIL DE DISFRUTAR",
    description: "Disfrútalo en preparaciones simples, frescas y deliciosas",
    color: "#296442",
    bg: enjoyBg,
    overlay: enjoyOverlay,
    style: { left: "1058px", top: "536px", width: "236px", height: "354px" },
    image: { left: "12px", top: "12px", width: "210px", height: "251px" },
    overlayStyle: { left: "13px", top: "-35px", width: "298px", height: "298px" },
    cardShadow: "58.435px 38.957px 34.087px rgba(0,0,0,0.25)",
    overlayFilter: "drop-shadow(14.609px 0 7.078px rgba(0,0,0,0.35))",
  },
];

const BenefitsCard = ({ card, mobile = false }) => {
  const cardStyle = mobile
    ? { boxShadow: card.cardShadow }
    : { ...card.style, boxShadow: card.cardShadow };

  return (
  <article
    className={
      mobile
        ? "relative h-[354px] w-[236px] overflow-visible bg-white"
        : "absolute bg-white"
    }
    style={cardStyle}
  >
    <div className="absolute inset-x-0 top-0 h-[264px] overflow-hidden">
      <img
        src={card.bg}
        alt=""
        aria-hidden="true"
        className="absolute max-w-none object-cover"
        style={
          mobile
            ? card.image
            : card.image
        }
      />
    </div>
    <img
      src={card.overlay}
      alt=""
      aria-hidden="true"
      className="pointer-events-none absolute z-10 max-w-none object-cover"
      style={{ ...card.overlayStyle, filter: card.overlayFilter }}
    />
    <div className={mobile ? "absolute left-[13px] top-[274px] w-[212px]" : "absolute left-[13px] top-[274px] w-[212px]"}>
      <h3
        className="text-[16px] uppercase leading-[1.15] tracking-[0.32px]"
        style={{ ...benefitTypography.cardTitle, color: card.color }}
      >
        {card.title}
      </h3>
      <p
        className="mt-3 text-[14px] leading-[1.1] tracking-[0.14px] text-[#151616]"
        style={benefitTypography.cardBody}
      >
        {card.description}
      </p>
    </div>
  </article>
  );
};

const BenefitsSection = () => {
  const shellRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const availableWidth = shellRef.current?.clientWidth || FRAME_WIDTH;
      setScale(Math.min(1, availableWidth / FRAME_WIDTH));
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    if (shellRef.current) observer.observe(shellRef.current);
    window.addEventListener("resize", updateScale);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateScale);
    };
  }, []);

  return (
    <section id="beneficios" className="bg-[#F8F1E3]">
      <div
        ref={shellRef}
        className="relative hidden w-full overflow-hidden lg:block"
        style={{ height: `${FRAME_HEIGHT * scale}px` }}
        aria-label="Beneficios del Colágeno Hidrolizado 40+"
      >
        <div
          className="absolute left-1/2 top-0 overflow-hidden bg-[#F8F1E3]"
          style={{
            width: `${FRAME_WIDTH}px`,
            height: `${DESIGN_HEIGHT}px`,
            transform: `translateX(-50%) scaleX(${scale}) scaleY(${scale * HEIGHT_SCALE})`,
            transformOrigin: "top center",
          }}
        >
          <img
            src={benefitsBackground}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute max-w-none object-cover"
            style={{ left: "-393px", top: "-94px", width: "2116px", height: "1211px" }}
          />

          <img
            src={benefitsProduct}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute max-w-none select-none"
            style={{
              left: "-402px",
              top: "-411px",
              width: "1029px",
              height: "769px",
              transform: "rotate(78.8deg)",
              transformOrigin: "center center",
              filter: "drop-shadow(41px 20px 71px rgba(0,0,0,0.52))",
            }}
          />

          <div className="absolute left-[210px] top-[229px] w-[865px] text-center">
            <h2
              className="whitespace-nowrap text-[43px] leading-[1.15] tracking-[7.74px] text-[#244A34] opacity-95"
              style={benefitTypography.sectionTitle}
            >
              ¿Cómo te acompaña <span className="text-[#DC5D21]">40+</span>?
            </h2>
          </div>

          <div className="absolute left-[111px] top-[323px] w-[898px] text-center">
            <p
              className="text-[40px] leading-[1.5] tracking-[2.4px] text-[#244A34]/90"
              style={benefitTypography.sectionBody}
            >
              Una <span className="text-[#DF5C20]/90">fórmula</span> simple para acompañar tu{" "}
              <span className="text-[#DE5E20]">piel</span>, articulaciones,{" "}
              <span className="text-[#DE5E20]">huesos</span> y bienestar diario.
            </p>
          </div>

          <BenefitsCard card={routineCard} />

          {benefitCards.map((card) => (
            <BenefitsCard key={card.title} card={card} />
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden bg-[#E8E1D5] px-5 pb-10 pt-40 md:px-8 md:pt-48 lg:hidden">
        <img
          src={benefitsBackground}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-90"
        />
        <img
          src={benefitsProduct}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 -top-44 w-[360px] rotate-[78.8deg] select-none drop-shadow-2xl md:w-[480px]"
        />
        <div className="absolute inset-0 bg-[#F6F0DD]/20" />

        <div className="relative z-10 mx-auto max-w-[760px] text-center">
          <h2
            className="text-[28px] leading-[1.2] tracking-[2px] text-[#244A34] md:text-[38px]"
            style={benefitTypography.sectionTitle}
          >
            ¿Cómo te acompaña <span className="text-[#DC5D21]">40+</span>?
          </h2>
          <p
            className="mt-6 text-[24px] leading-[1.35] tracking-[1px] text-[#244A34]/90 md:text-[32px]"
            style={benefitTypography.sectionBody}
          >
            Una <span className="text-[#DF5C20]">fórmula</span> simple para acompañar tu{" "}
            <span className="text-[#DE5E20]">piel</span>, articulaciones,{" "}
            <span className="text-[#DE5E20]">huesos</span> y bienestar diario.
          </p>
        </div>

        <div className="relative z-10 mt-10 grid justify-center gap-5 [grid-template-columns:repeat(auto-fit,236px)]">
          <BenefitsCard mobile card={routineCard} />
          {benefitCards.map((card) => (
            <BenefitsCard key={card.title} card={card} mobile />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
