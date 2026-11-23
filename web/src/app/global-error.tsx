'use client'

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body className="bg-[#080C14] text-white flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h2 className="text-xl font-bold mb-4">Something went wrong!</h2>
        <button
          onClick={() => reset()}
          className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-400 text-black hover:bg-cyan-300"
        >
          Try again
        </button>
      </body>
    </html>
  )
}
