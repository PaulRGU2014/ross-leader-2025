"use client"

import styles from './RichTextComp.module.scss';
import InViewAnim from './../../utils/InViewAnim/InViewAnim'
import RichTextUtil from './../../utils/RichText/RichText'

interface RichTextCompProps {
  content: any; // Replace 'any' with the appropriate type
}

export default function RichTextComp({content}: RichTextCompProps) {
  return(
    <InViewAnim>
      <div className={styles.component}>
        <div className={styles.wrapper}>
          { !!content.maxWidth ? 
            <div style={{maxWidth : `${content.maxWidth}px`}}>
              <RichTextUtil  html={content.content} className={styles.component}/>
            </div>
            :
            <div style={{maxWidth : '645px'}}>
              <RichTextUtil  html={content.content} className={styles.component}/>
            </div>
          }
        </div>
      </div>
    </InViewAnim>
  );
}