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

  useEffect(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth);
    }
  }, []);

  return (
    <div 
      ref={buttonRef}         
      className={styles.donateButton}
      style={{
        top: `calc((50% - ${buttonWidth / 2}px))`
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