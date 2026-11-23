import { buildMetadata } from '@/lib/seo'

export async function generateMetadata() {
  return buildMetadata({
    title: 'Join Club & Member Portal',
    description:
      'Become an official member of Dhaka College Science Club. Register and access science opportunities.',
    path: '/join',
  })
}

export default function JoinPage() {
  return (
    <div className="min-h-screen bg-[#080C14] text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
            #ForClubAndCountry
          </span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white mt-2">
            Join Dhaka College Science Club
          </h1>
          <p className="text-gray-400 text-sm sm:text-base mt-4">
            Open for students of Dhaka College. Be part of the largest collegiate scientific community in Bangladesh.
          </p>
        </div>

        <div className="bg-[#0D131F] border border-cyan-500/20 rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="space-y-4">
            <h2 className="font-heading font-bold text-xl text-cyan-400">
              Membership Eligibility &amp; Perks
            </h2>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-cyan-400">✓</span>
                <span>Must be a currently enrolled student at Dhaka College (Intermediate or Degree/Masters level).</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400">✓</span>
                <span>Direct access to specialized teams: Olympiad Wing, IT &amp; Web, Project Development, Publications, and Event Management.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400">✓</span>
                <span>Official DCSC Membership ID and opportunities to organize national science festivals.</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 border-t border-white/10 text-center space-y-4">
            <p className="text-sm text-gray-400">
              Official membership recruitments are conducted in coordination with the club executive committee and Facebook announcements.
            </p>
            <a
              href="https://www.facebook.com/DhakaCollegeScienceClub"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all"
            >
              <span>Connect on Official Facebook Page</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
