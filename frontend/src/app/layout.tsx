"use client"

import Head from "next/head"
import '../scss/global.scss'
import { GoogleAnalytics } from '@next/third-parties/google'
import { CartProvider } from './../utils/CartContext/CartContext';
import CookieBanner from './../utils/CookieBanner/CookieBanner';

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body suppressHydrationWarning={true}>
        <CartProvider>
          {children}
          <CookieBanner />
        </CartProvider>
      </body>
      {/* <GoogleAnalytics gaId="G-606GP5V2VM" /> */}
    </html>
  )
}