"use client"

import Link from "../LinkWrapper/LinkWrapper";
import styles from "./DonateButton.module.scss";
import React, { useEffect, useRef, useState } from "react";
import { BsHeart } from "react-icons/bs";

interface DonateButtonProps {
  content: any; // Adjust the type as needed
}

export default function DonateButton({ content }: DonateButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [buttonWidth, setButtonWidth] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth);
    }

    const handleScroll = () => {
      setIsHidden(true);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setIsHidden(false);
      }, 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={buttonRef}
      className={styles.donateButton}
      style={{
        top: `calc((50% - ${buttonWidth / 2}px))`,
        transform: isHidden ? 'translateX(-100%) rotate(90deg)' : 'translateX(0) rotate(90deg)',
        transition: 'transform 0.3s ease-in-out'
      }}
    >
      <Link
        href={content.button_url}
        target={!!content.is_external ? "_blank" : "_self"}
      >
        <BsHeart />&nbsp;&nbsp;&nbsp;
        {content.button_text}
      </Link>
    </div>
  );
}