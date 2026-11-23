import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      initialValue: 'Dhaka College Science Club (DCSC)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline / Slogan',
      type: 'string',
      initialValue: 'Spreading the knowledge of science to the utmost since 1996',
    }),
    defineField({
      name: 'logo',
      title: 'Main Club Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        defineField({ name: 'email', title: 'Official Email', type: 'string', initialValue: 'dcsc.contact@gmail.com' }),
        defineField({ name: 'phone', title: 'Contact Phone', type: 'string' }),
        defineField({ name: 'address', title: 'Club Address', type: 'text', initialValue: 'Dhaka College, Mirpur Road, Dhanmondi, Dhaka-1205' }),
        defineField({ name: 'mapEmbedUrl', title: 'Google Map Embed URL', type: 'url' }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        defineField({ name: 'facebookPage', title: 'Facebook Page URL', type: 'url', initialValue: 'https://www.facebook.com/DhakaCollegeScienceClub' }),
        defineField({ name: 'facebookGroup', title: 'Facebook Group URL', type: 'url' }),
        defineField({ name: 'instagram', title: 'Instagram URL', type: 'url', initialValue: 'https://www.instagram.com/dcsc_official' }),
        defineField({ name: 'youtube', title: 'YouTube Channel URL', type: 'url' }),
        defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url' }),
      ],
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO Settings',
      type: 'seo',
    }),
  ],
})
