"use client"

import styles from './GridLinksCarousel.module.scss';
import InViewAnim from './../../utils/InViewAnim/InViewAnim'
import Image from '@/utils/ImageLoader/ImageLoader';
import Link from '@/utils/LinkWrapper/LinkWrapper';

interface GridLinksCarouselProps {
  content: any; // Replace 'any' with the appropriate type
}

export default function GridLinksCarousel({content}: GridLinksCarouselProps) {
  return(
    <InViewAnim><div className={styles.component}>
      <div className={styles.wrapper}>
        <h3>{content.title}</h3>
        <div className={styles.carousel}>
          {content.links.map((link: any, index: number) => (
            <Link href={link.url} key={index}>
              <div className={styles.link}>
                <div className={styles.image_wrapper}>
                  <Image
                    className={styles.image}
                    src={link.image.asset._ref}
                    alt={link.image.alt}
                    objectFit="cover"
                    objectPosition="left center"
                  />
                </div>
                <div className={styles.text}>
                  <h4>{link.title}</h4>
                  <p>{link.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div></InViewAnim>
  );
}