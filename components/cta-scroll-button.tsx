'use client'

import { ArrowRight } from 'lucide-react'

export function CTAScrollButton() {
  return (
    <button
      onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
      className="flex items-center gap-2 border border-white/30 text-white px-8 py-4 rounded-lg font-semibold text-base hover:bg-white/10 transition-all"
    >
      Send a Message
      <ArrowRight className="w-4 h-4" />
    </button>
  )
}
