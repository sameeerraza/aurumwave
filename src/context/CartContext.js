import { createContext, useEffect, useState } from "react";

// Create Context
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // ✅ Initialize cart directly from localStorage to avoid reloading issues
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch (error) {
      console.error("Error parsing cart from localStorage:", error);
      return [];
    }
  });

  // ✅ Always update localStorage when cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add a product to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const minusFromCart = (product) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === product.id) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return null; // Mark for removal
          }
        }
        return item;
      }).filter(Boolean); // Remove null values (items with quantity 0)
    });
  };
  
  // Remove a product from the cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart,minusFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
