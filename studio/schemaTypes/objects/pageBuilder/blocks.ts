import { defineType, defineField } from 'sanity'

export const heroBlock = defineType({
  name: 'heroBlock',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({ name: 'badge', title: 'Top Badge Text', type: 'string', initialValue: '#ForClubAndCountry • Established 1996' }),
    defineField({ name: 'headingLine1', title: 'Heading Line 1', type: 'string', initialValue: 'Dhaka College' }),
    defineField({ name: 'headingLine2', title: 'Heading Line 2', type: 'string', initialValue: 'Science Club' }),
    defineField({ name: 'tagline', title: 'Tagline / Subheading', type: 'text', rows: 2, initialValue: 'Spreading the knowledge of science to the utmost since 1996. Building tomorrow\'s scientists, innovators, and leaders.' }),
    defineField({ name: 'primaryBtnText', title: 'Primary Button Text', type: 'string', initialValue: 'Explore Events' }),
    defineField({ name: 'primaryBtnLink', title: 'Primary Button Link', type: 'string', initialValue: '/events' }),
    defineField({ name: 'secondaryBtnText', title: 'Secondary Button Text', type: 'string', initialValue: 'Join the Club' }),
    defineField({ name: 'secondaryBtnLink', title: 'Secondary Button Link', type: 'string', initialValue: '/join' }),
  ],
  preview: {
    select: { title: 'headingLine1', subtitle: 'tagline' },
    prepare({ title, subtitle }) {
      return { title: `Hero: ${title || 'Header Banner'}`, subtitle }
    },
  },
})

export const statsBlock = defineType({
  name: 'statsBlock',
  title: 'Club Stats Counter Section',
  type: 'object',
  fields: [
    defineField({
      name: 'stats',
      title: 'Statistics Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'number', title: 'Statistic Number/Text (e.g. "30+")', type: 'string' }),
            defineField({ name: 'label', title: 'Label (e.g. "Years of Excellence")', type: 'string' }),
          ],
        },
      ],
      initialValue: [
        { number: '30+', label: 'Years of Excellence' },
        { number: '15,000+', label: 'Alumni & Members' },
        { number: '200+', label: 'Olympiad Accolades' },
        { number: '50+', label: 'Major Science Festivals' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Statistics Counter Section' }
    },
  },
})

export const eventsBlock = defineType({
  name: 'eventsBlock',
  title: 'Featured Events Section',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'Major Events & Science Festivals' }),
    defineField({ name: 'subheading', title: 'Section Subheading', type: 'string', initialValue: 'Flagship competitions, olympiads, and annual celebrations' }),
    defineField({ name: 'limit', title: 'Number of events to display', type: 'number', initialValue: 4 }),
    defineField({ name: 'showSeeAll', title: 'Show "View All Events" button?', type: 'boolean', initialValue: true }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: `Events Section: ${title || 'Default'}` }
    },
  },
})

export const postsBlock = defineType({
  name: 'postsBlock',
  title: 'News & Wednesday Wonders Section',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'News, Updates & Wednesday Wonders' }),
    defineField({ name: 'subheading', title: 'Section Subheading', type: 'string', initialValue: 'Exploring fascinating scientific phenomenon & club announcements' }),
    defineField({ name: 'limit', title: 'Number of posts to display', type: 'number', initialValue: 3 }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: `Posts & News Section: ${title || 'Default'}` }
    },
  },
})

export const committeeBlock = defineType({
  name: 'committeeBlock',
  title: 'Leadership & Committee Preview Section',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'Our Guiding Leadership' }),
    defineField({ name: 'subheading', title: 'Section Subheading', type: 'string', initialValue: 'The passionate minds driving Dhaka College Science Club' }),
    defineField({ name: 'showTeachers', title: 'Show Honorable Teacher Panel?', type: 'boolean', initialValue: true }),
    defineField({ name: 'showEcHighlight', title: 'Show Active Executive Committee?', type: 'boolean', initialValue: true }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: `Committee Highlights: ${title || 'Default'}` }
    },
  },
})

export const galleryBlock = defineType({
  name: 'galleryBlock',
  title: 'Photo Gallery Preview Section',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'Moments Captured' }),
    defineField({ name: 'subheading', title: 'Section Subheading', type: 'string', initialValue: 'Snapshots from recent science festivals, workshops & reunions' }),
    defineField({ name: 'limit', title: 'Number of albums/photos to show', type: 'number', initialValue: 6 }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: `Gallery Preview: ${title || 'Default'}` }
    },
  },
})

export const scilabBlock = defineType({
  name: 'scilabBlock',
  title: 'Sci-Lab Interactive Hub Preview',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'Interactive Sci-Lab' }),
    defineField({ name: 'subheading', title: 'Section Subheading', type: 'string', initialValue: 'Play, experiment, and simulate scientific phenomena in real-time' }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: `Sci-Lab Hub: ${title || 'Default'}` }
    },
  },
})

export const joinCtaBlock = defineType({
  name: 'joinCtaBlock',
  title: 'Join Club Banner (Call to Action)',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Banner Heading', type: 'string', initialValue: 'Be a Part of the Legacy' }),
    defineField({ name: 'subheading', title: 'Banner Subheading', type: 'string', initialValue: 'Join Dhaka College Science Club today and unleash your scientific potential.' }),
    defineField({ name: 'buttonText', title: 'Button Text', type: 'string', initialValue: 'Apply for Membership' }),
    defineField({ name: 'buttonLink', title: 'Button Link', type: 'string', initialValue: '/join' }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: `CTA Banner: ${title || 'Default'}` }
    },
  },
})
