import { FaqAccordionClient } from './faq-accordion-client'

export const faqs = [
  {
    question: 'Are you a qualified and registered electrician?',
    answer:
      'Yes, Electric Jamez is NAPIT approved and a Which? Trusted Trader. All our work is fully certified and compliant with BS 7671 (the IET Wiring Regulations). We carry full public liability insurance and provide certification for all completed work.',
  },
  {
    question: 'What areas do you cover?',
    answer:
      'We are based in NW2 and primarily serve North West London including Cricklewood, Willesden, Kilburn, Hampstead, Golders Green, Hendon, and surrounding areas. We also cover wider North London and Central London for larger projects.',
  },
  {
    question: 'How much does an EICR (Electric Safety Certificate) cost?',
    answer:
      'EICR costs depend on the size of the property and number of circuits. A typical one-bedroom flat starts from around \u00a3150, with larger properties priced accordingly. We always provide a clear quote before starting any work, with no hidden fees.',
  },
  {
    question: 'Do you offer emergency electrical services?',
    answer:
      'Yes, we offer emergency call-out services for urgent electrical issues such as power outages, burning smells, tripped circuits that won\'t reset, and flood damage assessment. Contact us directly for emergency availability.',
  },
  {
    question: 'How long does an EV charger installation take?',
    answer:
      'A standard EV charger installation typically takes 3-5 hours, including all electrical work and testing. More complex installations requiring longer cable runs or consumer unit upgrades may take a full day. We handle all necessary applications and certifications.',
  },
  {
    question: 'Do you provide free quotes?',
    answer:
      'Yes, we provide free, no-obligation quotes for all our services. For most jobs, we can give an accurate estimate over the phone or via email. For larger projects, we\'ll arrange a convenient time for a site visit at no cost.',
  },
  {
    question: 'What guarantees do you offer on your work?',
    answer:
      'All our installations come with a minimum 12-month workmanship guarantee. Many products we install carry manufacturer warranties of 3-5 years or more. Our NAPIT-approved status means our work is also backed by their insurance-backed guarantee scheme.',
  },
]

export function FAQ() {
  return (
    <section id="faq" className="relative py-24 md:py-32 overflow-hidden bg-slate-950">
      {/* Vibrant Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-red-800 rounded-full blur-[120px]" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-red-900 rounded-full blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-900/30 border border-red-800/50 text-[10px] uppercase tracking-[0.2em] font-bold text-red-100 mb-6 animate-pulse">
            Got Questions?
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-extrabold text-white text-balance leading-tight">
             Frequently Asked <span className="text-red-500">Questions</span>
          </h2>
          <p className="mt-6 text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed opacity-80">
            {'Everything you need to know about our electrical services. Can\'t find what you\'re looking for? Get in touch.'}
          </p>
        </div>

        <FaqAccordionClient faqs={faqs} />
      </div>
    </section>
  )
}
