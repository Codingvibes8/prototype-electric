import type { Metadata } from 'next'
import { Navigation } from '@/components/navigation'
import Footer from '@/components/footer'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Electrical Tips & Guides | ElectricJamex Blog | North West London',
  description:
    'Expert electrical advice, guides, and tips from ElectricJamex. Learn about EV charger installation, home electrical safety, and energy-saving solutions for your London property.',
  openGraph: {
    title: 'ElectricJamex Blog | Electrical Tips & Guides',
    description:
      'Expert electrical advice and guides from a NAPIT approved electrician in North West London.',
    type: 'website',
    locale: 'en_GB',
  },
}

const posts = [
  {
    slug: 'ev-charger-installation-guide-london-homeowners',
    title: 'The Complete Guide to EV Charger Installation for London Homeowners',
    excerpt:
      'Everything you need to know about installing a home EV charger in London — costs, regulations, grants, and how to choose the right charger for your property.',
    date: '2026-02-10',
    readTime: '8 min read',
    category: 'EV Charging',
  },
  {
    slug: 'electrical-safety-certificate-eicr-what-landlords-need-to-know',
    title: 'Electrical Safety Certificates (EICR): What Every London Landlord Needs to Know',
    excerpt:
      'A landlord\'s guide to EICR regulations, compliance deadlines, penalties for non-compliance, and how to book an inspection with a qualified electrician.',
    date: '2026-01-25',
    readTime: '6 min read',
    category: 'Safety',
  },
  {
    slug: 'signs-your-home-needs-rewiring',
    title: '7 Warning Signs Your London Home Needs Rewiring',
    excerpt:
      'Flickering lights, burning smells, and tripping breakers could mean your wiring is outdated or dangerous. Learn the key warning signs and when to call a professional.',
    date: '2026-01-12',
    readTime: '5 min read',
    category: 'Home Safety',
  },
]

export default function BlogPage() {
  return (
    <main className="relative">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-deep-dark overflow-hidden">
        <div className="absolute inset-0 circuit-grid opacity-30" />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">Blog</span>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white text-balance leading-tight">
            Electrical Tips &{' '}
            <span className="text-accent glow-text">Expert Guides</span>
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto">
            Practical advice from a NAPIT approved electrician to help you keep your home safe,
            efficient, and up to code.
          </p>
        </div>
      </section>

      {/* Blog posts */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex flex-col gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-card border border-border rounded-xl p-8 hover:border-primary/40 transition-all"
              >
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="text-xs font-medium text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-3">
                  {post.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                  Read article
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
