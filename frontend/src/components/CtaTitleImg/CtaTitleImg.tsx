"use client"

import styles from './CtaTitleImg.module.scss';
import InViewAnim from './../../utils/InViewAnim/InViewAnim'
import Image from '@/utils/ImageLoader/ImageLoader';

interface CtaTitleImgProps {
  content: any; // Replace 'any' with the appropriate type
}

export default function CtaTitleImg({content}: CtaTitleImgProps) {
  return(
    <InViewAnim><div className={styles.component}>
      <Image
        src={content.image?.asset?._ref}
        alt={content.image?.alt}
        className={styles.image}
      />
      <div className={styles.wrapper}>
        <section className={styles.content}>
          <h3>{content.title}</h3>
          <p>{content.content}</p>
        </section>
        {content?.code?.code && (
        <section className={styles.cta} dangerouslySetInnerHTML={{ __html: content.code.code }} />
        )}
      </div>
    </div></InViewAnim>
  );
}