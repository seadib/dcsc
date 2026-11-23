import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { eventsQuery } from '@/lib/sanity/queries'
import { urlForImage } from '@/lib/sanity/image'
import { buildMetadata } from '@/lib/seo'



export async function generateMetadata() {
  return buildMetadata({
    title: 'Events & Science Festivals',
    description:
      'Discover upcoming and past science festivals, olympiads, workshops, and competitions organized by Dhaka College Science Club (DCSC).',
    path: '/events',
  })
}

export default async function EventsPage() {
  const events = await client.fetch(eventsQuery).catch(() => [])

  return (
    <div className="min-h-screen bg-[#080C14] text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
            Dhaka College Science Club
          </span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white mt-2">
            Events &amp; Science Festivals
          </h1>
          <p className="text-gray-400 text-sm sm:text-base mt-4">
            From national olympiads to intra-college science arenas, explore the vibrant gatherings hosted by DCSC.
          </p>
        </div>

        {events && events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((ev: any) => {
              let cover = '/image/e1.jpg'
              if (ev.coverImage) {
                try {
                  cover = urlForImage(ev.coverImage).width(700).height(450).url()
                } catch {
                  if (typeof ev.coverImage === 'string') cover = ev.coverImage
                }
              }

              return (
                <div
                  key={ev._id}
                  className="bg-[#0D131F] border border-cyan-500/20 rounded-2xl overflow-hidden hover:border-cyan-400 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative w-full h-56 bg-gray-900 overflow-hidden">
                      <Image
                        src={cover}
                        alt={`${ev.title} - Dhaka College Science Club (DCSC)`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {ev.category && (
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md text-cyan-400 border border-cyan-500/30">
                          {ev.category}
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="text-xs text-cyan-400 font-mono mb-2 font-bold">
                        {ev.eventDate || 'Schedule Announced on Facebook'}
                      </div>
                      <h2 className="font-heading font-bold text-xl text-white group-hover:text-cyan-400 transition-colors">
                        {ev.title}
                      </h2>
                      <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                        {ev.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <a
                      href={ev.facebookUrl || 'https://www.facebook.com/DhakaCollegeScienceClub'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all"
                    >
                      <span>Event Details &amp; Registration</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#0D131F] rounded-2xl border border-white/10">
            <p className="text-gray-400">Loading events from Sanity CMS...</p>
          </div>
        )}
      </div>
    </div>
  )
}
