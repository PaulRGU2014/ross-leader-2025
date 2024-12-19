"use client"

import React, { useEffect, useState } from 'react';
import styles from './Shopify.module.scss';
import InViewAnim from './../../utils/InViewAnim/InViewAnim';
import Client from 'shopify-buy';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/utils/CartContext/CartContext';

const client = Client.buildClient({
  domain: process.env.SHOPIFY_STORE_DOMAIN || 'cae2c1-6e.myshopify.com',
  storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || 'bb328ee2d7b3396588a2436a134a5aea',
  apiVersion: '2024-10', // Add the appropriate API version
});

export default function Shopify() {
  const [products, setProducts] = useState<any[]>([]);
  const { cart, addToCart } = useCart();

  useEffect(() => {
    client.product.fetchAll().then((fetchedProducts) => {
      setProducts(fetchedProducts);
    });
  }, []);

  // console.log('Products:', products);
  // console.log('Cart:', cart);

  return (
    <InViewAnim>
      <div className={styles.component}>
        <div className={styles.wrapper}>
          <h5 className={styles.title}>latest collection</h5>
          <div className={styles.products}>
            {products.map((product) => (
              <Link key={product.id} className={styles.product}
                href={`/product/${product.id.toString().split('/').pop()}`} // Extract the actual product ID
              >
                <div className={styles.product_image}>
                  <Image 
                    src={product.images[0].src} 
                    alt={product.title}
                    fill={true}
                    sizes="100%"
                    style={{
                      objectFit: 'contain',
                      objectPosition: 'center'
                    }}
                  />
                </div>
                <h6 className={styles.product_title}>{product.title}</h6>
                <p className={styles.product_price}>
                  {product.variants[0].price.currencyCode} {product.variants[0].price.amount}
                </p>
              </Link>
            ))}
          </div>
          <Link className={styles.checkout} href="/shop/checkout">
            Go to Checkout
          </Link>
        </div>
      </div>
    </InViewAnim>
  );
}