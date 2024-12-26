import {defineField, defineType} from 'sanity'

export const contentBubbles = defineType({
  name: 'contentBubbles',
  title: 'ContentBubbles',
  type: 'document',
  fields: [
    defineField({
      name: 'info',
      title: 'Component Information',
      type: 'text',
      rows: 3,
      readOnly: true,
      initialValue: 'Component Information Description',
    }),
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'title',
            type: 'string',
          }),
          defineField({
            name: 'array',
            type: 'array',
            of: [{
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  type: 'string',
                }),
                defineField({
                  name: 'content',
                  type: 'text',
                  rows: 3,
                }),
                defineField({
                  name: 'image',
                  type: 'image',
                  options: {
                    accept: 'image/webp',
                  },
                  description: 'Accept only .webp format image.',
                  fields: [
                    {
                      name: 'alt',
                      title: 'Image Alt Text',
                      type: 'string',
                      validation: Rule => Rule.required(),
                      initialValue: 'Image alt text',
                    },
                  ],
                }),
              ],
            }],
          }),
        ],
      }],
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
})