import {
  Wind,
  Car,
  ShieldCheck,
  Droplets,
  Sun,
  ClipboardCheck,
  Clock,
  BadgeCheck,
  Receipt,
  PhoneCall,
  Zap,
} from 'lucide-react'
import { ServiceCardClient } from './service-card-client'

export const LOCATIONS = [
  { name: 'Cricklewood', postcodes: ['NW2'] },
  { name: 'Hampstead', postcodes: ['NW3'] },
  { name: 'Kilburn', postcodes: ['NW6'] },
  { name: 'Hendon', postcodes: ['NW4'] },
  { name: 'Golders Green', postcodes: ['NW11'] },
  { name: 'Dolls Hill', postcodes: ['NW2'] },
  { name: 'Willesden', postcodes: ['NW10'] },
  { name: 'Brondesbury', postcodes: ['NW6'] },
]

export function generateSlug(serviceTitle: string, locationName: string) {
  return `${serviceTitle.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}-in-${locationName.toLowerCase()}`
}

export const services = [
  {
    iconName: 'Wind' as const,
    title: 'Air Conditioning Service',
    summary: 'Keep your home or business cool year-round with expert AC installation and servicing.',
    details:
      'We provide full air conditioning solutions including split system installation, ducted systems, multi-zone setups, and regular maintenance servicing. Our NAPIT-approved engineers ensure every installation meets the highest safety and efficiency standards. We work with leading brands and offer comprehensive aftercare support.',
  },
  {
    iconName: 'Car' as const,
    title: 'EV Charger Installation',
    summary: 'Certified EV charger installation for all major brands — from site survey to final sign-off.',
    details:
      'As certified EV charger installers, we handle everything from site surveys to final commissioning. We install all major brands including Tesla Wall Connectors, Ohme, Pod Point, and Easee. Every installation includes electrical capacity assessment, dedicated circuit installation, and all necessary Part P certification documentation.',
  },
  {
    iconName: 'ShieldCheck' as const,
    title: 'Electric Safety Certificates',
    summary: 'EICR testing for landlords, buyers, and businesses — legally compliant and fully documented.',
    details:
      'Our Electrical Installation Condition Reports (EICR) meet all current regulations. Essential for landlords (legally required every 5 years), homebuyers, and insurance requirements. We thoroughly test all circuits, identify any defects, and provide clear documentation with remedial recommendations where needed.',
  },
  {
    iconName: 'Droplets' as const,
    title: 'Flood Damage Assessment',
    summary: 'Rapid-response electrical assessment and restoration after water or flood damage.',
    details:
      'Flooding can cause catastrophic damage to electrical systems. Our rapid response team provides thorough assessment of all affected circuits, consumer units, and wiring. We handle isolation, drying assessments, replacement of damaged components, re-testing, and full re-certification to get your property safely back online.',
  },
  {
    iconName: 'Sun' as const,
    title: 'Outdoor Lighting & Heating',
    summary: 'Bespoke outdoor lighting and heating installations — weatherproof and energy-efficient.',
    details:
      'Create stunning outdoor environments with our bespoke lighting design and installation service. From garden pathway lights and security floodlights to patio heaters and entertaining areas — we design and install complete outdoor electrical solutions that are weatherproof, energy-efficient, and beautifully integrated.',
  },
  {
    iconName: 'ClipboardCheck' as const,
    title: 'PAT Testing',
    summary: 'Full Portable Appliance Testing with pass/fail labels and a digital compliance report.',
    details:
      'Regular PAT testing is essential for workplace safety and insurance compliance. We test all portable electrical equipment, from computers and kettles to power tools and extension leads. Each appliance receives a pass/fail label, and you receive a comprehensive digital report for your records.',
  },
  {
    iconName: 'Zap' as const,
    title: 'Solar Panel Installation',
    summary: 'Modern solar panel systems for residential and commercial properties — reduce bills and energy dependence.',
    details:
      'Harness the power of the sun with our professional solar panel installation service. We design and install complete solar PV systems tailored to your property and energy needs. From site assessment and system sizing to MCS registration and grid connection, we handle every step. Our installations include battery storage options, monitoring systems, and comprehensive warranties for long-term peace of mind.',
  },
]

const usps = [
  {
    icon: Clock,
    title: 'On-Time Guarantee',
    description: 'We show up when we say we will, or we make it right.',
  },
  {
    icon: BadgeCheck,
    title: '100% Satisfaction',
    description: 'Fully guaranteed on every job we complete.',
  },
  {
    icon: Receipt,
    title: 'Transparent Pricing',
    description: 'All options explained upfront — no surprise bills.',
  },
  {
    icon: PhoneCall,
    title: '24/7 Emergency',
    description: 'Available around the clock for urgent call-outs.',
  },
]

export function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-1000 fill-mode-both">
          <span className="text-sm font-semibold text-gray-700 uppercase tracking-[0.2em]">
            Residential Electrical Services
          </span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance">
            Professional Electrical Services You Can Trust
          </h2>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto text-pretty leading-relaxed">
            We know how much you depend on electricity for everyday life — and how dangerous improper electrical work can be. Our NAPIT-approved engineers arrive on time, work to the highest standards, and guarantee your satisfaction on every job.
          </p>
        </div>

        {/* USP strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {usps.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-3 shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">{title}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCardClient
              key={service.title}
              iconName={service.iconName}
              title={service.title}
              summary={service.summary}
              details={service.details}
              index={index}
              slug={generateSlug(service.title, LOCATIONS[0].name)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
