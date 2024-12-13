import {defineField, defineType} from 'sanity'

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'footer_title',
      type: 'string',
    }),
    defineField({
      name: 'contact_phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'contact_email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'contact_address',
      type: 'text',
      title: 'Address',
    }),
    defineField({
      name: 'footer_links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'link_title',
              type: 'string',
            }),
            defineField({
              name: 'link_url',
              type: 'string',
            }),
          ],
        }
      ],
    }),
  ],
})