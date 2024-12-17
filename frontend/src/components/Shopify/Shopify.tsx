"use client"

import React, { useEffect, useState } from 'react';
import styles from './Shopify.module.scss';
import InViewAnim from './../../utils/InViewAnim/InViewAnim';
import Client from 'shopify-buy';


const client = Client.buildClient({
  domain: process.env.SHOPIFY_STORE_DOMAIN || 'cae2c1-6e.myshopify.com',
  storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || 'bb328ee2d7b3396588a2436a134a5aea',
  apiVersion: '2024-10', // Add the appropriate API version
});

export default function Shopify() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    client.product.fetchAll().then((fetchedProducts) => {
      setProducts(fetchedProducts);
    });
  }, []);

  console.log(products);

  return (
    <InViewAnim>
      <div className={styles.component}>
        <div className={styles.wrapper}>
          <h5>Shopify Products</h5>
          <div className={styles.products}>
            {/* {products.map((product) => (
              <div key={product.id} className={styles.product}>
                <img src={product.images[0].src} alt={product.title} />
                <h6>{product.title}</h6>
                <p>{product.description}</p>
                <p>{product.variants[0].price}</p>
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </InViewAnim>
  );
}