'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { TopHeader } from './navigation-top-header'
import { DesktopMenu } from './navigation-desktop-menu'
import { MobileMenu } from './navigation-mobile-menu'

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Track which section is in view
  useEffect(() => {
    if (pathname !== '/') return

    const sectionIds = ['services', 'faq', 'gallery', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection('#' + entry.target.id)
          }
        }
      },
      { rootMargin: '-40% 0px -50% 0px' }
    )

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [pathname])

  const scrollToSection = (href: string) => {
    if (pathname !== '/') {
      router.push('/' + href)
      return
    }

    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gray-300">
      {/* Top Header */}
      <TopHeader isScrolled={isScrolled} />

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <button
          onClick={() => {
            if (pathname !== '/') {
              router.push('/')
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
          className="flex items-center gap-2 group"
          aria-label="Go to homepage"
        >
          <Image
            src="/images/EJ-logo.png"
            alt="Electric Jamez logo"
            width={48}
            height={48}
            className="rounded-full"
          />

          <h1 className="text-2xl font-bold text-red-700 transition-colors duration-200 group-hover:text-white/80 tracking-tight">
            Electric Jamez
          </h1>
        </button>

        {/* Desktop Navigation */}
        <DesktopMenu
          activeSection={activeSection}
          pathname={pathname}
          scrollToSection={scrollToSection}
        />

        {/* Mobile Navigation */}
        <MobileMenu
          activeSection={activeSection}
          pathname={pathname}
          isScrolled={isScrolled}
          scrollToSection={scrollToSection}
        />
      </nav>
    </header>
  )
}