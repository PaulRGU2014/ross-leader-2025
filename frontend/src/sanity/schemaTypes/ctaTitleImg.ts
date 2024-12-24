import {defineField, defineType} from 'sanity'

export const ctaTitleImg = defineType({
  name: 'ctaTitleImg',
  title: 'CTATitleImg',
  type: 'document',
  fields: [
    defineField({
      name: 'info',
      title: 'Component Information',
      type: 'text',
      rows: 3,
      readOnly: true,
      initialValue: 'This component consists of a Call to Action (CTA) with a content and an image.',
    }),
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
    }),
    defineField({
      name: 'hasCode',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'code',
      type: 'code',
      options: {
        language: 'javascript',
        languageAlternatives: [
          {title: 'Javascript', value: 'javascript'},
          {title: 'HTML', value: 'html'},
          {title: 'CSS', value: 'css'},
        ],
      },
      hidden: ({document}) => !(document?.hasCode),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'url',
          title: 'URL',
          type: 'string',
        }),
        defineField({
          name: 'newTab',
          title: 'Open in new tab ?',
          type: 'boolean',
          initialValue: false,
        }),
      ],
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