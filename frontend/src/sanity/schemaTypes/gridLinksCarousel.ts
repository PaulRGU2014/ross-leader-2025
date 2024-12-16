import {defineField, defineType} from 'sanity'

export const gridLinksCarousel = defineType({
  name: 'gridLinksCarousel',
  title: 'Grid Links Carousel',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              type: 'text',
            }),
            defineField({
              name: 'link',
              type: 'string',
            }),
            defineField({
              name: 'image',
              type: 'image',
              fields: [
                {
                  name: 'alt',
                  title: 'Image Alt Text',
                  type: 'string',
                  validation: Rule => Rule.required()
                },
              ],
            }),
          ],
        },
      ],
      validation: Rule => Rule.custom(links => {
        if (links && links.length % 2 !== 0) {
          return 'Number of links must be even';
        }
        return true;
      }),
    }),
  ],
})