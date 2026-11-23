import { notFound } from 'next/navigation'
import Link from 'next/link'
import { client } from '@/lib/sanity/client'
import { committeeByBatchQuery } from '@/lib/sanity/queries'
import { buildMetadata } from '@/lib/seo'
import HistoricalBatchClient from './HistoricalBatchClient'



export async function generateMetadata({ params }: { params: Promise<{ batch: string }> }) {
  const { batch } = await params
  return buildMetadata({
    title: `Executive Committee ${batch}`,
    description: `Complete list of Executive Committee members for session ${batch} at Dhaka College Science Club (DCSC).`,
    path: `/committee/${batch}`,
  })
}

export default async function BatchPage({ params }: { params: Promise<{ batch: string }> }) {
  const { batch } = await params
  const batchData = await client
    .fetch(committeeByBatchQuery, { slug: batch })
    .catch(() => null)

  if (!batchData) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#080C14] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link
            href="/committee"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 hover:text-cyan-300"
          >
            ← Back to All Committees
          </Link>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
            Historical Committee Archive
          </span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white mt-2">
            Executive Committee {batchData.sessionName}
          </h1>
          <p className="text-gray-400 text-sm mt-3">
            {batchData.academicYear || `HSC Batch ${batchData.sessionName} Session`} • Full Roster of Leaders
          </p>
        </div>

        <HistoricalBatchClient members={batchData.members || []} sessionName={batchData.sessionName} />
      </div>
    </div>
  )
}
