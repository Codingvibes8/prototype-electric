'use client'

import { useState } from 'react'
import { ChevronDown, Quote, Star } from 'lucide-react'

import type { Testimonial } from '@/components/testimonials-data'

const INITIAL_COUNT = 6

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={
            i < rating
              ? 'w-4 h-4 fill-accent text-accent'
              : 'w-4 h-4 text-muted-foreground/40'
          }
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

export function TestimonialsGridClient({ items }: { items: Testimonial[] }) {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? items : items.slice(0, INITIAL_COUNT)
  const hasMore = items.length > INITIAL_COUNT

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map((t) => (
          <figure
            key={`${t.name}-${t.date}`}
            className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-colors duration-300 hover:border-accent/40"
          >
            <div className="mb-4 flex items-center justify-between">
              <Stars rating={t.rating} />
              <Quote
                className="w-5 h-5 text-accent/20 transition-colors duration-300 group-hover:text-accent/40"
                aria-hidden="true"
              />
            </div>
            <blockquote className="flex-1 text-[0.95rem] leading-relaxed text-muted-foreground text-pretty">
              {t.quote}
            </blockquote>
            <figcaption className="mt-5 border-t border-border pt-4">
              <span className="block font-semibold text-foreground">{t.name}</span>
              <span className="block text-xs text-muted-foreground">
                {t.location ? `${t.location} · ` : ''}
                {t.date}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-card px-6 py-3 text-sm font-semibold text-accent transition-colors duration-300 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {expanded ? 'Show fewer reviews' : `Show all ${items.length} reviews`}
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${
                expanded ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            />
          </button>
        </div>
      )}
    </div>
  )
}
