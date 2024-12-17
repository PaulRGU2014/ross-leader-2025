"use client"

import styles from './MenuMobile.module.scss';
import React, { useState, useEffect, useRef } from "react";
import Link from '@/utils/LinkWrapper/LinkWrapper';
import Image from 'next/image';
import { BsChevronCompactDown } from 'react-icons/bs';

interface MenuMobileProps {
  content: any;
  handleMenuClick: (event: React.MouseEvent<HTMLLIElement | HTMLAnchorElement>, index: number, url: string, hasSubMenus: boolean) => void;
}

function Hamburger({ isMenuOpen, hamburgerRef, onClick, initialLoad }: { isMenuOpen: boolean, hamburgerRef: React.RefObject<HTMLDivElement>, onClick?: () => void, initialLoad: boolean }) {
  return (
    <div
      ref={hamburgerRef}
      className={`${styles.hamburger_wrapper} ${isMenuOpen ? styles.open : ""} ${initialLoad ? styles.initialLoad : ""}`}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      <div className={styles.hamburger_first} />
      <div className={styles.hamburger_second} />
      <div className={styles.hamburger_third} />
    </div>
  );
}

interface MenuContentProps {
  content: any;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMenuOpening: boolean;
  menuRef: React.RefObject<HTMLUListElement>;
  mainMenuIndex: number;
  setMainMenuIndex: (index: number) => void;
  handleMenuClick: (event: React.MouseEvent<HTMLLIElement | HTMLAnchorElement>, index: number, url: string, hasSubMenus: boolean) => void;
}

function MenuContent({
  content,
  isMenuOpen,
  setIsMenuOpen,
  isMenuOpening,
  menuRef,
  mainMenuIndex,
  setMainMenuIndex,
  handleMenuClick
}: MenuContentProps) {
  const [hoveredMenuIndex, setHoveredMenuIndex] = useState<number | null>(null);

  return (
    <div className={isMenuOpen ? styles.inner : styles.inner_close}>
      <ul className={styles.content} ref={menuRef}>
        <Link href="/" className={styles.logo_main}>
          <Image
            src="/Logo_Menu.png"
            alt="Logo"
            width={120}
            height={120}
            priority={true}
            style={{ objectPosition: "center" }}
          />
        </Link>
        {content?.menu_list?.map((item: any, index: number) => (
          <li
            className={`${styles.link} ${isMenuOpen === true ? styles.open : ""}`}
            key={index}
            style={{ transitionDelay: isMenuOpening ? `${(index + 1) * 100}ms` : "0ms" }}
            onMouseEnter={() => setMainMenuIndex(index)}
            onMouseLeave={() => setMainMenuIndex(-1)}
            onClick={(event) => handleMenuClick(event, index, item.url, !!item.sub_menus_1)}
          >
            <Link
              href={item.url}
              onClick={(event) => handleMenuClick(event, index, item.url, !!item.sub_menus_1)}
            >
              {item.title}{item.sub_menus_1 && item.sub_menus_1.length > 0 && <div className={`${styles.dropdown} ${mainMenuIndex === index ? styles.active : ''}`}><BsChevronCompactDown /></div>}
            </Link>
            {item?.sub_menus_1 && (
              <ul className={`${styles.subMenu_wrapper} ${mainMenuIndex === index ? styles.active : ''}`}>
                {item?.sub_menus_1?.map((subMenus1: any, subIndex: number) => (
                  <li 
                    key={subIndex} 
                    className={`${styles.subMenu}`}
                    onMouseEnter={() => setHoveredMenuIndex(index)}
                    onMouseLeave={() => setHoveredMenuIndex(null)}
                    onClick={(event) => handleMenuClick(event, subIndex, subMenus1.url, !!subMenus1.sub_menus_2)}
                  >
                    <Link 
                      href={subMenus1.url} 
                      className={styles.subMenu_link}
                      onClick={(event) => handleMenuClick(event, subIndex, subMenus1.url, !!subMenus1.sub_menus_2)}
                    >
                      {subMenus1.title}
                      {subMenus1.sub_menus_2 && subMenus1.sub_menus_2.length > 0 && <div className={`${styles.dropdown} ${hoveredMenuIndex === index ? styles.active : ''}`}><BsChevronCompactDown /></div>}
                    </Link>
                    {subMenus1?.sub_menus_2 && (
                      <ul className={`${styles.subMenu_wrapper} ${hoveredMenuIndex === index ? styles.active : ''}`}>
                        {subMenus1?.sub_menus_2?.map((subMenus2: any, subIndex2: number) => (
                          <li 
                            key={subIndex2} 
                            className={styles.subMenu}
                            onClick={(event) => handleMenuClick(event, subIndex2, subMenus2.url, false)}
                          >
                            <Link 
                              href={subMenus2.url} 
                              className={styles.subMenu_link}
                              onClick={(event) => handleMenuClick(event, subIndex2, subMenus2.url, false)}
                            >
                              {subMenus2.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
        <li
          className={styles.menuButton_wrapper}
          style={{
            transitionDelay: isMenuOpening ? `${(content.menu_list?.length + 4) * 100}ms` : "0ms",
            transform: isMenuOpen ? "translateY(0px)" : "translateY(20px)",
            opacity: isMenuOpen ? 1 : 0
          }}
          onClick={() => {
            setIsMenuOpen(false);
          }}
        >
          <Link className={styles.menuButton} href={content?.menu_btn?.btn_url} target={content?.menu_btn?.is_external === true ? "_blank" : "_self"}>{content?.menu_btn?.btn_text}</Link>
        </li>
      </ul>
    </div>
  );
}

export default function MenuMobile({ content, handleMenuClick }: MenuMobileProps) {
  console.log("MenuContent", content);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuOpening, setIsMenuOpening] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const menuRef = useRef<HTMLUListElement>(null);
  const [mainMenuIndex, setMainMenuIndex] = useState(-1);
  const hamburgerRef = useRef<HTMLDivElement>(null);

  // This is the handle click outside function
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

  return (
    <div
      className={`${styles.component} ${!isMenuOpen ? styles.component_close : ""}`}
    >
      <div
        className={`${styles.wrapper} ${isMenuOpen ? styles.open : ""}`}
      >
        <Hamburger isMenuOpen={isMenuOpen} hamburgerRef={hamburgerRef} onClick={handleMenuToggle} initialLoad={initialLoad} />
        <MenuContent {...{ content, isMenuOpen, setIsMenuOpen, isMenuOpening, menuRef, mainMenuIndex, setMainMenuIndex, handleMenuClick }} />
      </div>
    </div>
  );
}