import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#080C14] text-white flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md space-y-4">
        <span className="text-6xl font-heading font-black text-cyan-400">404</span>
        <h1 className="text-2xl font-bold">Page Not Found</h1>
        <p className="text-gray-400 text-sm">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-400 text-black hover:bg-cyan-300 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
