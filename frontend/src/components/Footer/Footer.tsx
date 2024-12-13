
// import { useEffect, useState } from "react";
import Link from '@/utils/LinkWrapper/LinkWrapper';
import styles from './Footer.module.scss';
import InViewAnim from './../../utils/InViewAnim/InViewAnim'
import { BsTelephone, BsEnvelope, BsFillPinMapFill  } from "react-icons/bs";


// get the content from sanity and pass it as props


export default function Footer({ content }: { content?: any }) {

  const currentYear = new Date().getFullYear()


  return (
    <InViewAnim><div className={styles.component}>
      <div className={styles.wrapper}>
        <section className={styles.column}>
          <h6>Contact</h6>
          <div className={styles.info}><BsTelephone /><Link href='/'>{content.contact_phone}</Link></div>
          <div className={styles.info}><BsEnvelope /><Link href='/'>{content.contact_email}</Link></div>
          <div className={styles.info}><BsFillPinMapFill /><Link href='/'>{content.contact_address}</Link></div>
          <div className={styles.social_wrapper}>
            <Link className={styles.social} href='/'><img src='/socials/facebook.svg' alt='facebook icon' /></Link>
            <Link className={styles.social} href='/'><img src='/socials/instagram.svg' alt='instagram icon' /></Link>
            <Link className={styles.social} href='/'><img src='/socials/linkedin.svg' alt='linkedin icon' /></Link>
          </div>
        </section>
        <section className={styles.links}>
          <h6>Links</h6>
          <ul>
            {content?.footer_links?.map((link: any, index: number) => (
              <li key={index}><Link className={styles.link} href={link.link_url}>{link.link_title}</Link></li>
            ))}
          </ul>
        </section>
        <div className={styles.disclaimer}>
          <p>© {currentYear} ROSS Leaders. All Rights Reserved.</p>
          <p>ROSS Leaders is a 501(c)(3) nonprofit recognized by the IRS, and all donations to ROSS Leaders are tax deductible in accordance with IRS regulations.</p>
          <p>ROSS Leaders follows a policy of non-discrimination in accordance with the law.</p>
        </div>
      </div>
    </div></InViewAnim>
  )
}