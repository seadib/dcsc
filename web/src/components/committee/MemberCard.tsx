'use client'

import Image from 'next/image'
import { urlForImage } from '@/lib/sanity/image'
import type { MemberType } from './MemberModal'

interface MemberCardProps {
  member: MemberType
  onSelect: (member: MemberType) => void
}

export default function MemberCard({ member, onSelect }: MemberCardProps) {
  let photoSrc = '/image/logo.png'
  if (member.photo) {
    try {
      photoSrc = urlForImage(member.photo).width(450).height(500).url()
    } catch {
      if (typeof member.photo === 'string') photoSrc = member.photo
    }
  }

  return (
    <div
      onClick={() => onSelect(member)}
      className="group relative cursor-pointer bg-[#0D131F] border border-cyan-500/20 rounded-2xl overflow-hidden hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,240,255,0.25)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
    >
      {/* Photo Container */}
      <div className="relative w-full h-72 overflow-hidden bg-gray-900">
        <Image
          src={photoSrc}
          alt={`${member.name} - Dhaka College Science Club`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D131F] via-transparent to-transparent opacity-80" />

        {/* View Details Hint */}
        <span className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-cyan-500 text-black shadow-lg">
          View Bio
        </span>
      </div>

      {/* Info Body */}
      <div className="p-5 text-center flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-heading font-bold text-lg text-white group-hover:text-cyan-400 transition-colors">
            {member.name}
          </h3>
          <p className="text-xs font-semibold text-gray-300 mt-1 uppercase tracking-wider">
            {member.role}
          </p>
        </div>
        {member.batch?.sessionName && (
          <span className="inline-block mt-3 text-[11px] font-mono text-cyan-400/80">
            Batch {member.batch.sessionName}
          </span>
        )}
      </div>
    </div>
  )
}
