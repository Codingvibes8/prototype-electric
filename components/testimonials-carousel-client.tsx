'use client'

import { useEffect, useState } from 'react'
import { Quote, Star } from 'lucide-react'

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import type { Testimonial } from '@/components/testimonials-data'

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={
            i < rating
              ? 'w-5 h-5 fill-yellow-500 text-yellow-500'
              : 'w-5 h-5 text-muted-foreground/40'
          }
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

export function TestimonialsCarouselClient({
  items,
}: {
  items: Testimonial[]
}) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
    const onSelect = () => setCurrent(api.selectedScrollSnap())
    api.on('select', onSelect)
    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  // Autoplay, paused for users who prefer reduced motion and on hover.
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    if (!api) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || paused) return
    const id = window.setInterval(() => {
      if (api.canScrollNext()) api.scrollNext()
      else api.scrollTo(0)
    }, 6000)
    return () => window.clearInterval(id)
  }, [api, paused])

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Carousel
        setApi={setApi}
        opts={{ loop: true, align: 'center' }}
        className="mx-auto max-w-4xl"
      >
        <CarouselContent>
          {items.map((t) => (
            <CarouselItem key={`${t.name}-${t.date}`}>
              <figure className="relative mx-2 rounded-2xl border border-border bg-card px-8 py-10 md:px-14 md:py-14 text-center shadow-sm">
                <Quote
                  className="absolute left-8 top-8 w-10 h-10 text-accent/15 md:w-14 md:h-14"
                  aria-hidden="true"
                />
                <div className="relative flex flex-col items-center gap-6">
                  <Stars rating={t.rating} />
                  <blockquote className="font-serif text-xl md:text-2xl lg:text-[1.7rem] leading-relaxed text-foreground text-pretty max-w-2xl">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-2">
                    <span className="block font-semibold text-foreground">
                      {t.name}
                    </span>
                    <span className="block text-sm text-muted-foreground">
                      {t.location ? `${t.location} · ` : ''}
                      {t.date}
                    </span>
                  </figcaption>
                </div>
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hidden sm:flex -left-4 md:-left-12" />
        <CarouselNext className="hidden sm:flex -right-4 md:-right-12" />
      </Carousel>

      {/* Dots */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {items.map((t, i) => (
          <button
            key={`dot-${t.name}-${t.date}`}
            type="button"
            onClick={() => api?.scrollTo(i)}
            aria-label={`Go to review ${i + 1}`}
            aria-current={current === i}
            className={`h-2 cursor-pointer rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
              current === i
                ? 'w-6 bg-gray-700'
                : 'w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/60'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
