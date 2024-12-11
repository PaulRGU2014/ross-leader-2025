import { type SchemaTypeDefinition } from "sanity";
//importHere
	import { richTextComp } from './richTextComp';
	import { textTwoImages } from './textTwoImages';
	import { fullPageHero } from './fullPageHero';
import { pages } from "./pages";
import { footer } from "./footer";
import { hero } from "./hero";
import { header } from "./header";
import { hardcodedBlocks } from "./hardcodedBlocks";
import { gridLinksCarousel } from "./gridLinksCarousel";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
  //associateHere
pages,
gridLinksCarousel,
richTextComp,
textTwoImages,
fullPageHero,
    hardcodedBlocks,
    footer,
    header,
    hero,
  ],
};
