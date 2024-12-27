"use client"

import React, { useState, useEffect, useRef } from 'react';
import styles from './ContentBubblesMobile.module.scss';
import InViewAnim from './../../utils/InViewAnim/InViewAnim';
import Image from '@/utils/ImageLoader/ImageLoader';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ContentBubblesMobile({ content }: any) {
  return (
    <div className={styles.component}>
      <div className={styles.wrapper}>
        {content.content?.map((item: any, index: number) => (
          <div key={index} className={styles.bubbles_wrapper}>
            <h3 className={styles.title}>{item.title}</h3>
            <InViewAnim><div className={styles.inner}>
              {item.array.map((bubble: any, bubbleIndex: number) => (
                <div key={bubbleIndex} className={styles.bubble}
                  style={{
                    transitionDelay: `${bubbleIndex * 0.1}s`
                  }}
                >
                  <h6 className={styles.bubble_title}>{bubble.title}</h6>
                  <Image
                    className={styles.bubble_image}
                    src={bubble.image?.asset?._ref}
                    alt={bubble.image?.alt}
                    objectFit="cover"
                    objectPosition="center"
                  />
                  <p className={styles.bubble_content}>{bubble.content}</p>
                </div>
              ))}
            </div></InViewAnim>
          </div>
        ))}
      </div>
    </div>
  )
}