"use client"

import Head from "next/head"
import '../scss/global.scss'
import { GoogleAnalytics } from '@next/third-parties/google'
import { CartProvider } from './../utils/CartContext/CartContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body suppressHydrationWarning={true}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
      {/* <GoogleAnalytics gaId="G-606GP5V2VM" /> */}
    </html>
  )
}