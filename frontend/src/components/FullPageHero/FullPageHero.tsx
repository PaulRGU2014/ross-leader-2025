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
      <ReactPlayer 
        className={styles.reactPlayer}
        url={content.media_url}
        loop={true}
        muted={true}
        playing={true}
        playsinline={true}
        width='100%'
        height='100%'
      />
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <h4>{content.title}</h4>
          <h5>{content.subtitle}</h5>
        </div>
      </div>      
    </div></InViewAnim>
  );
}