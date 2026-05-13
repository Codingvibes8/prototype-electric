import type { Metadata } from 'next'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { MapPin, Phone, Clock, CheckCircle, Zap } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Electrician in North West London NW2 | Areas We Cover | ElectricJamex',
  description:
    'ElectricJamex serves North West London including NW2 Cricklewood, Willesden, Dollis Hill, Neasden, Kilburn, West Hampstead, Brondesbury, and surrounding areas. NAPIT approved local electrician. Call for a free quote.',
  keywords: [
    'electrician NW2',
    'electrician Cricklewood',
    'electrician Willesden',
    'electrician Dollis Hill',
    'electrician Neasden',
    'electrician Kilburn',
    'electrician West Hampstead',
    'electrician Brondesbury',
    'electrician North West London',
    'local electrician NW London',
  ],
  openGraph: {
    title: 'Areas We Cover | ElectricJamex | North West London Electrician',
    description:
      'Serving NW2 and surrounding areas including Cricklewood, Willesden, Dollis Hill, Neasden, Kilburn, and West Hampstead.',
    type: 'website',
    locale: 'en_GB',
  },
}

const areas = [
  {
    name: 'Cricklewood',
    postcode: 'NW2',
    description:
      'Our home base. We provide fast-response electrical services across Cricklewood, from residential rewiring to commercial fit-outs.',
  },
  {
    name: 'Willesden',
    postcode: 'NW10',
    description:
      'Full electrical services for Willesden residents and businesses, including EV charger installations and safety certificates.',
  },
  {
    name: 'Dollis Hill',
    postcode: 'NW2',
    description:
      'Reliable local electrician for Dollis Hill. We handle everything from fuse board upgrades to outdoor lighting installations.',
  },
  {
    name: 'Neasden',
    postcode: 'NW10',
    description:
      'Trusted electrical contractor serving Neasden homes and businesses with NAPIT-approved workmanship.',
  },
  {
    name: 'Kilburn',
    postcode: 'NW6',
    description:
      'Professional electrical services across Kilburn, from PAT testing for landlords to full property rewires.',
  },
  {
    name: 'West Hampstead',
    postcode: 'NW6',
    description:
      'Expert electrician serving West Hampstead. Air conditioning installation, EV charging, and electrical inspections.',
  },
  {
    name: 'Brondesbury',
    postcode: 'NW6',
    description:
      'Quality electrical work for Brondesbury properties. Certified, insured, and trusted by local homeowners.',
  },
  {
    name: 'Kensal Rise',
    postcode: 'NW10',
    description:
      'Comprehensive electrical services for Kensal Rise including new builds, extensions, and smart home wiring.',
  },
]

export default function LocationPage() {
  return (
    <main className="relative">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-deep-dark overflow-hidden">
        <div className="absolute inset-0 circuit-grid opacity-30" />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-primary uppercase tracking-wider mb-4">
            <MapPin className="w-4 h-4" />
            Areas We Cover
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white text-balance leading-tight">
            Your Local Electrician in{' '}
            <span className="text-accent glow-text">North West London</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto text-pretty leading-relaxed">
            Based in NW2, we serve Cricklewood and the surrounding North West London area with
            fast, professional, and fully certified electrical services.
          </p>
        </div>
      </section>

      {/* Why local matters */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: Clock,
                title: 'Fast Response Times',
                text: 'Based locally in NW2, we can reach most jobs within 30 minutes. Emergency call-outs available.',
              },
              {
                icon: MapPin,
                title: 'Local Knowledge',
                text: 'We understand the specific electrical needs of North West London properties, from Victorian terraces to modern flats.',
              },
              {
                icon: CheckCircle,
                title: 'Trusted Locally',
                text: 'Hundreds of satisfied customers across NW2, NW6, and NW10. Check our 5-star reviews.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-card border border-border rounded-xl p-8 text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          {/* Areas grid */}
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              Areas We Serve
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              We cover all of North West London and regularly work in the following areas.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {areas.map((area) => (
              <div
                key={area.name}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-primary" />
                  <h3 className="font-serif font-bold text-foreground">{area.name}</h3>
                  <span className="ml-auto text-xs font-mono text-muted-foreground">
                    {area.postcode}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-deep-dark border-t border-border">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Zap className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
            Need an Electrician in Your Area?
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            {"Don't see your area listed? We likely still cover it. Get in touch for a free, no-obligation quote."}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+447000000000"
              className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity glow-box"
            >
              <Phone className="w-5 h-5" />
              Call for a Free Quote
            </a>
            <Link
              href="/#contact"
              className="flex items-center gap-2 border border-border text-foreground px-8 py-4 rounded-lg font-semibold hover:bg-card transition-colors"
            >
              Send a Message
            </Link>
          </div>
        </div>
      </section>

      {/* JSON-LD for local business */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Electrician',
            name: 'ElectricJamex',
            description:
              'NAPIT approved electrician serving North West London. Based in NW2 Cricklewood.',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Cricklewood',
              addressRegion: 'North West London',
              postalCode: 'NW2',
              addressCountry: 'GB',
            },
            areaServed: areas.map((area) => ({
              '@type': 'Place',
              name: `${area.name}, London ${area.postcode}`,
            })),
            priceRange: '$$',
          }),
        }}
      />

      <Footer />
    </main>
  )
}
