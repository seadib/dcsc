'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity/image'

interface BatchItem {
  _id: string
  sessionName: string
  slug: string
  academicYear?: string
  isCurrent?: boolean
  memberCount?: number
  previewMembers?: Array<{
    _id: string
    name: string
    role: string
    photo: any
  }>
}

interface BatchArchiveProps {
  batches: BatchItem[]
  onSelectMember?: (member: any) => void
}

export default function BatchArchive({ batches, onSelectMember }: BatchArchiveProps) {
  // Filter out current active batch, keep historical ones
  const historicalBatches = batches.filter((b) => !b.isCurrent)
  const [expandedBatchId, setExpandedBatchId] = useState<string | null>(null)

  if (historicalBatches.length === 0) return null

  const toggleBatch = (id: string) => {
    setExpandedBatchId(expandedBatchId === id ? null : id)
  }

  return (
    <section className="py-16 border-t border-cyan-500/20 bg-[#070B12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
            DCSC Heritage & Archive
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white mt-2">
            Historical Executive Committees
          </h2>
          <p className="text-gray-400 text-sm mt-3">
            Honoring every leader and executive who paved the path of scientific excellence since 1996.
          </p>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {historicalBatches.map((batch) => {
            const isExpanded = expandedBatchId === batch._id

            return (
              <div
                key={batch._id}
                className="border border-white/10 rounded-2xl bg-[#0D131F] overflow-hidden transition-all duration-300 hover:border-cyan-500/40"
              >
                {/* Accordion Header / Minimized Bar */}
                <div
                  onClick={() => toggleBatch(batch._id)}
                  className="p-5 sm:p-6 cursor-pointer flex items-center justify-between gap-4 select-none"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-heading font-bold text-cyan-400 text-sm">
                      {batch.sessionName.slice(-2)}
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg sm:text-xl text-white">
                        Executive Committee {batch.sessionName}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {batch.academicYear || `HSC Session ${batch.sessionName}`} • {batch.memberCount || 0} Members
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-cyan-400 hidden sm:inline-block">
                      {isExpanded ? 'Minimize' : 'Click to preview'}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-gray-300 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180 text-cyan-400' : ''
                      }`}
                    >
                      ▼
                    </div>
                  </div>
                </div>

                {/* Expanded Preview (Horizontal Scroll of Preview Members + Full Link) */}
                {isExpanded && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-8 pt-2 border-t border-white/5 animate-fadeIn">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs uppercase tracking-wider text-gray-400 font-bold">
                        Key Leadership Preview
                      </span>
                      <Link
                        href={`/committee/${batch.slug}`}
                        className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 group"
                      >
                        View Full Committee ({batch.memberCount || 'All'})
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </Link>
                    </div>

                    {/* Horizontal scrollable member avatars */}
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-cyan-500/20">
                      {batch.previewMembers && batch.previewMembers.length > 0 ? (
                        batch.previewMembers.map((m) => {
                          let photo = '/image/logo.png'
                          if (m.photo) {
                            try {
                              photo = urlForImage(m.photo).width(200).height(200).url()
                            } catch {}
                          }

                          return (
                            <div
                              key={m._id}
                              onClick={() => onSelectMember && onSelectMember({ ...m, batch })}
                              className="flex-shrink-0 w-36 bg-[#080C14] border border-white/10 rounded-xl p-3 text-center cursor-pointer hover:border-cyan-400 transition-all hover:-translate-y-1"
                            >
                              <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden border border-cyan-500/30 mb-2">
                                <Image
                                  src={photo}
                                  alt={m.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <h4 className="font-heading font-semibold text-xs text-white truncate">
                                {m.name}
                              </h4>
                              <p className="text-[10px] text-cyan-400 truncate mt-0.5">
                                {m.role}
                              </p>
                            </div>
                          )
                        })
                      ) : (
                        <p className="text-xs text-gray-500 py-2">
                          Historical data for this batch is archived. Click &quot;View Full Committee&quot; to inspect records.
                        </p>
                      )}
                    </div>

                    {/* Dedicated Full Batch Page Button */}
                    <div className="mt-4 pt-4 border-t border-white/5 flex justify-end">
                      <Link
                        href={`/committee/${batch.slug}`}
                        className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/5 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-all"
                      >
                        View Full Committee Page →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
