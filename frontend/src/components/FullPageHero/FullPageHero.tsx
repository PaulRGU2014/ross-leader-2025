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
          volume={0.8}
          config={{
            youtube: {
              playerVars: {
                showinfo: 0,
                modestbranding: 1,
                rel: 0,
                loop: 1,
                controls: 0,
                autoplay: 1,
                playsinline: 1,
                cc_lang_pref: 'en',
                cc_load_policy: content.hasSubtitle ? 1 : 0,
              }
            }
          }}
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