'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Events', href: '/events' },
    { label: 'Achievements', href: '/achievements' },
    { label: 'Committee', href: '/committee' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Sci-Lab', href: '/scilab' },
    { label: 'Wall Magazine', href: '/wall-magazine' },
    { label: 'Posts & News', href: '/posts' },
    { label: 'About', href: '/about' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-[#080C14]/90 backdrop-blur-md border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 flex-shrink-0">
            <Image
              src="/image/logo.png"
              alt="DCSC Logo"
              fill
              className="object-contain transition-transform group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-sm tracking-wider text-white">
              DHAKA COLLEGE
            </span>
            <span className="font-heading font-bold text-xs tracking-widest text-cyan-400">
              SCIENCE CLUB
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-4">
          <Link
            href="/join"
            className="px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all hover:-translate-y-0.5"
          >
            Join Club
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="xl:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="xl:hidden bg-[#080C14] border-b border-cyan-500/20 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-200 hover:text-cyan-400 hover:bg-white/5"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4">
            <Link
              href="/join"
              onClick={() => setIsOpen(false)}
              className="block text-center w-full px-5 py-3 rounded-full font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-blue-500 text-black"
            >
              Join Club
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
