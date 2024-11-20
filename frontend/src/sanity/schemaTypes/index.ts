import { type SchemaTypeDefinition } from "sanity";
import { pages } from "./pages";
import { footer } from "./footer";
import { hero } from "./hero";
import { header } from "./header";
import { hardcodedBlocks } from "./hardcodedBlocks";
import { gridLinksCarousel } from "./gridLinksCarousel";
import { textTwoImages } from "./textTwoImages";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    hardcodedBlocks,
    footer,
    header,
    hero,
    pages,
    gridLinksCarousel,
    textTwoImages,
  ],
};
