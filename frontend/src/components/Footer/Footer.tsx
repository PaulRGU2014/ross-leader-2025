
// import { useEffect, useState } from "react";
import Link from '@/utils/LinkWrapper/LinkWrapper';
import styles from './Footer.module.scss';
import InViewAnim from './../../utils/InViewAnim/InViewAnim'


// get the content from sanity and pass it as props


export default function Footer({ content }: { content?: any }) {

  const currentYear = new Date().getFullYear()


  return (
    <InViewAnim><div className={styles.component}>
      <div className={styles.wrapper}>
        <div className={styles.disclaimer}>
          <p>© {currentYear} ROSS Leaders. All Rights Reserved.</p>
          <p>ROSS Leaders is a 501(c)(3) nonprofit recognized by the IRS, and all donations to ROSS Leaders are tax deductible in accordance with IRS regulations.</p>
          <p>ROSS Leaders follows a policy of non-discrimination in accordance with the law.</p>
        </div>
      </div>
    </div></InViewAnim>
  )
}