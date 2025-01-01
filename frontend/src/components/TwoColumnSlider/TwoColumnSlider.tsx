"use client"

import React, { useState, useEffect, useRef } from 'react';
import styles from './TwoColumnSlider.module.scss';
import InViewAnim from './../../utils/InViewAnim/InViewAnim'
import Slider from "react-slick";
import RichTextUtil from '@/utils/RichText/RichText'
import Image from '@/utils/ImageLoader/ImageLoader';

interface TwoColumnSliderProps {
  content: {
    colors: string[];
    icon?: {
      asset: {
        _ref: string;
      };
      alt?: string;
    };
    title: string;
    body: string;
    slides: {
      title: string;
      subtitle: string;
      desc: string;
    }[];
  };
}

function ArrowPrev(props: { className?: string; style?: React.CSSProperties; onClick?: () => void }) {
  const { className, style, onClick } = props;
  return (
    <div
      className={styles.arrow_prev}
      onClick={onClick}
    >
      <svg width="34" height="34" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.5">
          <path d="M16.4124 32.134L47.8644 0.768967C48.8949 -0.258068 50.5633 -0.256341 51.592 0.77428C52.62 1.80477 52.6173 3.47408 51.5867 4.50191L22.0068 34.0001L51.5878 63.4982C52.6183 64.5262 52.6209 66.1944 51.5931 67.225C51.0774 67.7417 50.4018 68 49.7261 68C49.0523 68 48.3793 67.7434 47.8645 67.2303L16.4124 35.8661C15.9161 35.3723 15.6376 34.7003 15.6376 34.0001C15.6376 33.2999 15.9169 32.6287 16.4124 32.134Z" fill="white" />
        </g>
      </svg>
    </div>
  )
}

function ArrowNext(props: { className?: string; style?: React.CSSProperties; onClick?: () => void }) {
  const { className, style, onClick } = props;
  return (
    <div
      className={styles.arrow_next}
      onClick={onClick}
    >
      <svg width="34" height="34" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.5">
          <path d="M51.5876 32.134L20.1356 0.768967C19.1051 -0.258068 17.4367 -0.256341 16.408 0.77428C15.38 1.80477 15.3827 3.47408 16.4133 4.50191L45.9932 34.0001L16.4122 63.4982C15.3817 64.5262 15.3791 66.1944 16.4069 67.225C16.9226 67.7417 17.5982 68 18.2739 68C18.9477 68 19.6207 67.7434 20.1355 67.2303L51.5876 35.8661C52.0839 35.3723 52.3624 34.7003 52.3624 34.0001C52.3624 33.2999 52.0831 32.6287 51.5876 32.134Z" fill="white" />
        </g>
      </svg>
    </div>
  )
}

export default function SliderColors({ content }: TwoColumnSliderProps) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState<number | undefined>(undefined);
  const sliderRef = useRef<Slider>(null);


  useEffect(() => {
    if (typeof window !== 'undefined') { setScreenWidth(window.outerWidth) }
    const handleResize = () => setScreenWidth(window.outerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const sliderSetting = {
    dots: true,
    dotsClass: styles.dots,
    className: styles.slide_wrapper,
    arrows: false,
    fade: (screenWidth ?? 0) >= 820 ? true : false,
    appendDots: (dots: React.ReactNode) => (
      <div
        className={styles.dots}
      >
        <ul style={{ margin: "0px" }}>
          <ArrowPrev onClick={() => sliderRef.current && sliderRef.current.slickPrev()} />
          {dots}
          <ArrowNext onClick={() => sliderRef.current && sliderRef.current.slickNext()} />
        </ul>
      </div>
    ),
    infinite: true,
    speed: 250,
    slidesToShow: 1,
    slidesToScroll: 1,
    // beforeChange: (current, next) => setActiveSlideIndex(next),
    afterChange: (current: number) => setActiveSlideIndex(current),
  };

  return (
    <InViewAnim><div className={styles.component}>
      <div className={styles.colorsLine}>
        {content.colors?.map((color: string, index: number) => (
          <div
            className={styles.color}
            key={index}
            style={{
              backgroundColor: color,
              height: `calc( 100% / ${content.colors.length} )`
            }}
          />
        ))}
      </div>
      <div className={styles.wrapper}>
        <div
          className={styles.inner}
          style={{
            minHeight: `${content.colors.length * 80}px`,
          }}
        >
          <div className={styles.primary_wrapper}>
            <section className={`${styles.primary} ${styles.isActive}`}>
              {content.icon?.asset._ref &&
                <Image
                  className={styles.icon}
                  src={content.icon?.asset._ref}
                  alt={content.icon?.alt || 'default alt text'}
                  objectFit="contain"
                  objectPosition="top left"
                />
              }
              <h5>
                {content.title}
              </h5>
              <RichTextUtil
                className={styles.desc}
                html={content.body}
              />
            </section>
          </div>
          <div className={styles.colorsLine_mobile}>
            {content?.colors?.map((color, index) => (
              <div
                className={styles.color}
                key={index}
                style={{
                  backgroundColor: color,
                  width: `calc( 100% / ${content.colors.length} )`
                }}
              />
            ))}
          </div>
          <Slider
            ref={sliderRef}
            {...sliderSetting}
          >
            {content.slides.map((slide: { title: string; subtitle: string; desc: any }, index: number) => (
              <div className={styles.slide} key={index}>
                <div className={styles.secondary_wrapper}>
                  <section className={`${styles.secondary} ${activeSlideIndex === index ? styles.isActive : ""}`}>
                    <h6>{slide.title}</h6>
                    <p className={styles.subtitle}
                      // style={{
                      //   color: content.colors[content.colors.length - 1]
                      // }}
                    >
                      {slide.subtitle}
                    </p>
                    <RichTextUtil html={slide.desc} className={styles.desc} />
                  </section>
                </div>
              </div>
            ))
            }
          </Slider>

        </div>
      </div>
    </div></InViewAnim>
  );
}