import {defineField, defineType} from 'sanity'

export const heroGallery = defineType({
  name: 'heroGallery',
  title: 'HeroGallery',
  type: 'document',
  fields: [
    defineField({
      name: 'info',
      title: 'Component Information',
      type: 'text',
      rows: 3,
      readOnly: true,
      initialValue: 'This component consists of a gallery of hero images and rich-text field.',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      description: 'This title is for reference only and will not be displayed on the website.',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Images',
      validation: Rule => Rule.required().min(12),
      description: 'Accept only .webp format images. Minimum of 12 images required.',
      of: [{
        type: 'image',
        options: {
          accept: 'image/webp',
        },
        fields: [
          {
            name: 'alt',
            title: 'Image Alt Text',
            type: 'string',
            initialValue: 'Image alt text',
            validation: Rule => Rule.required()
          },
        ],
      }],
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