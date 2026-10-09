import {defineField, defineType} from 'sanity'

export const careerEntry = defineType({
  name: 'careerEntry',
  title: 'Career entry',
  type: 'document',
  fields: [
    defineField({name: 'companyName', title: 'Company', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'roleTitle', title: 'Role', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'period', title: 'Period', type: 'string', description: 'For example: Apr 2025 to Nov 2025'}),
    defineField({name: 'location', title: 'Location', type: 'string'}),
    defineField({name: 'tagline', title: 'Summary', type: 'text', rows: 3}),
    defineField({name: 'logo', title: 'Logo', type: 'image'}),
    defineField({name: 'companyWebsite', title: 'Company website', type: 'url'}),
    defineField({
      name: 'highlights',
      title: 'Highlight chips',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'projects',
      title: 'Work items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'workItem',
          fields: [
            defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'period', type: 'string'}),
            defineField({name: 'description', type: 'text', rows: 3}),
          ],
          preview: {select: {title: 'title', subtitle: 'period'}},
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers appear first.',
      initialValue: 0,
    }),
  ],
  orderings: [{title: 'Site order', name: 'siteOrder', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'companyName', subtitle: 'roleTitle', media: 'logo'}},
})
