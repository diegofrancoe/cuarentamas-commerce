// src/components/ProductSection.jsx
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import attributesBackground from "../assets/figma_attributes_background.png";
import attributesProduct from "../assets/figma_attributes_product.png";
import attributesIconColombia from "../assets/figma_attributes_icon_colombia.png";
import attributesIconInvima from "../assets/figma_attributes_icon_invima.png";
import attributesLine2 from "../assets/figma_attributes_line_2.svg";
import attributesLine3 from "../assets/figma_attributes_line_3.svg";
import attributesLine4 from "../assets/figma_attributes_line_4.svg";
import attributesLine5 from "../assets/figma_attributes_line_5.svg";

const attributeItems = [
  {
    className: "attributes-left attributes-pure",
    title: "100% PURO",
    description: "Fórmula simple, sin añadidos innecesarios.",
    line: attributesLine3,
    lineClass:
      "left-[16.806%] top-[20.802%] h-[12.491%] w-[10.069%] rotate-[39.07deg]",
  },
  {
    className: "attributes-left attributes-gmo",
    title: "LIBRE\nDE GMO",
    description: "Sin ingredientes modificados genéticamente.",
    line: attributesLine2,
    lineClass:
      "left-[12.707%] top-[36.719%] h-[9.979%] w-[13.565%] -scale-y-100 rotate-[-17.86deg]",
  },
  {
    className: "attributes-left attributes-gluten",
    title: "SIN GLUTEN",
    description: "Fácil de integrar en diferentes preparaciones.",
    line: attributesLine5,
    lineClass:
      "left-[24.909%] top-[81.934%] h-[8.557%] w-[10.057%] rotate-[-16.45deg]",
  },
  {
    className: "attributes-right attributes-sugar",
    title: "SIN AZÚCARES",
    description: "Ideal para una rutina más consciente.",
    line: attributesLine4,
    lineClass:
      "left-[36.319%] top-[6.25%] h-[5.47%] w-[6.616%] rotate-[175.32deg]",
  },
];

const FRAME_WIDTH = 1440;
const FRAME_HEIGHT = 900;

