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
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && mediaRef.current && videoLoaded) {
      const mediaElement = mediaRef.current;

      const animation = gsap.fromTo(
        mediaElement,
        { scale: 0.4 },
        {
          scale: 1,
          scrollTrigger: {
            trigger: mediaElement,
            start: 'top+=50% bottom',
            end: 'top top',
            scrub: true,
          },
        }
      );

      return () => {
        if (animation.scrollTrigger) {
          animation.scrollTrigger.kill();
        }
        animation.kill();
      };
    }
  }, [isClient, videoLoaded]);

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
            onReady={() => setVideoLoaded(true)}
          />
        </div>
      </div>
    </InViewAnim>
  );
}