import Link from 'next/link'
import Image from 'next/image'
import { urlForImage } from '@/lib/sanity/image'

interface PageBuilderProps {
  sections?: any[]
  events?: any[]
  posts?: any[]
  currentMembers?: any[]
  teachers?: any[]
}

export default function PageBuilder({
  sections = [],
  events = [],
  posts = [],
  currentMembers = [],
  teachers = [],
}: PageBuilderProps) {
  // If no custom sections configured yet in Sanity, render modern default sections
  const blocksToRender = sections && sections.length > 0 ? sections : [
    { _type: 'heroBlock' },
    { _type: 'statsBlock' },
    { _type: 'eventsBlock' },
    { _type: 'postsBlock' },
    { _type: 'committeeBlock' },
    { _type: 'scilabBlock' },
    { _type: 'joinCtaBlock' },
  ]

  return (
    <div className="flex flex-col bg-[#080C14] text-white">
      {blocksToRender.map((block: any, idx: number) => {
        switch (block._type) {
          case 'heroBlock':
            return (
              <section
                key={`hero-${idx}`}
                className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 text-center overflow-hidden border-b border-cyan-500/20"
              >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent pointer-events-none" />
                <div className="max-w-4xl mx-auto relative z-10 space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase">
                    {block.badge || '#ForClubAndCountry • Established 1996'}
                  </div>

                  <h1 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white uppercase">
                    {block.headingLine1 || 'Dhaka College'} <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
                      {block.headingLine2 || 'Science Club'}
                    </span>
                  </h1>

                  <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                    {block.tagline ||
                      "Spreading the knowledge of science to the utmost since 1996. Building tomorrow's scientists, innovators, and leaders."}
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                    <Link
                      href={block.primaryBtnLink || '/events'}
                      className="px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:shadow-[0_0_35px_rgba(0,240,255,0.5)] transition-all hover:-translate-y-0.5"
                    >
                      {block.primaryBtnText || 'Explore Events'}
                    </Link>
                    <Link
                      href={block.secondaryBtnLink || '/join'}
                      className="px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest border border-white/20 text-white hover:border-cyan-400 hover:text-cyan-400 hover:bg-white/5 transition-all"
                    >
                      {block.secondaryBtnText || 'Join the Club'}
                    </Link>
                  </div>
                </div>
              </section>
            )

          case 'statsBlock':
            return (
              <section key={`stats-${idx}`} className="py-12 bg-[#05080E] border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {(block.stats || [
                      { number: '30+', label: 'Years of Excellence' },
                      { number: '15,000+', label: 'Alumni & Members' },
                      { number: '200+', label: 'Olympiad Accolades' },
                      { number: '50+', label: 'Major Science Festivals' },
                    ]).map((stat: any, sIdx: number) => (
                      <div key={sIdx} className="space-y-1">
                        <div className="font-heading font-black text-3xl sm:text-4xl text-cyan-400">
                          {stat.number}
                        </div>
                        <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )

          case 'eventsBlock':
            const displayEvents = events.slice(0, block.limit || 3)
            return (
              <section key={`events-${idx}`} className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                  <div>
                    <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
                      Flagship Gatherings
                    </span>
                    <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white mt-1">
                      {block.heading || 'Major Events & Science Festivals'}
                    </h2>
                    <p className="text-gray-400 text-sm mt-2">
                      {block.subheading || 'Flagship competitions, olympiads, and annual celebrations'}
                    </p>
                  </div>
                  <Link
                    href="/events"
                    className="mt-4 md:mt-0 text-xs font-bold text-cyan-400 hover:text-cyan-300 uppercase tracking-wider flex items-center gap-2"
                  >
                    View All Events →
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {displayEvents.map((ev: any) => {
                    let cover = '/image/e1.jpg'
                    if (ev.coverImage) {
                      try {
                        cover = urlForImage(ev.coverImage).width(600).height(400).url()
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
                          <div className="relative w-full h-52 overflow-hidden bg-gray-900">
                            <Image
                              src={cover}
                              alt={`${ev.title} - Dhaka College Science Club`}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {ev.category && (
                              <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-cyan-400 border border-cyan-500/30">
                                {ev.category}
                              </span>
                            )}
                          </div>
                          <div className="p-6">
                            <div className="text-xs text-gray-400 font-mono mb-2">
                              {ev.eventDate || 'Coming Soon'}
                            </div>
                            <h3 className="font-heading font-bold text-xl text-white group-hover:text-cyan-400 transition-colors">
                              {ev.title}
                            </h3>
                            <p className="text-gray-400 text-sm mt-2 line-clamp-3">
                              {ev.shortDescription}
                            </p>
                          </div>
                        </div>

                        {/* Facebook Direct Link */}
                        <div className="p-6 pt-0">
                          <a
                            href={ev.facebookUrl || 'https://www.facebook.com/DhakaCollegeScienceClub'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all"
                          >
                            <span>Event Details on Facebook</span>
                            <span>↗</span>
                          </a>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            )

          case 'postsBlock':
            const displayPosts = posts.slice(0, block.limit || 3)
            return (
              <section key={`posts-${idx}`} className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                  <div>
                    <span className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
                      Curiosity &amp; Discoveries
                    </span>
                    <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white mt-1">
                      {block.heading || 'News, Updates & Wednesday Wonders'}
                    </h2>
                    <p className="text-gray-400 text-sm mt-2">
                      {block.subheading || 'Exploring fascinating scientific phenomenon & club announcements'}
                    </p>
                  </div>
                  <Link
                    href="/posts"
                    className="mt-4 md:mt-0 text-xs font-bold text-amber-400 hover:text-amber-300 uppercase tracking-wider flex items-center gap-2"
                  >
                    All Posts →
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {displayPosts.map((p: any) => {
                    let cover = '/image/p1.jpg'
                    if (p.coverImage) {
                      try {
                        cover = urlForImage(p.coverImage).width(600).height(400).url()
                      } catch {
                        if (typeof p.coverImage === 'string') cover = p.coverImage
                      }
                    }

                    return (
                      <div
                        key={p._id}
                        className="bg-[#0D131F] border border-white/10 rounded-2xl overflow-hidden hover:border-amber-400 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="relative w-full h-48 overflow-hidden bg-gray-900">
                            <Image
                              src={cover}
                              alt={`${p.title} - Dhaka College Science Club`}
                              fill
                              className="object-cover"
                            />
                            {p.category && (
                              <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-amber-400 border border-amber-400/30">
                                {p.category}
                              </span>
                            )}
                          </div>
                          <div className="p-6">
                            <div className="text-xs text-gray-500 font-mono mb-2">
                              {p.date}
                            </div>
                            <h3 className="font-heading font-bold text-lg text-white">
                              {p.title}
                            </h3>
                            <p className="text-gray-400 text-sm mt-2 line-clamp-3">
                              {p.excerpt}
                            </p>
                          </div>
                        </div>

                        {/* Read Full Story Facebook Redirect */}
                        <div className="p-6 pt-0">
                          <a
                            href={p.facebookUrl || 'https://www.facebook.com/DhakaCollegeScienceClub'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-amber-400 hover:bg-amber-400 hover:text-black transition-all"
                          >
                            <span>Read Full Story</span>
                            <span>↗</span>
                          </a>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            )

          case 'scilabBlock':
            return (
              <section key={`scilab-${idx}`} className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
                <div className="bg-gradient-to-r from-cyan-950/40 via-[#0D131F] to-indigo-950/40 border border-cyan-500/30 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="max-w-xl space-y-4">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-widest uppercase bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                      Interactive Science Experience
                    </span>
                    <h2 className="font-heading font-black text-3xl sm:text-4xl text-white">
                      {block.heading || 'Explore the Sci-Lab Hub'}
                    </h2>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {block.subheading ||
                        'Run chemical reaction tests, experiment with real-time gravity physics, build subatomic particle atoms, and test your science knowledge through interactive web simulations.'}
                    </p>
                    <div className="pt-2">
                      <Link
                        href="/scilab"
                        className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-400 text-black hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all"
                      >
                        Launch Sci-Lab Simulator →
                      </Link>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                    <div className="p-4 rounded-2xl bg-black/40 border border-cyan-500/20 text-center">
                      <div className="text-2xl mb-1">🧪</div>
                      <div className="font-bold text-xs text-white">Chemistry Lab</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-black/40 border border-cyan-500/20 text-center">
                      <div className="text-2xl mb-1">🪐</div>
                      <div className="font-bold text-xs text-white">Gravity Sim</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-black/40 border border-cyan-500/20 text-center">
                      <div className="text-2xl mb-1">⚛️</div>
                      <div className="font-bold text-xs text-white">Atom Builder</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-black/40 border border-cyan-500/20 text-center">
                      <div className="text-2xl mb-1">💡</div>
                      <div className="font-bold text-xs text-white">Science Quiz</div>
                    </div>
                  </div>
                </div>
              </section>
            )

          case 'joinCtaBlock':
            return (
              <section key={`cta-${idx}`} className="py-20 px-4 sm:px-6 lg:px-8 text-center bg-[#05080E] border-t border-cyan-500/20">
                <div className="max-w-3xl mx-auto space-y-6">
                  <h2 className="font-heading font-black text-3xl sm:text-5xl text-white">
                    {block.heading || 'Be a Part of the Legacy'}
                  </h2>
                  <p className="text-gray-400 text-base max-w-xl mx-auto">
                    {block.subheading ||
                      'Join Dhaka College Science Club today and unleash your scientific potential alongside national champions.'}
                  </p>
                  <div>
                    <Link
                      href={block.buttonLink || '/join'}
                      className="inline-block px-10 py-4 rounded-full font-bold text-xs uppercase tracking-widest bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:shadow-[0_0_40px_rgba(0,240,255,0.6)] transition-all hover:-translate-y-1"
                    >
                      {block.buttonText || 'Apply for Membership'}
                    </Link>
                  </div>
                </div>
              </section>
            )

          default:
            return null
        }
      })}
    </div>
  )
}
