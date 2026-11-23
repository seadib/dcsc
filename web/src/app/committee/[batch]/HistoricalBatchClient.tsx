'use client'

import { useState } from 'react'
import MemberCard from '@/components/committee/MemberCard'
import MemberModal, { type MemberType } from '@/components/committee/MemberModal'

interface HistoricalBatchClientProps {
  members: any[]
  sessionName: string
}

export default function HistoricalBatchClient({
  members,
  sessionName,
}: HistoricalBatchClientProps) {
  const [selectedMember, setSelectedMember] = useState<MemberType | null>(null)

  return (
    <div>
      {members && members.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {members.map((member) => (
            <MemberCard
              key={member._id}
              member={{ ...member, batch: { sessionName } }}
              onSelect={(m) => setSelectedMember(m)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#0D131F] rounded-2xl border border-white/10">
          <p className="text-gray-400">
            No archived records found for this specific batch yet.
          </p>
        </div>
      )}

      <MemberModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </div>
  )
}
