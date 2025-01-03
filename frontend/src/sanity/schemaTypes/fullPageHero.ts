import { defineField, defineType } from 'sanity'

export const fullPageHero = defineType({
  name: 'fullPageHero',
  title: 'Full Page Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'media_source',
      title: 'Media Source',
      type: 'string',
      options: {
        list: [
          { title: 'URL', value: 'url' },
          { title: 'File', value: 'file' }
        ]
      }
    }),
    defineField({
      name: 'media_type',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' }
        ]
      },
      hidden: ({ parent }) => parent?.media_source !== 'url',
    }),
    defineField({
      name: 'media_url',
      title: 'Media URL',
      type: 'url',
      description: 'For the best experience, use a video with a 16:9 aspect ratio',
      hidden: ({ parent }) => parent?.media_source !== 'url',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https', 'mailto', 'tel']
      })
    }),
    defineField({
      name: 'hasSubtitle',
      title: 'Video Subtitle',
      type: 'boolean',
      initialValue: true,
      hidden: ({ parent }) => parent?.media_source !== 'url' || parent?.media_type !== 'video',
    }),
    defineField({
      name: 'image',
      title: 'Image File',
      type: 'image',
      description: 'For the best experience, use an image with a 16:9 aspect ratio',
      fields: [
        {
          name: 'alt',
          title: 'Image Alt Text',
          type: 'string',
          validation: Rule => Rule.required(),
          initialValue: 'Image alt text',
        },
      ],
      hidden: ({ parent }) => parent?.media_source !== 'file',
    }),
  ],
})