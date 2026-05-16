'use client'

import { useState } from 'react'
import { Send, CheckCircle, Loader2, ChevronRight } from 'lucide-react'

export function ContactFormClient() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    firstName: '',
    title: '',
    company: '',
    email: '',
    reason: '',
    areaOfInterest: '',
    subject: '',
    message: '',
    budgetRange: '',
    timeline: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Validation function
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address'
      }
    }

    if (!formData.reason) {
      newErrors.reason = 'Please select a reason for contact'
    }

    if (!formData.areaOfInterest) {
      newErrors.areaOfInterest = 'Please select an area of interest'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
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

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setFormState('success')
        setFormData({
          firstName: '',
          title: '',
          company: '',
          email: '',
          reason: '',
          areaOfInterest: '',
          subject: '',
          message: '',
          budgetRange: '',
          timeline: ''
        })
        setErrors({})
      } else {
        const errorData = await response.json()
        setFormState('error')
        // Could set a general error message here if needed
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setFormState('error')
    }
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
              className={`w-full bg-[#f1f5f9] border rounded-none px-4 py-3.5 text-sm font-bold text-slate-900 placeholder:text-slate-800 focus:outline-none focus:ring-1 transition-colors ${
                errors.firstName ? 'border-red-600 focus:ring-red-600' : 'border-slate-300 focus:ring-slate-300'
              }`}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Title"
              className="w-full bg-[#f1f5f9] border border-slate-300 rounded-none px-4 py-3.5 text-sm font-bold text-slate-900 placeholder:text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-300 transition-colors"
            />
          </div>
          <div>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Company/Position"
              className="w-full bg-[#f1f5f9] border border-slate-300 rounded-none px-4 py-3.5 text-sm font-bold text-slate-900 placeholder:text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-300 transition-colors"
            />
          </div>
          <div>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="E-mail *"
              className={`w-full bg-[#f1f5f9] border rounded-none px-4 py-3.5 text-sm font-bold text-slate-900 placeholder:text-slate-800 focus:outline-none focus:ring-1 transition-colors ${
                errors.email ? 'border-red-600 focus:ring-red-600' : 'border-slate-300 focus:ring-slate-300'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          <div>
            <select
              required
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className={`w-full bg-[#f1f5f9] border rounded-none px-4 py-3.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-1 transition-colors appearance-none ${
                errors.reason ? 'border-red-600 focus:ring-red-600' : 'border-slate-300 focus:ring-slate-300'
              }`}
              style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
            >
              <option value="" disabled hidden>Reason for Contact *</option>
              <option value="quote">Request a Quote</option>
              <option value="support">Support</option>
              <option value="other">Other</option>
            </select>
            {errors.reason && (
              <p className="mt-1 text-sm text-red-600">{errors.reason}</p>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          <div>
            <select
              required
              value={formData.areaOfInterest}
              onChange={(e) => setFormData({ ...formData, areaOfInterest: e.target.value })}
              className={`w-full bg-[#f1f5f9] border rounded-none px-4 py-3.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-1 transition-colors appearance-none ${
                errors.areaOfInterest ? 'border-red-600 focus:ring-red-600' : 'border-slate-300 focus:ring-slate-300'
              }`}
              style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
            >
              <option value="" disabled hidden>Area of Interest *</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="industrial">Industrial</option>
            </select>
            {errors.areaOfInterest && (
              <p className="mt-1 text-sm text-red-600">{errors.areaOfInterest}</p>
            )}
          </div>

          <div>
            <select
              value={formData.budgetRange}
              onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
              className={`w-full bg-[#f1f5f9] border rounded-none px-4 py-3.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-1 transition-colors appearance-none ${
                errors.budgetRange ? 'border-red-600 focus:ring-red-600' : 'border-slate-300 focus:ring-slate-300'
              }`}
              style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
            >
              <option value="" disabled hidden>Project Budget Range (Optional)</option>
              <option value="under-500">Under £500</option>
              <option value="500-1000">£500 - £1,000</option>
              <option value="1000-2000">£1,000 - £2,000</option>
              <option value="2000-5000">£2,000 - £5,000</option>
              <option value="5000-plus">£5,000+</option>
              <option value="unsure">Not sure yet</option>
            </select>
            {errors.budgetRange && (
              <p className="mt-1 text-sm text-red-600">{errors.budgetRange}</p>
            )}
          </div>

          <div>
            <select
              value={formData.timeline}
              onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
              className={`w-full bg-[#f1f5f9] border rounded-none px-4 py-3.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-1 transition-colors appearance-none ${
                errors.timeline ? 'border-red-600 focus:ring-red-600' : 'border-slate-300 focus:ring-slate-300'
              }`}
              style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
            >
              <option value="" disabled hidden>Project Timeline (Optional)</option>
              <option value="urgent">Urgent (within 1 week)</option>
              <option value="1-2-weeks">1-2 weeks</option>
              <option value="1-month">Within 1 month</option>
              <option value="1-3-months">1-3 months</option>
              <option value="3-plus-months">3+ months</option>
              <option value="planning">Just planning</option>
            </select>
            {errors.timeline && (
              <p className="mt-1 text-sm text-red-600">{errors.timeline}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Subject *"
              className={`w-full bg-[#f1f5f9] border rounded-none px-4 py-3.5 text-sm font-bold text-slate-900 placeholder:text-slate-800 focus:outline-none focus:ring-1 transition-colors ${
                errors.subject ? 'border-red-600 focus:ring-red-600' : 'border-slate-300 focus:ring-slate-300'
              }`}
            />
            {errors.subject && (
              <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
            )}
          </div>
          <div className="flex-grow flex flex-col">
            <textarea
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Your Message *"
              className={`w-full flex-grow bg-[#f1f5f9] border rounded-none px-4 py-3.5 text-sm font-bold text-slate-900 placeholder:text-slate-800 focus:outline-none focus:ring-1 transition-colors resize-none min-h-[150px] ${
                errors.message ? 'border-red-600 focus:ring-red-600' : 'border-slate-300 focus:ring-slate-300'
              }`}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-600">{errors.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Error message for overall form issues */}
      {formState === 'error' && (
        <div className="text-red-600 text-sm">
          Please fix the errors above and try again.
        </div>
      )}

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
