"use client"

import styles from './ContentBubbles.module.scss';
import InViewAnim from './../../utils/InViewAnim/InViewAnim'
import Image from '@/utils/ImageLoader/ImageLoader';
import { gsap } from 'gsap';

interface ContentBubblesProps {
  content: any; // Replace 'any' with the appropriate type
}

export default function ContentBubbles({content}: ContentBubblesProps) {
  console.log(content);
  return(
    <InViewAnim><div className={styles.component}>
      <div className={styles.wrapper}>
        {content.content.map((item: any, index: number) => (
          <div key={index} className={styles.bubbles_wrapper}>
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
    </div></InViewAnim>
  );
}