import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { achievementsQuery } from '@/lib/sanity/queries'
import { urlForImage } from '@/lib/sanity/image'
import { buildMetadata } from '@/lib/seo'



export async function generateMetadata() {
  return buildMetadata({
    title: 'Achievements & Accolades',
    description:
      'Trophies, olympiad champions, and prestigious recognitions earned by Dhaka College Science Club members.',
    path: '/achievements',
  })
}

export default async function AchievementsPage() {
  const achievements = await client.fetch(achievementsQuery).catch(() => [])

  return (
    <div className="min-h-screen bg-[#080C14] text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
            Glory &amp; Pride
          </span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white mt-2">
            Club Achievements
          </h1>
          <p className="text-gray-400 text-sm sm:text-base mt-4">
            Celebrating decades of national triumphs, Olympiad victories, and academic milestones achieved by DCSC.
          </p>
        </div>

        {achievements && achievements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((item: any) => {
              let imageSrc = '/image/logo.png'
              if (item.image) {
                try {
                  imageSrc = urlForImage(item.image).width(600).height(400).url()
                } catch {
                  if (typeof item.image === 'string') imageSrc = item.image
                }
              }

              return (
                <div
                  key={item._id}
                  className="bg-[#0D131F] border border-amber-500/20 rounded-2xl overflow-hidden hover:border-amber-400 transition-all flex flex-col justify-between"
                >
                  <div className="relative w-full h-56 bg-gray-900 overflow-hidden">
                    <Image
                      src={imageSrc}
                      alt={`${item.title} - Dhaka College Science Club`}
                      fill
                      className="object-cover"
                    />
                    {item.year && (
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md text-amber-400 border border-amber-400/30">
                        {item.year}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h2 className="font-heading font-bold text-xl text-white">
                      {item.title}
                    </h2>
                    <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#0D131F] rounded-2xl border border-white/10">
            <p className="text-gray-400">Loading achievements from Sanity CMS...</p>
          </div>
        )}
      </div>
    </div>
  )
}
