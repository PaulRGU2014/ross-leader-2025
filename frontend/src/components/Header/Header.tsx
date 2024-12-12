"use client"

import React, { useState } from 'react';
import MenuDesktop from './MenuDesktop'; // Adjust the path as needed
import styles from './Header.module.css'; // Adjust the path as needed

interface HeaderProps {
  content: any; // Adjust the type as needed
}

const Header: React.FC<HeaderProps> = ({ content }) => {
  const [mainMenuIndex, setMainMenuIndex] = useState<number>(-1);
  const [hoveredMenuIndex, setHoveredMenuIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const handleMenuClick = (event: React.MouseEvent<HTMLLIElement>, index: number, url: string) => {
    // Handle menu click
  };

  return (
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
  );
};

export default Header;