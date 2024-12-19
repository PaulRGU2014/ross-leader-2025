"use client"

import styles from './HeroHalfPage.module.scss';
import InViewAnim from './../../utils/InViewAnim/InViewAnim'

interface HeroHalfPageProps {
  content: any; // Replace 'any' with the appropriate type
}

export default function HeroHalfPage({content}: HeroHalfPageProps) {
  return(
    <InViewAnim><div className={styles.component}>
      <div className={styles.wrapper}>
        <h5>HeroHalfPage</h5>
      </div>
    </div></InViewAnim>
  );
}