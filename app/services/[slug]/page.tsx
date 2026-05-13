import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Phone, CheckCircle2 } from 'lucide-react'
import { services, LOCATIONS, generateSlug } from '@/components/services'

export async function generateStaticParams() {
  const params: { slug: string }[] = []
  
  services.forEach(service => {
    LOCATIONS.forEach(location => {
      params.push({ slug: generateSlug(service.title, location.name) })
    })
  })
  
  return params
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  
  // Find matching service and location
  let matchedService: any = null
  let matchedLocation: any = null
  
  for (const service of services) {
    for (const location of LOCATIONS) {
      if (generateSlug(service.title, location.name) === slug) {
        matchedService = service
        matchedLocation = location
        break
      }
    }
  }

  if (!matchedService || !matchedLocation) return { title: 'Service Not Found' }

  const title = `${matchedService.title} in ${matchedLocation.name} (${matchedLocation.postcodes.join(', ')}) | Electric Jamez`
  const description = `Professional ${matchedService.title} for residents and businesses in ${matchedLocation.name}. NAPIT approved electrician serving ${matchedLocation.postcodes.join(', ')}. Get a free quote today.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website'
    }
  }
}

export default async function ServiceLocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  let matchedService: any = null
  let matchedLocation: any = null
  
  for (const service of services) {
    for (const location of LOCATIONS) {
      if (generateSlug(service.title, location.name) === slug) {
        matchedService = service
        matchedLocation = location
        break
      }
    }
  }

  if (!matchedService || !matchedLocation) notFound()

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-4xl px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-12">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/#services" className="hover:text-primary transition-colors">Services</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">{matchedService.title}</span>
        </nav>

        <header className="mb-12">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1] mb-6">
            Expert <span className="text-red-700">{matchedService.title}</span>
            <br /> in {matchedLocation.name}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Providing safe, certified, and reliable electrical solutions for homes and businesses across <span className="font-bold text-foreground">{matchedLocation.name}</span> and the {matchedLocation.postcodes.join(', ')} areas.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-8">
            <section className="prose prose-lg dark:prose-invert">
              <h2 className="text-2xl font-bold font-serif mb-4">Service Overview</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {matchedService.details}
              </p>
              
              <h2 className="text-2xl font-bold font-serif mb-4">Why Choose Electric Jamez in {matchedLocation.name}?</h2>
              <ul className="space-y-4">
                {[
                  `Local ${matchedLocation.name} Expertise`,
                  'NAPIT Approved Engineers',
                  'Which? Trusted Trader Certified',
                  'Transparent Flat Rates',
                  'Emergency & Scheduled Work',
                  'Full Certification Provided'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-lg text-muted-foreground group">
                    <CheckCircle2 className="w-6 h-6 text-red-700 flex-shrink-0" />
                    <span className="group-hover:text-foreground transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-muted p-8 rounded-2xl border border-border mt-12">
              <h3 className="text-xl font-bold font-serif mb-4">Looking for an Electrician in {matchedLocation.name}?</h3>
              <p className="text-muted-foreground mb-6">
                Based locally, we can be at your door in {matchedLocation.name} quickly. Whether it's a minor repair or a major installation, we bring over 15 years of professional excellence to every job.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="tel:+447000000000"
                  className="bg-red-700 text-white rounded-xl flex items-center justify-center gap-2 px-8 py-4 font-bold text-lg hover:bg-red-800 transition-all shadow-xl hover:scale-105"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </Link>
                <Link
                  href="/#contact"
                  className="bg-white text-foreground border border-border rounded-xl flex items-center justify-center gap-2 px-8 py-4 font-bold text-lg hover:bg-muted transition-all"
                >
                  Request a Quote
                </Link>
              </div>
            </section>
          </div>

          <aside className="space-y-8">
            <div className="bg-card border rounded-xl p-6 shadow-sm">
              <h4 className="font-serif font-bold text-lg mb-4">Areas Served in {matchedLocation.name}</h4>
              <ul className="space-y-3">
                {matchedLocation.postcodes.map((pc: string) => (
                  <li key={pc} className="flex items-center gap-2 text-sm text-muted-foreground font-medium bg-muted/50 px-3 py-2 rounded-lg border border-border/50">
                    <span className="w-2 h-2 rounded-full bg-red-700" />
                    Postcode: {pc}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
              <h4 className="font-serif font-bold text-lg mb-4 text-primary">Other Services</h4>
              <ul className="space-y-3">
                {services
                  .filter(s => s.title !== matchedService.title)
                  .map(s => (
                    <li key={s.title}>
                      <Link 
                        href={`/services/${generateSlug(s.title, matchedLocation.name)}`}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                      >
                        <ChevronRight className="w-3 h-3" />
                        {s.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
