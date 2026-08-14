// src/components/Cart.jsx
import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import productImage from "../assets/product_detail_figma_front_trimmed.png";
import iconAmerican from "../assets/icon_american.png";
import iconMastercard from "../assets/icon_mastercard.png";
import iconVisa from "../assets/icon_visa.png";
import iconBold from "../assets/icon_bold.png";

const WHATSAPP_NUMBER = "573209099105";
const SHIPPING_RATES = {
  bogota: 6000,
  colombia: 16000,
};

const formatCurrency = (value) => {
  return value.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });
};

const Cart = () => {
  const [activeStep, setActiveStep] = useState("cart");
  const [customer, setCustomer] = useState({
    email: "",
    shippingZone: "bogota",
    city: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
  });
  const {
    cartItems,
    cartTotal,
    isCartOpen,
    closeCart,
    updateQuantity,
  } = useCart();

  if (!isCartOpen) return null;

  const hasItems = cartItems.length > 0;
  const mainItem = cartItems[0] ?? {
    id: "colageno-40",
    name: "Colágeno Hidrolizado 40+",
    price: 69900,
    quantity: 1,
    image: productImage,
  };
  const subtotal = hasItems ? cartTotal : 69900;
  const shippingCost = SHIPPING_RATES[customer.shippingZone];
  const orderTotal = subtotal + shippingCost;

  const updateCustomer = (event) => {
    const { name, value } = event.target;
    setCustomer((current) => ({ ...current, [name]: value }));
  };

  const handleDecrease = () => {
    updateQuantity(mainItem.id, Math.max(1, mainItem.quantity - 1));
  };

  const handleIncrease = () => {
    updateQuantity(mainItem.id, mainItem.quantity + 1);
  };

  const handleCheckout = () => {
    if (!hasItems) {
      alert("Tu carrito está vacío.");
      return;
    }

    if (!customer.firstName || !customer.phone || !customer.city || !customer.address) {
      alert("Completa nombre, teléfono, ciudad y dirección para continuar.");
      return;
    }

    const itemLines = cartItems.map(
      (item) =>
        `• ${item.name}\n  Cantidad: ${item.quantity}\n  Subtotal: ${formatCurrency(item.price * item.quantity)}`,
    );
    const shippingLabel =
      customer.shippingZone === "bogota"
        ? "Bogotá y cercanías"
        : "Resto de Colombia";
    const fullName = `${customer.firstName} ${customer.lastName}`.trim();
    const message = [
      "Hola, quiero realizar este pedido en Cuarenta Más:",
      "",
      ...itemLines,
      "",
      `Subtotal: ${formatCurrency(subtotal)}`,
      `Envío (${shippingLabel}): ${formatCurrency(shippingCost)}`,
      `Total: ${formatCurrency(orderTotal)}`,
      "",
      `Nombre: ${fullName}`,
      `Teléfono: ${customer.phone}`,
      `Ciudad: ${customer.city}`,
      `Dirección: ${customer.address}`,
      customer.email ? `E-mail: ${customer.email}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#F8F1E3] text-[#F6F0DD]">
      <section className="relative mx-auto flex h-[100dvh] max-h-[900px] min-h-[760px] w-full max-w-[1440px] overflow-hidden rounded-[52px] bg-[#F8F1E3] shadow-[0_24px_70px_rgba(18,73,72,0.24)]">
        <button
          type="button"
          onClick={closeCart}
          aria-label="Cerrar carrito"
          className="absolute right-6 top-5 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-[#244A34]/30 bg-[#F6F0DD]/80 text-2xl font-semibold leading-none text-[#244A34] transition hover:bg-white"
        >
          ×
        </button>

        <div className="grid w-full grid-cols-1 lg:grid-cols-[57%_43%]">
          <div className="relative bg-[#244A34] px-7 pb-8 pt-7 md:px-16 lg:px-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(246,240,221,0.08),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_38%)] opacity-80" />
            <div className="relative z-10">
              <CheckoutSteps activeStep={activeStep} />

              <div className="mt-7 space-y-6">
                <section>
                  <h2 className="checkout-title">Datos de contacto</h2>
                  <CheckoutInput
                    label="E-mail"
                    name="email"
                    type="email"
                    value={customer.email}
                    onChange={updateCustomer}
                    onFocus={() => setActiveStep("cart")}
                  />
                </section>

                <section>
                  <h2 className="checkout-title">Entrega</h2>
                  <div className="space-y-4">
                    <CheckoutSelect
                      label="Zona de envío"
                      name="shippingZone"
                      value={customer.shippingZone}
                      onChange={updateCustomer}
                      onFocus={() => setActiveStep("delivery")}
                    />
                    <CheckoutInput
                      placeholder="Ciudad o municipio"
                      name="city"
                      value={customer.city}
                      onChange={updateCustomer}
                      onFocus={() => setActiveStep("delivery")}
                    />
                  </div>
                </section>

                <section>
                  <h2 className="checkout-title">Datos del destinatario</h2>
                  <div className="space-y-4">
                    <CheckoutInput placeholder="Nombre" name="firstName" value={customer.firstName} onChange={updateCustomer} onFocus={() => setActiveStep("delivery")} />
                    <CheckoutInput placeholder="Apellido" name="lastName" value={customer.lastName} onChange={updateCustomer} onFocus={() => setActiveStep("delivery")} />
                    <CheckoutInput placeholder="Teléfono" name="phone" type="tel" value={customer.phone} onChange={updateCustomer} onFocus={() => setActiveStep("delivery")} />
                    <CheckoutInput placeholder="Dirección" name="address" value={customer.address} onChange={updateCustomer} onFocus={() => setActiveStep("delivery")} />
                  </div>
                </section>
              </div>
            </div>
          </div>

          <aside className="relative flex flex-col bg-[#EDE3D7] px-7 pb-8 pt-14 text-[#244A34] md:px-16 lg:px-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_35%_22%,rgba(255,255,255,0.46),transparent_30%),linear-gradient(125deg,rgba(155,130,62,0.14),transparent_42%)]" />
            <div className="relative z-10 flex min-h-full flex-col">
              <OrderSummary
                item={mainItem}
                subtotal={subtotal}
                total={orderTotal}
                shippingCost={shippingCost}
                onDecrease={handleDecrease}
                onIncrease={handleIncrease}
                onFocus={() => setActiveStep("payment")}
              />

              <button
                type="button"
                onFocus={() => setActiveStep("payment")}
                onMouseEnter={() => setActiveStep("payment")}
                onClick={handleCheckout}
                className="mx-auto mt-7 flex h-[54px] w-full max-w-[245px] items-center justify-center rounded-full bg-[#DF5C20] font-['Avenir',Inter,sans-serif] text-[27px] font-black italic leading-none tracking-[0.03em] text-white/95 shadow-[9px_9px_5px_rgba(0,0,0,0.5)] transition hover:bg-[#EB632F]"
              >
                PAGAR
              </button>

              <div className="mt-auto flex items-center justify-center gap-8 pb-2 pt-12 opacity-35">
                <img src={iconAmerican} alt="American Express" className="h-12 w-auto object-contain" />
                <img src={iconMastercard} alt="Mastercard" className="h-10 w-auto object-contain" />
                <img src={iconVisa} alt="Visa" className="h-10 w-auto object-contain" />
                <img src={iconBold} alt="Bold" className="h-9 w-auto object-contain" />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

const stepOrder = ["cart", "delivery", "payment"];

const CheckoutSteps = ({ activeStep }) => {
  const activeIndex = stepOrder.indexOf(activeStep);

  return (
  <div className="mx-auto flex max-w-[520px] items-start justify-between">
    <Step icon={<CartIcon />} label="Carrito" active={activeStep === "cart"} />
    <StepConnector active={activeIndex >= 1} />
    <Step icon={<DeliveryIcon />} label="Entrega" active={activeStep === "delivery"} />
    <StepConnector active={activeIndex >= 2} />
    <Step icon={<PaymentIcon />} label="Pago" active={activeStep === "payment"} />
  </div>
  );
};

const Step = ({ icon, label, active }) => (
  <div className="flex flex-col items-center gap-2">
    <div
      className={`flex h-12 w-12 items-center justify-center rounded-full text-[#244A34] shadow-sm transition ${
        active
          ? "bg-[#F6F0DD] ring-2 ring-[#9B823E] ring-offset-2 ring-offset-[#244A34]"
          : "bg-[#EDE3CB]"
      }`}
    >
      {icon}
    </div>
    <span
      className={`font-['Avenir',Inter,sans-serif] text-[16px] leading-none tracking-[0.14em] transition ${
        active ? "font-black text-[#F6F0DD]" : "text-[#F6F0DD]/90"
      }`}
    >
      {label}
    </span>
  </div>
);

const StepConnector = ({ active }) => (
  <div className={`mt-6 h-px flex-1 transition ${active ? "bg-[#F6F0DD]" : "bg-[#9B823E]"}`} />
);

const CheckoutInput = ({ label, placeholder, name, type = "text", value, onChange, onFocus }) => (
  <label className="checkout-field">
    {label && <span className="checkout-field-label">{label}</span>}
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onFocus={onFocus}
      className="checkout-control"
    />
  </label>
);

const CheckoutSelect = ({ label, name, value, onChange, onFocus }) => (
  <label className="checkout-field">
    <span className="checkout-field-label">{label}</span>
    <select name={name} value={value} onChange={onChange} onFocus={onFocus} className="checkout-control appearance-none pr-14">
      <option value="bogota">Bogotá y cercanías — $6.000</option>
      <option value="colombia">Resto de Colombia — $16.000</option>
    </select>
    <ChevronDown />
  </label>
);

const OrderSummary = ({ item, subtotal, shippingCost, total, onDecrease, onIncrease, onFocus }) => (
  <div
    className="rounded-[34px] border-2 border-[#244A34] bg-white/5 px-7 py-7 font-['Avenir',Inter,sans-serif]"
    onMouseEnter={onFocus}
  >
    <div className="grid grid-cols-[150px_1fr] gap-5">
      <div className="flex h-[150px] items-center justify-center rounded-[30px] border border-[#9B823E] bg-white/20">
        <img
          src={item.image || productImage}
          alt={item.name}
          className="h-[116px] rotate-[20deg] object-contain drop-shadow-[6px_5px_4px_rgba(0,0,0,0.38)]"
        />
      </div>

      <div className="grid min-w-0 grid-cols-[1fr_150px] gap-x-5 gap-y-2">
        <h3 className="col-span-2 text-[20px] font-black leading-[1.25] tracking-[0.07em]">
          {item.name}
        </h3>
        <div>
        <p className="text-[19px] font-black leading-[1.45] tracking-[0.08em]">
          {formatCurrency(item.price).replace(/\s/g, " ")}
        </p>
        <p className="text-[19px] font-black leading-[1.35] tracking-[0.08em]">
          (200g)
        </p>
        </div>

        <div className="self-end justify-self-end">
          <p className="mb-1 text-center text-[14px] font-black tracking-[0.12em]">
            Cantidad
          </p>
          <div className="flex h-[28px] w-[132px] items-center justify-between rounded-full border border-[#244A34] bg-[#ECE3CB]/70 px-6 text-[16px] font-black tracking-[0.12em]">
            <button type="button" onClick={onDecrease} aria-label="Reducir cantidad">
              -
            </button>
            <span>{item.quantity}</span>
            <button type="button" onClick={onIncrease} aria-label="Aumentar cantidad">
              +
            </button>
          </div>
        </div>
      </div>
    </div>

    <div className="my-7 h-px bg-[#244A34]/85" />

    <div className="space-y-4 text-[23px] leading-[1.35] tracking-[0.08em]">
      <SummaryRow label="Subtotal" value={formatCurrency(subtotal)} />
      <SummaryRow label="Costo de envío" value={formatCurrency(shippingCost)} />
      <div className="h-6" />
      <SummaryRow
        label="TOTAL"
        value={formatCurrency(total)}
        className="font-black"
      />
    </div>
  </div>
);

const SummaryRow = ({ label, value, className = "font-medium" }) => (
  <div className={`flex items-center justify-between gap-5 ${className}`}>
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

const ChevronDown = () => (
  <span className="pointer-events-none absolute right-8 top-1/2 h-6 w-6 -translate-y-1/2">
    <span className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-[62%] rotate-45 border-b-[3px] border-r-[3px] border-[#F6F0DD]/70" />
  </span>
);

const CartIcon = () => (
  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 5h2l1.8 10.2h9.7l1.8-7.1H8.5" />
    <circle cx="10" cy="19" r="1.4" />
    <circle cx="17" cy="19" r="1.4" />
  </svg>
);

const DeliveryIcon = () => (
  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3.5 8h10v8h-10z" />
    <path d="M13.5 11h3.3l2.7 3v2h-6z" />
    <path d="M6 6h5M5.5 11h4M5.5 14h3" />
    <circle cx="7.5" cy="18" r="1.4" />
    <circle cx="17" cy="18" r="1.4" />
  </svg>
);

const PaymentIcon = () => (
  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 14.5h6.4c1.2 0 2.2.9 2.2 2.1H8.5" />
    <path d="M12.3 16.6h2.4c.9 0 1.7-.3 2.4-.8l2.9-2.1" />
    <path d="M4 18.5h10" />
    <circle cx="16.2" cy="7" r="3" />
    <path d="M16.2 5.5v3M15 6.4h2.4" />
  </svg>
);

export default Cart;
