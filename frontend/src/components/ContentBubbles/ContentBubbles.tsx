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

    gsap.set(bubbleTitles,{ opacity: 0, y: -50, transformOrigin: "top" });
    gsap.set(bubbleContents,{ opacity: 0, y: 50, transformOrigin: "top" });
    gsap.set(bubbleImgs,{ opacity: 0, scale: 0.8, transformOrigin: "center" });

    const tween = gsap.to(`.${styles.bubbles_wrapper}`, {
      ease: "none",
      xPercent: -100 * (slides.length - 1),
    });

    ScrollTrigger.create({
      trigger: trigger,
      start: "top top",
      end: () => `+=${container.scrollWidth - container.clientWidth}`,
      animation: tween,
      scrub: true,
      pin: true
    });

    captions.forEach((caption) => {
      const items = (caption as HTMLElement).querySelectorAll("*");
      gsap.to(items, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 1.5,
        scrollTrigger: {
          trigger: caption as Element,
          start: "left right-=0%",
          end: "left left+=50%",
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
            <div className={styles.bubbles_wrapper}>
                <h4 className={styles.title_first}>{content.content[0].title}</h4>
                {/* TODO at the end, merge the array together and just use conditional classname */}
                {content.content[0].array.map((bubble: any, index: number) => (
                  <div key={index} className={styles.bubble_first}>
                    <h6 className={styles.bubble_title_first}>{bubble.title}</h6>
                    <Image
                      className={styles.image_first}
                      src={bubble.image?.asset?._ref}
                      alt={bubble.image?.alt}
                      objectFit="cover"
                      objectPosition="center"
                    />
                    <p className={styles.bubble_content_first}>{bubble.content}</p>
                  </div>
                ))}
              </div>
            {content.content?.slice(1).map((item: any, index: number) => (
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