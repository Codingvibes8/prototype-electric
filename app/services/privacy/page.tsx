import React from 'react'
import Link from 'next/link'
import { ChevronLeft, ShieldCheck } from 'lucide-react'

export const metadata = {
  title: 'Privacy Policy | Electric Jamez',
  description: 'How we collect, use, and protect your personal data at Electric Jamez.',
}

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-background">
      <div className="mx-auto max-w-4xl px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-12">
          <ChevronLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        <header className="mb-12 border-b border-border pb-12">
          <div className="flex items-center gap-3 text-red-700 mb-4">
            <ShieldCheck className="w-8 h-8" />
            <span className="text-sm font-bold uppercase tracking-widest text-foreground/60">Legal</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-extrabold text-foreground">Privacy Policy</h1>
          <p className="mt-4 text-muted-foreground italic">Last Updated: March 19, 2026</p>
        </header>

        <article className="prose prose-lg dark:prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-foreground font-serif">1. Introduction</h2>
            <p>
              At Electric Jamez ("we", "our", "us"), we are committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, and safeguard the personal information of our clients and visitors to our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground font-serif">2. Information We Collect</h2>
            <p>We may collect and process the following data about you:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Contact Information:</strong> Name, email address, phone number, and physical address provided during quote requests or bookings.</li>
              <li><strong>Technical Data:</strong> Your IP address, browser type, and operating system when you visit our website.</li>
              <li><strong>Communications:</strong> A record of any correspondence we have with you via email, phone, or our contact form.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground font-serif">3. How We Use Your Information</h2>
            <p>We use your data for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide electrical quotes and perform services.</li>
              <li>To issue safety certificates (EICR) and other regulatory documentation.</li>
              <li>To comply with our legal and insurance obligations.</li>
              <li>To maintain our service records and improve our customer support.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground font-serif">4. Data Storage and Security</h2>
            <p>
              We take information security seriously. All personal data is stored securely. We use industry-standard encryption and security protocols to prevent unauthorized access or disclosure of your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground font-serif">5. Disclosure of Your Information</h2>
            <p>
              We do not sell or rent your personal data to third parties. We may disclose your information only to comply with legal requirements, such as reporting to NAPIT or other regulatory bodies for certification purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground font-serif">6. Your Rights</h2>
            <p>Under the UK General Data Protection Regulation (UK GDPR), you have the following rights:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The right to access the personal data we hold about you.</li>
              <li>The right to request that we correct any inaccuracies.</li>
              <li>The right to request erasure of your data (where applicable).</li>
              <li>The right to object to or restrict processing.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground font-serif">7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our treatment of your personal data, please contact us at <Link href="mailto:info@electricjamez.co.uk" className="text-primary hover:underline">info@electricjamez.co.uk</Link>.
            </p>
          </section>
        </article>
      </div>
    </main>
  )
}
