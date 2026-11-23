import Link from 'next/link'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata() {
  return buildMetadata({
    title: 'Interactive Sci-Lab',
    description:
      'Play, experiment, and simulate scientific phenomena with interactive chemistry reactions, gravity physics, atom building, and quizzes.',
    path: '/scilab',
  })
}

export default function SciLabPage() {
  const labs = [
    {
      title: 'Chemistry Reaction Lab',
      desc: 'Mix chemical compounds and observe real-time color changes, precipitates, and thermal reactions.',
      icon: '🧪',
      color: 'from-blue-500/20 to-cyan-500/20 border-cyan-500/40',
      link: '/labs/scilab-chem.html',
    },
    {
      title: 'Gravity & Orbit Simulator',
      desc: 'Simulate planetary orbits, gravitational attraction, and celestial mechanics in real-time physics canvas.',
      icon: '🪐',
      color: 'from-purple-500/20 to-indigo-500/20 border-indigo-500/40',
      link: '/labs/scilab-gravity.html',
    },
    {
      title: 'Atom Builder Simulation',
      desc: 'Construct elements from the periodic table by placing protons, neutrons, and electron valence shells.',
      icon: '⚛️',
      color: 'from-amber-500/20 to-orange-500/20 border-amber-500/40',
      link: '/labs/scilab-atom.html',
    },
    {
      title: 'Science Olympiad Quiz',
      desc: 'Test your scientific aptitude with timed questions covering Physics, Chemistry, Biology, and Astronomy.',
      icon: '💡',
      color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/40',
      link: '/labs/scilab-quiz.html',
    },
    {
      title: 'Sci-Lab Sandbox',
      desc: 'Freeform experimental canvas for custom particle animations and physics experiments.',
      icon: '🔬',
      color: 'from-rose-500/20 to-pink-500/20 border-rose-500/40',
      link: '/labs/scilab-sandbox.html',
    },
  ]

  return (
    <div className="min-h-screen bg-[#080C14] text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
            Hands-on Science Hub
          </span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-white mt-2">
            Interactive Sci-Lab
          </h1>
          <p className="text-gray-400 text-sm sm:text-base mt-4">
            Step into the virtual laboratory. Experiment with equations, forces, and particles right inside your browser.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {labs.map((lab, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-br ${lab.color} bg-[#0D131F] border rounded-3xl p-8 flex flex-col justify-between hover:scale-[1.02] transition-all duration-300 shadow-xl`}
            >
              <div>
                <div className="text-5xl mb-6">{lab.icon}</div>
                <h2 className="font-heading font-bold text-2xl text-white mb-3">
                  {lab.title}
                </h2>
                <p className="text-gray-300 text-sm leading-relaxed mb-8">
                  {lab.desc}
                </p>
              </div>

              <a
                href={lab.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3.5 rounded-full font-bold text-xs uppercase tracking-widest bg-white text-black hover:bg-cyan-400 transition-colors shadow-lg"
              >
                Launch Simulation ↗
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
