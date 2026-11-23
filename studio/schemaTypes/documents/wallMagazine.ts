import { defineType, defineField } from 'sanity'

export const wallMagazine = defineType({
  name: 'wallMagazine',
  title: 'Wall Magazine & Publications',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Magazine Title / Edition Topic',
      type: 'string',
      description: 'e.g., "Exploring the Quantum Realm", "The Genesis of Artificial Intelligence"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'edition',
      title: 'Edition / Volume',
      type: 'string',
      description: 'e.g., "Volume 14, Issue 2", "Annual Special 2026"',
    }),
    defineField({
      name: 'publishDate',
      title: 'Publication Date',
      type: 'string',
    }),
    defineField({
      name: 'coverImage',
      title: 'Magazine Cover Graphic',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pdfFile',
      title: 'Upload PDF Document (Optional)',
      type: 'file',
      options: { accept: '.pdf' },
    }),
    defineField({
      name: 'externalReadUrl',
      title: 'External Read URL / Drive Link (Optional)',
      type: 'url',
    }),
    defineField({
      name: 'description',
      title: 'Short Description / Abstract',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 10,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'edition',
      media: 'coverImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle || 'Digital Wall Magazine',
        media,
      }
    },
  },
})
