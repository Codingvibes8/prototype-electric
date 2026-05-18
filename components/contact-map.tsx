'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import { createServerParamsForServerSegment } from 'next/dist/server/app-render/entry-base'
import { createRoot } from 'react-dom/client'

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
const CENTER = { lat: 51.556549, lng: -0.215147 } // Cricklewood, NW2, London

export function ContactMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!isLoaded || !mapRef.current || !window.google) return

    const map = new window.google.maps.Map(mapRef.current, {
      center: CENTER,
      zoom: 14,
    })

    new window.google.maps.Marker({
      position: CENTER,
      map,
      title: 'Contract Electrical',
    })
  }, [isLoaded])

  if (!API_KEY || API_KEY === 'YOUR_GOOGLE_MAPS_API_KEY') {
    return (
      <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100 flex items-center justify-center p-6 text-center">
        <p className="text-slate-500 font-medium max-w-md">
          Google Maps API Key not detected. Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env file.
        </p>
      </div>
    )
  }

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=weekly`}
        onLoad={() => setIsLoaded(true)}
      />
      <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg border border-slate-200">
        <div ref={mapRef} className="w-full h-full bg-slate-100" />
      </div>
    </>
  )
}

declare global {
  interface Window {
    google: any
  }
}

