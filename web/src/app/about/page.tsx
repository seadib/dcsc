import { client } from '@/lib/sanity/client'
import { siteSettingsQuery } from '@/lib/sanity/queries'
import { buildMetadata } from '@/lib/seo'



export async function generateMetadata() {
  return buildMetadata({
    title: 'Info & Contact',
    description:
      'Learn about Dhaka College Science Club history, founding mission, executive headquarters, and contact channels.',
    path: '/about',
  })
}

export default async function AboutPage() {
  const settings = await client.fetch(siteSettingsQuery).catch(() => null)

  const contact = settings?.contactInfo || {
    email: 'dcsc.contact@gmail.com',
    phone: '+880 1700-000000',
    address: 'Dhaka College, Mirpur Road, Dhanmondi, Dhaka-1205',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.228519448374!2d90.38072047589632!3d23.739223789228834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b7a6358c89%3A0x6b8014589d89edb3!2sDhaka%20College!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd',
  }

  return (
    <div className="min-h-screen bg-[#080C14] text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-16">
        <div className="text-center">
          <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
            Since 1996
          </span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white mt-2">
            About Dhaka College Science Club
          </h1>
          <p className="text-gray-400 text-base max-w-2xl mx-auto mt-4 leading-relaxed">
            Established in 1996, DCSC is one of the oldest and most prestigious collegiate science clubs in Bangladesh, nurturing innovation, research, and scientific leadership.
          </p>
        </div>

        {/* History / Mission Card */}
        <div className="bg-[#0D131F] border border-cyan-500/20 rounded-3xl p-8 sm:p-12 space-y-6">
          <h2 className="font-heading font-bold text-2xl text-cyan-400">
            Our Mission &amp; Vision
          </h2>
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
            Dhaka College Science Club was founded with the resolute belief that curiosity drives civilization. Over the past three decades, DCSC has grown from a passionate group of students into an institution that organizes national-level olympiads, inter-college science arenas, astronomical observation camps, and tech innovation workshops.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/10">
            <div>
              <div className="text-cyan-400 font-black text-2xl font-heading">1996</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Founding Year</div>
            </div>
            <div>
              <div className="text-cyan-400 font-black text-2xl font-heading">15k+</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Alumni Network</div>
            </div>
            <div>
              <div className="text-cyan-400 font-black text-2xl font-heading">50+</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Annual Festivals</div>
            </div>
          </div>
        </div>

        {/* Contact Info & Map */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#0D131F] border border-white/10 rounded-3xl p-8 space-y-6">
            <h3 className="font-heading font-bold text-xl text-white">
              Official Contact Channels
            </h3>
            <div className="space-y-4 text-sm">
              <div>
                <span className="text-xs text-gray-500 block uppercase font-mono">Address</span>
                <span className="text-gray-200">{contact.address}</span>
              </div>
              <div>
                <span className="text-xs text-gray-500 block uppercase font-mono">Email</span>
                <a href={`mailto:${contact.email}`} className="text-cyan-400 hover:underline">
                  {contact.email}
                </a>
              </div>
              {contact.phone && (
                <div>
                  <span className="text-xs text-gray-500 block uppercase font-mono">Phone</span>
                  <span className="text-gray-200">{contact.phone}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-[#0D131F] border border-white/10 rounded-3xl overflow-hidden min-h-[250px] relative">
            <iframe
              src={contact.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '300px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Dhaka College Science Club Location"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
