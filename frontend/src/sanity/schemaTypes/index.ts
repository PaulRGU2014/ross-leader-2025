import { type SchemaTypeDefinition } from "sanity";
//importHere
	import { textTwoImages } from './textTwoImages';
	import { fullPageHero } from './fullPageHero';
import { pages } from "./pages";
import { footer } from "./footer";
import { hero } from "./hero";
import { header } from "./header";
import { hardcodedBlocks } from "./hardcodedBlocks";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
  //associateHere
textTwoImages,
fullPageHero,
    hardcodedBlocks,
    footer,
    header,
    hero,
    pages,
  ],
};
