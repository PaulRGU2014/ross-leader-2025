"use client"

import React, { useState, useEffect } from 'react';
import ContentBubblesDesktop from './ContentBubblesDesktop';
import ContentBubblesMobile from './ContentBubblesMobile';

interface ContentBubblesProps {
  content: any; // Replace 'any' with the appropriate type
}

export default function ContentBubbles({ content }: ContentBubblesProps) {
  const [isClient, setIsClient] = useState(false);
  // const [isDesktop, setIsDesktop] = useState(false);
  const [screenWidth, setScreenWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== 'undefined') { setScreenWidth(window.outerWidth) }
    const handleResize = () => setScreenWidth(window.outerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(() => {
    setTimeout(() => {
      setIsClient(true);
    }, 150);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      {screenWidth !== undefined && screenWidth > 920 ? (
        <ContentBubblesDesktop content={content} />
      ) : <ContentBubblesMobile content={content} />}
    </>
  );
}