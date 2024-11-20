import { type SchemaTypeDefinition } from "sanity";
//importHere
	import { fullPageHero } from './fullPageHero';
import { pages } from "./pages";
import { footer } from "./footer";
import { hero } from "./hero";
import { header } from "./header";
import { hardcodedBlocks } from "./hardcodedBlocks";
import { gridLinksCarousel } from "./gridLinksCarousel";
import { textTwoImages } from "./textTwoImages";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
  //associateHere
fullPageHero,
    hardcodedBlocks,
    footer,
    header,
    hero,
    pages,
    gridLinksCarousel,
    textTwoImages,
  ],
};
