"use client"

import React, { useEffect, useState, useCallback, useRef } from 'react';
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
  const [subMenuIndex, setSubMenuIndex] = useState(-1);
  const [screenWidth, setScreenWidth] = useState<number | undefined>(undefined);
  //mobile states
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuOpening, setIsMenuOpening] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

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
    if (typeof window !== 'undefined') { setScreenWidth(window.outerWidth) }
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

  const menuRef = useRef<HTMLUListElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, hamburgerRef]);

  useEffect(() => {
    setTimeout(() => {
      setInitialLoad(false);
    }, 750);
  }, []);

  const menuListNumber = content?.footer_links?.length || 0;

  function handleMenuToggle() {
    if (!isMenuOpen) {
      setIsMenuOpening(true);
      setIsMenuOpen(true);
      setTimeout(() => {
        setIsMenuOpening(false);
      }, menuListNumber * 100 + 100);
    } else {
      setIsMenuOpen(false);
    }
  };

  const handleMenuClick = (event: React.MouseEvent, mainIndex: number, subIndex: number, url: string, hasSubMenus: boolean) => {
    if (hasSubMenus && mainMenuIndex !== mainIndex) {
      event.preventDefault();
      setMainMenuIndex(mainIndex);
    } else if (hasSubMenus && mainMenuIndex === mainIndex && subMenuIndex !== subIndex) {
      event.preventDefault();
      setSubMenuIndex(-1);
    }
    else if (!hasSubMenus) {
      window.location.href = url;
    }
  }

  console.log('mainMenuIndex', mainMenuIndex);
  console.log('subMenuIndex', subMenuIndex);

  return (
    <>
      {screenWidth !== undefined && screenWidth > 920 ?
        <MenuDesktop
          {...{
            content,
            isVisible,
            mainMenuIndex,
            setMainMenuIndex,
            subMenuIndex,
            setSubMenuIndex,
            handleMenuClick
          }}
        />
        :
        <MenuMobile
          {...{
            content,  
            mainMenuIndex, 
            setMainMenuIndex, 
            subMenuIndex, 
            setSubMenuIndex, 
            handleMenuClick,
            isMenuOpen,
            setIsMenuOpen,
            isMenuOpening,
            initialLoad,
            setInitialLoad,
            hamburgerRef,
            menuRef,
            handleMenuToggle
          }}
        />}
    </>
  );
};

export default Header;