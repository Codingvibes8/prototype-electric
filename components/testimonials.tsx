import { BadgeCheck, Star } from 'lucide-react'

import {
  accreditations,
  featuredTestimonials,
  gridTestimonials,
  reviewStats,
} from '@/components/testimonials-data'
import { TestimonialsCarouselClient } from '@/components/testimonials-carousel-client'
import { TestimonialsGridClient } from '@/components/testimonials-grid-client'

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative py-24 md:py-32 bg-background overflow-hidden"
    >
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Reviews
          </span>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            What North West London <span className="text-gray-800">says</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            More than a decade of honest, reliable electrical work — in the words
            of the homeowners and businesses who trust Electric Jamez.
          </p>
        </div>

        {/* Trust / stats bar */}
        <div className="mb-16 flex flex-col items-center gap-6">
          <dl className="grid grid-cols-3 divide-x divide-border rounded-2xl border border-border bg-card">
            <div className="px-6 py-5 text-center sm:px-10">
              <dt className="flex items-center justify-center gap-1 text-2xl md:text-3xl font-bold text-foreground">
                {reviewStats.rating}
                <Star className="w-5 h-5 fill-accent text-accent" aria-hidden="true" />
              </dt>
              <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                Average rating
              </dd>
            </div>
            <div className="px-6 py-5 text-center sm:px-10">
              <dt className="text-2xl md:text-3xl font-bold text-foreground">
                {reviewStats.reviewCount}
              </dt>
              <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                Happy customers
              </dd>
            </div>
            <div className="px-6 py-5 text-center sm:px-10">
              <dt className="text-2xl md:text-3xl font-bold text-foreground">
                {reviewStats.yearsActive}
              </dt>
              <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                Years serving NW London
              </dd>
            </div>
          </dl>

          <ul className="flex flex-wrap items-center justify-center gap-3">
            {accreditations.map((name) => (
              <li
                key={name}
                className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-2 text-sm font-medium text-foreground"
              >
                <BadgeCheck className="w-4 h-4 text-accent" aria-hidden="true" />
                {name}
              </li>
            ))}
          </ul>
        </div>

        {/* Featured carousel */}
        <TestimonialsCarouselClient items={featuredTestimonials} />

        {/* Full review grid */}
        <div className="mt-20">
          <h3 className="mb-8 text-center font-serif text-2xl md:text-3xl font-bold text-foreground">
            More reviews
          </h3>
          <TestimonialsGridClient items={gridTestimonials} />
        </div>
      </div>
    </section>
  )
}
