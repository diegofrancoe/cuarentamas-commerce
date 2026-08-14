// src/components/Hero.jsx
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import heroBackground from "../assets/figma_hero_background.png";
import heroProduct from "../assets/figma_hero_product.png";
import heroLogo from "../assets/figma_hero_logo.png";

const Hero = () => {
  const navigate = useNavigate();
  const { openCart } = useCart();

  const handleGoToProductPage = () => {
    navigate("/producto/colageno-hidrolizado-40");
  };

  const handleGoToStart = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="inicio" className="hero-section bg-[#F8F1E3]">
      <div
        className="
          hero-stage relative mx-auto hidden aspect-[1440/900] w-full max-w-[1440px]
          overflow-hidden bg-[#124948]
          shadow-[0_24px_65px_rgba(18,73,72,0.22)]
          md:block
        "
      >
        {/* BACKGROUND: Figma x:-74 y:0 w:1514 h:1133 in a 1440x1024 frame */}
        <img
          src={heroBackground}
          alt=""
          aria-hidden="true"
          className="
            hero-background pointer-events-none absolute z-0 max-w-none object-cover opacity-[0.97]
            left-[-5.139%] top-0 h-[110.645%] w-[105.139%]
          "
        />

        {/* HERO PRODUCT: independent layer, fitted to the 1440x900 viewport */}
        <button
          type="button"
          onClick={handleGoToProductPage}
          className="
            hero-product-wrap absolute z-10 cursor-pointer
            left-[5.8%] top-[4.4%] w-[77%]
            md:left-[0.8%] md:top-[4%] md:w-[81%]
            lg:left-[5.8%] lg:top-[4.4%] lg:w-[77%]
          "
          style={{ transformOrigin: "center center" }}
          aria-label="Ver página del producto Colágeno Hidrolizado 40+"
        >
          <img
            src={heroProduct}
            alt="Doypack de Colágeno Hidrolizado 40+"
            className="
              hero-product block h-auto w-full max-w-none select-none rotate-[-3deg]
              drop-shadow-[60px_40px_50px_rgba(0,0,0,0.4)]
            "
            style={{ transformOrigin: "center center" }}
          />
        </button>

        {/* NAVBAR: exact Figma text positions */}
        <nav className="absolute inset-0 z-30 text-[#F6F0DD]">
          <button
            type="button"
            onClick={handleGoToStart}
            className="
              absolute left-[42.5%] top-[6.934%]
              font-['Avenir',Inter,sans-serif] text-[clamp(10px,1.389vw,20px)]
              font-extrabold leading-none tracking-[0.15em] transition-opacity hover:opacity-80
            "
          >
            INICIO
          </button>
          <button
            type="button"
            onClick={handleGoToProductPage}
            className="
              absolute left-[53.611%] top-[6.934%]
              font-['Avenir',Inter,sans-serif] text-[clamp(10px,1.389vw,20px)]
              font-extrabold leading-none tracking-[0.15em] transition-opacity hover:opacity-80
            "
          >
            PRODUCTO
          </button>
          <button
            type="button"
            onClick={openCart}
            className="
              absolute left-[68.958%] top-[7.113%]
              font-['Avenir',Inter,sans-serif] text-[clamp(10px,1.389vw,20px)]
              font-extrabold leading-none tracking-[0.15em] transition-opacity hover:opacity-80
            "
          >
            TIENDA
          </button>
        </nav>

        {/* Logo: Figma x:1264 y:67 size:73 */}
        <img
          src={heroLogo}
          alt="40+"
          className="
            absolute left-[87.778%] top-[6.543%] z-30 aspect-square w-[5.069%]
            rounded-full object-cover shadow-[10px_10px_10px_rgba(0,0,0,0.25)]
          "
        />

        {/* HERO CONTENT: exact Figma coordinates */}
        <div className="hero-content absolute inset-0 z-30 text-[#F6F0DD]">
          <h1
            className="
              absolute left-[53.333%] top-[20.02%] w-[39.722%]
              font-['Avenir',Inter,sans-serif] text-[clamp(42px,5.972vw,86px)]
              font-black leading-[1.17] tracking-[0.11em] text-[#D9D2B8]
            "
          >
            COLÁGENO
          </h1>

          <p
            className="
              absolute left-[44.033%] top-[29.395%] w-[48.2%]
              text-right font-['Avenir',Inter,sans-serif] text-[clamp(22px,3.125vw,45px)]
              font-black leading-[1.06] tracking-[0.07em] text-[#D9D2B8]
            "
          >
            <span className="text-[#978240]">HIDROLIZADO</span>{" "}
            <span>PURO</span>
          </p>

          <p
            className="
              absolute left-[61.667%] top-[40.18%] w-[30.938%]
              font-['Avenir',Inter,sans-serif] text-[clamp(13px,1.806vw,26px)]
              leading-[1.1] tracking-[0.12em] text-[#D9D2B8] text-right
            "
          >
            Colágeno Hidrolizado <span className="text-[#DF5C20]">40+</span>{" "}
            en polvo, neutro y fácil de mezclar para apoyar tu piel, huesos y
            articulaciones
          </p>

          <button
            type="button"
            onClick={handleGoToProductPage}
            className="
              absolute left-[74.448%] top-[57.324%] flex h-[5.974%] w-[15.075%]
              items-center gap-[0.7vw] rounded-[5px] p-[1.042%]
              font-['Avenir',Inter,sans-serif] text-[clamp(12px,1.597vw,23px)]
              font-black italic leading-none tracking-[0.04em] text-[#D1C4A7]/85
              transition-opacity hover:opacity-80
            "
          >
            <span className="whitespace-nowrap">VER BENEFICIOS</span>
            <span aria-hidden="true" className="text-[1.1em] leading-none">
              →
            </span>
          </button>

          <button
            type="button"
            onClick={handleGoToProductPage}
            className="
              hero-cta absolute left-[74.722%] top-[66.699%] flex h-[6.765%] w-[18.31%]
              items-center justify-center rounded-[79px] bg-[#DF5C20]
              font-['Avenir',Inter,sans-serif] text-[clamp(13px,1.68vw,24.19px)]
              font-black italic leading-none tracking-[-0.02em] text-white/95
              shadow-[12.095px_12.095px_6.048px_rgba(0,0,0,0.6)]
              transition hover:bg-[#EB632F]
            "
          >
            COMPRAR AHORA
          </button>

          <p
            className="
              absolute left-[54.653%] top-[88.9%] w-[40.932%]
              whitespace-nowrap text-center font-['Avenir',Inter,sans-serif] text-[clamp(10px,1.12vw,16px)]
              font-black italic leading-[1.3] text-[#9B823E]
            "
          >
            · Simple de preparar · Fácil de tomar · Pensado para todos los días
          </p>
        </div>
      </div>

      <div className="hero-stage relative min-h-[100svh] overflow-hidden bg-[#124948] md:hidden">
        <img
          src={heroBackground}
          alt=""
          aria-hidden="true"
          className="
            hero-background pointer-events-none absolute z-0 h-full w-[245%] max-w-none
            object-cover opacity-[0.97] left-[-72%] top-0
          "
        />

        <button
          type="button"
          onClick={handleGoToProductPage}
          className="hero-product-wrap absolute left-[15%] top-[13%] z-10 w-[68%] cursor-pointer"
          style={{ transformOrigin: "center center" }}
          aria-label="Ver página del producto Colágeno Hidrolizado 40+"
        >
          <img
            src={heroProduct}
            alt="Doypack de Colágeno Hidrolizado 40+"
            className="hero-product block w-full select-none drop-shadow-[34px_26px_34px_rgba(0,0,0,0.42)]"
            style={{ transformOrigin: "center center" }}
          />
        </button>

        <div className="absolute inset-0 z-20 bg-gradient-to-b from-transparent via-transparent to-[#124948]/82" />

        <nav className="absolute inset-x-0 top-7 z-30 h-5 text-[#F6F0DD]">
          <button
            type="button"
            onClick={handleGoToStart}
            className="absolute left-5 top-0 font-['Avenir',Inter,sans-serif] text-[11px] font-extrabold tracking-[0.16em]"
          >
            INICIO
          </button>
          <button
            type="button"
            onClick={handleGoToProductPage}
            className="absolute left-1/2 top-0 -translate-x-1/2 font-['Avenir',Inter,sans-serif] text-[11px] font-extrabold tracking-[0.16em]"
          >
            PRODUCTO
          </button>
        </nav>

        <img
          src={heroLogo}
          alt="40+"
          className="absolute right-5 top-[11.5%] z-30 h-11 w-11 rounded-full object-cover shadow-[10px_10px_10px_rgba(0,0,0,0.25)]"
        />

        <div className="hero-content absolute left-5 right-5 top-[45%] z-30 text-[#F6F0DD]">
          <h1 className="font-['Avenir',Inter,sans-serif] text-[2.42rem] font-black leading-[1.04] tracking-[0.11em] text-[#D9D2B8]">
            COLÁGENO
          </h1>
          <p className="mt-1 font-['Avenir',Inter,sans-serif] text-[1.4rem] font-black leading-[1.06] tracking-[0.07em] text-[#D9D2B8]">
            <span className="text-[#978240]">HIDROLIZADO</span>{" "}
            <span>PURO</span>
          </p>
          <p className="mt-10 max-w-[22rem] font-['Avenir',Inter,sans-serif] text-[1rem] leading-[1.25] tracking-[0.08em] text-[#D9D2B8]">
            Colágeno Hidrolizado <span className="text-[#DF5C20]">40+</span>{" "}
            en polvo, neutro y fácil de mezclar para apoyar tu piel, huesos y
            articulaciones
          </p>
          <button
            type="button"
            onClick={handleGoToProductPage}
            className="
              hero-cta mt-6 inline-flex min-h-[58px] items-center justify-center rounded-full
              bg-[#DF5C20] px-9 py-3 font-['Avenir',Inter,sans-serif] text-base
              font-black italic tracking-[-0.02em] text-white
              shadow-[12px_12px_6px_rgba(0,0,0,0.6)]
            "
          >
            COMPRAR AHORA
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
