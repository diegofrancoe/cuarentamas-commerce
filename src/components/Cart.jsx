import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import productImage from "../assets/product_detail_figma_front_trimmed.png";
import productBack from "../assets/product_detail_figma_back_trimmed.png";
import iconVisa from "../assets/icon_visa.png";
import iconMastercard from "../assets/icon_mastercard.png";
import iconAmerican from "../assets/icon_american.png";
import iconBold from "../assets/icon_bold.png";

const WHATSAPP_NUMBER = "573209099105";
const SHIPPING_RATES = { bogota: 6000, colombia: 16000 };
const PAYMENT_METHODS = [
  { src: iconVisa, alt: "Visa" },
  { src: iconMastercard, alt: "Mastercard" },
  { src: iconAmerican, alt: "American Express" },
  { src: iconBold, alt: "Bold" },
];

const formatCurrency = (value) =>
  value.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, isCartOpen, closeCart, updateQuantity, removeFromCart } = useCart();
  const [errors, setErrors] = useState({});
  const [customer, setCustomer] = useState({
    firstName: "",
    phone: "",
    city: "",
    address: "",
    shippingZone: "bogota",
  });

  useEffect(() => {
    if (!isCartOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const shippingCost = SHIPPING_RATES[customer.shippingZone];
  const orderTotal = cartTotal + shippingCost;

  const updateCustomer = (event) => {
    const { name, value } = event.target;
    setCustomer((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: false }));
  };

  const continueShopping = () => {
    closeCart();
    navigate("/producto/colageno-hidrolizado-40");
  };

  const handleCheckout = () => {
    const required = ["firstName", "phone", "city", "address"];
    const nextErrors = Object.fromEntries(required.map((field) => [field, !customer[field].trim()]));
    setErrors(nextErrors);

    if (!cartItems.length || Object.values(nextErrors).some(Boolean)) return;

    const shippingLabel = customer.shippingZone === "bogota" ? "Bogotá y cercanías" : "Resto de Colombia";
    const lines = cartItems.flatMap((item) => [
      `• ${item.name}`,
      `  Cantidad: ${item.quantity}`,
      `  Subtotal: ${formatCurrency(item.price * item.quantity)}`,
    ]);
    const message = [
      "Hola, quiero finalizar mi pedido en Cuarenta Más:",
      "",
      ...lines,
      "",
      `Subtotal: ${formatCurrency(cartTotal)}`,
      `Envío (${shippingLabel}): ${formatCurrency(shippingCost)}`,
      `Total: ${formatCurrency(orderTotal)}`,
      "",
      `Nombre: ${customer.firstName}`,
      `Teléfono: ${customer.phone}`,
      `Ciudad: ${customer.city}`,
      `Dirección: ${customer.address}`,
    ].join("\n");

    window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="cart-overlay" role="dialog" aria-modal="true" aria-label="Finalizar pedido">
      <section className="cart-hero">
        <div className="cart-hero__header">
          <div className="brand-mark brand-mark--small"><span>40</span><sup>+</sup></div>
          <div className="cart-steps" aria-label="Proceso de compra">
            <span className="is-active">1 · Carrito</span>
            <i />
            <span>2 · WhatsApp</span>
            <i />
            <span>3 · Pago</span>
          </div>
          <button type="button" className="cart-close" onClick={closeCart} aria-label="Cerrar carrito">×</button>
        </div>

        {!cartItems.length ? (
          <div className="cart-empty">
            <span className="eyebrow">Tu carrito está esperando</span>
            <h2>Empieza con un hábito simple.</h2>
            <p>Agrega tu Colágeno Hidrolizado 40+ y finaliza el pedido por WhatsApp.</p>
            <button type="button" className="button button--orange" onClick={continueShopping}>Ver producto <span>→</span></button>
          </div>
        ) : (
          <div className="cart-hero__grid">
            <div className="cart-summary">
              <span className="eyebrow eyebrow--light">Tu pedido</span>
              <h2>Ya casi es tuyo.</h2>

              <div className="cart-items">
                {cartItems.map((item) => (
                  <article className="cart-line" key={item.id}>
                    <div className="cart-line__image">
                      <span />
                      <img src={productBack} alt="" aria-hidden="true" className="cart-line__pack cart-line__pack--back" />
                      <img src={item.image || productImage} alt={item.name} className="cart-line__pack cart-line__pack--front" />
                      <small>Frente + información</small>
                    </div>
                    <div className="cart-line__info">
                      <h3>{item.name}</h3>
                      <p>200 g · 20 porciones aprox.</p>
                      <strong>{formatCurrency(item.price)}</strong>
                      <div className="cart-line__actions">
                        <div className="quantity-control quantity-control--light">
                          <button type="button" onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>−</button>
                          <span>{item.quantity}</span>
                          <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                        </div>
                        <button type="button" className="remove-link" onClick={() => removeFromCart(item.id)}>Eliminar</button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="cart-totals">
                <span>Subtotal <strong>{formatCurrency(cartTotal)}</strong></span>
                <span>Envío <strong>{formatCurrency(shippingCost)}</strong></span>
                <span className="cart-totals__total">Total <strong>{formatCurrency(orderTotal)}</strong></span>
              </div>
            </div>

            <div className="checkout-form-wrap">
              <span className="eyebrow">Datos de entrega</span>
              <h2>¿A dónde enviamos tu 40+?</h2>
              <p className="checkout-form-wrap__intro">Completa tus datos. En WhatsApp confirmamos disponibilidad, pago y envío.</p>

              <div className="checkout-form">
                <Field label="Nombre" name="firstName" value={customer.firstName} onChange={updateCustomer} error={errors.firstName} placeholder="Tu nombre" />
                <Field label="WhatsApp" name="phone" value={customer.phone} onChange={updateCustomer} error={errors.phone} placeholder="300 000 0000" type="tel" />
                <Field label="Ciudad" name="city" value={customer.city} onChange={updateCustomer} error={errors.city} placeholder="Bogotá" />
                <Field label="Dirección" name="address" value={customer.address} onChange={updateCustomer} error={errors.address} placeholder="Calle, número y detalles" className="checkout-field--wide" />
                <label className="checkout-field checkout-field--wide">
                  <span>Zona de envío</span>
                  <select name="shippingZone" value={customer.shippingZone} onChange={updateCustomer}>
                    <option value="bogota">Bogotá y cercanías · $6.000</option>
                    <option value="colombia">Resto de Colombia · $16.000</option>
                  </select>
                </label>
              </div>

              <button type="button" className="button button--whatsapp checkout-button" onClick={handleCheckout}>
                <WhatsAppIcon /> Continuar en WhatsApp <span aria-hidden="true">↗</span>
              </button>
              <p className="checkout-privacy">No realizamos cobros en esta página. Tu pedido se confirma directamente con nuestro equipo.</p>
              <div className="checkout-payments" aria-label="Medios de pago disponibles">
                <span>Medios de pago disponibles</span>
                <div>
                  {PAYMENT_METHODS.map((method) => (
                    <span className="checkout-payment" key={method.alt}>
                      <img src={method.src} alt={method.alt} />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

const Field = ({ label, error, className = "", ...props }) => (
  <label className={`checkout-field ${className} ${error ? "has-error" : ""}`}>
    <span>{label}</span>
    <input {...props} />
    {error && <small>Este dato es necesario</small>}
  </label>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true">
    <path fill="currentColor" d="M16 4a11.7 11.7 0 0 0-10 17.8L4.4 28l6.4-1.7A11.8 11.8 0 1 0 16 4Zm0 21.4c-1.7 0-3.4-.5-4.8-1.3l-.4-.2-3.8 1 1-3.7-.2-.4A9.6 9.6 0 1 1 16 25.4Zm5.3-7.2c-.3-.1-1.7-.8-2-.9-.2-.1-.4-.1-.6.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.8-.9-3-1.6-4.2-3.7-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.6l-.9-2.1c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.6c.2.2 2.5 3.8 6 5.3 2.2.9 3.1 1 4.2.8.7-.1 2-.8 2.3-1.6.3-.8.3-1.5.2-1.6-.1-.2-.4-.3-.7-.4Z" />
  </svg>
);

export default Cart;
