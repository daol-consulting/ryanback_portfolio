import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings & SEO',
  type: 'document',
  fields: [
    defineField({
      name: 'seoTitle',
      title: 'SEO title',
      type: 'string',
      description: 'Browser tab and search result title. Aim for under 60 characters.',
      validation: (rule) => rule.required().max(70),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO description',
      type: 'text',
      rows: 3,
      description: 'Search result snippet and link preview text. Aim for 120 to 160 characters.',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'ogImage',
      title: 'Social share image',
      type: 'image',
      description: 'Shown when the site is shared. 1200 x 630 works best. Leave empty to use the default.',
    }),
  ],
  preview: {prepare: () => ({title: 'Site settings & SEO'})},
})
