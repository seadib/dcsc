import { defineType, defineField } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Posts & News (বুধবারের বিষ্ময় / Announcements)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Post Title',
      type: 'string',
      description: 'e.g., "Time Crystal - #DCSC_Wednesday_Wonders", "Prize Giving Ceremony of Olympiad Hunt 4.0"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: '#DCSC_Wednesday_Wonders', value: 'Wednesday Wonders' },
          { title: 'Club News & Press Release', value: 'Club News' },
          { title: 'Talent Hunt & Quiz', value: 'Talent Hunt' },
          { title: 'Fest & Celebrations', value: 'Celebrations' },
        ],
      },
      initialValue: 'Wednesday Wonders',
    }),
    defineField({
      name: 'date',
      title: 'Publication Date',
      type: 'string',
      description: 'e.g., "5 Aug, 2026", "25 June, 2026"',
    }),
    defineField({
      name: 'coverImage',
      title: 'Post Graphic / Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'excerpt',
      title: 'Post Excerpt / Brief Content',
      type: 'text',
      rows: 4,
      description: 'Brief content visible on the website card.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Official Facebook Post Link',
      type: 'url',
      description: 'Clicking "Read Full Story" on the website will take the user directly to this Facebook post.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredOnHome',
      title: 'Show on Homepage News Highlights?',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Order / Priority',
      type: 'number',
      initialValue: 10,
    }),
    defineField({
      name: 'seo',
      title: 'SEO Overrides (Optional)',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      date: 'date',
      media: 'coverImage',
    },
    prepare({ title, category, date, media }) {
      return {
        title,
        subtitle: `${category || 'News'} • ${date || ''}`,
        media,
      }
    },
  },
})
