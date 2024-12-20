import {defineField, defineType} from 'sanity'

export const textTwoImages = defineType({
  name: 'textTwoImages',
  title: 'Text Two Images',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'text',
      type: 'text',
    }),
    defineField({
      name: 'image1',
      type: 'image',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'image2',
      type: 'image',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          validation: (Rule) => Rule.required(),
          initialValue: 'Image alt text',
        },
      ],
    }),
    defineField({
      name: 'theme',
      type: 'string',
      options: {
        list: ['light', 'dark'],
        layout: 'radio',
      },
      initialValue: 'light',
    }),
  ],
})