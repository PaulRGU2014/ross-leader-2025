import { defineField, defineType } from "sanity";

export const heroHalfPage = defineType({
  name: "heroHalfPage",
  title: "HeroHalfPage",
  type: "document",
  fields: [
    defineField({
      name: "info",
      title: "Component Information",
      type: "text",
      rows: 3,
      readOnly: true,
      initialValue:
        "This half page hero component is used to display a hero image with a title. It can be used to introduce a new section or page.",
    }),
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "media_source",
      title: "Media Source",
      type: "string",
      options: {
        list: [
          { title: "URL", value: "url" },
          { title: "File", value: "file" },
        ],
      },
    }),
    defineField({
      name: "media_type",
      title: "Media Type",
      type: "string",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "Video", value: "video" },
        ],
      },
      hidden: ({ parent }) => parent?.media_source !== "url",
    }),
    defineField({
      name: "media_url",
      title: "Media URL",
      type: "url",
      description:
        "For the best experience, use a video with a 16:9 aspect ratio",
      hidden: ({ parent }) => parent?.media_source !== "url",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https", "mailto", "tel"],
        }),
    }),
    defineField({
      name: "image_file",
      title: "Image File",
      type: "image",
      description:
        "For the best experience, use an image with a 16:9 aspect ratio",
      fields: [
        {
          name: "alt",
          title: "Image Alt Text",
          type: "string",
          validation: (Rule) => Rule.required(),
          initialValue: 'Image alt text',
        },
      ],
      hidden: ({ parent }) => parent?.media_source !== "file",
    }),

    // defineField({
    //   name: 'theme',
    //   type: 'string',
    //   description: 'Description here',
    //   options: {
    //     list: ['light', 'dark'],
    //     layout: 'radio',
    //   },
    //   initialValue: 'light',
    // }),
  ],
});
