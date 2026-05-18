import type { Metadata } from 'next'
import { Navigation } from '@/components/navigation'
import Footer from '@/components/footer'
import { Calendar, Clock, ArrowLeft, Phone, CheckCircle, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'EICR Electrical Safety Certificate Guide for Landlords | ElectricJamex',
  description:
    'Complete guide to Electrical Installation Condition Reports (EICR) for London landlords. Learn about legal requirements, costs (from £150), penalties up to £30,000, and how to book an inspection with a NAPIT approved electrician.',
  keywords: [
    'EICR London',
    'electrical safety certificate landlord',
    'EICR cost London',
    'landlord electrical inspection',
    'electrical safety regulations landlord UK',
    'EICR North West London',
    'electrical certificate rental property',
    'EICR NW2',
  ],
  openGraph: {
    title: 'Electrical Safety Certificates (EICR): What Every London Landlord Needs to Know',
    description:
      'A landlord\'s guide to EICR regulations, compliance deadlines, penalties, and how to book an inspection.',
    type: 'article',
    locale: 'en_GB',
  },
}

export default function EICRArticle() {
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
                Safety
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                25 January 2026
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                6 min read
              </span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Electrical Safety Certificates (EICR): What Every London Landlord Needs to Know
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Since July 2020, all private landlords in England must have a valid Electrical Installation Condition Report (EICR) for their rental properties. Non-compliance can result in fines of up to £30,000. Here is your complete guide to staying compliant.
            </p>
          </div>

          {/* Content */}
          <div className="prose-custom space-y-8">
            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                What Is an EICR?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                An Electrical Installation Condition Report (EICR) is a formal document produced by a qualified electrician after a thorough inspection of a property&apos;s electrical installation. It checks the condition of wiring, consumer units, sockets, light fittings, and all fixed electrical components.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The report identifies any defects, deterioration, or non-compliance with current wiring regulations (BS 7671). Each issue is categorised by severity, and the overall installation is rated as either &ldquo;satisfactory&rdquo; or &ldquo;unsatisfactory.&rdquo;
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                Legal Requirements for Landlords
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Under the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020, landlords must:
              </p>
              <ul className="space-y-3">
                {[
                  'Have the electrical installation inspected and tested by a qualified person before a new tenancy begins',
                  'Ensure an inspection is carried out at least every 5 years',
                  'Provide a copy of the EICR to tenants within 28 days of the inspection',
                  'Provide a copy to the local authority within 7 days if requested',
                  'Complete any remedial work identified as necessary within 28 days',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted-foreground">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Warning box */}
            <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6 flex gap-4">
              <AlertTriangle className="w-6 h-6 text-destructive shrink-0 mt-0.5" />
              <div>
                <h3 className="font-serif font-bold text-foreground mb-2">Penalties for Non-Compliance</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Local authorities can impose financial penalties of up to £30,000 for each breach. They can also arrange for remedial work to be carried out and recover the costs from the landlord. Repeat offences or serious breaches may be treated as criminal offences.
                </p>
              </div>
            </div>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                How Much Does an EICR Cost in London?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                EICR costs vary depending on the size of the property and the number of circuits. Typical prices in London are:
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { type: '1–2 Bed Flat', price: 'From £150' },
                  { type: '3 Bed House', price: 'From £200' },
                  { type: '4+ Bed / HMO', price: 'From £250' },
                ].map((tier) => (
                  <div key={tier.type} className="bg-card border border-border rounded-lg p-5 text-center">
                    <p className="text-sm text-muted-foreground mb-1">{tier.type}</p>
                    <p className="font-serif text-xl font-bold text-primary">{tier.price}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Any remedial work required is quoted separately. We always discuss findings with you before carrying out additional work.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                What Happens During an EICR Inspection?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                During the inspection, our NAPIT-approved electrician will:
              </p>
              <ol className="space-y-4">
                {[
                  { step: 'Visual Inspection', desc: 'Check all visible wiring, sockets, switches, consumer units, and accessories for damage, wear, or non-compliance.' },
                  { step: 'Testing', desc: 'Conduct a series of electrical tests including earth continuity, insulation resistance, polarity checks, and RCD operation times.' },
                  { step: 'Assessment', desc: 'Classify any issues found using the standard coding system (C1: Danger present, C2: Potentially dangerous, C3: Improvement recommended, FI: Further investigation required).' },
                  { step: 'Report', desc: 'Produce the formal EICR document with a clear satisfactory/unsatisfactory outcome and detailed observations.' },
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
                Understanding EICR Codes
              </h2>
              <div className="space-y-3">
                {[
                  { code: 'C1', label: 'Danger Present', desc: 'Risk of injury. Must be rectified immediately.', color: 'text-destructive' },
                  { code: 'C2', label: 'Potentially Dangerous', desc: 'Could become dangerous. Must be rectified within 28 days.', color: 'text-orange-400' },
                  { code: 'C3', label: 'Improvement Recommended', desc: 'Not immediately dangerous but improvement is advisable.', color: 'text-yellow-400' },
                  { code: 'FI', label: 'Further Investigation', desc: 'More testing needed to determine the extent of an issue.', color: 'text-blue-400' },
                ].map((item) => (
                  <div key={item.code} className="flex items-start gap-4 bg-card border border-border rounded-lg p-4">
                    <span className={`font-mono font-bold text-lg ${item.color}`}>{item.code}</span>
                    <div>
                      <h3 className="font-serif font-bold text-foreground text-sm">{item.label}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                How Often Do You Need an EICR?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                For rental properties, an EICR is legally required every 5 years or at the start of a new tenancy (if more than 5 years since the last report). For homeowners, while not a legal requirement, an EICR every 10 years is strongly recommended — or every 5 years for properties older than 25 years. If you are buying a property, an EICR as part of your due diligence can uncover hidden issues that a standard survey might miss.
              </p>
            </section>

            {/* CTA */}
            <div className="bg-card border border-primary/20 rounded-xl p-8 text-center mt-12">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-3">
                Book Your EICR Inspection
              </h2>
              <p className="text-muted-foreground mb-6">
                Stay compliant and keep your tenants safe. Our NAPIT approved electricians provide fast, thorough EICR inspections across North West London.
              </p>
              <a
                href="tel:+447000000000"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity glow-box"
              >
                <Phone className="w-5 h-5" />
                Book an Inspection
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
            headline:
              'Electrical Safety Certificates (EICR): What Every London Landlord Needs to Know',
            description:
              "A landlord's guide to EICR regulations, compliance deadlines, penalties, and how to book an inspection.",
            datePublished: '2026-01-25',
            author: { '@type': 'Organization', name: 'ElectricJamex' },
            publisher: { '@type': 'Organization', name: 'ElectricJamex' },
          }),
        }}
      />

      <Footer />
    </main>
  )
}
