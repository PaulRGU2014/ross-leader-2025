
// import { useEffect, useState } from "react";
import Link from '@/utils/LinkWrapper/LinkWrapper';
import styles from './Footer.module.scss';
import InViewAnim from './../../utils/InViewAnim/InViewAnim'
import { BsTelephone, BsEnvelope, BsFillPinMapFill  } from "react-icons/bs";
import Image from 'next/image';


// get the content from sanity and pass it as props


export default function Footer({ content }: { content?: any }) {

  const currentYear = new Date().getFullYear()

  console.log(content)

  return (
    <InViewAnim><div className={styles.component}>
      <div className={styles.wrapper}>
        <section className={styles.contact}>
          <h6>Contact</h6>
          {content.contact_phone && <div className={styles.info}><BsTelephone /><Link href={`tel:${content.contact_phone}`}>{content.contact_phone}</Link></div>}
          {content.contact_email && <div className={styles.info}><BsEnvelope /><Link href={`mailto:${content.contact_email}`}>{content.contact_email}</Link></div>}
          {content.contact_address && <div className={styles.info}><BsFillPinMapFill /><p>{content.contact_address}</p></div>}
          <div className={styles.social_wrapper}>
            <Link className={styles.social} href='/'><Image src='/socials/facebook.svg' fill alt='facebook icon' /></Link>
            <Link className={styles.social} href='/'><Image src='/socials/instagram.svg' fill alt='instagram icon' /></Link>
            <Link className={styles.social} href='/'><Image src='/socials/linkedin.svg' fill alt='linkedin icon' /></Link>
          </div>
        </section>
        <section className={styles.link_wrapper}>
          <h6>Links</h6>
          <ul className={styles.links}>
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