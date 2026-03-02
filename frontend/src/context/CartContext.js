import { createContext, useState } from "react";

export const CartContext = createContext();

const resolveProductId = (product) =>
  product?.id ??
  product?._id ??
  product?.sku ??
  `${product?.title ?? "item"}-${product?.price ?? 0}`;

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    if (!product) return;

    const resolvedId = resolveProductId(product);

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === resolvedId);

      if (existingItem) {
        return prev.map((item) =>
          item.id === resolvedId
            ? { ...item, quantity: (item.quantity ?? 1) + 1 }
            : item
        );
      }

      return [...prev, { ...product, id: resolvedId, quantity: 1 }];
    });
  };

  const increaseQuantity = (productId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: (item.quantity ?? 1) + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max((item.quantity ?? 1) - 1, 0) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
