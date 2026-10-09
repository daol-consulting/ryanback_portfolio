import {defineField, defineType} from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow line', type: 'string'}),
    defineField({
      name: 'paragraphs',
      title: 'Paragraphs',
      type: 'array',
      of: [{type: 'text', rows: 4}],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({name: 'principle', title: 'Principle (quote line)', type: 'text', rows: 3}),
    defineField({
      name: 'facts',
      title: 'At a glance',
      type: 'array',
      description: 'Short label and value pairs shown in the card beside the About copy.',
      of: [
        {
          type: 'object',
          name: 'fact',
          fields: [
            defineField({name: 'label', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'value', type: 'string', validation: (rule) => rule.required()}),
          ],
          preview: {select: {title: 'label', subtitle: 'value'}},
        },
      ],
    }),
    defineField({
      name: 'coreStack',
      title: 'Core stack',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
  ],
  preview: {prepare: () => ({title: 'About'})},
})
