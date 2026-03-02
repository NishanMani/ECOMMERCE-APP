import { createContext, useState } from "react";

export const WishlistContext = createContext();

const resolveProductId = (product) =>
  product?.id ??
  product?._id ??
  product?.sku ??
  `${product?.title ?? "item"}-${product?.price ?? 0}`;

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToWishlist = (product) => {
    if (!product) return;

    const resolvedId = resolveProductId(product);

    setWishlistItems((prev) => {
      const exists = prev.some((item) => item.id === resolvedId);
      if (exists) return prev;
      return [...prev, { ...product, id: resolvedId }];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const isWishlisted = (productId) =>
    wishlistItems.some((item) => item.id === productId);

  const toggleWishlist = (product) => {
    if (!product) return;
    const resolvedId = resolveProductId(product);

    setWishlistItems((prev) => {
      const exists = prev.some((item) => item.id === resolvedId);

      if (exists) {
        return prev.filter((item) => item.id !== resolvedId);
      }

      return [...prev, { ...product, id: resolvedId }];
    });
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
