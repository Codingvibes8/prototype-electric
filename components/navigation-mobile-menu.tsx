'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Phone } from 'lucide-react'
import { serviceItems, locationItems } from './navigation-data'

interface MobileMenuProps {
  activeSection: string
  pathname: string
  isScrolled: boolean
  scrollToSection: (href: string) => void
}

export function MobileMenu({
  activeSection,
  pathname,
  isScrolled,
  scrollToSection,
}: MobileMenuProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  const [isMobileLocationOpen, setIsMobileLocationOpen] = useState(false)

  const handleScrollClick = (href: string) => {
    setIsMobileOpen(false)
    setIsMobileServicesOpen(false)
    setIsMobileLocationOpen(false)
    scrollToSection(href)
  }

  const handleLinkClick = () => {
    setIsMobileOpen(false)
    setIsMobileServicesOpen(false)
    setIsMobileLocationOpen(false)
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className={`md:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
          isScrolled ? 'text-white hover:bg-white/10' : 'text-white hover:bg-white/10'
        }`}
        aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMobileOpen}
      >
        {isMobileOpen ? (
          <X className="w-10 h-10 text-gray-900" />
        ) : (
          <Menu className="w-10 h-10 text-gray-900" />
        )}
      </button>

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
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isMobileServicesOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isMobileServicesOpen && (
                <div className="flex flex-col items-center gap-3 mt-4">
                  {serviceItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={handleLinkClick}
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
              onClick={() => handleScrollClick('#contact')}
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
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isMobileLocationOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isMobileLocationOpen && (
                <div className="flex flex-col items-center gap-3 mt-4">
                  {locationItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={handleLinkClick}
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
              onClick={() => handleScrollClick('#gallery')}
              className={`text-2xl cursor-pointer font-serif font-bold transition-colors ${
                activeSection === '#gallery' ? 'text-white' : 'text-white hover:text-white/80'
              }`}
            >
              Gallery
            </button>

            {/* Mobile FAQ */}
            <button
              onClick={() => handleScrollClick('#faq')}
              className={`text-2xl cursor-pointer font-serif font-bold transition-colors ${
                activeSection === '#faq' ? 'text-white' : 'text-white hover:text-white/80'
              }`}
            >
              FAQ
            </button>

            <Link
              href="/blog"
              onClick={handleLinkClick}
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
              Call Now 0207 946 0958
            </a>
          </div>
        </div>
      )}
    </>
  )
}
