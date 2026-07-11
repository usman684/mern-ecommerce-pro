import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const stored = localStorage.getItem("wishlistItems");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    setWishlistItems((prevItems) => {
      const existe = prevItems.find((item) => item._id === product._id);
      if (existe) return prevItems;
      return [...prevItems, product];
    });
    toast.success("Added to wishlist");
  };
  const removeFromWishlist = (productId) => {
    setWishlistItems((prevItems) =>
      prevItems.filter((item) => item._id !== productId),
    );
    toast.success("Removed from Wishlist");
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item._id === productId);
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
