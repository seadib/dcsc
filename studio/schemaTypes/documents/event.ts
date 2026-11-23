import { defineType, defineField } from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Events & Science Festivals',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      description: 'e.g., "DCSC AI NeuroVerse 2026", "Olympiad Hunt 4.0"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Event Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Event Category',
      type: 'string',
      options: {
        list: [
          { title: 'Intra Science Festival', value: 'Intra Festival' },
          { title: 'National Science Festival', value: 'National Festival' },
          { title: 'Olympiad & Talent Hunt', value: 'Olympiad Hunt' },
          { title: 'Workshop & Seminar', value: 'Workshop' },
          { title: 'Reunion / Iftar Mahfil', value: 'Reunion' },
          { title: 'Orientation / Freshers', value: 'Orientation' },
        ],
      },
      initialValue: 'Intra Festival',
    }),
    defineField({
      name: 'eventDate',
      title: 'Event Date / Schedule Text',
      type: 'string',
      description: 'e.g., "Aug 10–11, 2026", "07 Mar, 2026"',
    }),
    defineField({
      name: 'coverImage',
      title: 'Event Banner / Cover Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Summary shown on the events card.',
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Official Facebook Event / Post URL',
      type: 'url',
      description: 'Direct link to the Facebook event or announcement. Clicking "Event Details" on the website leads here.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'galleryPhotos',
      title: 'Event Snapshot Photos (Optional)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'featuredOnHome',
      title: 'Show on Homepage Events Section?',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display Order / Priority',
      type: 'number',
      initialValue: 10,
    }),
    defineField({
      name: 'seo',
      title: 'SEO Overrides (Optional)',
      type: 'seo',
      description: 'Auto-generates title with "Dhaka College Science Club" if left empty.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      date: 'eventDate',
      media: 'coverImage',
    },
    prepare({ title, subtitle, date, media }) {
      return {
        title,
        subtitle: `${subtitle || 'Event'} • ${date || ''}`,
        media,
      }
    },
  },
})
