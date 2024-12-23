"use client";

import { useEffect } from 'react';
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
  useEffect(() => {
    gsap.fromTo(
      `.${styles.image}`,
      { y: 300, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: `.${styles.component}`,
          start: 'top 50%',
          end: 'top top',
          scrub: true,
        },
      }
    );
  }, []);

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
          <h3>{content.title}</h3>
          <h5>{content.subtitle}</h5>
        </div>
      </div>
    </InViewAnim>
  );
}