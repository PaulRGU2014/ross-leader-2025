"use client"

import { useEffect, useState } from "react";
import Link from 'next/link';
import styles from './Footer.module.scss';
import InViewAnim from './../../utils/InViewAnim/InViewAnim'


// get the content from sanity and pass it as props


export default function Footer({ content, pathname }: { content?: any, pathname: string }) {
    const [isClient, setIsClient] = useState(false)
    const [isHomePage, setIsHomePage] = useState<boolean>()

    const currentYear = new Date().getFullYear()

    useEffect(() => {
        setIsClient(typeof window !== 'undefined')
        if (pathname === "/") {
            setIsHomePage(true)
        } else {
            setIsHomePage(false)
        }
        return (() => {
            setIsClient(false)
            setIsHomePage(false)
        })
    }, [, pathname])

    useEffect(() => {
        if (pathname === "/") {
            setIsHomePage(true)
        } else {
            setIsHomePage(false)
        }
    }, [, pathname])

    console.log('isHomePage', isHomePage)

    return (
        <InViewAnim><div className={styles.component}>
            <div className={styles.wrapper}>
                <div className={styles.inner}>
                    {!isHomePage &&
                        <ul className={styles.link_wrapper}>
                            {!!content && content.footer_links?.map((item: any, index: number) => (
                                <li key={index}>
                                    <Link className={styles.link} href={item.link_url}>{item.link_title}</Link>
                                </li>
                            ))}
                        </ul>}
                    <div className={styles.social_wrapper}>
                        {/* <Link href="https://github.com/PaulRGU2014" className={styles.social} target="_blank">
                            <img src="/socials/github.svg" alt="Github" />
                        </Link>
                        <Link href="https://www.linkedin.com/in/paulrgu2014/" className={styles.social} target="_blank">
                            <img src="/socials/linkedin.svg" alt="LinkedIn" />
                        </Link>
                        <Link href="https://www.instagram.com/krupaul.store" className={styles.social} target="_blank">
                            <img src="/socials/instagram.svg" alt="Instagram" />
                        </Link>
                        <Link href="https://www.youtube.com/c/PaulsChemistryThailand" className={styles.social} target="_blank">
                            <img src="/socials/youtube.svg" alt="Youtube" />
                        </Link> */}
                    </div>
                    <p>© {currentYear} ROSS Leaders. All Rights Reserved.</p>
                </div>
            </div>
        </div></InViewAnim>
    )
}