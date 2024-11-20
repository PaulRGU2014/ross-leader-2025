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
    }),
    defineField({
      name: 'image2',
      type: 'image',
    }),
  ],
})