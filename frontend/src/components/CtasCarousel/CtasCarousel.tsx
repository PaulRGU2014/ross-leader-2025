"use client"

import styles from './CtasCarousel.module.scss';
import InViewAnim from './../../utils/InViewAnim/InViewAnim'

interface CtasCarouselProps {
  content: any; // Replace 'any' with the appropriate type
}

export default function CtasCarousel({content}: CtasCarouselProps) {
  return(
    <InViewAnim><div className={styles.component}>
      <div className={styles.wrapper}>
        <h5>CtasCarousel</h5>
      </div>
    </div></InViewAnim>
  );
}