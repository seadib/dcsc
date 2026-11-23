import { defineType, defineField } from 'sanity'

export const galleryAlbum = defineType({
  name: 'galleryAlbum',
  title: 'Gallery Albums',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Album Title',
      type: 'string',
      description: 'e.g., "Intra Science Fest Moments", "Grand Iftar Mahfil 2026"',
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
      name: 'eventRef',
      title: 'Associated Event (Optional)',
      type: 'reference',
      to: [{ type: 'event' }],
    }),
    defineField({
      name: 'coverPhoto',
      title: 'Album Cover Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photos',
      title: 'Photos in Album',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
            defineField({
              name: 'altText',
              title: 'Custom Alt Text (Optional)',
              type: 'string',
              description: 'Defaults to "[Album Title] - Dhaka College Science Club" automatically if empty.',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'featuredOnHome',
      title: 'Show on Homepage Gallery Section?',
      type: 'boolean',
      initialValue: true,
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
      photos: 'photos',
      media: 'coverPhoto',
    },
    prepare({ title, photos, media }) {
      return {
        title,
        subtitle: `${photos ? photos.length : 0} photos`,
        media,
      }
    },
  },
})
