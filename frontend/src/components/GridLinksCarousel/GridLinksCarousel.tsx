"use client"

import React, { useState, useEffect } from 'react';
import styles from './GridLinksCarousel.module.scss';
import InViewAnim from './../../utils/InViewAnim/InViewAnim'
import Image from '@/utils/ImageLoader/ImageLoader';
import Link from '@/utils/LinkWrapper/LinkWrapper';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface GridLinksCarouselProps {
  content: any; // Replace 'any' with the appropriate type
}

export default function GridLinksCarousel({ content }: GridLinksCarouselProps) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const settings = {
    className: styles.carousel,
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };

  if (!isBrowser) {
    return null; // Don't render on server-side
  }
  
  return (
    <InViewAnim><div className={styles.component}>
      <div className={styles.wrapper}>
        <h3>{content.title}</h3>
          <div className={styles.carousel_wrapper}>
            <Slider {...settings}>
            {content.links?.map((link: any, index: number) => (
              <div>
                <Link className={styles.link} href={link.url} key={index}>
                  <Image
                    className={styles.image}
                    src={link.image.asset._ref}
                    alt={link.image.alt}
                    objectFit="cover"
                    objectPosition="left center"
                  />
                  <div className={styles.text}>
                    <h4>{link.title}</h4>
                    <p>{link.description}</p>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
          </div>
      </div>
    </div></InViewAnim>
  );
}