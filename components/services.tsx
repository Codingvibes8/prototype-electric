import {
  Wind,
  Car,
  ShieldCheck,
  Droplets,
  Sun,
  ClipboardCheck,
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
    summary: 'Expert installation and maintenance of residential and commercial air conditioning systems.',
    details:
      'We provide full air conditioning solutions including split system installation, ducted systems, multi-zone setups, and regular maintenance servicing. Our NAPIT-approved engineers ensure every installation meets the highest safety and efficiency standards. We work with leading brands and offer comprehensive aftercare support.',
  },
  {
    iconName: 'Car' as const,
    title: 'EV Charger Installation',
    summary: 'Future-proof your home with professional electric vehicle charging point installation.',
    details:
      'As certified EV charger installers, we handle everything from site surveys to final commissioning. We install all major brands including Tesla Wall Connectors, Ohme, Pod Point, and Easee. Every installation includes electrical capacity assessment, dedicated circuit installation, and all necessary Part P certification documentation.',
  },
  {
    iconName: 'ShieldCheck' as const,
    title: 'Electric Safety Certificates',
    summary: 'Comprehensive EICR testing and certification for landlords, homeowners, and businesses.',
    details:
      'Our Electrical Installation Condition Reports (EICR) meet all current regulations. Essential for landlords (legally required every 5 years), homebuyers, and insurance requirements. We thoroughly test all circuits, identify any defects, and provide clear documentation with remedial recommendations where needed.',
  },
  {
    iconName: 'Droplets' as const,
    title: 'Flood Damage Assessment',
    summary: 'Emergency electrical assessment and restoration following water or flood damage.',
    details:
      'Flooding can cause catastrophic damage to electrical systems. Our rapid response team provides thorough assessment of all affected circuits, consumer units, and wiring. We handle isolation, drying assessments, replacement of damaged components, re-testing, and full re-certification to get your property safely back online.',
  },
  {
    iconName: 'Sun' as const,
    title: 'Outdoor Lighting & Heating',
    summary: 'Transform your outdoor spaces with professional lighting and heating installations.',
    details:
      'Create stunning outdoor environments with our bespoke lighting design and installation service. From garden pathway lights and security floodlights to patio heaters and entertaining areas — we design and install complete outdoor electrical solutions that are weatherproof, energy-efficient, and beautifully integrated.',
  },
  {
    iconName: 'ClipboardCheck' as const,
    title: 'PAT Testing',
    summary: 'Portable Appliance Testing to keep your workplace compliant and safe.',
    details:
      'Regular PAT testing is essential for workplace safety and insurance compliance. We test all portable electrical equipment, from computers and kettles to power tools and extension leads. Each appliance receives a pass/fail label, and you receive a comprehensive digital report for your records.',
  },
]

export function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-1000 shadow-2xl fill-mode-both">
          <span className="text-sm font-semibold text-gray-700 uppercase tracking-[0.2em]">
            Service Excellence
          </span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance">
            How We Can Help
          </h2>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto text-pretty leading-relaxed">
            Reliable, certified, and safe electrical solutions for homeowners and businesses across North West London and beyond.
          </p>
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
            />
          ))}
        </div>
      </div>
    </section>
  )
}
