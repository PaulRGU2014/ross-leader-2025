"use client"

import React, { useState } from 'react';
import { useCart } from '@/utils/CartContext/CartContext';
import styles from './Checkout.module.scss';
import Client from 'shopify-buy';

const client = Client.buildClient({
  domain: process.env.SHOPIFY_STORE_DOMAIN || 'cae2c1-6e.myshopify.com',
  storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || 'bb328ee2d7b3396588a2436a134a5aea',
  apiVersion: '2024-10', // Add the appropriate API version
});

export default function Checkout() {
  const { cart, clearCart, updateCartItemQuantity, removeFromCart } = useCart();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    address: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    updateCartItemQuantity(productId, quantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    setError('');

    try {
      const lineItems = cart.map((item) => ({
        variantId: item.variants[0].id,
        quantity: item.quantity, // Use the updated quantity
        customAttributes: Object.entries(item.options).map(([key, value]) => ({
          key,
          value: value as string,
        })),
      }));

      const checkout = await client.checkout.create({ lineItems });

      window.location.href = checkout.webUrl;

      clearCart();
    } catch (err) {
      setError('An error occurred during checkout. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={styles.checkout}>
      <h2>Checkout</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className={styles.cartItems}>
          {cart.map((item, index) => (
            <div key={index} className={styles.cartItem}>
              <img src={item.images[0].src} alt={item.title} />
              <div>
                <h4>{item.title}</h4>
                <p>{item.variants[0].price.currencyCode}{item.variants[0].price.amount}</p>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  min="1"
                />
                <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                <div className={styles.selectedOptions}>
                  {Object.entries(item.options).map(([key, value]) => (
                    <p key={key}>
                      {key}: {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div className={styles.customerInfo}>
            <h3>Customer Information</h3>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={customerInfo.name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={customerInfo.email}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={customerInfo.address}
              onChange={handleInputChange}
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button onClick={handleCheckout} disabled={isProcessing}>
            {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
          </button>
        </div>
      )}
    </div>
  );
}