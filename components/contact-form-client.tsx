'use client'

import { useState } from 'react'
import { Send, CheckCircle, Loader2, ChevronRight } from 'lucide-react'

export function ContactFormClient() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Validation function
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address'
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!validateForm()) {
      setFormState('error')
      return
    }

    setFormState('submitting')
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setFormState('success')
    setFormData({ name: '', email: '', phone: '', service: '', message: '' })
  }

  if (formState === 'success') {
    return (
      <div className="flex flex-col items-center justify-center bg-white rounded-xl p-12 text-center h-full">
        <div className="w-16 h-16 rounded-full bg-[#1e293b] flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-[#1e293b]">Message Sent!</h3>
        <p className="mt-2 text-slate-500">
          {"Thank you for getting in touch. We'll get back to you within 24 hours."}
        </p>
        <button
          onClick={() => setFormState('idle')}
          className="mt-6 text-sm text-[#1e293b] hover:text-slate-700 font-semibold transition-colors"
        >
          Send another message
        </button>
      </div>
    )
  }

  // Helper function to render form field with validation
  const renderField = (
    fieldName: string,
    inputElement: React.ReactNode,
    error?: string
  ) => (
    <div>
      {inputElement}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 border border-border rounded-xl p-6 md:p-8 flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
            Full Name <span className="text-primary">*</span>
          </label>
          <input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="John Smith"
            className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Email <span className="text-primary">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="john@example.com"
            className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="07000 000 000"
            className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
            Service Required
          </label>
          <select
            id="service"
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
          >
            <option value="">Select a service</option>
            <option value="air-conditioning">Air Conditioning Service</option>
            <option value="ev-charger">EV Charger Installation</option>
            <option value="safety-certificate">Electric Safety Certificate</option>
            <option value="flood-damage">Flood Damage Assessment</option>
            <option value="outdoor-lighting">Outdoor Lighting & Heating</option>
            <option value="pat-testing">PAT Testing</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
          Message <span className="text-primary">*</span>
        </label>
        <textarea
          id="message"
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tell us about your project..."
          className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors resize-none"
        />
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
    </form>
  )
}
