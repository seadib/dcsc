import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Dhaka College Science Club (DCSC)',
    template: '%s | Dhaka College Science Club (DCSC)',
  },
  description:
    'Spreading the knowledge of science to the utmost since 1996. The official platform for Dhaka College Science Club.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark h-full">
      <body className="min-h-full flex flex-col bg-[#080C14] text-white font-sans antialiased selection:bg-cyan-500 selection:text-black">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
