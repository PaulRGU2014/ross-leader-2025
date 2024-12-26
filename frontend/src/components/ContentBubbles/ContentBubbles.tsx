"use client"

import React, { useState, useEffect } from 'react';
import styles from './ContentBubbles.module.scss';
import InViewAnim from './../../utils/InViewAnim/InViewAnim';
import Image from '@/utils/ImageLoader/ImageLoader';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ContentBubblesProps {
  content: any; // Replace 'any' with the appropriate type
}

export default function ContentBubbles({ content }: ContentBubblesProps) {
  const [isClient, setIsClient] = useState(false);
  const [screenHeight, setScreenHeight] = useState(0);

  useEffect(() => {
    const updateScreenHeight = () => {
      setScreenHeight(window.innerHeight);
    };

    updateScreenHeight();
    window.addEventListener('resize', updateScreenHeight);

    return () => {
      window.removeEventListener('resize', updateScreenHeight);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsClient(true);
    }, 150);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const bubblesWrappers = gsap.utils.toArray(`.${styles.bubbles_wrapper}`);
    bubblesWrappers.forEach((wrapper: any, i: number) => {
      gsap.fromTo(wrapper, 
        { y: i * screenHeight, opacity: 1 }, 
        { 
          y: (i + 1) * screenHeight,
          opacity: 0, 
          scrollTrigger: {
            trigger: wrapper,
            start: 'top 0%',
            end: `+=${screenHeight}`,
            scrub: true,
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <InViewAnim>
      <div className={styles.component}>
        <div className={styles.wrapper}
          style={{
            height: `calc(${content.content.length * screenHeight * 2}px)`,
          }}
        >
          {content.content.map((item: any, index: number) => (
            <div key={index} className={styles.bubbles_wrapper}
              style={{
                zIndex: 100 - index,
              }}
            >
              <h4 className={styles.title}>{item.title}</h4>
              {item.array.map((bubble: any, index: number) => (
                <div key={index} className={styles.bubble}>
                  <h5 className={styles.bubble_title}>{bubble.title}</h5>
                  <Image
                    className={styles.image}
                    src={bubble.image?.asset?._ref}
                    alt={bubble.image?.alt}
                    objectFit="cover"
                    objectPosition="center"
                  />
                  <p className={styles.bubble_content}>{bubble.content}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </InViewAnim>
  );
}