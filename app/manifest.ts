import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Electric Jamez | NAPIT Approved Electrician NW2',
    short_name: 'Electric Jamez',
    description:
      'Professional electrical services in North West London (NW2). NAPIT approved & Which? Trusted Trader. EV charger installation, air conditioning, PAT testing & more.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#cbd4e8ff',
    icons: [
      {
        src: '/images/EJ-logo.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
  }
}
