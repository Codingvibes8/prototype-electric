'use client'

import { useState } from 'react'
import { Send, CheckCircle, Loader2 } from 'lucide-react'

export function ContactFormClient() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('submitting')
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setFormState('success')
    setFormData({ name: '', email: '', phone: '', service: '', message: '' })
  }

  if (formState === 'success') {
    return (
      <div className="flex flex-col items-center justify-center bg-white border border-slate-200 rounded-xl p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-slate-900">Message Sent!</h3>
        <p className="mt-2 text-slate-500">
          {"Thank you for getting in touch. We'll get back to you within 24 hours."}
        </p>
        <button
          onClick={() => setFormState('idle')}
          className="mt-6 text-sm text-red-600 hover:text-red-500 font-semibold transition-colors"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-background border border-border rounded-xl p-6 md:p-8 flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="John Smith"
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="john@example.com"
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 transition-colors"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="07000 000 000"
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-2">
            Service Required
          </label>
          <select
            id="service"
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 transition-colors"
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
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tell us about your project..."
          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={formState === 'submitting'}
        className="flex items-center justify-center gap-2 bg-red-600 text-white px-8 py-3.5 rounded-lg font-semibold text-sm hover:bg-red-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
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
