import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// This file keeps track of everything in the user's cart.
// Any screen can read the cart or add/remove items using useCart().

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // cartItems is just a list of products, each with a qty (quantity)
  const [cartItems, setCartItems] = useState([]);

  // when the app starts, try to load the saved cart from storage
  useEffect(() => {
    loadCart();
  }, []);

  // every time cartItems changes, save it so it's not lost on reload
  useEffect(() => {
    AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const loadCart = async () => {
    const saved = await AsyncStorage.getItem('cartItems');
    if (saved) {
      setCartItems(JSON.parse(saved));
    }
  };

  // add a product to the cart (or increase qty if it's already there)
  const addToCart = (product) => {
    const alreadyInCart = cartItems.find((item) => item.id === product.id);

    if (alreadyInCart) {
      // increase quantity by 1
      const updatedCart = cartItems.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      );
      setCartItems(updatedCart);
    } else {
      // add new item with qty 1
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
  };

  const increaseQty = (productId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === productId ? { ...item, qty: item.qty + 1 } : item
    );
    setCartItems(updatedCart);
  };

  const decreaseQty = (productId) => {
    const updatedCart = cartItems.map((item) =>
      item.id === productId && item.qty > 1
        ? { ...item, qty: item.qty - 1 }
        : item
    );
    setCartItems(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // total number of items (adds up all the quantities)
  const cartCount = cartItems.reduce((total, item) => total + item.qty, 0);

  // total price of everything in the cart
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// custom hook so screens can just do: const { cartItems, addToCart } = useCart();
export function useCart() {
  return useContext(CartContext);
}
