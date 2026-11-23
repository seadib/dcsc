import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { wallMagazinesQuery } from '@/lib/sanity/queries'
import { urlForImage } from '@/lib/sanity/image'
import { buildMetadata } from '@/lib/seo'



export async function generateMetadata() {
  return buildMetadata({
    title: 'Digital Wall Magazine',
    description:
      'Digital wall magazines and science publications published by the editorial team of Dhaka College Science Club.',
    path: '/wall-magazine',
  })
}

export default async function WallMagazinePage() {
  const magazines = await client.fetch(wallMagazinesQuery).catch(() => [])

  return (
    <div className="min-h-screen bg-[#080C14] text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
            Editorial &amp; Publication
          </span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white mt-2">
            Digital Wall Magazine
          </h1>
          <p className="text-gray-400 text-sm sm:text-base mt-4">
            Showcasing articles, science journalism, and artistic perspectives written by brilliant student minds.
          </p>
        </div>

        {magazines && magazines.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {magazines.map((mag: any) => {
              let cover = '/image/logo.png'
              if (mag.coverImage) {
                try {
                  cover = urlForImage(mag.coverImage).width(600).height(800).url()
                } catch {
                  if (typeof mag.coverImage === 'string') cover = mag.coverImage
                }
              }

              const readLink = mag.pdfUrl || mag.externalReadUrl

              return (
                <div
                  key={mag._id}
                  className="bg-[#0D131F] border border-emerald-500/20 rounded-2xl overflow-hidden hover:border-emerald-400 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative w-full h-80 bg-gray-900 overflow-hidden">
                      <Image
                        src={cover}
                        alt={`${mag.title} - Dhaka College Science Club`}
                        fill
                        className="object-cover"
                      />
                      {mag.edition && (
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                          {mag.edition}
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="text-xs text-gray-400 font-mono mb-2">
                        {mag.publishDate || 'Published by DCSC'}
                      </div>
                      <h2 className="font-heading font-bold text-xl text-white">
                        {mag.title}
                      </h2>
                      <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                        {mag.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    {readLink ? (
                      <a
                        href={readLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500 text-black hover:bg-emerald-400 transition-all"
                      >
                        <span>Read Edition (PDF)</span>
                        <span>↗</span>
                      </a>
                    ) : (
                      <span className="text-xs text-gray-500 block text-center py-2">
                        Edition in print at DCSC club room
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#0D131F] rounded-2xl border border-white/10">
            <p className="text-gray-400">Loading wall magazines from Sanity CMS...</p>
          </div>
        )}
      </div>
    </div>
  )
}
