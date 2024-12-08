import {defineField, defineType} from 'sanity'

export const richTextComp = defineType({
  name: 'richTextComp',
  title: 'Rich-Text Component',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'maxWidth',
      title: 'Max Width',
      type: 'number',
    }),
    defineField({
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [{type: 'block'}],
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