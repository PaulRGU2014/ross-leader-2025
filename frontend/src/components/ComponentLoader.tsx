"use client"

//importHere
	import TwoColumnSlider from './TwoColumnSlider/TwoColumnSlider';
	import ContentBubbles from './ContentBubbles/ContentBubbles';
	import CtaTitleImg from './CtaTitleImg/CtaTitleImg';
	import FullPageZoom from './FullPageZoom/FullPageZoom';
	import HeroGallery from './HeroGallery/HeroGallery';
	import HeroHalfPage from './HeroHalfPage/HeroHalfPage';
	import Checkout from './Checkout/Checkout';
	import HeroBannerImg from './HeroBannerImg/HeroBannerImg';
  import Shopify from './Shopify/Shopify';
	import CtasCarousel from './CtasCarousel/CtasCarousel';
	import RichTextComp from './RichTextComp/RichTextComp';
	import TextTwoImages from './TextTwoImages/TextTwoImages';
	import FullPageHero from './FullPageHero/FullPageHero';
  import Hero from "./Hero/Hero";
  import Footer from "./Footer/Footer";
  import ContactForm from "./ContactForm/ContactForm";
  import GridLinksCarousel from './GridLinksCarousel/GridLinksCarousel';

const hardcodedComponents = {
//hardCodedHere
	checkout: Checkout,
  shopify: Shopify,
  contactForm: ContactForm,
};

function HardcodedComponent ({ block_title, ...props }: { block_title: keyof typeof hardcodedComponents }) {
  const Component = hardcodedComponents[block_title];
  if (!Component) {
    return <div>Component not found</div>;
  }
  return <Component {...props} />
}

const componentMap: { [key: string]: React.ComponentType<any> } = {
//associateHere
	twoColumnSlider: TwoColumnSlider,
	contentBubbles: ContentBubbles,
	ctaTitleImg: CtaTitleImg,
	fullPageZoom: FullPageZoom,
	heroGallery: HeroGallery,
	heroHalfPage: HeroHalfPage,
	heroBannerImg: HeroBannerImg,
	ctasCarousel: CtasCarousel,
  gridLinksCarousel: GridLinksCarousel,
	richTextComp: RichTextComp,
	textTwoImages: TextTwoImages,
	fullPageHero: FullPageHero,
  hero: Hero,
  footer: Footer,
  hardcodedBlocks: HardcodedComponent, // Add HardcodedComponent to the componentMap
};

export default function ComponentLoader({ components }: { components: any }) {

  if (!components) {
    return null;
  }

  console.log(components);

  return (
    <>
      {components.map((component: any, index: number) => {
        const Component = componentMap[component._type];
        if (!Component) {
          return <div key={index}>Component not found</div>;
        }
        const componentContent = components.find((d: any) => d._type === component._type && d._id === component._id); // Match data with component by type

        // Check if the component is a hardcoded component
        if (component._type === "hardcodedBlocks") {
          return <HardcodedComponent key={index} block_title={component.block_title} {...component} />;
        }

        return <Component key={component._id} {...component} content={componentContent} />;
      })}
    </>
  );
}