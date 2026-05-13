'use client'

import { useState } from 'react'
import { HelpCircle, ChevronDown } from 'lucide-react'

interface FaqItem {
  question: string
  answer: string
}

export function FaqAccordionClient({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i
        return (
          <div
            key={i}
            className={`border rounded-xl overflow-hidden transition-colors duration-300 cursor-pointer ${
              isOpen
                ? 'border-primary/30 bg-background'
                : 'border-border bg-background/60 hover:border-primary/20 hover:bg-background/80'
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex items-center justify-between w-full px-6 py-5 text-left gap-4"
              aria-expanded={isOpen}
            >
              <span className="flex items-center gap-3">
                <HelpCircle
                  className={`w-5 h-5 flex-shrink-0 transition-colors duration-300 ${
                    isOpen ? 'text-primary' : 'text-muted-foreground'
                  }`}
                />
                <span className="font-serif text-base md:text-lg font-semibold text-foreground">
                  {faq.question}
                </span>
              </span>
              <ChevronDown
                className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${
                  isOpen ? 'text-primary rotate-180' : 'text-muted-foreground'
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-6 pb-5 pl-14">
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
