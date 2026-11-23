import { client } from '@/lib/sanity/client'
import {
  teachersQuery,
  currentCommitteeQuery,
  batchesQuery,
} from '@/lib/sanity/queries'
import { buildMetadata, generateOrganizationJsonLd } from '@/lib/seo'
import CommitteeClient from './CommitteeClient'



export async function generateMetadata() {
  return buildMetadata({
    title: 'Executive Committee & Leaders',
    description:
      'Meet the Executive Committee, Teacher Panel, Mentors, and leadership of Dhaka College Science Club (DCSC).',
    path: '/committee',
  })
}

export default async function CommitteePage() {
  const [teachers, currentMembers, batches] = await Promise.all([
    client.fetch(teachersQuery).catch(() => []),
    client.fetch(currentCommitteeQuery).catch(() => []),
    client.fetch(batchesQuery).catch(() => []),
  ])

  const orgJsonLd = generateOrganizationJsonLd()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <CommitteeClient
        teachers={teachers}
        currentMembers={currentMembers}
        batches={batches}
      />
    </>
  )
}
