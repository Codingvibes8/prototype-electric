import type { Metadata, Viewport } from 'next'
import { Jost, Crimson_Pro, Geist } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ChatAssistant } from '@/components/chat-assistant'
import './globals.css'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const _jost = Jost({
  subsets: ['latin'],
  variable: '--font-josh',
  display: 'swap',
})

const _crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-crimson-pro',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://electricjamez.co.uk'),
  title: 'Electric Jamezed | NAPIT Approved Electrician | North West London NW2',
  description:
    'Professional electrical services in North West London (NW2). NAPIT approved & Which? Trusted Trader. EV charger installation, air conditioning, PAT testing, electrical safety certificates & more. Call today for a free quote.',
  keywords: [
    'electrician NW2',
    'electrician North West London',
    'Electric Jamez',
    'NAPIT approved electrician',
    'Which Trusted Trader electrician',
    'EV charger installation London',
    'air conditioning installation London',
    'PAT testing London',
    'electrical safety certificate London',
    'outdoor lighting installation',
    'flood damage electrical assessment',
  ],
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/images/EJ-logo.png', sizes: '32x32', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Electric Jamez | Professional Electrical Services | NW2 London',
    description:
      'NAPIT approved & Which? Trusted Trader electrician serving North West London. Expert EV charger installation, air conditioning, safety certificates & more.',
    type: 'website',
    locale: 'en_GB',
    url: 'https://electricjamez.co.uk',
    siteName: 'Electric Jamez',
    images: [{ url: '/ejsocial-1.png', width: 1200, height: 630, alt: 'Electric Jamez — NAPIT Approved Electrician NW2' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Electric Jamez | NAPIT Approved Electrician | NW2',
    description:
      'Professional electrical services in North West London. NAPIT approved & Which? Trusted Trader.',
    images: ['/ejsocial-1.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#cbd4e8ff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn("scroll-smooth", _jost.variable, _crimsonPro.variable, "font-sans", geist.variable)}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
             __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Electrician',
              name: 'Electric Jamez',
              description:
                'Professional electrical services in North West London. NAPIT approved & Which? Trusted Trader.',
              areaServed: {
                '@type': 'PostalAddress',
                addressLocality: 'North West London',
                postalCode: 'NW2',
                addressCountry: 'GB',
              },
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Electrical Services',
                itemListElement: [
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Air Conditioning Installation' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'EV Charger Installation' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Electric Safety Certificates' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'PAT Testing' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Outdoor Lighting & Heating' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Flood Damage Electrical Assessment' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Solar Panel Installation' } },
                ],
              },
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased text-white">
        {children}
        <Analytics />
        <ChatAssistant />
      </body>
    </html>
  )
}
