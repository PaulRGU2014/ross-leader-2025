import { type SchemaTypeDefinition } from "sanity";
//importHere
	import { contentBubbles } from './contentBubbles';
	import { ctaTitleImg } from './ctaTitleImg';
	import { fullPageZoom } from './fullPageZoom';
	import { heroGallery } from './heroGallery';
	import { heroHalfPage } from './heroHalfPage';
	import { heroBannerImg } from './heroBannerImg';
	import { ctasCarousel } from './ctasCarousel';
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
contentBubbles,
ctaTitleImg,
fullPageZoom,
heroGallery,
heroHalfPage,
heroBannerImg,
fullPageHero,
hero,
ctasCarousel,
gridLinksCarousel,
richTextComp,
textTwoImages,
pages,
header,
footer,
hardcodedBlocks,
  ],
};
