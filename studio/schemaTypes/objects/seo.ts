import { defineType, defineField } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO & Social Metadata',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Custom meta title. Defaults to "[Title] | Dhaka College Science Club (DCSC)" if empty.',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Brief description for search engines and social media shares.',
    }),
    defineField({
      name: 'shareImage',
      title: 'Social Share Image (Open Graph)',
      type: 'image',
      options: { hotspot: true },
      description: 'Recommended size: 1200x630px. Fallback to site default image if empty.',
    }),
    defineField({
      name: 'keywords',
      title: 'Additional Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from Search Engines (noindex)',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
