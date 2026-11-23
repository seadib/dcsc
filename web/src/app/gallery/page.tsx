import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { galleryAlbumsQuery } from '@/lib/sanity/queries'
import { urlForImage } from '@/lib/sanity/image'
import { buildMetadata } from '@/lib/seo'



export async function generateMetadata() {
  return buildMetadata({
    title: 'Photo Gallery',
    description:
      'Moments, memories, and snapshots from Dhaka College Science Club festivals, workshops, and gatherings.',
    path: '/gallery',
  })
}

export default async function GalleryPage() {
  const albums = await client.fetch(galleryAlbumsQuery).catch(() => [])

  return (
    <div className="min-h-screen bg-[#080C14] text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
            Visual Memories
          </span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white mt-2">
            Photo Gallery
          </h1>
          <p className="text-gray-400 text-sm sm:text-base mt-4">
            Capturing the spirit of discovery, camaraderie, and celebration at Dhaka College Science Club.
          </p>
        </div>

        {albums && albums.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {albums.map((album: any) => {
              let cover = '/image/logo.png'
              if (album.coverPhoto) {
                try {
                  cover = urlForImage(album.coverPhoto).width(700).height(500).url()
                } catch {
                  if (typeof album.coverPhoto === 'string') cover = album.coverPhoto
                }
              }

              return (
                <div
                  key={album._id}
                  className="bg-[#0D131F] border border-cyan-500/20 rounded-2xl overflow-hidden hover:border-cyan-400 transition-all group"
                >
                  <div className="relative w-full h-64 bg-gray-900 overflow-hidden">
                    <Image
                      src={cover}
                      alt={`${album.title} - Dhaka College Science Club`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D131F] via-transparent to-transparent opacity-80" />
                    <span className="absolute bottom-4 left-6 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/60 text-cyan-400 border border-cyan-500/30">
                      {album.photos ? `${album.photos.length} Photos` : 'Album'}
                    </span>
                  </div>
                  <div className="p-6">
                    <h2 className="font-heading font-bold text-xl text-white group-hover:text-cyan-400 transition-colors">
                      {album.title}
                    </h2>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#0D131F] rounded-2xl border border-white/10">
            <p className="text-gray-400">Loading gallery albums from Sanity CMS...</p>
          </div>
        )}
      </div>
    </div>
  )
}
