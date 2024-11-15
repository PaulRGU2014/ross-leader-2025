import '../scss/global.scss'
import styles from './page.module.scss'
import client from "../../client"
import ComponentLoader from '@/components/ComponentLoader'
import MenuNav from '@/components/Menus/Menus'
import Footer from '@/components/Footer/Footer'
import { headers } from 'next/headers'
import Header from '@/components/Header/Header'
import InViewAnim from '@/utils/InViewAnim/InViewAnim'
import Link from 'next/link'

type FooterDataType = {
  // Define the structure of your footer data here
  // Example:
  title: string;
  links: { title: string; url: string }[];
};

export default async function Page() {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';

  const query = `*[_type=="pages"&& page_url.current=="${pathname}"]{...,components[]->}`;
  const footerQuery = `*[_type=="footer"]{...}`;
  const data = await client.fetch(query);
  const footerData = await client.fetch(footerQuery);
  if (!data) {
    return <div className='loading'>Loading...</div>;
  }
  const menuData = await client.fetch(`*[_type=="header"]{...}`);


  return (
    <InViewAnim>
      <div className={styles.menuBurger}><MenuNav content={(menuData as any)[0]} /></div>
      <Header content={(menuData as any)[0]} />
      <ComponentLoader components={(data as any[])[0]?.components} />     
      <Footer content={(footerData as any)[0]} pathname={pathname} />
    </InViewAnim>
  );
}