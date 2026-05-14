import type { Metadata } from 'next'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Calendar, Clock, ArrowLeft, Phone, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '7 Warning Signs Your Home Needs Rewiring | ElectricJamex',
  description:
    'Flickering lights, burning smells, and tripping breakers are signs your London home may need rewiring. Learn the 7 key warning signs, average rewiring costs, and when to call a qualified electrician.',
  keywords: [
    'house rewiring signs',
    'home rewiring London',
    'rewiring cost London',
    'old wiring dangerous',
    'electrician rewire NW2',
    'rewiring North West London',
    'electrical rewiring UK',
    'when to rewire house',
  ],
  openGraph: {
    title: '7 Warning Signs Your London Home Needs Rewiring',
    description:
      'Flickering lights, burning smells, and tripping breakers could mean your wiring is outdated or dangerous. Learn the key warning signs.',
    type: 'article',
    locale: 'en_GB',
  },
}

const warningSigns = [
  {
    number: 1,
    title: 'Frequent Tripping of Circuit Breakers or Blown Fuses',
    content:
      'Occasional trips are normal, but if your breakers trip regularly — especially when using everyday appliances — it could indicate overloaded circuits, faulty wiring, or a consumer unit that cannot handle your modern electrical demands. Properties built before the 1980s often have circuits that were not designed for the number of devices we use today.',
  },
  {
    number: 2,
    title: 'Flickering or Dimming Lights',
    content:
      'If your lights flicker when you switch on appliances like a kettle or washing machine, this suggests the circuit is being overloaded or there are loose connections in the wiring. While a single flickering light might just be a bulb issue, widespread flickering across multiple rooms is a clear red flag.',
  },
  {
    number: 3,
    title: 'Burning Smell or Discoloured Sockets',
    content:
      'A burning smell near sockets, switches, or your consumer unit is a serious warning sign. Brown or black scorch marks around plug sockets indicate overheating, which can be caused by loose connections, damaged wiring, or overloaded circuits. If you notice this, switch off the affected circuit at the consumer unit and call an electrician immediately.',
  },
  {
    number: 4,
    title: 'Electric Shocks or Tingling Sensations',
    content:
      'If you feel a mild shock or tingling when touching a light switch, socket, or appliance, this indicates a fault in the earthing system or damaged insulation on the wiring. Even mild shocks should be taken seriously as they indicate a potentially life-threatening fault.',
  },
  {
    number: 5,
    title: 'Old-Fashioned Round Pin Sockets or Fabric-Covered Wiring',
    content:
      'If your property still has round-pin sockets, a cast-iron fuse box with rewirable fuses, or you can see fabric-covered (rubber-insulated) wiring, your electrical installation is almost certainly decades out of date. Rubber insulation degrades over time, becoming brittle and exposing live conductors — a serious fire and shock risk.',
  },
  {
    number: 6,
    title: 'No RCD Protection',
    content:
      'Residual Current Devices (RCDs) are life-saving devices that cut power within milliseconds if a fault is detected. Modern regulations require RCD protection on all circuits. If your consumer unit does not have RCDs (older fuse boxes typically do not), a rewire or at minimum a consumer unit upgrade is strongly recommended.',
  },
  {
    number: 7,
    title: 'Your Property Is Over 25 Years Old and Has Never Been Rewired',
    content:
      'Electrical wiring has a typical lifespan of 25–30 years. If your London property was built before 2000 and has never had a full or partial rewire, it is likely that the wiring is approaching or past its safe working life. The wiring regulations have also changed significantly since then, meaning older installations may not meet current safety standards.',
  },
]

export default function RewiringArticle() {
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
                Home Safety
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                12 January 2026
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                5 min read
              </span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              7 Warning Signs Your London Home Needs Rewiring
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Outdated or faulty electrical wiring is one of the leading causes of house fires in the UK. If your property is showing any of these warning signs, it may be time to consider a professional rewire.
            </p>
          </div>

          {/* Content */}
          <div className="prose-custom space-y-8">
            {/* Warning signs */}
            <div className="space-y-6">
              {warningSigns.map((sign) => (
                <section
                  key={sign.number}
                  className="bg-card border border-border rounded-xl p-6"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-lg shrink-0">
                      {sign.number}
                    </span>
                    <div>
                      <h2 className="font-serif text-lg md:text-xl font-bold text-foreground mb-3">
                        {sign.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed">{sign.content}</p>
                    </div>
                  </div>
                </section>
              ))}
            </div>

            {/* Warning box */}
            <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6 flex gap-4">
              <AlertTriangle className="w-6 h-6 text-destructive shrink-0 mt-0.5" />
              <div>
                <h3 className="font-serif font-bold text-foreground mb-2">When to Act Immediately</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  If you notice burning smells, scorch marks, or receive electric shocks, turn off the affected circuit at the consumer unit and contact a qualified electrician immediately. These are signs of an active electrical fault that could cause a fire or serious injury.
                </p>
              </div>
            </div>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                How Much Does Rewiring Cost in London?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The cost of rewiring a property in London depends on the size of the property and the extent of work required. As a rough guide:
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { type: '1–2 Bed Flat', price: '£2,500 – £4,000' },
                  { type: '3 Bed House', price: '£4,000 – £6,500' },
                  { type: '4–5 Bed House', price: '£6,500 – £10,000' },
                ].map((tier) => (
                  <div key={tier.type} className="bg-card border border-border rounded-lg p-5 text-center">
                    <p className="text-sm text-muted-foreground mb-1">{tier.type}</p>
                    <p className="font-serif text-lg font-bold text-primary">{tier.price}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                These estimates include first-fix wiring, consumer unit replacement, new sockets and switches, and full testing and certification. Costs for making good (plastering, decorating) are typically separate.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                What Does the Rewiring Process Involve?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A full rewire typically takes 5–10 days depending on the property size. The process involves removing all old wiring and replacing it with new PVC-insulated cables that meet current BS 7671 regulations. This includes a new consumer unit with RCD protection, new socket and lighting circuits, and full Part P certification.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We plan the work carefully to minimise disruption. For occupied properties, we can often work room by room to maintain power to most of the house during the process.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                Not Sure If You Need a Full Rewire?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                The best first step is to book an Electrical Installation Condition Report (EICR). This formal inspection will assess the condition of your wiring and identify exactly what work is needed — whether that is a full rewire, a partial rewire, or simply targeted repairs. An EICR gives you a clear, honest picture before you commit to any major work.
              </p>
            </section>

            {/* CTA */}
            <div className="bg-card border border-primary/20 rounded-xl p-8 text-center mt-12">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-3">
                Concerned About Your Wiring?
              </h2>
              <p className="text-muted-foreground mb-6">
                Book a professional EICR inspection or get a free rewiring consultation with our NAPIT approved electricians in North West London.
              </p>
              <a
                href="tel:+447000000000"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity glow-box"
              >
                <Phone className="w-5 h-5" />
                Get a Free Assessment
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
            headline: '7 Warning Signs Your London Home Needs Rewiring',
            description:
              'Flickering lights, burning smells, and tripping breakers could mean your wiring is outdated or dangerous. Learn the key warning signs.',
            datePublished: '2026-01-12',
            author: { '@type': 'Organization', name: 'ElectricJamex' },
            publisher: { '@type': 'Organization', name: 'ElectricJamex' },
          }),
        }}
      />

      <Footer />
    </main>
  )
}
