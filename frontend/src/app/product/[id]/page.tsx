"use client"

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Client from 'shopify-buy';
import Image from 'next/image';
import { useCart } from '@/utils/CartContext/CartContext';
import styles from './Product.module.scss';

const client = Client.buildClient({
  domain: process.env.SHOPIFY_STORE_DOMAIN || 'cae2c1-6e.myshopify.com',
  storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || 'bb328ee2d7b3396588a2436a134a5aea',
  apiVersion: '2024-10', // Add the appropriate API version
});

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      const productId = `gid://shopify/Product/${id}`.toString(); // Extract the actual product ID
      client.product.fetch(productId as string).then((fetchedProduct) => {
        setProduct(fetchedProduct);
        console.log(fetchedProduct);
      });
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.productPage}>
      <div className={styles.productImage}>
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
      <div className={styles.productDetails}>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p className={styles.productPrice}>
          {product.variants[0].price.currencyCode} {product.variants[0].price.amount}
        </p>
        <button onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
}