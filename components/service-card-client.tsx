'use client'
import Link from 'next/link'
import { useState } from 'react'
import {
  Wind,
  Car,
  ShieldCheck,
  Droplets,
  Sun,
  ClipboardCheck,
  ChevronDown,
  Zap,
} from 'lucide-react'

const iconMap = {
  Wind,
  Car,
  ShieldCheck,
  Droplets,
  Sun,
  ClipboardCheck,
  Zap,
}

interface ServiceCardClientProps {
  iconName: keyof typeof iconMap
  title: string
  summary: string
  details: string
  index: number
}

export function ServiceCardClient({ iconName, title, summary, details, index }: ServiceCardClientProps) {
  const [expanded, setExpanded] = useState(false)
  const Icon = iconMap[iconName]

  return (
    <div
      className={`relative bg-card border rounded-xl p-6 transition-all duration-300 cursor-pointer animate-in fade-in slide-in-from-bottom-4 fill-mode-both ${
        expanded
          ? 'border-primary/40 shadow-lg shadow-primary/5'
          : 'border-border hover:border-primary/20 hover:shadow-md'
      }`}
      style={{ animationDelay: `${index * 150}ms`, animationDuration: '800ms' }}
      onClick={() => setExpanded(!expanded)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setExpanded(!expanded)
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
    >
      {/* Icon and title */}
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-serif text-lg font-bold text-foreground">{title}</h3>
            <ChevronDown
              className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                expanded ? 'rotate-180' : ''
              }`}
            />
          </div>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{summary}</p>
        </div>
      </div>

      {/* Expandable details */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground leading-relaxed">{details}</p>
          <Link
            href="#contact"
            onClick={(e) => {
              e.stopPropagation()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            Get a Quote
            <ChevronDown className="w-4 h-4 -rotate-90" />
          </Link>
        </div>
      )}
    </div>
  )
}
