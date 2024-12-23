"use client"

import styles from './HeroBannerImg.module.scss';
import InViewAnim from './../../utils/InViewAnim/InViewAnim'

interface HeroBannerImgProps {
  content: any; // Replace 'any' with the appropriate type
}

export default function HeroBannerImg({content}: HeroBannerImgProps) {
  return(
    <InViewAnim><div className={styles.component}>
      <div className={styles.wrapper}>
        <h3>{content.title}</h3>
        <h5>{content.subtitle}</h5>
      </div>
    </div></InViewAnim>
  );
}