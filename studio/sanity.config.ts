import {defineConfig} from 'sanity'
import {structureTool, type StructureResolver} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

/** One-of-a-kind documents: fixed IDs, no create/delete from the list. */
const singletons = ['siteSettings', 'about']

const orderedList = (S: Parameters<StructureResolver>[0], type: string, title: string) =>
  S.listItem()
    .title(title)
    .schemaType(type)
    .child(S.documentTypeList(type).title(title).defaultOrdering([{field: 'order', direction: 'asc'}]))

const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site settings & SEO')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem().title('About').child(S.document().schemaType('about').documentId('about')),
      S.divider(),
      orderedList(S, 'project', 'Projects'),
      orderedList(S, 'careerEntry', 'Career'),
      orderedList(S, 'education', 'Education'),
      orderedList(S, 'certification', 'Certifications'),
    ])

export default defineConfig({
  name: 'default',
  title: 'Ryan Back Portfolio',

  projectId: 'z0se41xa',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({schemaType}) => !singletons.includes(schemaType)),
  },

  document: {
    actions: (actions, {schemaType}) =>
      singletons.includes(schemaType)
        ? actions.filter(({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : actions,
  },
})
