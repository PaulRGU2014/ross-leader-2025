import {defineField, defineType} from 'sanity'

export const twoColumnSlider = defineType({
  name: 'twoColumnSlider',
  title: 'TwoColumnSlider',
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
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      options: {
        accept: 'image/webp, image/svg+xml',
      },
      description: 'Accept only .webp or .svg format image.',
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
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'slides',
      title: 'Slides',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
            }),
            defineField({
              name: 'desc',
              title: 'Description',
              type: 'array',
              of: [{type: 'block'}],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'colors',
      title: 'Colors',
      type: 'array',
      of: [{type: 'string'}],
      initialValue: ['#2D3C58', '#86A96B', '#D18810', '#BBBDBF', '#3F687B', '#5BBDEB', '#F05133'],
    }),
  ],
})