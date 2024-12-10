"use client"

import styles from './GridLinksCarousel.module.scss';
import InViewAnim from './../../utils/InViewAnim/InViewAnim'

interface GridLinksCarouselProps {
  content: any; // Replace 'any' with the appropriate type
}

export default function GridLinksCarousel({content}: GridLinksCarouselProps) {
  return(
    <InViewAnim><div className={styles.component}>
      <div className={styles.wrapper}>
        <h5>GridLinksCarousel</h5>
      </div>
    </div></InViewAnim>
  );
}