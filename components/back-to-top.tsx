'use client'

import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-4 left-4 md:bottom-28 md:right-8 z-50 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-900 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group border border-slate-200"
          aria-label="Back to top"
        >
          <ChevronUp className="h-7 w-7 transition-transform group-hover:-translate-y-1" />
          
          {/* Pulsing Ring Effect */}
          <span className="absolute inset-0 rounded-full border border-red-800 animate-ping opacity-20 group-hover:opacity-40" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
