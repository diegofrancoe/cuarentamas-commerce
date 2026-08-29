import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import BrandLogo from "./BrandLogo.jsx";
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
  const deliveryComplete = cartItems.length > 0
    && [customer.firstName, customer.phone, customer.city, customer.address]
      .every((value) => value.trim());

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
          <BrandLogo className="brand-mark--small" variant="green" />
          <div className="cart-steps" aria-label="Proceso de compra">
            <span className={deliveryComplete ? "is-complete" : "is-active"}>1 · Carrito</span>
            <i />
            <span className={deliveryComplete ? "is-active" : ""}>2 · Datos</span>
            <i />
            <span>3 · Pago</span>
          </div>
          <button type="button" className="cart-close" onClick={closeCart} aria-label="Cerrar carrito">×</button>
        </div>

        {!cartItems.length ? (
          <div className="cart-empty">
            <span className="eyebrow">Tu carrito está esperando</span>
            <h2>Empieza con un hábito simple.</h2>
            <p>Agrega tu Colágeno Hidrolizado 40+ para continuar con tu compra.</p>
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
                      <small className="cart-line__tax">IVA incluido</small>
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
              <p className="checkout-form-wrap__intro">Completa tus datos para coordinar disponibilidad, pago y envío.</p>

              <div className="checkout-form">
                <Field label="Nombre" name="firstName" value={customer.firstName} onChange={updateCustomer} error={errors.firstName} placeholder="Tu nombre" />
                <Field label="Teléfono" name="phone" value={customer.phone} onChange={updateCustomer} error={errors.phone} placeholder="300 000 0000" type="tel" />
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
                Finalizar pedido <span aria-hidden="true">↗</span>
              </button>
              <p className="checkout-privacy">Tus datos se usan únicamente para gestionar y entregar tu pedido.</p>
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

export default Cart;
