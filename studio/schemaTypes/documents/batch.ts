import { defineType, defineField } from 'sanity'

export const batch = defineType({
  name: 'batch',
  title: 'Executive Committee Batch / Session',
  type: 'document',
  fields: [
    defineField({
      name: 'sessionName',
      title: 'Session Name',
      type: 'string',
      description: 'e.g., "2025-26", "2024-25", "2026-27"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Batch URL Slug',
      type: 'slug',
      options: {
        source: 'sessionName',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'academicYear',
      title: 'Academic Year / Note',
      type: 'string',
      description: 'e.g., "HSC Batch 2025-2026 Session"',
    }),
    defineField({
      name: 'isCurrent',
      title: 'Current Active Committee?',
      type: 'boolean',
      description: 'Check this ON for the latest committee. The site will automatically display this batch in full on the main committee page.',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order / Priority',
      type: 'number',
      description: 'Higher number appears first (e.g., 2026 before 2025).',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'sessionName',
      isCurrent: 'isCurrent',
      subtitle: 'academicYear',
    },
    prepare({ title, isCurrent, subtitle }) {
      return {
        title: `${title} ${isCurrent ? '⭐ (Current Active Batch)' : ''}`,
        subtitle: subtitle || 'Historical Committee',
      }
    },
  },
})
