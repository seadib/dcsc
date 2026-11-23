import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes/index.ts'

export default defineConfig({
  name: 'default',
  title: 'Dhaka College Science Club (DCSC)',

  projectId: 't5npxsw7',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('DCSC Admin Dashboard')
          .items([
            // Singleton: Site Settings
            S.listItem()
              .title('⚙️ Site Settings & Socials')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            // Singleton: Home Page Builder
            S.listItem()
              .title('🏠 Home Page Builder (Reorder Sections)')
              .id('homePage')
              .child(
                S.document()
                  .schemaType('homePage')
                  .documentId('homePage')
              ),
            S.divider(),
            // Committee & Leadership
            S.documentTypeListItem('batch').title('🎓 Committee Batches (25-26, 26-27...)'),
            S.documentTypeListItem('committeeMember').title('👥 Executive Committee Members'),
            S.documentTypeListItem('teacherLeader').title('👨‍🏫 Teachers & Moderators Panel'),
            S.divider(),
            // Club Activities & Media
            S.documentTypeListItem('event').title('📅 Events & Festivals'),
            S.documentTypeListItem('post').title('📝 Posts & News (Wednesday Wonders)'),
            S.documentTypeListItem('galleryAlbum').title('🖼️ Photo Gallery Albums'),
            S.documentTypeListItem('wallMagazine').title('📰 Digital Wall Magazines'),
            S.documentTypeListItem('achievement').title('🏆 Achievements & Awards'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
