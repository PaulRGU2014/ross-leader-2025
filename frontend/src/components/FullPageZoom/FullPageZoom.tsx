"use client"

import styles from './FullPageZoom.module.scss';
import InViewAnim from './../../utils/InViewAnim/InViewAnim'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactPlayer from 'react-player'
import { useState, useEffect } from 'react'


gsap.registerPlugin(ScrollTrigger);

interface FullPageZoomProps {
  content: any; // Replace 'any' with the appropriate type
}

export default function FullPageZoom({content}: FullPageZoomProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return(
    <InViewAnim><div className={styles.component}>
      <div className={styles.media}>
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
    </div></InViewAnim>
  );
}