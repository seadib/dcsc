'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity/image'

export interface MemberType {
  _id: string
  name: string
  role: string
  photo: any
  about?: string
  batch?: {
    sessionName?: string
  }
  socialLinks?: {
    facebook?: string
    linkedin?: string
    email?: string
  }
}

interface MemberModalProps {
  member: MemberType | null
  onClose: () => void
}

export default function MemberModal({ member, onClose }: MemberModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!member) return null

  let photoSrc = '/image/logo.png'
  if (member.photo) {
    try {
      photoSrc = urlForImage(member.photo).width(600).height(600).url()
    } catch {
      if (typeof member.photo === 'string') photoSrc = member.photo
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#0D131F] border border-cyan-500/30 rounded-2xl overflow-hidden shadow-[0_10px_50px_rgba(0,240,255,0.2)] text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 border border-white/20 text-gray-300 hover:text-white hover:bg-black flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Member Photo */}
        <div className="relative w-full h-72 sm:h-80 bg-gray-900 overflow-hidden">
          <Image
            src={photoSrc}
            alt={`${member.name} - Dhaka College Science Club`}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D131F] via-transparent to-transparent" />
          {member.batch?.sessionName && (
            <span className="absolute bottom-4 left-6 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 backdrop-blur-md">
              Session {member.batch.sessionName}
            </span>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-4">
          <div>
            <h3 className="font-heading font-extrabold text-2xl text-white">
              {member.name}
            </h3>
            <p className="text-cyan-400 font-semibold text-base mt-1">
              {member.role}
            </p>
          </div>

          <div className="border-t border-white/10 pt-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
              About Leadership & Role
            </h4>
            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
              {member.about ||
                `${member.name} is a dedicated member serving as ${member.role} at Dhaka College Science Club. Actively contributing to scientific exploration, youth leadership, and club management.`}
            </p>
          </div>

          {/* Social Profiles */}
          {member.socialLinks && (
            <div className="flex items-center gap-3 pt-3 border-t border-white/10">
              {member.socialLinks.facebook && (
                <a
                  href={member.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-bold hover:bg-blue-600/30 transition-colors flex items-center gap-2"
                >
                  Facebook Profile
                </a>
              )}
              {member.socialLinks.linkedin && (
                <a
                  href={member.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 text-xs font-bold hover:bg-cyan-600/30 transition-colors flex items-center gap-2"
                >
                  LinkedIn
                </a>
              )}
              {member.socialLinks.email && (
                <a
                  href={`mailto:${member.socialLinks.email}`}
                  className="px-4 py-2 rounded-lg bg-gray-700/30 text-gray-300 border border-white/10 text-xs font-bold hover:bg-white/10 transition-colors flex items-center gap-2"
                >
                  Email
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
