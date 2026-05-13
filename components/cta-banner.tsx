import Image from 'next/image'
import { Phone, ArrowRight } from 'lucide-react'
import { CTAScrollButton } from './cta-scroll-button'

export function CTABanner() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/cta-bg.jpg"
          alt="Professional outdoor lighting installation"
          fill
          className="object-cover"
          quality={80}
        />
        <div className="absolute inset-0" style={{ background: 'var(--hero-overlay)' }} />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <span className="text-sm font-medium text-accent uppercase tracking-wider">
          Ready to Get Started?
        </span>
        <h2 className="mt-3 font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white text-balance">
          Need an Electrician You Can{' '}
          <span className="text-accent">Trust</span>?
        </h2>
        <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto text-pretty leading-relaxed">
          {'Whether it\'s a simple repair or a complex installation, our NAPIT-approved team is ready to help. Call us today for a free, no-obligation quote.'}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="tel:+447000000000"
            className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-base hover:opacity-90 transition-all glow-box"
          >
            <Phone className="w-5 h-5" />
            Call Us Now
          </a>
          <CTAScrollButton />
        </div>
      </div>
    </section>
  )
}
