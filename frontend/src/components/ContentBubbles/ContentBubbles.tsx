"use client"

import React, { useState, useEffect } from 'react';
import ContentBubblesDesktop from './ContentBubblesDesktop';
import ContentBubblesMobile from './ContentBubblesMobile';
import styles from './ContentBubbles.module.scss';
import InViewAnim from './../../utils/InViewAnim/InViewAnim';
import Image from '@/utils/ImageLoader/ImageLoader';

interface ContentBubblesProps {
  content: any; // Replace 'any' with the appropriate type
}

export default function ContentBubbles({ content }: ContentBubblesProps) {
  const [isClient, setIsClient] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsClient(true);
    }, 150);

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 921);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <InViewAnim>
      {isDesktop ? (
        <ContentBubblesDesktop content={content} />
      ) : <ContentBubblesMobile content={content} />}
    </InViewAnim>
  );
}