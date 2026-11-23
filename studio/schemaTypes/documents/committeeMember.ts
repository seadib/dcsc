import { defineType, defineField } from 'sanity'

export const committeeMember = defineType({
  name: 'committeeMember',
  title: 'Executive Committee Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      description: 'e.g., Nazmul Sakib / নাজমুল সাকিব',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Designation / Role',
      type: 'string',
      description: 'e.g., President, General Secretary, Head of IT, Executive Member',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'batch',
      title: 'Committee Batch / Session',
      type: 'reference',
      to: [{ type: 'batch' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Member Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Professional high-resolution photo.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'about',
      title: 'About / Detailed Bio',
      type: 'text',
      rows: 4,
      description: 'Detailed background, responsibilities, and achievements. Shown in the popup modal when clicked.',
    }),
    defineField({
      name: 'isPaused',
      title: 'Pause / Hide from Website',
      type: 'boolean',
      description: 'Turn ON to temporarily hide this member from the website without deleting their data.',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order / Priority',
      type: 'number',
      description: 'Order within the batch (1: President, 2: General Secretary, etc.).',
      initialValue: 10,
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Profiles',
      type: 'object',
      fields: [
        defineField({ name: 'facebook', title: 'Facebook Profile URL', type: 'url' }),
        defineField({ name: 'linkedin', title: 'LinkedIn Profile URL', type: 'url' }),
        defineField({ name: 'email', title: 'Email Address', type: 'string' }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      role: 'role',
      batch: 'batch.sessionName',
      media: 'photo',
      isPaused: 'isPaused',
    },
    prepare({ title, role, batch, media, isPaused }) {
      return {
        title: `${title} ${isPaused ? '⏸️ (Paused)' : ''}`,
        subtitle: `${role || ''} • Session: ${batch || 'Unassigned'}`,
        media,
      }
    },
  },
})
