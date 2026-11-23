import type { Metadata } from 'next'
import { urlForImage } from './sanity/image'

interface SeoParams {
  title?: string
  description?: string
  image?: any
  path?: string
  noIndex?: boolean
}

export const SITE_NAME = 'Dhaka College Science Club (DCSC)'
export const SITE_URL = 'https://dhakacollegescienceclub.github.io'
export const DEFAULT_DESCRIPTION =
  'Spreading the knowledge of science to the utmost since 1996. Official platform of Dhaka College Science Club (DCSC).'

export function buildMetadata({
  title,
  description,
  image,
  path = '',
  noIndex = false,
}: SeoParams): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  const metaDesc = description || DEFAULT_DESCRIPTION
  const url = `${SITE_URL}${path}`

  let ogImageUrl = `${SITE_URL}/image/logo.png`
  if (image) {
    try {
      ogImageUrl = urlForImage(image).width(1200).height(630).url()
    } catch {
      // fallback to default
    }
  }

  return {
    title: fullTitle,
    description: metaDesc,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, 'max-image-preview': 'large' },
    openGraph: {
      title: fullTitle,
      description: metaDesc,
      url,
      siteName: SITE_NAME,
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${title || SITE_NAME} - Dhaka College Science Club`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: metaDesc,
      images: [ogImageUrl],
    },
  }
}

export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Dhaka College Science Club (DCSC)',
    alternateName: ['DCSC', 'Dhaka College Science Club', 'ঢাকা কলেজ সায়েন্স ক্লাব'],
    url: SITE_URL,
    logo: `${SITE_URL}/image/logo.png`,
    foundingDate: '1996',
    description: DEFAULT_DESCRIPTION,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dhaka',
      addressCountry: 'BD',
    },
    sameAs: [
      'https://www.facebook.com/DhakaCollegeScienceClub',
      'https://www.instagram.com/dcsc_official',
    ],
  }
}

export function generateMemberPersonJsonLd(member: {
  name: string
  role: string
  batch?: { sessionName: string }
  about?: string
  photo?: any
}) {
  let photoUrl = `${SITE_URL}/image/logo.png`
  if (member.photo) {
    try {
      photoUrl = urlForImage(member.photo).width(500).height(500).url()
    } catch {}
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: member.name,
    jobTitle: member.role,
    worksFor: {
      '@type': 'EducationalOrganization',
      name: 'Dhaka College Science Club',
      alternateName: 'DCSC',
    },
    description: member.about || `${member.name} serves as ${member.role} at Dhaka College Science Club for the ${member.batch?.sessionName || 'Executive'} session.`,
    image: photoUrl,
  }
}
