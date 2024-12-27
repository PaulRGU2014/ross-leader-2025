"use client"

import React, { useState, useEffect, useRef } from 'react';
import styles from './ContentBubbles.module.scss';
import InViewAnim from './../../utils/InViewAnim/InViewAnim';
import Image from '@/utils/ImageLoader/ImageLoader';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ContentBubblesMobile({ content }: any) {
  return (
    <div className={styles.component}>
      This is a mobile version of the component
      {/* <div className={styles.wrapper}>
        <div className={styles.bubbles_scroller}>
          {content.content?.map((item: any, index: number) => (
            <div key={index} className={styles.bubbles_wrapper}>
              <div className={styles.bubbles_inner}>
                <h4 className={styles.title}>{item.title}</h4>
                {item.array.map((bubble: any, bubbleIndex: number) => (
                  <div key={bubbleIndex} className={styles.bubble}>
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
            </div>
          ))}
        </div>
      </div> */}
    </div>
  )
}