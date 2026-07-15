'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { ChevronDown, Phone } from 'lucide-react'
import { serviceItems, locationItems } from './navigation-data'

interface DesktopMenuProps {
  activeSection: string
  pathname: string
  scrollToSection: (href: string) => void
}

export function DesktopMenu({
  activeSection,
  pathname,
  scrollToSection,
}: DesktopMenuProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isLocationOpen, setIsLocationOpen] = useState(false)
  
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const locationTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

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
              : 'text-gray-700 hover:text-gray-900'
          }`}
        >
          Services
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              isDropdownOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Dropdown menu */}
        <div
          className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${
            isDropdownOpen
              ? 'opacity-100 visible translate-y-0'
              : 'opacity-0 invisible -translate-y-2'
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
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              isLocationOpen ? 'rotate-180' : ''
            }`}
          />
        </Link>

        {/* Dropdown menu */}
        <div
          className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${
            isLocationOpen
              ? 'opacity-100 visible translate-y-0'
              : 'opacity-0 invisible -translate-y-2'
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
          activeSection === '#faq' ? 'text-gray-900' : 'text-gray-700 hover:text-gray-900'
        }`}
      >
        FAQ
      </button>

      <Link
        href="/blog"
        className={`text-sm font-medium cursor-pointer transition-colors duration-200 ${
          pathname === '/blog' ? 'text-gray-900' : 'text-gray-700 hover:text-gray-900'
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
  )
}
