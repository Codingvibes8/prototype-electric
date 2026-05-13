'use client'

export function HeroScrollButton() {
  return (
    <button
      onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
      className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-all shadow-lg hover:scale-105"
    >
      Our Services
    </button>
  )
}
