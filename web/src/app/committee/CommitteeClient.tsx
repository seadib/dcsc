'use client'

import { useState } from 'react'
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity/image'
import MemberCard from '@/components/committee/MemberCard'
import MemberModal, { type MemberType } from '@/components/committee/MemberModal'
import BatchArchive from '@/components/committee/BatchArchive'

interface CommitteeClientProps {
  teachers: any[]
  currentMembers: any[]
  batches: any[]
}

export default function CommitteeClient({
  teachers,
  currentMembers,
  batches,
}: CommitteeClientProps) {
  const [selectedMember, setSelectedMember] = useState<MemberType | null>(null)

  // Current session name from the first member or batch
  const currentBatch = batches.find((b) => b.isCurrent)
  const currentSessionName = currentBatch?.sessionName || '2025-26'

  return (
    <div className="min-h-screen bg-[#080C14] text-white">
      {/* Page Header */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 text-center border-b border-cyan-500/20 overflow-hidden">
        <div className="absolute inset-0 bg-radial-at-c from-cyan-500/10 via-transparent to-transparent pointer-events-none" />
        <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
          Guiding Lights &amp; Driving Minds
        </span>
        <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white mt-3">
          Our Leaders &amp; Moderators
        </h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto mt-4">
          The esteemed faculty mentors and passionate student executives shaping the legacy of Dhaka College Science Club.
        </p>
      </section>

      {/* TEACHERS PANEL */}
      {teachers && teachers.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
              Advisors &amp; Mentors
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mt-1">
              Honorable Teacher Panel
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teachers.map((teacher) => {
              let photo = '/image/logo.png'
              if (teacher.photo) {
                try {
                  photo = urlForImage(teacher.photo).width(400).height(450).url()
                } catch {
                  if (typeof teacher.photo === 'string') photo = teacher.photo
                }
              }

              return (
                <div
                  key={teacher._id}
                  className="bg-[#0D131F] border-t-4 border-amber-400 border-x border-b border-white/10 rounded-2xl overflow-hidden shadow-lg transition-transform hover:-translate-y-1"
                >
                  <div className="relative w-full h-72 overflow-hidden bg-gray-900">
                    <Image
                      src={photo}
                      alt={`${teacher.name} - Dhaka College Science Club`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="font-heading font-bold text-base text-amber-400">
                      {teacher.name}
                    </h3>
                    <p className="text-xs font-bold text-white mt-1 uppercase tracking-wider">
                      {teacher.role}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-1">
                      {teacher.department}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* CURRENT EXECUTIVE COMMITTEE (FULL GRID) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
            Active Leadership
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white mt-1">
            Executive Committee {currentSessionName}
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto mt-2 italic">
            &quot;Leadership is unlocking people&apos;s potential to become better.&quot; — Bill Bradley
          </p>
          <p className="text-xs text-cyan-400/80 font-mono mt-3">
            Click on any member card to view their profile, leadership background &amp; details.
          </p>
        </div>

        {currentMembers && currentMembers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentMembers.map((member) => (
              <MemberCard
                key={member._id}
                member={member}
                onSelect={(m) => setSelectedMember(m)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <p>Loading Executive Committee data from Sanity CMS...</p>
          </div>
        )}
      </section>

      {/* HISTORICAL BATCHES (ARCHIVE SECTION) */}
      <BatchArchive
        batches={batches}
        onSelectMember={(m) => setSelectedMember(m)}
      />

      {/* INTERACTIVE MEMBER MODAL */}
      <MemberModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </div>
  )
}
