import {defineField, defineType} from 'sanity'

export const education = defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  fields: [
    defineField({name: 'degree', title: 'Degree', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'school', title: 'School', type: 'string'}),
    defineField({name: 'highlights', title: 'Highlights', type: 'string'}),
    defineField({name: 'order', title: 'Order', type: 'number', initialValue: 0}),
  ],
  orderings: [{title: 'Site order', name: 'siteOrder', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'degree', subtitle: 'school'}},
})
