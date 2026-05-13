import { Zap, Phone, Mail, MapPin } from 'lucide-react'
import { FooterLinkClient } from './footer-link-client'
import Image from 'next/image'
import Link from 'next/link'
import { LOCATIONS } from './services'

const serviceLinks = [
  { label: 'Air Conditioning', href: '#services' },
  { label: 'EV Charger Installation', href: '#services' },
  { label: 'Safety Certificates', href: '#services' },
  { label: 'Flood Damage Assessment', href: '#services' },
  { label: 'Outdoor Lighting', href: '#services' },
  { label: 'PAT Testing', href: '#services' },
]

const quickLinks = [
  { label: 'Home', href: '#' },
  { label: 'Services', href: '#services' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
  { label: 'Location', href: '/location' },
  { label: 'Blog', href: '/blog' },
]

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-slate-950 overflow-hidden">
      {/* Vibrant Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-red-800 rounded-full blur-[120px]" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-red-900 rounded-full blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 p-1 shadow-inner">
                <Image
                  src="EJ-logo.png"
                  alt="Electric Jamez logo"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              </div>
              <span className="font-serif text-xl font-bold text-white tracking-tight">
                Electric <span className="text-red-400">Jamez</span>
              </span>
            </div>
            <p className="text-sm text-gray-900 leading-relaxed mb-6">
              NAPIT approved and Which? Trusted Trader electrician serving North West London. Professional, certified, and reliable electrical services for home and business.
            </p>
            <div className="flex flex-col gap-3">
              <a href="tel:+447000000000" className="group flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-red-400" />
                07000 000 000
              </a>
              <a href="mailto:info@electricjamez.co.uk" className="group flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-red-400" />
                info@electricjamez.co.uk
              </a>
              <span className="flex items-center gap-3 text-sm text-white/60">
                <MapPin className="w-4 h-4 text-red-400" />
                NW2, North West London
              </span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-serif font-bold text-white mb-6 uppercase tracking-widest text-xs">Services</h3>
            <ul className="flex flex-col gap-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <FooterLinkClient href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-bold text-white mb-6 uppercase tracking-widest text-xs">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <FooterLinkClient href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>

          {/* Areas Served - SEO BOOST */}
          <div>
            <h3 className="font-serif font-bold text-white mb-6 uppercase tracking-widest text-xs">Areas Served</h3>
            <ul className="flex flex-col gap-3">
              {LOCATIONS.slice(0, 6).map((loc) => (
                <li key={loc.name}>
                  <FooterLinkClient 
                    href={`/services/ev-charger-installation-in-${loc.name.toLowerCase()}`}
                    label={loc.name} 
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Accreditations */}
          <div>
            <h3 className="font-serif font-bold text-white mb-6 uppercase tracking-widest text-xs">Accreditations</h3>
            <div className="grid grid-cols-1 gap-4">
              {[
                'NAPIT Approved',
                'Which? Trusted Trader',
                'Part P Registered',
                'Fully Insured',
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-xs font-bold text-white/60 bg-white/5 border border-white/10 px-3 py-2 rounded-lg"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-white/40">
            {'\u00A9'} {new Date().getFullYear()} Electric Jamez. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link href="/privacy" className="text-xs text-white/40 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-white/40 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-xs text-white/40 hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
