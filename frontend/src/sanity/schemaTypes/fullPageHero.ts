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
          {title: 'URL', value: 'url'},
          {title: 'File', value: 'file'}
        ]
      }
    }),
    defineField({
      name: 'media_url',
      title: 'Media URL',
      type: 'url',
      hidden: ({parent}) => parent?.media_source !== 'url',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https', 'mailto', 'tel']
      })
    }),
    defineField({
      name: 'media_type',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Video', value: 'video'}
        ]
      },
      hidden: ({parent}) => !parent?.media_source,
    }),
    defineField({
      name: 'image_file',
      title: 'Image File',
      type: 'image',
      fields: [
        {
          name: 'alt',
          title: 'Image Alt Text',
          type: 'string',
        },
      ],
      hidden: ({parent}) => parent?.media_source !== 'file' || parent?.media_type !== 'image',
    }),
    defineField({
      name: 'video_file',
      title: 'Video File',
      type: 'file',
      hidden: ({parent}) => parent?.media_source !== 'file' || parent?.media_type !== 'video',
    }),
  ],
})