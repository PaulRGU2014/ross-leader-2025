import {defineField, defineType} from 'sanity'

export const hardcodedBlocks = defineType({
  name: 'hardcodedBlocks',
  title: 'Hardcoded Blocks',
  type: 'document',
  fields: [
    defineField({
      name: 'info',
      title: 'Component Information',
      type: 'text',
      rows: 3,
      readOnly: true,
      initialValue: 'Hardcoded blocks are components that are not created in the CMS, but are hardcoded into the frontend. This document type is used to render these components.',
    }),
    defineField({
      name: 'block_title',
      type: 'string',
    }),
  ],
})
  