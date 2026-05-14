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

export default function Footer() {
  
  return (
    <footer className="relative bg-red-400 overflow-hidden pt-20">
      {/* Top Gradient Border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

      {/* Vibrant Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-red-900/20 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-4 lg:pr-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 p-1 shadow-2xl backdrop-blur-sm">
                <Image
                  src="/images/EJ-logo.png"
                  alt="Electric Jamez logo"
                  width={48}
                  height={48}
                  className="rounded-lg object-contain"
                />
              </div>
              <span className="font-serif text-2xl font-bold text-white tracking-tight">
                Electric<span className="text-red-500">Jamez</span>
              </span>
            </div>
            <p className="text-sm text-slate-50 leading-relaxed mb-8">
              NAPIT approved and Which? Trusted Trader electrician serving North West London. Professional, certified, and reliable electrical services for home and business.
            </p>
            <div className="flex flex-col gap-4">
              <a href="tel:+447000000000" className="group flex items-center gap-4 text-sm text-slate-400 hover:text-white transition-all duration-300 w-fit">
                <div className="p-2 rounded-lg bg-red-500/10 text-slate-50 text-red-400 group-hover:bg-red-500 group-hover:text-white transition-colors duration-300">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="group-hover:translate-x-1 transition-transform duration-300">07000 000 000</span>
              </a>
              <a href="mailto:info@electricjamez.co.uk" className="group flex items-center gap-4 text-sm text-slate-400 hover:text-white transition-all duration-300 w-fit">
                <div className="p-2 rounded-lg bg-red-500/10 text-slate-50 group-hover:bg-red-500 group-hover:text-white transition-colors duration-300">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="group-hover:translate-x-1 transition-transform duration-300">info@electricjamez.co.uk</span>
              </a>
              <div className="flex items-center gap-4 text-sm text-slate-50 w-fit">
                <div className="p-2 rounded-lg bg-white/5 text-slate-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>NW2, North West London</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="font-sans font-semibold text-white mb-6 tracking-wide text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              SERVICES
            </h3>
            <ul className="flex flex-col gap-4">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <FooterLinkClient href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="font-sans font-semibold text-white mb-6 tracking-wide text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              COMPANY
            </h3>
            <ul className="flex flex-col gap-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <FooterLinkClient href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>

          {/* Areas Served - SEO BOOST */}
          <div className="lg:col-span-2">
            <h3 className="font-sans font-semibold text-white mb-6 tracking-wide text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              AREAS SERVED
            </h3>
            <ul className="flex flex-col gap-4">
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
          <div className="lg:col-span-2">
            <h3 className="font-sans font-semibold text-white mb-6 tracking-wide text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              TRUSTED BY
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {[
                'NAPIT Approved',
                'Which? Trusted Trader',
                'Part P Registered',
                'Fully Insured',
              ].map((item) => (
                <div
                  key={item} 
                  className="group flex items-center gap-3 text-xs font-medium text-slate-50 bg-white/5 border border-white/5 hover:border-red-500/30 hover:bg-white/10 px-4 py-3 rounded-xl transition-all duration-300 cursor-default"
                >
                  <Zap className="w-3.5 h-3.5 text-red-400 group-hover:text-red-300 transition-colors" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-slate-50">
            {'\u00A9'} {new Date().getFullYear()} Electric Jamez. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            <Link href="/privacy" className="text-sm text-slate-50 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-slate-50 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-sm text-slate-50 hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
