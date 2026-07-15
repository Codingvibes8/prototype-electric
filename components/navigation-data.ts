import { Wind, Car, ShieldCheck, Droplets, Sun, ClipboardCheck, Zap, MapPin } from 'lucide-react'
import { LOCATIONS, generateSlug } from './services'

export const serviceItems = [
  { icon: Wind, label: 'Air Conditioning Service' },
  { icon: Car, label: 'EV Charger Installation' },
  { icon: ShieldCheck, label: 'Electric Safety Certificates' },
  { icon: Droplets, label: 'Flood Damage Assessment' },
  { icon: Sun, label: 'Outdoor Lighting & Heating' },
  { icon: ClipboardCheck, label: 'PAT Testing' },
  { icon: Zap, label: 'Solar Panel Installation' },
].map((item) => ({
  ...item,
  href: `/services/${generateSlug(item.label, LOCATIONS[0].name)}`,
}))

export const locationItems = [
  'Cricklewood',
  'Willesden',
  'Dollis Hill',
  'Neasden',
  'Kilburn',
  'West Hampstead',
  'Brondesbury',
  'Kensal Rise',
].map((name) => ({
  icon: MapPin,
  label: name,
  href: `/location/${name.toLowerCase().replace(/ /g, '-')}`,
}))
