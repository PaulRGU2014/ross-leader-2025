"use client"

import styles from './TextTwoImages.module.scss';
import Image from '@/utils/ImageLoader/ImageLoader';
import InViewAnim from './../../utils/InViewAnim/InViewAnim'

interface TextTwoImagesProps {
  content: any; // Replace 'any' with the appropriate type if known
}

export default function TextTwoImages({content}: TextTwoImagesProps) {

  return(
    <InViewAnim><div className={styles.component}>
      <div className={styles.wrapper}>
        <section className={styles.images}>
          <Image
            className={styles.image1}
            src={content.image1.asset._ref}
            alt={content.image1.alt}
            objectFit="cover"
            objectPosition="left center"
          />
          <Image
            className={styles.image2}
            src={content.image2.asset._ref}
            alt={content.image2.alt}
            objectFit="cover"
            objectPosition="left center"
          />          
        </section>
        <section className={styles.text}>
          <h2>{content.title}</h2>
          <p>{content.text}</p>
        </section>
      </div>
    </div></InViewAnim>
  );
}