"use client"

import React, { useEffect, useState } from 'react';
import Client from 'shopify-buy';
import Image from 'next/image';
import { useCart } from '@/utils/CartContext/CartContext';
import styles from './ProductDesc.module.scss';
import Link from '@/utils/LinkWrapper/LinkWrapper';

const client = Client.buildClient({
  domain: process.env.SHOPIFY_STORE_DOMAIN || 'cae2c1-6e.myshopify.com',
  storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || 'bb328ee2d7b3396588a2436a134a5aea',
  apiVersion: '2024-10', // Add the appropriate API version
});

export default function ProductPage({ prodId }: { prodId: string }) {
  const [product, setProduct] = useState<any>(null);
  const [selectedOptions, setSelectedOptions] = useState<any>({});
  const { addToCart } = useCart();

  useEffect(() => {
    if (prodId) {
      const productId = `gid://shopify/Product/${prodId}`.toString(); // Extract the actual product ID
      client.product.fetch(productId as string).then((fetchedProduct) => {
        setProduct(fetchedProduct);
        console.log(fetchedProduct);
      });
    }
  }, [prodId]);

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions((prevOptions: any) => ({
      ...prevOptions,
      [optionName]: value,
    }));
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.component}>
      <div className={styles.productPage}>
        <div className={styles.productImage}>
          {product.images[0].src && (
            <Image
              src={product.images[0].src}
              alt={product.title}
              fill={true}
              sizes="100%"
              style={{
                objectFit: 'contain',
                objectPosition: 'center',
              }}
            />
          )}
        </div>
        <div className={styles.productDetails}>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p className={styles.productPrice}>
            {product.variants[0].price.currencyCode} {product.variants[0].price.amount.toString()}
          </p>
          <div className={styles.productOptions}>
            {product?.options?.map((option: any) => (
              <div key={option.name}>
                <label htmlFor={option.name}>{option.name}</label>
                <select
                  name={option.name}
                  id={option.name}
                  onChange={(e) => handleOptionChange(option.name, e.target.value)}
                >
                  {option.values.map((value: any) => (
                    <option key={value.value} value={value.value}>
                      {value.value}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <button onClick={() => addToCart(product, selectedOptions)}>Add to Cart</button>
        </div>
        <Link className={styles.checkout} href="/store/checkout">
            Go to Checkout
        </Link>
      </div>
    </div>
  );
}