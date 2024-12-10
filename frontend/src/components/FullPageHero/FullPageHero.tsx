"use client"

import styles from './FullPageHero.module.scss';
import ReactPlayer from 'react-player'
import InViewAnim from './../../utils/InViewAnim/InViewAnim'
import { useState, useEffect } from 'react'

interface FullPageHeroProps {
  content: any; // Replace 'any' with the appropriate type
}

export default function FullPageHero({ content }: FullPageHeroProps) {
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
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <h4>{content.title}</h4>
          <h6>{content.subtitle}</h6>
        </div>
      </div>      
    </div></InViewAnim>
  );
}