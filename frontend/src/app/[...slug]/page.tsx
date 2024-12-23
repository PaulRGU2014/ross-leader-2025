import '../../scss/global.scss'
import client from "../../../client"
import ComponentLoader from '@/components/ComponentLoader'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import ErrorComponent from '@/utils/ErrorComponent/ErrorComponent'
import { headers } from 'next/headers'
import { GoogleAnalytics } from '@next/third-parties/google'
import DonateButton from '@/utils/DonateButton/DonateButton'
import type { Metadata } from 'next'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  
  const query = `*[_type=="pages"&& page_url.current=="${pathname}"]{...,components[]->}`;
  const data = await client.fetch(query);

  if (!data || data.length === 0) {
    return {
      title: 'Default Title', // Fallback title
    };
  }

  return {
    title: `${data[0].page_title} | ROSS Leaders`,
  };
}

export default async function Page() {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  const query = `*[_type=="pages"&& page_url.current=="${pathname}"]{...,components[]->}`;
  const footerQuery = `*[_type=="pages"&& page_url.current=="${pathname}"]{footer->}`;
  const data = await client.fetch(query);
  const footerData = await client.fetch(footerQuery);
  const menuData = await client.fetch(`*[_type=="pages"&& page_url.current=="${pathname}"]{menu->}`);
  const defaultMenuData = await client.fetch(`*[_type=="header"]{...}`);
  const defaultFooterData = await client.fetch(`*[_type=="footer"]{...}`);
  
  if (!data || data.length === 0) {
    return (
    <>
      <Header content={(defaultMenuData as any)[0]} />
      <ErrorComponent status={404} />
      <Footer content={(defaultFooterData as any)[0]} />
    </>
  )}

  return (
    <>
      <Header content={(menuData as any)[0]?.menu} />
      <DonateButton content={(data as any)[0]?.sideButton} />
      <ComponentLoader components={(data as any[])[0]?.components} />
      <Footer content={(footerData as any)[0]?.footer} />
      {/* <GoogleAnalytics gaId="G-606GP5V2VM" /> */}
    </>
  );
}