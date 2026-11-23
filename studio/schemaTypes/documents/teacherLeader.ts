import { defineType, defineField } from 'sanity'

export const teacherLeader = defineType({
  name: 'teacherLeader',
  title: 'Teacher Panel & Moderators',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      description: 'e.g., Prof. Faria Sultana, Md. Zillur Rahman',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Honorary Role / Designation',
      type: 'string',
      description: 'e.g., Convener, Moderator, Chief Advisor',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'department',
      title: 'Academic Department / Position in College',
      type: 'string',
      description: 'e.g., Head of the Zoology Department, Associate Professor (Chemistry)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isPaused',
      title: 'Pause / Hide from Website',
      type: 'boolean',
      description: 'Turn ON to temporarily hide this teacher without deleting their profile.',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 1,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      role: 'role',
      department: 'department',
      media: 'photo',
      isPaused: 'isPaused',
    },
    prepare({ title, role, department, media, isPaused }) {
      return {
        title: `${title} ${isPaused ? '⏸️ (Paused)' : ''}`,
        subtitle: `${role || ''} • ${department || ''}`,
        media,
      }
    },
  },
})
