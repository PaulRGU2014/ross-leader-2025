"use client"

import styles from './MenuMobile.module.scss';
import React, { useState, useEffect, useRef } from "react";
import Link from '@/utils/LinkWrapper/LinkWrapper';
import Image from 'next/image';

interface MenuMobileProps {
  content: any;
  onClick?: () => void; // Define the onClick prop
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
      <div 
        className={styles.hamburger_first}
      />
      <div 
        className={styles.hamburger_second} 
      />
      <div 
        className={styles.hamburger_third}
      />
    </div>
  );
}

function MenuContent({ content, isMenuOpen, setIsMenuOpen, isMenuOpening, menuRef }: { content: any, isMenuOpen: boolean, setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>, isMenuOpening: boolean, menuRef: React.RefObject<HTMLUListElement> }) {
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
            style={{objectPosition: "center"}} 
          />
        </Link>          
        {content?.menu_list?.map((item: any, index: number) => (
          <li 
            className={`${styles.link} ${isMenuOpen === true ? styles.open : ""}`} 
            key={index} 
            style={{ transitionDelay: isMenuOpening ? `${(index + 1) * 100}ms` : "0ms" }}
            onClick={() => {
              setIsMenuOpen(false);
            }}
          >
            <Link href={item.url}>{item.title}</Link>
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
          <Link className={styles.menuButton} href="https://nonprofit.resilia.com/donate?id=afe31c5e3ed8590474ff96dc2dddb0d649119097fef6cc228cd15ed695ec956f" target='_blank'>Donate</Link>
        </li>
      </ul>
    </div>
  );
}

export default function MenuMobile({ content }: MenuMobileProps) {
  console.log("MenuContent", content);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuOpening, setIsMenuOpening] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const menuRef = useRef<HTMLUListElement>(null);
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
    setInitialLoad(false);
  }, []);

  const menuListNumber = content?.footer_links?.length || 0;

  function handleMenuToggle () {
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
        <MenuContent {...{content, isMenuOpen, setIsMenuOpen, isMenuOpening, menuRef}} />
      </div>
    </div>
  );
}