import {defineField, defineType} from 'sanity'

export const fullPageHero = defineType({
  name: 'fullPageHero',
  title: 'Full Page Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
  ],
})