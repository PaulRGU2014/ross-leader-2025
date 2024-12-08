"use client"

import { useEffect, useState } from "react";
import Link from 'next/link';
import styles from './Footer.module.scss';
import InViewAnim from './../../utils/InViewAnim/InViewAnim'


// get the content from sanity and pass it as props


export default function Footer({ content, pathname }: { content?: any, pathname: string }) {

    const currentYear = new Date().getFullYear()


    return (
        <InViewAnim><div className={styles.component}>
            <div className={styles.wrapper}>
                <div className={styles.inner}>

                    <p>© {currentYear} ROSS Leaders. All Rights Reserved.</p>
                </div>
            </div>
        </div></InViewAnim>
    )
}