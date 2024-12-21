"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/admin/[[...tool]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { media } from "sanity-plugin-media";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  basePath: "/admin",
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Main")
          .items([
            S.listItem()
              .title("Pages")
              .child(
                S.documentTypeList("pages")
                  .title("Pages")
                  .child((documentId) =>
                    S.document()
                      .documentId(documentId)
                      .schemaType("pages")
                      .views([S.view.form()])
                  )
              ),
            S.listItem()
              .title("Page Components")
              .child(
                S.list()
                  .title("Page Components")
                  .items([
                    S.documentTypeListItem("header"),
                    S.documentTypeListItem("footer"),
                    // Add more page types here
                  ])
              ),
            S.listItem()
              .title("Hero Components")
              .child(
                S.list()
                  .title("Hero Components")
                  .items([
                    S.documentTypeListItem("fullPageHero"),
                    S.documentTypeListItem("fullPageZoom"),
                    S.documentTypeListItem("hero"),
                    S.documentTypeListItem("heroBannerImg"),
                    S.documentTypeListItem("heroGallery"),
                    S.documentTypeListItem("heroHalfPage"),
                    // Add more page types here
                  ])
              ),
            S.listItem()
              .title("Carousel Components")
              .child(
                S.list()
                  .title("Carousel Components")
                  .items([
                    S.documentTypeListItem("gridLinksCarousel"),
                    // Add more blog types here
                  ])
              ),
            // S.listItem()
            //   .title('Media')
            //   .child(
            //     S.list()
            //       .title('Media')
            //       .items([
            //         S.documentTypeListItem('image').title('Images'),
            //         S.documentTypeListItem('video').title('Videos'),
            //         // Add more media types here
            //       ])
            //   ),
            // Add more groups here
          ]),
    }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    media(),
  ],
});
