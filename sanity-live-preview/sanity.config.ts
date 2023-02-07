import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import { defaultDocumentNode } from './src/defaultDocumentNode'

export default defineConfig({
  name: 'default',
  title: 'Sanity Live Preview',

  projectId: '5eif70g2',
  dataset: 'production',

  plugins: [
    deskTool({ defaultDocumentNode }), 
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
})
