'use client'

import { useState } from 'react'
import { Send, CheckCircle, Loader2, ChevronRight } from 'lucide-react'

export function ContactFormClient() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [formData, setFormData] = useState({
    firstName: '',
    title: '',
    company: '',
    email: '',
    reason: '',
    areaOfInterest: '',
    subject: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('submitting')
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setFormState('success')
    setFormData({ firstName: '', title: '', company: '', email: '', reason: '', areaOfInterest: '', subject: '', message: '' })
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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          <div>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              placeholder="First name *"
              className="w-full bg-[#f1f5f9] border border-red-600 rounded-none px-4 py-3.5 text-sm font-bold text-slate-900 placeholder:text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-600 transition-colors"
            />
          </div>
          <div>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Title"
              className="w-full bg-[#f1f5f9] border-none rounded-none px-4 py-3.5 text-sm font-bold text-slate-900 placeholder:text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-300 transition-colors"
            />
          </div>
          <div>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Company/Position"
              className="w-full bg-[#f1f5f9] border-none rounded-none px-4 py-3.5 text-sm font-bold text-slate-900 placeholder:text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-300 transition-colors"
            />
          </div>
          <div>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="E-mail *"
              className="w-full bg-[#f1f5f9] border-none rounded-none px-4 py-3.5 text-sm font-bold text-slate-900 placeholder:text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-300 transition-colors"
            />
          </div>
          <div>
            <select
              required
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="w-full bg-[#f1f5f9] border-none rounded-none px-4 py-3.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-300 transition-colors appearance-none"
              style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
            >
              <option value="" disabled hidden>Reason for Contact *</option>
              <option value="quote">Request a Quote</option>
              <option value="support">Support</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          <div>
            <select
              required
              value={formData.areaOfInterest}
              onChange={(e) => setFormData({ ...formData, areaOfInterest: e.target.value })}
              className="w-full bg-[#f1f5f9] border-none rounded-none px-4 py-3.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-300 transition-colors appearance-none"
              style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
            >
              <option value="" disabled hidden>Area of Interest *</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="industrial">Industrial</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Subject *"
              className="w-full bg-[#f1f5f9] border-none rounded-none px-4 py-3.5 text-sm font-bold text-slate-900 placeholder:text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-300 transition-colors"
            />
          </div>
          <div className="flex-grow flex flex-col">
            <textarea
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Your Message *"
              className="w-full flex-grow bg-[#f1f5f9] border-none rounded-none px-4 py-3.5 text-sm font-bold text-slate-900 placeholder:text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-300 transition-colors resize-none min-h-[150px]"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-start mt-2">
        <button
          type="submit"
          disabled={formState === 'submitting'}
          className="flex items-center justify-center gap-2 bg-[#1e293b] text-white px-8 py-3.5 font-bold text-sm hover:bg-slate-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {formState === 'submitting' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submit
            </>
          ) : (
            <>
              Submit
              <ChevronRight className="w-4 h-4 ml-2" />
            </>
          )}
        </button>
      </div>
    </form>
  )
}
