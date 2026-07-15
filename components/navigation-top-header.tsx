'use client'

import { Phone, MapPin, Clock } from 'lucide-react'

interface TopHeaderProps {
  isScrolled: boolean
}

export function TopHeader({ isScrolled }: TopHeaderProps) {
  return (
    <div
      className={`w-full bg-white transition-all duration-300 overflow-hidden h-[60px] opacity-100 ${
        isScrolled ? 'md:h-0 md:opacity-0' : 'md:h-[60px] md:opacity-100'
      }`}
    >
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
  )
}
