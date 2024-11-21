"use client"

import styles from './FullPageHero.module.scss';

interface FullPageHeroProps {
  content: any; // Replace 'any' with the appropriate type
}

export default function FullPageHero({ content }: FullPageHeroProps) {
  return(
    <div className={styles.component}>
      <h5>FullPageHero</h5>
    </div>
  );
}