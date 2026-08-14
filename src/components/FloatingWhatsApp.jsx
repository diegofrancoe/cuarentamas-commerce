// src/components/FloatingWhatsApp.jsx

const FloatingWhatsApp = () => {
  const phoneNumber = "573209099105"; // Ajusta al número real
  const message = encodeURIComponent(
    "Hola, quiero más información sobre 40+ Colágeno."
  );
  const href = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 w-[60px] h-[60px] rounded-full bg-[#25D366] shadow-xl flex items-center justify-center hover:shadow-2xl hover:-translate-y-[1px] transition"
      aria-label="WhatsApp"
    >
      {/* Icono WhatsApp más grande */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-[30px] h-[30px] text-white"
        viewBox="0 0 32 32"
      >
        <path d="M16.04 4C9.96 4 5 8.96 5 15.02c0 2.32.76 4.46 2.04 6.2L5 28l6.94-2.02A10.98 10.98 0 0 0 16.04 26C22.1 26 27 21.04 27 14.98 27 8.96 22.12 4 16.04 4zm5.9 15.52c-.24.68-1.4 1.3-1.94 1.34-.52.04-1.02.2-3.48-.72-2.93-1.16-4.8-4.16-4.94-4.36-.16-.2-1.18-1.57-1.18-3 0-1.42.72-2.12.98-2.4.26-.28.56-.34.74-.34h.54c.18 0 .42-.06.64.48.24.58.82 2 .9 2.14.08.14.12.3.02.48-.1.18-.16.3-.32.48-.16.18-.34.4-.48.54-.16.16-.32.34-.14.66.18.32.82 1.34 1.76 2.18 1.2 1.06 2.18 1.4 2.5 1.54.32.14.5.12.68-.08.18-.2.78-.9.98-1.2.2-.3.4-.24.68-.14.28.1 1.8.86 2.1 1.02.3.16.5.24.58.38.08.14.08.8-.16 1.48z" />
      </svg>
    </a>
  );
};

export default FloatingWhatsApp;
