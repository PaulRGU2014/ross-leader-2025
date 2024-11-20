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
  ],
})