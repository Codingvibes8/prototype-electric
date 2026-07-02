export interface Area {
  name: string
  postcode: string
  description: string
}

export const areas: Area[] = [
  {
    name: 'Cricklewood',
    postcode: 'NW2',
    description:
      'Our home base. We provide fast-response electrical services across Cricklewood, from residential rewiring to commercial fit-outs.',
  },
  {
    name: 'Willesden',
    postcode: 'NW10',
    description:
      'Full electrical services for Willesden residents and businesses, including EV charger installations and safety certificates.',
  },
  {
    name: 'Dollis Hill',
    postcode: 'NW2',
    description:
      'Reliable local electrician for Dollis Hill. We handle everything from fuse board upgrades to outdoor lighting installations.',
  },
  {
    name: 'Neasden',
    postcode: 'NW10',
    description:
      'Trusted electrical contractor serving Neasden homes and businesses with NAPIT-approved workmanship.',
  },
  {
    name: 'Kilburn',
    postcode: 'NW6',
    description:
      'Professional electrical services across Kilburn, from PAT testing for landlords to full property rewires.',
  },
  {
    name: 'West Hampstead',
    postcode: 'NW6',
    description:
      'Expert electrician serving West Hampstead. Air conditioning installation, EV charging, and electrical inspections.',
  },
  {
    name: 'Brondesbury',
    postcode: 'NW6',
    description:
      'Quality electrical work for Brondesbury properties. Certified, insured, and trusted by local homeowners.',
  },
  {
    name: 'Kensal Rise',
    postcode: 'NW10',
    description:
      'Comprehensive electrical services for Kensal Rise including new builds, extensions, and smart home wiring.',
  },
]

export function locationSlug(name: string) {
  return name.toLowerCase().replace(/ /g, '-')
}

export function getAreaBySlug(slug: string) {
  return areas.find((area) => locationSlug(area.name) === slug)
}