import type { Metadata } from 'next'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Calendar, Clock, ArrowLeft, Phone, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'EV Charger Installation Guide for London Homeowners | ElectricJamex',
  description:
    'Complete guide to home EV charger installation in London. Learn about costs (from £800), OZEV grants, planning regulations, charger types, and how to find a certified installer in North West London.',
  keywords: [
    'EV charger installation London',
    'home EV charger cost UK',
    'electric car charger installation NW2',
    'OZEV grant EV charger',
    'Tesla wall connector installation London',
    'home charging point installer',
    'electric vehicle charger London',
  ],
  openGraph: {
    title: 'The Complete Guide to EV Charger Installation for London Homeowners',
    description:
      'Everything you need to know about installing a home EV charger in London — costs, regulations, grants, and choosing the right charger.',
    type: 'article',
    locale: 'en_GB',
  },
}

export default function EVChargerArticle() {
  return (
    <main className="relative">
      <Navigation />

      <article className="pt-32 pb-20 bg-background">
        <div className="mx-auto max-w-3xl px-6">
          {/* Breadcrumb */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Header */}
          <div className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs font-medium text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                EV Charging
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                10 February 2026
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                8 min read
              </span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              The Complete Guide to EV Charger Installation for London Homeowners
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              With the UK banning the sale of new petrol and diesel cars from 2035, more London homeowners are making the switch to electric vehicles. Installing a home charger is one of the smartest investments you can make — here is everything you need to know.
            </p>
          </div>

          {/* Content */}
          <div className="prose-custom space-y-8">
            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                Why Install a Home EV Charger?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Charging your electric vehicle at home is up to 5 times cheaper than using public charging stations. A typical home charge costs around £10–15 for a full battery compared to £40–60 at a rapid public charger. Beyond cost savings, home charging offers unmatched convenience — simply plug in overnight and wake up to a full range every morning.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                A dedicated home charger (often called an EVSE or wallbox) charges significantly faster than a standard 3-pin plug. While a domestic socket delivers around 2.3kW, a dedicated 7kW charger will fully charge most EVs in 4–8 hours overnight.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                How Much Does EV Charger Installation Cost in London?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The total cost of a home EV charger installation in London typically ranges from £800 to £1,500, depending on the charger model and the complexity of the installation. This includes:
              </p>
              <ul className="space-y-3">
                {[
                  'The charger unit itself (£300–£800 depending on brand and features)',
                  'Installation labour by a certified electrician (£300–£500)',
                  'Any additional electrical work such as consumer unit upgrades (if needed)',
                  'Part P certification and all regulatory compliance documentation',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted-foreground">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                Government Grants: Can You Get Help With the Cost?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The UK government previously offered the OZEV (Office for Zero Emission Vehicles) grant, which provided up to £350 off the cost of a home charger. While the scheme for homeowners in single-unit properties closed in March 2022, grants are still available for:
              </p>
              <ul className="space-y-3">
                {[
                  'Renters and tenants in rented accommodation',
                  'Residents living in flats or apartments',
                  'Landlords installing chargers for tenants',
                  'Small businesses installing workplace chargers',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted-foreground">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We can help you determine whether you are eligible and handle the paperwork as part of your installation.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                Which EV Charger Should You Choose?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                As certified installers, we work with all the leading brands. Here are the most popular options we install in North West London:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { name: 'Tesla Wall Connector', detail: 'Best for Tesla owners. Up to 22kW charging, sleek design, Wi-Fi connectivity.' },
                  { name: 'Ohme Home Pro', detail: 'Smart scheduling, energy tariff integration, compact design. Great all-rounder.' },
                  { name: 'Pod Point Solo 3', detail: 'Simple and reliable. 7kW charging, app control, no monthly fees.' },
                  { name: 'Easee One', detail: 'Compact, future-proof, and supports load balancing for multi-car households.' },
                ].map((charger) => (
                  <div key={charger.name} className="bg-card border border-border rounded-lg p-4">
                    <h3 className="font-serif font-bold text-foreground mb-1">{charger.name}</h3>
                    <p className="text-sm text-muted-foreground">{charger.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                The Installation Process: What to Expect
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A professional EV charger installation typically takes 2–4 hours. Here is how the process works:
              </p>
              <ol className="space-y-4">
                {[
                  { step: 'Site Survey', desc: 'We assess your electrical supply, consumer unit capacity, and the best location for your charger. This is usually free of charge.' },
                  { step: 'Quotation', desc: 'You receive a detailed, fixed-price quote with no hidden fees. We explain exactly what work is required.' },
                  { step: 'Installation Day', desc: 'Our NAPIT-approved electrician installs the charger, runs dedicated cabling, and connects everything safely to your consumer unit.' },
                  { step: 'Testing & Certification', desc: 'We fully test the installation, provide Part P certification, and walk you through how to use your new charger.' },
                ].map((item, i) => (
                  <li key={item.step} className="flex gap-4 text-muted-foreground">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm shrink-0">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-serif font-bold text-foreground">{item.step}</h3>
                      <p className="text-sm mt-1">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                Do You Need Planning Permission?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                In most cases, no. Installing an EV charger on your property falls under permitted development rights, meaning you do not need planning permission. However, there are exceptions for listed buildings, properties in conservation areas, and installations facing a highway. If you are unsure, we will advise you during the site survey.
              </p>
            </section>

            {/* CTA */}
            <div className="bg-card border border-primary/20 rounded-xl p-8 text-center mt-12">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-3">
                Ready to Install Your Home EV Charger?
              </h2>
              <p className="text-muted-foreground mb-6">
                Get a free, no-obligation quote from a NAPIT approved installer in North West London.
              </p>
              <a
                href="tel:+447000000000"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity glow-box"
              >
                <Phone className="w-5 h-5" />
                Get Your Free Quote
              </a>
            </div>
          </div>
        </div>
      </article>

      {/* JSON-LD Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'The Complete Guide to EV Charger Installation for London Homeowners',
            description:
              'Everything you need to know about installing a home EV charger in London — costs, regulations, grants, and choosing the right charger.',
            datePublished: '2026-02-10',
            author: {
              '@type': 'Organization',
              name: 'ElectricJamex',
            },
            publisher: {
              '@type': 'Organization',
              name: 'ElectricJamex',
            },
          }),
        }}
      />

      <Footer />
    </main>
  )
}
