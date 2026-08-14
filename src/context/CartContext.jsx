// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Solo se usan cuando el usuario hace clic en el botón flotante o iconos
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // 👇 Importante: aquí NO abrimos el carrito, solo agregamos
  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const updateQuantity = (id, newQty) => {
    setCartItems((prev) => {
      if (newQty <= 0) {
        return prev.filter((item) => item.id !== id);
      }
      return prev.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      );
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const { cartCount, cartTotal } = useMemo(() => {
    const count = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    return { cartCount: count, cartTotal: total };
  }, [cartItems]);

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    isCartOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    openCart,
    closeCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return ctx;
};
