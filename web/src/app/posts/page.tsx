import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { postsQuery } from '@/lib/sanity/queries'
import { urlForImage } from '@/lib/sanity/image'
import { buildMetadata } from '@/lib/seo'



export async function generateMetadata() {
  return buildMetadata({
    title: 'Posts, News & Wednesday Wonders',
    description:
      'Club news, scientific phenomena, and #DCSC_Wednesday_Wonders from Dhaka College Science Club.',
    path: '/posts',
  })
}

export default async function PostsPage() {
  const posts = await client.fetch(postsQuery).catch(() => [])

  return (
    <div className="min-h-screen bg-[#080C14] text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
            #DCSC_Wednesday_Wonders &amp; Updates
          </span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white mt-2">
            Posts &amp; Science Stories
          </h1>
          <p className="text-gray-400 text-sm sm:text-base mt-4">
            Dive into intriguing scientific wonders, event recaps, and official press releases directly from the club.
          </p>
        </div>

        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((p: any) => {
              let cover = '/image/p1.jpg'
              if (p.coverImage) {
                try {
                  cover = urlForImage(p.coverImage).width(700).height(450).url()
                } catch {
                  if (typeof p.coverImage === 'string') cover = p.coverImage
                }
              }

              return (
                <div
                  key={p._id}
                  className="bg-[#0D131F] border border-white/10 rounded-2xl overflow-hidden hover:border-amber-400 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative w-full h-52 bg-gray-900 overflow-hidden">
                      <Image
                        src={cover}
                        alt={`${p.title} - Dhaka College Science Club`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {p.category && (
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md text-amber-400 border border-amber-400/30">
                          {p.category}
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="text-xs text-gray-500 font-mono mb-2">
                        {p.date}
                      </div>
                      <h2 className="font-heading font-bold text-xl text-white group-hover:text-amber-400 transition-colors">
                        {p.title}
                      </h2>
                      <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                        {p.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Read Full Story on Facebook */}
                  <div className="p-6 pt-0">
                    <a
                      href={p.facebookUrl || 'https://www.facebook.com/DhakaCollegeScienceClub'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-amber-400 hover:bg-amber-400 hover:text-black transition-all"
                    >
                      <span>Read Full Story on Facebook</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#0D131F] rounded-2xl border border-white/10">
            <p className="text-gray-400">Loading stories from Sanity CMS...</p>
          </div>
        )}
      </div>
    </div>
  )
}
