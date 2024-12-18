import '../../../scss/global.scss'
import client from "../../../../client"
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import type { Metadata } from 'next'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export async function generateMetadata(): Promise<Metadata> {
  
  const query = `*[_type=="pages"&& page_url.current=="/shop"]{...,components[]->}`;
  const data = await client.fetch(query);

  if (!data || data.length === 0) {
    return {
      title: 'Default Title', // Fallback title
    };
  }

  return {
    title: data[0].page_title,
  };
}

export default async function Page() {
  const footerQuery = `*[_type=="pages"&& page_url.current=="/shop"]{footer->}`;
  const footerData = await client.fetch(footerQuery);
  const menuData = await client.fetch(`*[_type=="header"]{...}`);
  console.log('footerData', footerData);
  return (
    <>
      <Header content={(menuData as any)[0]} />
      This is the shop
      <Footer content={(footerData as any)[0]} />
      {/* <GoogleAnalytics gaId="G-606GP5V2VM" /> */}
    </>
  );
}