import { track } from '@vercel/analytics'

export function trackFormSubmit(service?: string) {
  track('contact_form_submit', { service: service || 'unspecified' })
}

export function trackPhoneClick(location: string) {
  track('phone_click', { location })
}

export function trackCTAClick(ctaName: string) {
  track('cta_click', { cta: ctaName })
}
