import React from 'react';
import Link from '@/utils/LinkWrapper/LinkWrapper';
import Image from 'next/image';
import { BsChevronCompactDown } from 'react-icons/bs';
import styles from './Header.module.scss'; // Adjust the path as needed

interface MenuDesktopProps {
  content: any;
  isVisible: boolean;
  mainMenuIndex: number;
  setMainMenuIndex: (index: number) => void;
  hoveredMenuIndex: number | null;
  setHoveredMenuIndex: (index: number | null) => void;
  handleMenuClick: (event: React.MouseEvent<HTMLLIElement>, index: number, url: string) => void;
}

const MenuDesktop: React.FC<MenuDesktopProps> = ({
  content,
  isVisible,
  mainMenuIndex,
  setMainMenuIndex,
  hoveredMenuIndex,
  setHoveredMenuIndex,
  handleMenuClick,
}) => {
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
          {content?.menu_list?.map((menu: any, index: number) => (
            <li 
              key={index} 
              className={styles.menuLink}
              onMouseEnter={() => setMainMenuIndex(index)}
              onMouseLeave={() => setMainMenuIndex(-1)}
              onClick={(event) => handleMenuClick(event, index, menu.url)}
            >
              <Link 
                href={menu.url} 
                className={styles.menuLink_link}
              >
                {menu.title}
                {menu.sub_menus_1 && menu.sub_menus_1.length > 0 && <div className={`${styles.dropdown} ${mainMenuIndex === index ? styles.active : ''}`}><BsChevronCompactDown /></div>}
              </Link>
              {menu?.sub_menus_1 && (
                <ul 
                  className={`${styles.subMenu_wrapper}  ${mainMenuIndex === index ? styles.active : ''}`}
                  style={{
                    height: menu.sub_menus_1.length * 40 + 'px',
                  }}
                >
                  {menu?.sub_menus_1?.map((subMenus1: any, subIndex: number) => (
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

export default MenuDesktop;