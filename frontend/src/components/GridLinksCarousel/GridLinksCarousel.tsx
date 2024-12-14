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
  const [activeLinkIndex, setActiveLinkIndex] = useState<number | null>(null);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const settings = {
    className: styles.carousel,
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1
  };

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, index: number) => {
    if (activeLinkIndex !== index) {
      event.preventDefault();
      setActiveLinkIndex(index);
    }
  };

  if (!isBrowser) {
    return null; // Don't render on server-side
  }

  return (
    <InViewAnim>
      <div className={styles.component}>
        <div className={styles.wrapper}>
          <h3>{content.title}</h3>
          <div className={styles.carousel_wrapper}>
            <Slider {...settings}>
              {content.links?.map((link: any, index: number) => (
                <Link 
                  key={index} 
                  className={styles.link} 
                  href={link.link}
                  onClick={(event) => handleLinkClick(event, index)}
                >
                  <div className={`${styles.card} ${index % 2 === 0 ? styles.even : styles.odd}`}>
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
                  </div>
                </Link>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </InViewAnim>
  );
}