"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartContextType {
  cart: any[];
  addToCart: (product: any, options: any) => void;
  clearCart: () => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<any[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: any, options: any) => {
    console.log('Adding to cart:', product, options);
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex((item) => item.id === product.id && JSON.stringify(item.options) === JSON.stringify(options));
      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity: 1, options }];
      }
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateCartItemQuantity = (productId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  console.log('Cart state:', cart);

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart, updateCartItemQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};