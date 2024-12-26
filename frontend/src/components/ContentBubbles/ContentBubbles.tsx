"use client"

import React, { useState, useEffect, useRef } from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      setIsClient(true);
    }, 150);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const container = containerRef.current;
    const trigger = triggerRef.current;
    
    if (!container) return;

    const sections = gsap.utils.toArray(`.${styles.bubbles_wrapper}`);

    gsap.fromTo(sections, 
      { xPercent: 0 }, 
      {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: trigger,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${container.scrollWidth - container.clientWidth}`
      }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <InViewAnim>
      <div className={styles.component} ref={triggerRef}>
        <div className={styles.wrapper}>
          <div className={styles.bubbles_scroller} ref={containerRef}>
            {content.content.map((item: any, index: number) => (
              <div key={index} className={styles.bubbles_wrapper}>
                <h4 className={styles.title}>{item.title}</h4>
                {item.array.map((bubble: any, index: number) => (
                  <div key={index} className={styles.bubble}>
                    <h6 className={styles.bubble_title}>{bubble.title}</h6>
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
      </div>
    </InViewAnim>
  );
}