'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, Phone, ChevronDown, Wind, Car, ShieldCheck, Droplets, Sun, ClipboardCheck, MapPin, Clock, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { LOCATIONS, generateSlug } from './services'

const serviceItems = [
  { icon: Wind, label: 'Air Conditioning Service' },
  { icon: Car, label: 'EV Charger Installation' },
  { icon: ShieldCheck, label: 'Electric Safety Certificates' },
  { icon: Droplets, label: 'Flood Damage Assessment' },
  { icon: Sun, label: 'Outdoor Lighting & Heating' },
  { icon: ClipboardCheck, label: 'PAT Testing' },
  { icon: Zap, label: 'Solar Panel Installation' },
].map((item) => ({
  ...item,
  href: `/services/${generateSlug(item.label, LOCATIONS[0].name)}`,
}))


const locationItems = [
  'Cricklewood',
  'Willesden',
  'Dollis Hill',
  'Neasden',
  'Kilburn',
  'West Hampstead',
  'Brondesbury',
  'Kensal Rise',
].map((name) => ({
  icon: MapPin,
  label: name,
  href: `/location/${name.toLowerCase().replace(/ /g, '-')}`,   // was /location#...
}))

export  function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
   const [isLocationOpen, setIsLocationOpen] = useState(false)  
   const locationTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)  // ADD
  const [isMobileLocationOpen, setIsMobileLocationOpen] = useState(false)     // ADD (for mobile)
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
    setIsMobileOpen(false)
    setIsMobileServicesOpen(false)

    if (pathname !== '/') {
      router.push('/' + href)
      return
    }

    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const handleDropdownEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current)
    setIsDropdownOpen(true)
  }

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setIsDropdownOpen(false), 150)
  }
    const handleLocationEnter = () => {
    if (locationTimeout.current) clearTimeout(locationTimeout.current)
    setIsLocationOpen(true)
  }

  const handleLocationLeave = () => {
    locationTimeout.current = setTimeout(() => setIsLocationOpen(false), 150)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300  bg-gray-300`}
      >
        {/* Top Header */}
        <div className={` w-full bg-white transition-all duration-300 overflow-hidden h-[60px] opacity-100 ${isScrolled ? 'md:h-0 md:opacity-0' : 'md:h-[60px] md:opacity-100'}`}>
          <div className="mx-auto flex max-w-7xl items-center justify-center px-6 h-full">
            {/* Contact Details (Desktop) */}
            <div className="flex gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-900">+44 20 7946 0958</span>
                  <span className="text-xs">Call us today</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-900">North West London</span>
                  <span className="text-xs">Serving the local area</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-900">Mon-Fri: 8am - 6pm</span>
                  <span className="text-xs">24/7 Emergency</span>
                </div>
              </div>
            </div>
          </div>
        </div>

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

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {/* Services dropdown */}
            <div
              className="relative"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                onClick={() => scrollToSection('#services')}
                className={`flex items-center gap-1 text-sm font-medium cursor-pointer transition-colors duration-200 ${
                  activeSection === '#services'
                    ? 'text-gray-900'
                    : isScrolled
                      ? 'text-gray-700 hover:text-gray-900'
                      : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Services
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown menu */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${
                  isDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}
              >
                <div className="w-72 bg-background/95 backdrop-blur-xl border border-border rounded-xl shadow-xl p-2">
                  {serviceItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors cursor-pointer"
                    >
                      <item.icon className="w-4 h-4 text-primary shrink-0" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact */}
            <button
              onClick={() => scrollToSection('#contact')}
              className={`text-sm font-medium cursor-pointer transition-colors duration-200 ${
                activeSection === '#contact'
                  ? 'text-gray-900'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Contact
            </button>

            {/* Location dropdown */}
            <div
              className="relative"
              onMouseEnter={handleLocationEnter}
              onMouseLeave={handleLocationLeave}
            >
              <Link
                href="/location"
                className={`flex items-center gap-1 text-sm font-medium cursor-pointer transition-colors duration-200 ${
                  pathname === '/location'
                    ? 'text-gray-900'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                Location
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isLocationOpen ? 'rotate-180' : ''}`} />
              </Link>

              {/* Dropdown menu */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${
                  isLocationOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}
              >
                <div className="w-64 bg-background/95 backdrop-blur-xl border border-border rounded-xl shadow-xl p-2">
                  {locationItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsLocationOpen(false)}
                      className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors cursor-pointer"
                    >
                      <item.icon className="w-4 h-4 text-primary shrink-0" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Gallery */}
            <button
              onClick={() => scrollToSection('#gallery')}
              className={`text-sm font-medium cursor-pointer transition-colors duration-200 ${
                activeSection === '#gallery'
                  ? 'text-gray-900'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Gallery
            </button>

            {/* FAQ */}
            <button
              onClick={() => scrollToSection('#faq')}
              className={`text-sm font-medium cursor-pointer transition-colors duration-200 ${
                activeSection === '#faq'
                  ? 'text-gray-900'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              FAQ
            </button>

            <Link
              href="/blog"
              className={`text-sm font-medium cursor-pointer transition-colors duration-200 ${
                pathname === '/blog'
                  ? 'text-gray-900'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Blog
            </Link>
            <a
              href="tel:+447000000000"
              className="bg-red-800 text-white rounded-lg flex items-center gap-2 px-5 py-2.5 font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className={`md:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
              isScrolled ? 'text-white hover:bg-white/10' : 'text-white hover:bg-white/10'
            }`}
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? <X className="w-10 h-10 text-gray-900" /> : <Menu className="w-10 h-10 text-gray-900" />}
          </button>
        </nav>
      </header>

      {/* Mobile nav overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 bg-gray-600 backdrop-blur-xl md:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-6 mt-20">
            
        {/* Mobile services accordion */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                className={`flex items-center gap-2 text-2xl font-serif font-bold transition-colors ${
                  activeSection === '#services' ? 'text-white' : 'text-white hover:text-white/80'
                }`}
              >
                Services
                <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isMobileServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isMobileServicesOpen && (
                <div className="flex flex-col items-center gap-3 mt-4">
                  {serviceItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => {
                        setIsMobileOpen(false)
                        setIsMobileServicesOpen(false)
                      }}
                      className="flex items-center gap-2 text-base text-white hover:text-white/80 transition-colors"
                    >
                      <item.icon className="w-4 h-4 text-primary" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Contact */}
            <button
              onClick={() => scrollToSection('#contact')}
              className={`text-2xl cursor-pointer font-serif font-bold transition-colors ${
                activeSection === '#contact' ? 'text-white' : 'text-white hover:text-white/80'
              }`}
            >
              Contact
            </button>

                       {/* Mobile location accordion */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => setIsMobileLocationOpen(!isMobileLocationOpen)}
                className={`flex items-center gap-2 text-2xl font-serif font-bold transition-colors ${
                  pathname === '/location' ? 'text-white' : 'text-white hover:text-white/80'
                }`}
              >
                Location
                <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isMobileLocationOpen ? 'rotate-180' : ''}`} />
              </button>
              {isMobileLocationOpen && (
                <div className="flex flex-col items-center gap-3 mt-4">
                  {locationItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => {
                        setIsMobileOpen(false)
                        setIsMobileLocationOpen(false)
                      }}
                      className="flex items-center gap-2 text-base text-white hover:text-white/80 transition-colors"
                    >
                      <item.icon className="w-4 h-4 text-primary" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Gallery */}
            <button
              onClick={() => scrollToSection('#gallery')}
              className={`text-2xl cursor-pointer font-serif font-bold transition-colors ${
                activeSection === '#gallery' ? 'text-white' : 'text-white hover:text-white/80'
              }`}
            >
              Gallery
            </button>

            {/* Mobile FAQ */}
            <button
              onClick={() => scrollToSection('#faq')}
              className={`text-2xl cursor-pointer font-serif font-bold transition-colors ${
                activeSection === '#faq' ? 'text-white' : 'text-white hover:text-white/80'
              }`}
            >
              FAQ
            </button>

            <Link
              href="/blog"
              onClick={() => setIsMobileOpen(false)}
              className={`text-2xl font-serif font-bold transition-colors ${
                pathname === '/blog' ? 'text-white' : 'text-white hover:text-white/80'
              }`}
            >
              Blog
            </Link>

            <a
              href="tel:+44 20 7946 0958"
              className="flex items-center gap-2 bg-red-800 text-primary-foreground px-8 py-3 rounded-lg font-semibold text-lg mt-4"
            >
              <Phone className="w-5 h-5" />
              Call Now  0207 946 0958
            </a>
          </div>
        </div>
      )}
    </>
  )
}