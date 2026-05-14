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
    <footer className="bg-slate-950 text-white px-6 md:px-20 pt-24 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-3xl font-bold">bolt</span>
              <h2 className="text-xl font-bold uppercase tracking-tight text-white">
                Electric<span className="text-primary">Jamez</span>
              </h2>
            </Link>
            
            <p className="text-slate-400">
              Professional electrical contracting services for commercial and residential clients. Available for emergency services 24/7.
            </p>
            <div className="flex gap-4">
              <Link className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors" href="#">
                <span className="material-symbols-outlined">public</span>
              </Link>
              <Link className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors" href="#">
                <span className="material-symbols-outlined">alternate_email</span>
              </Link>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6">Services</h4>
            <ul className="flex flex-col gap-4 text-slate-400">
              <li><Link className="hover:text-primary transition-colors" href="#">Residential Wiring</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Commercial Fit-outs</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Emergency Repairs</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Panel Upgrades</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Details</h4>
            <ul className="flex flex-col gap-4 text-slate-400">
              <li className="flex items-center gap-3">

                <span className="material-symbols-outlined text-primary">phone</span>
                (555) 123-4567
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">mail</span>
                info@electrijamez
                .com

              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary">location_on</span>
                123 Power Grid Lane,<br />ElectriCity, NW4 7TH
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6">Service Areas</h4>
            <ul className="flex flex-col gap-4 text-slate-400">
              <li>Hamstead</li>
              <li>Golder Green</li>
              <li>Central London</li>
              <li>Swiss Cottage</li>
            </ul>
            <div className="mt-6">

              <div className="w-full h-32 rounded-xl bg-slate-800 overflow-hidden opacity-50 relative">
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