const ProductSection = () => {
  const navigate = useNavigate();
  const shellRef = useRef(null);
  const [scale, setScale] = useState(1);

  const handleGoToProductPage = () => {
    navigate("/producto/colageno-hidrolizado-40");
  };

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
    <section id="producto" className="attributes-section bg-[#F8F1E3]">
      <div
        ref={shellRef}
        className="attributes-stage-shell relative hidden w-full overflow-hidden bg-[#F8F1E3] lg:block"
        style={{
          height: `${FRAME_HEIGHT * scale}px`,
        }}
        aria-label="Atributos del Colágeno Hidrolizado 40+"
      >
        <div
          className="attributes-stage absolute left-1/2 top-0 overflow-hidden bg-[#F8F1E3]"
          style={{
            width: `${FRAME_WIDTH}px`,
            height: `${FRAME_HEIGHT}px`,
            transform: `translateX(-50%) scale(${scale})`,
            transformOrigin: "top center",
          }}
        >
          <img
            src={attributesBackground}
            alt=""
            aria-hidden="true"
            className="attributes-background pointer-events-none absolute z-0 max-w-none object-cover"
            style={{
              inset: 0,
              width: "100%",
              height: "100%",
              opacity: 0.93,
            }}
          />

          <button
            type="button"
            onClick={handleGoToProductPage}
            className="attributes-product product-anchor-attributes absolute z-20 block max-w-none cursor-pointer"
            data-product-anchor="attributes"
            style={{
              left: "38px",
              top: "40px",
              width: "1040px",
              height: "auto",
              transformOrigin: "center center",
              transform: "rotate(39.99deg)",
              filter: "drop-shadow(42px 38px 42px rgba(0,0,0,0.24))",
            }}
            aria-label="Ver página del producto Colágeno Hidrolizado 40+"
          >
            <img
              src={attributesProduct}
              alt="Doypack de Colágeno Hidrolizado 40+"
              className="block w-full max-w-none select-none"
            />
          </button>

          <div className="attributes-lines pointer-events-none absolute inset-0 z-30">
            <img
              src={attributesLine3}
              alt=""
              aria-hidden="true"
              className="absolute block max-w-none"
              style={{
                left: "276px",
                top: "204px",
                width: "148px",
                height: "39px",
                transform: "rotate(39.07deg)",
                transformOrigin: "center center",
              }}
            />
            <img
              src={attributesLine4}
              alt=""
              aria-hidden="true"
              className="absolute block max-w-none"
              style={{
                left: "522px",
                top: "76px",
                width: "90px",
                height: "50px",
                transform: "rotate(175.32deg)",
                transformOrigin: "center center",
              }}
            />
            <img
              src={attributesLine2}
              alt=""
              aria-hidden="true"
              className="absolute block max-w-none"
              style={{
                left: "188px",
                top: "362px",
                width: "190px",
                height: "46px",
                transform: "scaleY(-1) rotate(-13deg)",
                transformOrigin: "center center",
              }}
            />
            <img
              src={attributesLine5}
              alt=""
              aria-hidden="true"
              className="absolute block max-w-none"
              style={{
                left: "346px",
                top: "728px",
                width: "130px",
                height: "51px",
                transform: "rotate(-16.45deg)",
                transformOrigin: "center center",
              }}
            />
          </div>

          <div className="attributes-copy absolute inset-0 z-40 text-[#244A34]">
            <div className="absolute text-center" style={{ left: "111px", top: "84px", width: "266px" }}>
              <p className="whitespace-nowrap font-['Avenir',Inter,sans-serif] text-[37px] font-black leading-[1.15] tracking-[2.96px]">
                100% PURO
              </p>
            </div>
            <div className="absolute text-center" style={{ left: "131px", top: "127px", width: "226px" }}>
              <p className="font-['Avenir',Inter,sans-serif] text-[15px] font-medium leading-[1.35] tracking-[0.75px]">
                Fórmula simple, sin añadidos innecesarios.
              </p>
            </div>

            <div className="absolute text-center" style={{ left: "629px", top: "76px", width: "288px" }}>
              <p className="whitespace-nowrap font-['Avenir',Inter,sans-serif] text-[36px] font-black leading-[1.15] tracking-[1.8px]">
                SIN AZÚCARES
              </p>
            </div>
            <div className="absolute text-center" style={{ left: "629px", top: "110px", width: "278px" }}>
              <p className="font-['Avenir',Inter,sans-serif] text-[16px] font-medium leading-[1.35] tracking-[0.8px]">
                Ideal para una rutina más consciente.
              </p>
            </div>

            <div className="absolute text-center" style={{ left: "112px", top: "428px", width: "179px" }}>
              <p className="font-['Avenir',Inter,sans-serif] text-[36px] font-black leading-[1.15] tracking-[1.8px]">
                LIBRE<br />DE GMO
              </p>
            </div>
            <div className="absolute text-center" style={{ left: "89px", top: "512px", width: "226px" }}>
              <p className="font-['Avenir',Inter,sans-serif] text-[15px] font-medium leading-[1.35] tracking-[0.75px]">
                Sin ingredientes modificados<br />genéticamente.
              </p>
            </div>

            <div className="absolute" style={{ left: "112px", top: "765px", width: "241px" }}>
              <p className="whitespace-nowrap font-['Avenir',Inter,sans-serif] text-[37px] font-black leading-[1.15] tracking-[1.85px]">
                SIN GLUTEN
              </p>
            </div>
            <div className="absolute text-center" style={{ left: "112px", top: "802px", width: "239px" }}>
              <p className="font-['Avenir',Inter,sans-serif] text-[15px] font-medium leading-[1.35] tracking-[0.75px]">
                Fácil de integrar en diferentes preparaciones.
              </p>
            </div>

            <div className="absolute" style={{ left: "853px", top: "290px", width: "510px" }}>
              <h2 className="whitespace-nowrap font-['Avenir',Inter,sans-serif] text-[36px] font-black leading-[1.15] tracking-[3.6px] opacity-95">
                ¿Por qué elegir <span className="text-[#EB632F]">40+</span>?
              </h2>
            </div>
            <div className="absolute" style={{ left: "873px", top: "352px", width: "442px" }}>
              <p className="font-['Avenir',Inter,sans-serif] text-[34px] font-normal leading-[40px] tracking-[1.36px] opacity-95">
                Porque una buena rutina empieza con una fórmula simple, pura y
                fácil de tomar.
              </p>
            </div>
          </div>

          <div className="attributes-seals pointer-events-none absolute inset-0 z-50">
            <img
              src={attributesIconColombia}
              alt="Hecho en Colombia"
              className="absolute object-cover"
              style={{
                left: "990px",
                top: "76px",
                width: "154px",
                height: "138px",
                opacity: 0.36,
              }}
            />
            <img
              src={attributesIconInvima}
              alt="Registro Invima"
              className="absolute object-cover"
              style={{
                left: "1168px",
                top: "78px",
                width: "147px",
                height: "131px",
                opacity: 0.36,
              }}
            />
          </div>
        </div>
      </div>

      <div className="attributes-mobile relative overflow-hidden bg-[#F8F1E3] px-5 py-8 md:px-8 md:py-10 lg:hidden">
        <div className="relative mx-auto max-w-[860px] overflow-hidden bg-[#f8f1e3] px-5 pb-8 pt-7 shadow-[0_22px_55px_rgba(36,74,52,0.12)] md:px-8 md:pb-10 md:pt-8">
          <img
            src={attributesBackground}
            alt=""
            aria-hidden="true"
            className="attributes-background pointer-events-none absolute inset-0 h-full w-full object-cover object-[56%_50%] opacity-85"
          />
          <div className="absolute inset-0 bg-[#F6F0DD]/34" />

          <button
            type="button"
            onClick={handleGoToProductPage}
            className="attributes-product-anchor product-anchor-attributes relative z-20 mx-auto block w-[92%] cursor-pointer md:w-[58%]"
            data-product-anchor="attributes-mobile"
            aria-label="Ver página del producto Colágeno Hidrolizado 40+"
          >
            <img
              src={attributesProduct}
              alt="Doypack de Colágeno Hidrolizado 40+"
              className="attributes-product block w-full drop-shadow-[28px_28px_32px_rgba(0,0,0,0.26)] md:drop-shadow-[34px_34px_36px_rgba(0,0,0,0.24)]"
            />
          </button>

          <div className="relative z-30 mt-5 text-center text-[#244A34] md:mt-6">
            <p className="font-['Avenir',Inter,sans-serif] text-[13px] font-black leading-none tracking-[0.22em]">
              ATRIBUTOS
            </p>
            <h2 className="mt-3 font-['Avenir',Inter,sans-serif] text-[28px] font-black leading-[1.05] tracking-[0.08em] md:text-[34px]">
              ¿Por qué elegir <span className="text-[#EB632F]">40+</span>?
            </h2>
            <p className="mx-auto mt-4 max-w-[310px] font-['Avenir',Inter,sans-serif] text-[17px] leading-[1.35] tracking-[0.04em] md:max-w-[520px] md:text-[19px]">
              Porque una buena rutina empieza con una fórmula simple, pura y
              fácil de tomar.
            </p>
          </div>

          <div className="relative z-30 mt-6 grid grid-cols-2 gap-3 text-[#244A34] md:grid-cols-4 md:gap-4">
            {attributeItems.map((item) => (
              <div
                key={item.title}
                className="rounded-[18px] bg-[#F6F0DD]/72 px-3 py-4 text-center shadow-[0_10px_25px_rgba(36,74,52,0.1)] md:px-3 md:py-5"
              >
                <p className="font-['Avenir',Inter,sans-serif] text-[15px] font-black leading-[1.05] tracking-[0.09em] whitespace-pre-line md:text-[16px]">
                  {item.title}
                </p>
                <p className="mt-2 font-['Avenir',Inter,sans-serif] text-[11px] leading-[1.25] tracking-[0.04em]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="attributes-seals relative z-30 mt-6 flex items-center justify-center gap-5 opacity-55">
            <img
              src={attributesIconColombia}
              alt="Hecho en Colombia"
              className="h-auto w-[84px]"
            />
            <img
              src={attributesIconInvima}
              alt="Registro Invima"
              className="h-auto w-[84px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
