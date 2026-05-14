import { Navigation } from '@/components/navigation'
import { Hero } from '@/components/hero'
import { Services } from '@/components/services'
import { FAQ } from '@/components/faq'
import { CTABanner } from '@/components/cta-banner'
import { Gallery } from '@/components/gallery'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { ChatAssistant } from '@/components/chat-assistant'
import { ScrollReveal } from '@/components/scroll-reveal'
import { MapSection } from '@/components/map-section'

export const metadata = {
  title: 'Electric Jamez | NAPIT Approved Electrician | North West London NW2',
  description: 'Professional electrical services in North West London (NW2). NAPIT approved & Which? Trusted Trader. EV charger installation, air conditioning, PAT testing, electrical safety certificates & more.',
}

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden">
      <Navigation />
      
      {/* Hero doesn't always need reveal as it's the first thing seen, 
          but adding a subtle fade can help transitions */}
      <ScrollReveal direction="none" duration={1.2}>
        <Hero />
      </ScrollReveal>

      <div className="flex flex-col gap-0 md:gap-0">
        <ScrollReveal>
          <Services />
        </ScrollReveal>

        <ScrollReveal direction="left" delay={0.3}>
          {/* FAQ component was here */}
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.4}>
          <MapSection />
        </ScrollReveal>

        <ScrollReveal direction="left">
          <Gallery />
        </ScrollReveal>

        <ScrollReveal>
          <Contact />
        </ScrollReveal>
      </div>

      <Footer />
    </main>
  )
}

