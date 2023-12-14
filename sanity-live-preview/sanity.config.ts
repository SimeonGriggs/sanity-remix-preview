import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {presentationTool} from '@sanity/presentation'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import { locate } from './presentation/locate'

export default defineConfig({
  name: 'default',
  title: 'Sanity',

  projectId: '79w8op0f',
  dataset: 'production',

  plugins: [
    deskTool(),
    presentationTool({
      previewUrl: 'http://localhost:3000',
      locate
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
