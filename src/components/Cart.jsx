import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import BrandLogo from "./BrandLogo.jsx";
import productImage from "../assets/product_detail_figma_front_trimmed.png";

const WHATSAPP_NUMBER = "573209099105";
const SHIPPING_RATES = { bogota: 6000, colombia: 16000 };
const formatCurrency = (value) =>
  value.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });

const Cart = () => {
  const navigate = useNavigate();
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);
  const { cartItems, cartTotal, isCartOpen, closeCart, updateQuantity, removeFromCart } = useCart();
  const [errors, setErrors] = useState({});
  const [customer, setCustomer] = useState({
    firstName: "",
    phone: "",
    city: "",
    address: "",
    shippingZone: "bogota",
    acceptedTerms: false,
  });

  useEffect(() => {
    if (!isCartOpen) return undefined;
    previousFocusRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeCart();
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus?.();
    };
  }, [closeCart, isCartOpen]);

  if (!isCartOpen) return null;

  const shippingCost = SHIPPING_RATES[customer.shippingZone];
  const orderTotal = cartTotal + shippingCost;

  const updateCustomer = (event) => {
    const { checked, name, type, value } = event.target;
    setCustomer((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
    setErrors((current) => ({ ...current, [name]: false }));
  };

  const continueShopping = () => {
    closeCart();
    navigate("/producto/colageno-hidrolizado-40");
  };

  const handleCheckout = () => {
    const required = ["firstName", "phone", "city", "address"];
    const nextErrors = Object.fromEntries(required.map((field) => [field, !customer[field].trim()]));
    nextErrors.acceptedTerms = !customer.acceptedTerms;
    setErrors(nextErrors);

    if (!cartItems.length || Object.values(nextErrors).some(Boolean)) return;

    const shippingLabel = customer.shippingZone === "bogota" ? "Bogotá" : "Resto de Colombia";
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
      "",
      "Al despachar, por favor envíenme por WhatsApp la guía, la transportadora y el tiempo estimado de llegada.",
    ].join("\n");

    window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div ref={dialogRef} className="cart-overlay" role="dialog" aria-modal="true" aria-label="Finalizar pedido">
      <section className="cart-hero">
        <div className="cart-hero__header">
          <BrandLogo className="brand-mark--small" variant="green" />
          <button ref={closeButtonRef} type="button" className="cart-close" onClick={closeCart} aria-label="Cerrar carrito">×</button>
        </div>

        {!cartItems.length ? (
          <div className="cart-empty">
            <span className="eyebrow">Tu momento también cuenta</span>
            <h2>Empieza con un hábito simple.</h2>
            <p>Agrega tu Colágeno Hidrolizado 40+ y da el primer paso para volver a ti.</p>
            <button type="button" className="button button--orange" onClick={continueShopping}>Ver producto <span>→</span></button>
          </div>
        ) : (
          <div className="cart-hero__grid">
            <div className="cart-summary">
              <span className="eyebrow eyebrow--light">Tu ritual 40+</span>
              <h2>Ya casi empieza tu momento.</h2>

              <div className="cart-items">
                {cartItems.map((item) => (
                  <article className="cart-line" key={item.id}>
                    <div className="cart-line__image">
                      <span />
                      <img src={item.image || productImage} alt={item.name} className="cart-line__pack cart-line__pack--front" />
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
              <p className="checkout-form-wrap__intro">
                Completa tus datos y continúa por WhatsApp. El envío cuesta $6.000 en
                Bogotá y $16.000 para el resto del país. Al despachar te enviaremos la
                guía, la transportadora y el tiempo estimado de llegada.
              </p>

              <div className="checkout-form">
                <Field label="Nombre" name="firstName" value={customer.firstName} onChange={updateCustomer} error={errors.firstName} placeholder="Tu nombre" />
                <Field label="Teléfono" name="phone" value={customer.phone} onChange={updateCustomer} error={errors.phone} placeholder="300 000 0000" type="tel" />
                <Field label="Ciudad" name="city" value={customer.city} onChange={updateCustomer} error={errors.city} placeholder="Bogotá" />
                <Field label="Dirección" name="address" value={customer.address} onChange={updateCustomer} error={errors.address} placeholder="Calle, número y detalles" className="checkout-field--wide" />
                <label className="checkout-field checkout-field--wide">
                  <span>Zona de envío</span>
                  <select name="shippingZone" value={customer.shippingZone} onChange={updateCustomer}>
                    <option value="bogota">Bogotá · $6.000</option>
                    <option value="colombia">Resto del país · $16.000</option>
                  </select>
                </label>
              </div>

              <label className={`checkout-terms ${errors.acceptedTerms ? "has-error" : ""}`}>
                <input
                  type="checkbox"
                  name="acceptedTerms"
                  checked={customer.acceptedTerms}
                  onChange={updateCustomer}
                />
                <span>
                  Acepto los <Link to="/terminos-y-condiciones" onClick={closeCart}>términos y condiciones</Link>
                  {" "}y autorizo el uso de mis datos para gestionar el pedido según la{" "}
                  <Link to="/politica-de-datos" onClick={closeCart}>política de datos</Link>.
                </span>
              </label>
              {errors.acceptedTerms && <small className="checkout-terms__error">Debes aceptar para continuar.</small>}

              <button type="button" className="button button--whatsapp checkout-button" onClick={handleCheckout}>
                Continuar pedido por WhatsApp <span aria-hidden="true">↗</span>
              </button>
              <p className="checkout-privacy">
                Esta acción abre WhatsApp con el resumen listo para enviar. Aún no realiza ningún cobro.
              </p>
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
