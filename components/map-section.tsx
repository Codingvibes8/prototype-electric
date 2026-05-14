'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
const CENTER = { lat: 51.5583, lng: -0.2325 } // NW2, London (Cricklewood area)
const RADIUS = 8046 // ~5 miles in meters for service area

export function MapSection() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!isLoaded || !mapRef.current || !window.google) return

    const map = new window.google.maps.Map(mapRef.current, {
      center: CENTER,
      zoom: 12,
      mapId: 'bf51a910020fa25a',
      disableDefaultUI: true,
      gestureHandling: 'greedy',
      styles: [
        { featureType: 'all', elementType: 'labels.text.fill', stylers: [{ color: '#ffffff' }, { weight: '0.1' }] },
        { featureType: 'all', elementType: 'labels.text.stroke', stylers: [{ visibility: 'off' }] },
        { featureType: 'landscape', elementType: 'all', stylers: [{ color: '#0f172a' }] },
        { featureType: 'poi', elementType: 'all', stylers: [{ visibility: 'off' }] },
        { featureType: 'road', elementType: 'all', stylers: [{ color: '#1e293b' }] },
        { featureType: 'water', elementType: 'all', stylers: [{ color: '#020617' }] },
      ],
    })

    // Add Business Base Marker
    new window.google.maps.marker.AdvancedMarkerElement({
      position: CENTER,
      map,
      title: 'Electric Jamez Base',
    })

    // Add Service Area Circle
    new window.google.maps.Circle({
      center: CENTER,
      radius: RADIUS,
      fillColor: '#ef4444',
      fillOpacity: 0.15,
      strokeColor: '#ef4444',
      strokeOpacity: 0.4,
      strokeWeight: 2,
      map: map,
    })
  }, [isLoaded])

  if (!API_KEY || API_KEY === 'YOUR_GOOGLE_MAPS_API_KEY') {
    return (
      <section className="py-24 bg-slate-900 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Our Service Area</h2>
          <div className="aspect-[21/9] w-full bg-slate-800 rounded-3xl flex items-center justify-center border border-white/10">
            <p className="text-slate-400">Google Maps API Key not detected. Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env file.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="location" className="relative py-24 md:py-32 overflow-hidden bg-gray-100">
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=marker&v=weekly`}
        onLoad={() => setIsLoaded(true)}
      />

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-red-800 rounded-full blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-900/40 border border-red-500/30 text-[10px] uppercase tracking-[0.2em] font-bold text-red-200 mb-6">
            Where We Work
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-extrabold text-white text-balance leading-tight">
            Our <span className="text-red-500">Service Area</span>
          </h2>
          <p className="mt-6 text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed opacity-80">
            Based in North West London, we provide emergency and scheduled electrical services across NW2 and surrounding boroughs.
          </p>
        </div>

        <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative">
          <div ref={mapRef} className="w-full h-full" />
          
          <div className="absolute bottom-6 left-6 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-white/10 text-white z-10 shadow-xl max-w-[200px]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
              <span className="text-xs font-bold uppercase tracking-wider">Business Base</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full border-2 border-red-500/50 bg-red-500/10" />
              <span className="text-xs font-bold uppercase tracking-wider">Primary Service Area</span>
            </div>
            <p className="mt-4 text-[10px] text-slate-400 leading-tight">
              We cover all of NW2 and surrounding areas within a 5km radius for emergency call-outs.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

declare global {
  interface Window {
    google: any
  }
}
