import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import Footer from '@/components/footer'
import { MapPin, Phone, ChevronRight, CheckCircle2, Zap } from 'lucide-react'
import { areas, locationSlug, getAreaBySlug } from '@/components/locations'
import { services, LOCATIONS, generateSlug } from '@/components/services'

export function generateStaticParams() {
  return areas.map((area) => ({ slug: locationSlug(area.name) }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const area = getAreaBySlug(slug)

  if (!area) return { title: 'Area Not Found | Electric Jamez' }

  const title = `Electrician in ${area.name} (${area.postcode}) | Electric Jamez`
  const description = `NAPIT approved electrician serving ${area.name}, ${area.postcode}. ${area.description}`

  return {
    title,
    description,
    openGraph: { title, description, type: 'website', locale: 'en_GB' },
  }
}

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const area = getAreaBySlug(slug)

  if (!area) notFound()

  // Service detail pages only exist for the service-side location list, so only
  // link there when this area matches one of those; otherwise link to the
  // homepage services section.
  const known = LOCATIONS.find((l) => l.name === area.name)
  const serviceHref = (title: string) =>
    known ? `/services/${generateSlug(title, known.name)}` : '/#services'

  return (
    <main className="relative">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-deep-dark overflow-hidden">
        <div className="absolute inset-0 circuit-grid opacity-30" />
        <div className="relative mx-auto max-w-7xl px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-800 mb-8">
            <Link href="/" className="text-gray-800 hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-700" />
            <Link href="/location" className="text-gray-800 hover:text-primary transition-colors">
              Areas We Cover
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-700" />
            <span className="text-gray-800 font-semibold">{area.name}</span>
          </nav>

          <div className="text-center">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-primary uppercase tracking-wider mb-4">
              <MapPin className="w-4 h-4" />
              {area.postcode}
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 text-balance leading-tight">
              Your Local Electrician in{' '}
              <span className="text-accent glow-text">{area.name}</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-800 max-w-2xl mx-auto text-pretty leading-relaxed">
              {area.description}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+442079460958"
                className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity glow-box"
              >
                <Phone className="w-5 h-5" />
                Call for a Free Quote
              </a>
              <Link
                href="/#contact"
                className="flex items-center gap-2 border border-border text-foreground bg-background px-8 py-4 rounded-lg font-semibold hover:bg-card transition-colors"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services offered */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              Electrical Services in {area.name}
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              From emergency repairs to full installations, here is what we offer across{' '}
              {area.name} and the surrounding {area.postcode} area.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <Link
                key={service.title}
                href={serviceHref(service.title)}
                className="group bg-card border border-border rounded-xl p-6 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="font-serif font-bold text-foreground">{service.title}</h3>
                  <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform group-hover:translate-x-1" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-20 bg-muted">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center font-serif text-3xl md:text-4xl font-bold text-foreground mb-10">
            Why Choose Electric Jamez in {area.name}?
          </h2>
          <ul className="grid sm:grid-cols-2 gap-4">
            {[
              `Local ${area.name} Expertise`,
              'NAPIT Approved Engineers',
              'Which? Trusted Trader Certified',
              'Transparent Flat Rates',
              '24/7 Emergency Call-Outs',
              'Full Certification Provided',
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-lg text-muted-foreground bg-background border border-border rounded-xl px-5 py-4"
              >
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-deep-dark border-t border-border">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Zap className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Need an Electrician in {area.name}?
          </h2>
          <p className="text-gray-800 mb-8 max-w-xl mx-auto">
            Based locally in NW2, we can be with you fast. Get in touch for a free, no-obligation
            quote for any job in {area.name} ({area.postcode}).
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+442079460958"
              className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity glow-box"
            >
              <Phone className="w-5 h-5" />
              Call for a Free Quote
            </a>
            <Link
              href="/location"
              className="flex items-center gap-2 border border-border text-gray-800 px-8 py-4 rounded-lg font-semibold hover:bg-card transition-colors"
            >
              View All Areas
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
            name: 'Electric Jamez',
            description: `NAPIT approved electrician serving ${area.name}, ${area.postcode} and North West London.`,
            areaServed: {
              '@type': 'Place',
              name: `${area.name}, London ${area.postcode}`,
            },
            address: {
              '@type': 'PostalAddress',
              addressLocality: area.name,
              addressRegion: 'North West London',
              postalCode: area.postcode,
              addressCountry: 'GB',
            },
            priceRange: '$$',
          }),
        }}
      />

      <Footer />
    </main>
  )
}