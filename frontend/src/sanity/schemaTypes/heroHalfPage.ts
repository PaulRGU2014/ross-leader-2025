import {defineField, defineType} from 'sanity'

export const heroHalfPage = defineType({
  name: 'heroHalfPage',
  title: 'HeroHalfPage',
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
      name: 'theme',
      type: 'string',
      description: 'Description here',
      options: {
        list: ['light', 'dark'],
        layout: 'radio',
      },
      initialValue: 'light',
    }),
  ],
})