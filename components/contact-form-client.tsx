'use client'

import { useState } from 'react'
import { Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react'
import { trackFormSubmit } from '@/lib/analytics'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

interface FormData {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

const UK_PHONE_REGEX = /^(?:(?:\+44)|(?:0))(?:\d\s?){9,10}$/

const SERVICE_OPTIONS = [
  { value: '', label: 'Select a service' },
  { value: 'EV Charger Installation', label: 'EV Charger Installation' },
  { value: 'Air Conditioning', label: 'Air Conditioning' },
  { value: 'Electrical Safety Certificate', label: 'Electrical Safety Certificate (EICR)' },
  { value: 'Flood Damage Assessment', label: 'Flood Damage Assessment' },
  { value: 'Outdoor Lighting & Heating', label: 'Outdoor Lighting & Heating' },
  { value: 'PAT Testing', label: 'PAT Testing' },
  { value: 'Solar Panel Installation', label: 'Solar Panel Installation' },
  { value: 'General Electrical Work', label: 'General Electrical Work' },
  { value: 'Other', label: 'Other' },
]

function validate(data: FormData): Record<string, string> {
  const errors: Record<string, string> = {}

  if (!data.name.trim()) {
    errors.name = 'Full name is required'
  } else if (data.name.trim().length < 2) {
    errors.name = 'Please enter your full name'
  }

  if (!data.email.trim()) {
    errors.email = 'Email address is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address'
  }

  if (data.phone.trim() && !UK_PHONE_REGEX.test(data.phone.trim())) {
    errors.phone = 'Please enter a valid UK phone number'
  }

  if (!data.message.trim()) {
    errors.message = 'Please tell us about your project'
  } else if (data.message.trim().length < 10) {
    errors.message = 'Please provide a bit more detail (at least 10 characters)'
  }

  return errors
}

const inputClass =
  'w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors'
const inputErrorClass =
  'w-full bg-secondary border border-red-400 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-400/30 transition-colors'

export function ContactFormClient() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitError, setSubmitError] = useState<string | null>(null)

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors(prev => { const next = { ...prev }; delete next[field]; return next })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    const validationErrors = validate(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setFormState('error')
      return
    }

    setFormState('submitting')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          reason: 'quote',
          areaOfInterest: formData.service || 'General',
          subject: formData.service ? `${formData.service} Enquiry` : 'General Enquiry',
          message: formData.message.trim(),
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }

      trackFormSubmit(formData.service)
      setFormState('success')
      setFormData({ name: '', email: '', phone: '', service: '', message: '' })
      setErrors({})
    } catch (err) {
      setFormState('error')
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  if (formState === 'success') {
    return (
      <div className="flex flex-col items-center justify-center bg-white dark:bg-slate-900 rounded-xl p-12 text-center h-full min-h-[300px]">
        <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-foreground">Message Sent!</h3>
        <p className="mt-2 text-muted-foreground max-w-xs">
          Thank you for getting in touch. We&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setFormState('idle')}
          className="mt-6 text-sm text-primary hover:opacity-75 font-semibold transition-opacity"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="bg-gray-100 dark:bg-slate-900 border border-border rounded-xl p-6 md:p-8 flex flex-col gap-5">
      {submitError && formState === 'error' && (
        <div className="flex items-start gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-4 py-3">
          <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
          <p className="text-sm text-red-700 dark:text-red-400">{submitError}</p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
            Full Name <span className="text-red-600">*</span>
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            value={formData.name}
            onChange={set('name')}
            placeholder="John Smith"
            className={errors.name ? inputErrorClass : inputClass}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && <p id="name-error" className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={set('email')}
            placeholder="john@example.com"
            className={errors.email ? inputErrorClass : inputClass}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && <p id="email-error" className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
            Phone Number <span className="text-muted-foreground text-xs font-normal">(optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            value={formData.phone}
            onChange={set('phone')}
            placeholder="07700 900 000"
            className={errors.phone ? inputErrorClass : inputClass}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && <p id="phone-error" className="mt-1 text-xs text-red-600">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
            Service Required
          </label>
          <select
            id="service"
            value={formData.service}
            onChange={set('service')}
            className={inputClass}
          >
            {SERVICE_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
          Message <span className="text-red-600">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          value={formData.message}
          onChange={set('message')}
          placeholder="Tell us about your project — location, what you need, and any relevant details..."
          className={`resize-none ${errors.message ? inputErrorClass : inputClass}`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && <p id="message-error" className="mt-1 text-xs text-red-600">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={formState === 'submitting'}
        className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-semibold text-sm hover:opacity-90 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {formState === 'submitting' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send Message
          </>
        )}
      </button>

      <p className="text-xs text-muted-foreground text-center">
        We typically respond within 24 hours. Your details are kept private.
      </p>
    </form>
  )
}
