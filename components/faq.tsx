import { FaqAccordionClient } from './faq-accordion-client'

export const faqs: { question: string; answer: string }[] = [
  {
    question: 'Are you a certified and insured electrician?',
    answer:
      'Yes. Electric Jamez is NAPIT approved and a Which? Trusted Trader, fully insured for both residential and commercial work. Every job is completed to current wiring regulations and comes with the appropriate certification.',
  },
  {
    question: 'Which areas of London do you cover?',
    answer:
      'We serve North West London and the surrounding areas, including Cricklewood, Hampstead, Kilburn, Hendon, Golders Green, Dolls Hill, Willesden and Brondesbury (NW2, NW3, NW4, NW6, NW10 and NW11).',
  },
  {
    question: 'Do you offer emergency call-outs?',
    answer:
      'Yes. We provide 24/7 emergency electrical call-outs for urgent faults such as power loss, tripping circuits, or safety hazards. Call us any time and we will get to you as quickly as possible.',
  },
  {
    question: 'How much do your services cost?',
    answer:
      'We work to transparent, flat rates and always explain your options upfront — no surprise bills. The exact cost depends on the job, so we are happy to provide a free, no-obligation quote before any work begins.',
  },
  {
    question: 'Can you install EV chargers and solar panels?',
    answer:
      'Absolutely. We are certified EV charger installers for all major brands (Tesla, Ohme, Pod Point, Easee) and design and install complete solar PV systems, including battery storage, MCS registration and grid connection.',
  },
  {
    question: 'How do I get an Electrical Safety Certificate (EICR)?',
    answer:
      'Just get in touch and we will book a convenient time to test your installation. Our EICR reports meet all current regulations and are ideal for landlords (legally required every 5 years), homebuyers and insurance requirements.',
  },
]

export function FAQ() {
  return (
    <section id="faq" className="relative py-24 md:py-32 bg-background scroll-mt-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-gray-700 uppercase tracking-[0.2em]">
            Frequently Asked Questions
          </span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance">
            Answers to Common Questions
          </h2>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto text-pretty leading-relaxed">
            Everything you need to know about working with Electric Jamez. Can&apos;t find what
            you&apos;re looking for? Get in touch and we&apos;ll be happy to help.
          </p>
        </div>

        <FaqAccordionClient faqs={faqs} />
      </div>
    </section>
  )
}
