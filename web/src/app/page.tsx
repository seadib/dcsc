import { client } from '@/lib/sanity/client'
import {
  homePageQuery,
  eventsQuery,
  postsQuery,
  currentCommitteeQuery,
  teachersQuery,
} from '@/lib/sanity/queries'
import { buildMetadata, generateOrganizationJsonLd } from '@/lib/seo'
import PageBuilder from '@/components/page-builder/PageBuilder'



export async function generateMetadata() {
  const homeData = await client.fetch(homePageQuery).catch(() => null)

  return buildMetadata({
    title: homeData?.seo?.metaTitle || 'Home',
    description:
      homeData?.seo?.metaDescription ||
      'Spreading the knowledge of science to the utmost since 1996. Official platform of Dhaka College Science Club (DCSC).',
    image: homeData?.seo?.shareImage,
    path: '/',
  })
}

export default async function HomePage() {
  const [homeData, events, posts, currentMembers, teachers] = await Promise.all([
    client.fetch(homePageQuery).catch(() => null),
    client.fetch(eventsQuery).catch(() => []),
    client.fetch(postsQuery).catch(() => []),
    client.fetch(currentCommitteeQuery).catch(() => []),
    client.fetch(teachersQuery).catch(() => []),
  ])

  const orgJsonLd = generateOrganizationJsonLd()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <PageBuilder
        sections={homeData?.sections || []}
        events={events}
        posts={posts}
        currentMembers={currentMembers}
        teachers={teachers}
      />
    </>
  )
}
