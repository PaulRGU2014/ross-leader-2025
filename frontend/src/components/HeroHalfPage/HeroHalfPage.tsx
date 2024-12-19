"use client"

import styles from './HeroHalfPage.module.scss';
import InViewAnim from './../../utils/InViewAnim/InViewAnim'
import { useState, useEffect } from 'react'
import Image from '@/utils/ImageLoader/ImageLoader';

interface HeroHalfPageProps {
  content: any; // Replace 'any' with the appropriate type
}

export default function HeroHalfPage({content}: HeroHalfPageProps) {

    const [isClient, setIsClient] = useState(false)
  
    useEffect(() => {
      setIsClient(true)
    }, [])
  
    if (!isClient) {
      return null
    }
  
  return(
    <InViewAnim><div className={styles.component}>
      {content.image_file.asset._ref && <Image
        className={styles.image}
        src={content.image_file.asset._ref}
        alt={content.image_file.alt}
        objectFit="cover"
        objectPosition="center"
      />}
      <div className={styles.wrapper}>
        <h5>{content.title}</h5>
        <h6>{content.subtitle}</h6>
      </div>
    </div></InViewAnim>
  );
}