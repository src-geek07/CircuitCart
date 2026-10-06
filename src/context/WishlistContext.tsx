import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Same idea as CartContext, but for the wishlist (saved items).

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    loadWishlist();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const loadWishlist = async () => {
    const saved = await AsyncStorage.getItem('wishlistItems');
    if (saved) {
      setWishlistItems(JSON.parse(saved));
    }
  };

  // add if not already there, remove if it is (a toggle)
  const toggleWishlist = (product) => {
    const exists = wishlistItems.find((item) => item.id === product.id);

    if (exists) {
      setWishlistItems(wishlistItems.filter((item) => item.id !== product.id));
    } else {
      setWishlistItems([...wishlistItems, product]);
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== productId));
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
