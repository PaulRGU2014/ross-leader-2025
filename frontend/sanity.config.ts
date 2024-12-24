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
import {codeInput} from '@sanity/code-input'

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
                    //addHere
                  ])
              ),
            S.listItem()
              .title("Carousel Components")
              .child(
                S.list()
                  .title("Carousel Components")
                  .items([
                    S.documentTypeListItem("gridLinksCarousel"),
                    //associateHere
                  ])
              ),
            S.listItem()
            .title("CTA Components")
            .child(
              S.list()
                .title("CTA Components")
                .items([
                  //assignHere
	S.documentTypeListItem("ctaTitleImg")
                ])
            ),
            S.listItem()
              .title("Other Components")
              .child(
                S.list()
                  .title("Other Components")
                  .items([
                    //appendHere
                  ])
              ),
          ]),
    }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    media(),
    codeInput()
  ],
});
