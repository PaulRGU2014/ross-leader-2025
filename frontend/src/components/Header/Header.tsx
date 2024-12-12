"use client"

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.scss';
import { BsChevronCompactDown } from "react-icons/bs";

const Header = ({ content }: { content: any }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);
  const [mainMenuIndex, setMainMenuIndex] = useState(-1);
  const [hoveredMenuIndex, setHoveredMenuIndex] = useState<number | null>(null);

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

  const handleMenuClick = (event: React.MouseEvent, index: number, url: string) => {
    if (hoveredMenuIndex === index) {
      window.location.href = url;
    } else {
      event.preventDefault();
      setHoveredMenuIndex(index);
    }
  };

  return (
    <header className={`${styles.header} ${isVisible ? styles.visible : styles.hidden}`}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logo_main}>
            <Image 
              src="/Logo_Menu.png" 
              alt="Logo" 
              width={80} 
              height={80} 
              priority={true}
              style={{objectPosition: "center"}} 
            />
          </Link>
        </div>
        <ul className={styles.menuLink_wrapper}>
          {content.menu_list.map((menu: any, index: number) => (
            <li 
              key={index} 
              className={styles.menuLink}
              onMouseEnter={() => setMainMenuIndex(index)}
              onMouseLeave={() => setMainMenuIndex(-1)}
              onClick={(event) => handleMenuClick(event, index, menu.url)}
            >
              <Link href={menu.url} className={styles.menuLink_link}>{menu.title}&nbsp;&nbsp;&nbsp;{menu.sub_menus_1 && menu.sub_menus_1.length > 0 && <BsChevronCompactDown />}</Link>
              {menu.sub_menus_1 && (
                <ul 
                  className={`${styles.subMenu_wrapper}  ${mainMenuIndex === index ? styles.active : ''}`}
                  style={{
                    height: menu.sub_menus_1.length * 40 + 'px',
                  }}
                >
                  {menu.sub_menus_1.map((subMenus1: any, subIndex: number) => (
                    <li 
                      key={subIndex} 
                      className={`${styles.subMenu}`}
                      onMouseEnter={() => setHoveredMenuIndex(index)}
                      onMouseLeave={() => setHoveredMenuIndex(null)}
                    >
                      <Link href={subMenus1.url} className={styles.subMenu_link}>{subMenus1.title}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <Link className={styles.menuButton} href="https://nonprofit.resilia.com/donate?id=afe31c5e3ed8590474ff96dc2dddb0d649119097fef6cc228cd15ed695ec956f" target='_blank'>Donate</Link>
      </div>
    </header>
  );
};

export default Header;