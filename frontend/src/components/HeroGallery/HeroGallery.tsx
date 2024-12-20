"use client"

import styles from './HeroGallery.module.scss';
import InViewAnim from './../../utils/InViewAnim/InViewAnim'

interface HeroGalleryProps {
  content: any; // Replace 'any' with the appropriate type
}

export default function HeroGallery({content}: HeroGalleryProps) {
  return(
    <InViewAnim><div className={styles.component}>
      <div className={styles.wrapper}>
        <h5>HeroGallery</h5>
      </div>
    </div></InViewAnim>
  );
}