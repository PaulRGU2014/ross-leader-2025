import {defineField, defineType} from 'sanity'

export const pages = defineType({
  name: 'pages',
  title: 'Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'page_title',
      type: 'string',
    }),
    defineField({
      name: 'page_url',
      type: 'slug',
    }),
    defineField({
      name: 'menu',
      title: 'Menu',
      type: 'reference',
      to: [{type: 'header'}]
    }),
    defineField({
      name: 'components',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
          //associateHere
	{ type : 'heroBannerImg' },
	{ type : 'ctasCarousel' },
  { type : 'gridLinksCarousel' },
	{ type : 'richTextComp' },
	{ type : 'textTwoImages' },
	{ type : 'fullPageHero' },
            {type: 'footer'},
            {type: 'hero'},
            {type: 'hardcodedBlocks'},
          ]
        }
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'reference',
      to: [{type: 'footer'}]
    }),
    defineField({
      name: 'has_sideButton',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'sideButton',
      type: 'object',
      fields: [
        defineField({
          name: 'button_text',
          type: 'string',
          initialValue: 'Donation',
        }),
        defineField({
          name: 'button_url',
          type: 'url',
          initialValue: 'https://donorbox.org/website-donations-362?default_interval=o',
        }),
        defineField({
          name: 'is_external',
          type: 'boolean',
          initialValue: true,
        }),
      ],
      hidden: ({parent}) => !parent.has_sideButton,
    }),
  ],
})