"use client"

import Link from "next/link"

const R_CARDS = [
  {
    title: "Refuse",
    icon: (
      <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
    description: "The most effective way to reduce waste is to not create it in the first place. Say no to unnecessary gadgets and single-use electronics.",
    example: "Opt for a phone repair instead of buying a new one just for a minor feature upgrade.",
    color: "border-red-100 bg-red-50",
    link: "/refuse"
  },
  {
    title: "Reduce",
    icon: (
      <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
      </svg>
    ),
    description: "Minimize your digital footprint. Use devices for longer, and choose energy-efficient models that consume less power.",
    example: "Buy high-quality, durable electronics that last 5-7 years instead of cheaper alternatives.",
    color: "border-blue-100 bg-blue-50",
    link: "/reduce"
  },
  {
    title: "Reuse",
    icon: (
      <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    description: "Give your old electronics a second life. Donate, sell, or repurpose them for new tasks around the house.",
    example: "Turn an old tablet into a dedicated smart home controller or digital photo frame.",
    color: "border-green-100 bg-green-50",
    link: "/reuse"
  },
  {
    title: "Repair",
    icon: (
      <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
    description: "Support the Right to Repair. Fixing a cracked screen or replacing a dying battery saves money and the planet.",
    example: "Visit a local repair cafe or use iFixit guides to swap out a laptop battery yourself.",
    color: "border-orange-100 bg-orange-50",
    link: "/repair"
  },
  {
    title: "Recycle",
    icon: (
      <svg className="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    description: "When an item truly reaches its end, ensure it is recycled through certified e-waste facilities to recover raw materials.",
    example: "Use ELocate to find a drop-off point for your old PCB and batteries.",
    color: "border-emerald-100 bg-emerald-50",
    link: "/recycle1"
  }
]

export default function FiveRPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-green-900 py-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-green-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-300 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            The 5Rs of <span className="text-green-400">Electronic</span> Sustainability
          </h1>
          <p className="text-xl md:text-2xl text-green-100 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Every year, the world produces over 50 million metric tons of e-waste. Transition to a circular economy with these five simple steps.
          </p>
          <div className="inline-block bg-green-800 backdrop-blur-md border border-green-700 px-6 py-3 rounded-full">
            <span className="text-green-300 font-bold uppercase tracking-widest text-sm">Saving the Earth, one device at a time</span>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="max-w-7xl mx-auto px-6 -mt-10 mb-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center transform hover:-translate-y-2 transition-transform duration-300">
            <h3 className="text-4xl font-bold text-gray-900 mb-2">53.6M</h3>
            <p className="text-gray-500 font-medium uppercase tracking-tighter">Metric Tons E-Waste Produced Yearly</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center transform hover:-translate-y-2 transition-transform duration-300">
            <h3 className="text-4xl font-bold text-green-600 mb-2">17.4%</h3>
            <p className="text-gray-500 font-medium uppercase tracking-tighter">Current Global Recycling Rate</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center transform hover:-translate-y-2 transition-transform duration-300">
            <h3 className="text-4xl font-bold text-blue-600 mb-2">$57B</h3>
            <p className="text-gray-500 font-medium uppercase tracking-tighter">Value of Raw Materials Wasted</p>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {R_CARDS.map((card, idx) => (
            <div
              key={idx}
              className={`group p-8 rounded-[2.5rem] border-2 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] flex flex-col h-full ${card.color}`}
            >
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500">
                {card.icon}
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">{card.title}</h3>
              <p className="text-gray-700 mb-6 flex-grow leading-relaxed">
                {card.description}
              </p>
              <div className="bg-white/50 p-4 rounded-2xl mb-8 border border-white">
                <p className="text-sm font-bold text-gray-900 mb-1">💡 Real-world Example:</p>
                <p className="text-sm text-gray-600 italic">"{card.example}"</p>
              </div>
              <Link
                href={card.link}
                className="w-full text-center bg-gray-900 text-white font-bold py-4 rounded-2xl group-hover:bg-green-600 transition-colors shadow-lg"
              >
                Learn More
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Motivational Footer */}
      <div className="bg-green-50 py-20 text-center px-6">
        <h2 className="text-4xl font-black text-gray-900 mb-6 italic">"The best garbage is the one that was never produced."</h2>
        <p className="text-lg text-gray-600 mb-10">Start your journey today with ELocate and be part of the solution.</p>
        <Link href="/ewaste-check" className="bg-green-600 text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-green-700 transition-all shadow-xl shadow-green-200">
          Start My E-Waste Audit
        </Link>
      </div>

      <div className="py-10 text-center text-gray-400 text-sm">
        © 2026 ELocate Sustainability Initiative • Built for a Greener Tomorrow
      </div>
    </div>
  )
}
