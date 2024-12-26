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

    const slides = gsap.utils.toArray(`.${styles.bubbles_wrapper}`);
    const captions = gsap.utils.toArray(`.${styles.bubble}`);
    const bubbleImgs = gsap.utils.toArray(`.${styles.image}`);
    const bubbleTitles = gsap.utils.toArray(`.${styles.bubble_title}`);
    const bubbleContents = gsap.utils.toArray(`.${styles.bubble_content}`);

    gsap.set(bubbleTitles,{ opacity: 0, y: -100, transformOrigin: "top" });
    gsap.set(bubbleContents,{ opacity: 0, y: 100, transformOrigin: "bottom" });
    gsap.set(bubbleImgs,{ opacity: 0, scale: 0.8, transformOrigin: "center" });

    const tween = gsap.to(`.${styles.bubbles_wrapper}`, {
      ease: "none",
      xPercent: -100 * (slides.length - 1),
    });


    // gsap.fromTo(slides, 
    //   { xPercent: 0 }, 
    //   {
    //   xPercent: -100 * (slides.length - 1),
    //   ease: "none",
    //   scrollTrigger: {
    //     trigger: trigger,
    //     pin: true,
    //     scrub: 1,
    //     start: 'top top',
    //     end: () => `+=${container.scrollWidth - container.clientWidth}`
    //   }
    //   }
    // );

    ScrollTrigger.create({
      trigger: trigger,
      start: "top top",
      end: () => `+=${container.scrollWidth - container.clientWidth}`,
      animation: tween,
      scrub: true,
      pin: true
    });

    captions.forEach((caption, index) => {
      const items = (caption as HTMLElement).querySelectorAll("*");
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        scrollTrigger: {
          trigger: caption as Element,
          start: "left right-=20%",
          end: "left left+=20%",
          scrub: true,
          containerAnimation: tween
        }
      });
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