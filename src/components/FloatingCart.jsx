// src/components/FloatingCart.jsx
import { useCart } from "../context/CartContext.jsx";

const FloatingCart = () => {
  const { cartCount, openCart } = useCart();

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openCart(); // 👈 solo abre el carrito cuando el usuario hace clic
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Abrir carrito flotante"
      className="fixed top-[25vh] right-6 z-40 w-[54px] h-[54px] rounded-full bg-white shadow-xl flex items-center justify-center hover:shadow-2xl hover:-translate-y-[1px] transition"
    >
      {/* Ícono del carrito */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-7 h-7 text-[#124948]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M3 3h2l.4 2M7 13h10l3-7H6.4" />
        <circle cx="9" cy="18" r="1.4" />
        <circle cx="17" cy="18" r="1.4" />
      </svg>

      {/* Badge con cantidad */}
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-[#EB632F] text-white text-xs font-semibold min-w-[1.2rem] h-[1.2rem] rounded-full flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </button>
  );
};

export default FloatingCart;
