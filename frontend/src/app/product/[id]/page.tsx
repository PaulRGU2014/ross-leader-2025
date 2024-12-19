"use client"

import ProductDesc from '@/utils/ProductDesc/ProductDesc';
import { useParams } from 'next/navigation';

export default function ProductPage() {
  const { id } = useParams();

  return (
    <>
      <ProductDesc prodId={(id as any)} />
    </>
  );
}