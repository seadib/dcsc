import { defineType, defineField } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page (Page Builder)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Homepage',
      readOnly: true,
    }),
    defineField({
      name: 'sections',
      title: 'Homepage Sections (Drag to Reorder, Add, or Remove)',
      description: 'You can freely reorder which section comes first and which comes later on the homepage.',
      type: 'array',
      of: [
        { type: 'heroBlock' },
        { type: 'statsBlock' },
        { type: 'eventsBlock' },
        { type: 'postsBlock' },
        { type: 'committeeBlock' },
        { type: 'galleryBlock' },
        { type: 'scilabBlock' },
        { type: 'joinCtaBlock' },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'Home Page SEO Overrides',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Home Page Configuration',
        subtitle: 'Dynamic Section Reordering & Layout',
      }
    },
  },
})
