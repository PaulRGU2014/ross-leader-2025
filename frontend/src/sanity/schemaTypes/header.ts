import {defineField, defineType} from 'sanity'

export const header = defineType({
  name: 'header',
  title: 'Menus',
  type: 'document',
  fields: [
    defineField({
      name: 'menu_name',
      title: 'Menu Version',
      type: 'string',
    }),
    defineField({
      name: 'menu_title',
      title: 'Main Title',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
            }),
            defineField({
              name: 'url',
              type: 'string',
            }),
            defineField({
              name: 'sub_menus_1',
              title: 'Sub Menus Level 1',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'title',
                      type: 'string',
                    }),
                    defineField({
                      name: 'url',
                      type: 'string',
                    }),
                    defineField({
                      name: 'sub_menus_2',
                      title: 'Sub Menus Level 2',
                      type: 'array',
                      of: [
                        {
                          type: 'object',
                          fields: [
                            defineField({
                              name: 'title',
                              type: 'string',
                            }),
                            defineField({
                              name: 'url',
                              type: 'string',
                            }),
                          ],
                        },
                      ],
                    }),
                  ],
                }
              ],
            }),
          ],
        }
      ],
    }),
  ],
})