import React from 'react'
import Link from 'next/link'
import { ChevronLeft, FileText } from 'lucide-react'

export const metadata = {
  title: 'Terms of Service | Electric Jamez',
  description: 'The legal terms and conditions for our electrical services at Electric Jamez.',
}

export default function TermsOfService() {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-background">
      <div className="mx-auto max-w-4xl px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-12">
          <ChevronLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        <header className="mb-12 border-b border-border pb-12">
          <div className="flex items-center gap-3 text-red-700 mb-4">
            <FileText className="w-8 h-8" />
            <span className="text-sm font-bold uppercase tracking-widest text-foreground/60">Legal</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-extrabold text-foreground">Terms of Service</h1>
          <p className="mt-4 text-muted-foreground italic">Last Updated: March 19, 2026</p>
        </header>

        <article className="prose prose-lg dark:prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-foreground font-serif">1. Acceptance of Terms</h2>
            <p>
              By accessing our website and using our services, you agree to comply with and be bound by the following Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground font-serif">2. Services and Quotes</h2>
            <p>
              We provide professional electrical services, including but not limited to installations, repairs, and safety testing. All quotes provided are based on initial inspections and may be subject to change if additional work is required or if unexpected conditions are encountered.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground font-serif">3. Payment Terms</h2>
            <p>
              Payment is due upon completion of the work unless otherwise agreed in writing. For larger projects, a deposit or progress payments may be required. We accept various payment methods, including bank transfers and credit cards.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground font-serif">4. Warranties and Liability</h2>
            <p>
              All electrical work is performed to current UK safety standards (BS 7671). We provide a guarantee for our workmanship for a period of 12 months from completion. This guarantee does not cover normal wear and tear or damage caused by third-party interference.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground font-serif">5. Cancellations</h2>
            <p>
              Please provide at least 24 hours' notice if you need to cancel or reschedule a booking. Failure to provide adequate notice may result in a cancellation fee being applied.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground font-serif">6. Governing Law</h2>
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of England and Wales. Any disputes arising out of these terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground font-serif">7. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon being posted on our website. It is your responsibility to review these terms regularly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground font-serif">8. Contact Information</h2>
            <p>
              If you have any questions or concerns regarding these Terms of Service, please contact us at <Link href="mailto:info@electricjamez.co.uk" className="text-primary hover:underline">info@electricjamez.co.uk</Link>.
            </p>
          </section>
        </article>
      </div>
    </main>
  )
}
