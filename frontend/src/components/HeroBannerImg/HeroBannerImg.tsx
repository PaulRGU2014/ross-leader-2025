"use client";

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './HeroBannerImg.module.scss';
import InViewAnim from './../../utils/InViewAnim/InViewAnim';
import Image from '@/utils/ImageLoader/ImageLoader';

gsap.registerPlugin(ScrollTrigger);

interface HeroBannerImgProps {
  content: any; // Replace 'any' with the appropriate type
}

export default function HeroBannerImg({ content }: HeroBannerImgProps) {
  const [isClient, setIsClient] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      gsap.fromTo(
        `.${styles.image}`,
        { y: 300, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: `.${styles.component}`,
            start: 'top top+=60%',
            end: 'top top+=10%',
            scrub: true,
            onEnter: () => setIsActive(false),
            onLeave: () => setIsActive(true),
            onEnterBack: () => setIsActive(false),
            onLeaveBack: () => setIsActive(true),
          },
        }
      );
    }
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <InViewAnim>
      <div className={styles.component}>
        <div className={styles.overlay}></div>
        <Image
          className={styles.image}
          src={content.image?.asset?._ref}
          alt={content.image?.alt}
          objectFit="cover"
          objectPosition="center"
          priority={true}
        />
        <div className={styles.wrapper}>
          {content.title && <h3 className={`${styles.title} ${!!isActive ? styles.active : ""}`}>{content.title}</h3>}
          {content.subtitle && <h5 className={`${styles.subtitle} ${!!isActive ? styles.active : ""}`}>{content.subtitle}</h5>}
        </div>
      </div>
    </InViewAnim>
  );
}