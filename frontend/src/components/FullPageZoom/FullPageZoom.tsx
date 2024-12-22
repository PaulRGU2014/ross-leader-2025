"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ReactPlayer from 'react-player';
import InViewAnim from './../../utils/InViewAnim/InViewAnim';
import styles from './FullPageZoom.module.scss';

gsap.registerPlugin(ScrollTrigger);

export default function FullPageZoom({ content }: { content: any }) {
  const mediaRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && mediaRef.current) {
      gsap.fromTo(
        mediaRef.current,
        { scale: 0.3 },
        {
          scale: 1,
          scrollTrigger: {
            trigger: mediaRef.current,
            start: 'top+=50% bottom',
            end: 'top top',
            scrub: true,
          },
        }
      );
    }
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <InViewAnim>
      <div className={styles.component}>
        <div className={styles.media} ref={mediaRef}>
          <ReactPlayer
            className={styles.reactPlayer}
            url={content.media_url}
            loop={true}
            muted={true}
            playing={true}
            playsinline={true}
            width='177vh'
            height='100%'
          />
        </div>
      </div>
    </InViewAnim>
  );
}