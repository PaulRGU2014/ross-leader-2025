"use client"

//importHere
	import RichTextComp from './RichTextComp/RichTextComp';
	import TextTwoImages from './TextTwoImages/TextTwoImages';
	import FullPageHero from './FullPageHero/FullPageHero';
  import Hero from "./Hero/Hero";
  import Footer from "./Footer/Footer";
  import ContactForm from "./ContactForm/ContactForm";

const hardcodedComponents = {
//hardCodedHere
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
	richTextComp: RichTextComp,
	textTwoImages: TextTwoImages,
	fullPageHero: FullPageHero,
  hero: Hero,
  footer: Footer,
  hardcodedBlocks: HardcodedComponent, // Add HardcodedComponent to the componentMap
};

export default function ComponentLoader({ components }: { components: any }) {
  console.log(components);
  if (!components) {
    return null;
  }

  return (
    <>
      {components.map((component: any, index: number) => {
        const Component = componentMap[component._type];
        if (!Component) {
          return <div key={index}>Component not found</div>;
        }
        const componentContent = components.find((d: any) => d._type === component._type); // Match data with component by type

        // Check if the component is a hardcoded component
        if (component._type === "hardcodedBlocks") {
          return <HardcodedComponent key={index} block_title={component.block_title} {...component} />;
        }

        return <Component key={index} {...component} content={componentContent} />;
      })}
    </>
  );
}