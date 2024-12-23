"use client"

import styles from './CtaTitleImg.module.scss';
import InViewAnim from './../../utils/InViewAnim/InViewAnim'

interface CtaTitleImgProps {
  content: any; // Replace 'any' with the appropriate type
}

export default function CtaTitleImg({content}: CtaTitleImgProps) {
  return(
    <InViewAnim><div className={styles.component}>
      <div className={styles.wrapper}>
        <h5>CTATitleImg</h5>
      </div>
    </div></InViewAnim>
  );
}