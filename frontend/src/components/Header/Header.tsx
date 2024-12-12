"use client"

import React, { useEffect, useState, useCallback } from 'react';
import MenuDesktop from './MenuDesktop'; 
import MenuMobile from './MenuMobile/MenuMobile'


interface HeaderProps {
  content: any; 
}

const Header: React.FC<HeaderProps> = ({ content }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);
  const [mainMenuIndex, setMainMenuIndex] = useState(-1);
  const [hoveredMenuIndex, setHoveredMenuIndex] = useState<number | null>(null);
  const [screenWidth, setScreenWidth] = useState<number | undefined>(undefined);

  const controlHeader = useCallback(() => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        // Scroll down
        setIsVisible(false);
      } else {
        // Scroll up
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);

      // Clear the previous timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Set a new timeout to hide the header after 5 seconds of no scroll
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      setScrollTimeout(timeout);
    }
  }, [lastScrollY, scrollTimeout]);

  const handleMouseMove = (event: MouseEvent) => {
    if (event.clientY < 50) {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {setScreenWidth(window.outerWidth)}
    const handleResize = () => setScreenWidth(window.outerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlHeader);
      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('scroll', controlHeader);
        window.removeEventListener('mousemove', handleMouseMove);
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }
      };
    }
  }, [controlHeader, scrollTimeout]);

  const handleMenuClick = (event: React.MouseEvent, index: number, url: string, hasSubMenus: boolean) => {
    if (hasSubMenus && mainMenuIndex !== index) {
      event.preventDefault();
      setMainMenuIndex(index);
    } else if (!hasSubMenus || mainMenuIndex === index) {
      window.location.href = url;
    }
  };

  return (
    <>
      {screenWidth !== undefined && screenWidth > 920 ? 
        <MenuDesktop
        {...{
          content,
          isVisible,
          mainMenuIndex,
          setMainMenuIndex,
          hoveredMenuIndex,
          setHoveredMenuIndex,
          handleMenuClick
        }}
      />
      :
      <MenuMobile 
        {...{
          content
        }}
      />}
    </>
  );
};

export default Header;