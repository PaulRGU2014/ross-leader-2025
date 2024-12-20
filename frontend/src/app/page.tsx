import '../scss/global.scss'
import client from "../../client"
import ComponentLoader from '@/components/ComponentLoader'
import Footer from '@/components/Footer/Footer'
import { headers } from 'next/headers'
import Header from '@/components/Header/Header'
import type { Metadata } from 'next'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type FooterDataType = {
  title: string;
  links: { title: string; url: string }[];
};

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

  if (!data) {
    return <div className='loading'>Loading...</div>;
  }

  const menuData = await client.fetch(`*[_type=="header"]{...}`);

  return (
    <>
      <Header content={(menuData as any)[0]} />
      <ComponentLoader components={(data as any[])[0]?.components} />     
      <Footer content={(footerData as any)[0]?.footer} />
    </>
  );
}