// src/components/Footer.jsx
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F6F0DD] border-t border-[#124948]/10 mt-0">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs md:text-sm text-[#124948]/80">
        <p>© {currentYear} cuarentamas.com. Todos los derechos reservados.</p>
        <p className="text-[#124948]/70">
          40+ Bienestar para quienes saben que cuidar el cuerpo es seguir honrando la vida.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
