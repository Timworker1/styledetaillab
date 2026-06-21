// All prices are net (excl. VAT). Edit here — nowhere else.

export type ServiceVariant = 'exterior' | 'interior' | 'complete'
export type VehicleSize = 'S' | 'M' | 'L' | 'XL'
export type FinishType = 'wax' | 'ceramic-sealant'

export interface ServiceVariantOption {
  id: ServiceVariant
  label: string
  tagline: string
  included: string[]
}

export interface VehicleSizeOption {
  id: VehicleSize
  label: string
  description: string
  examples: string[]
  prices: Record<ServiceVariant, number>
  durationHours: Record<ServiceVariant, number>
}

export interface FinishOption {
  id: FinishType
  label: string
  description: string
  surcharge: number
}

export interface AddOn {
  id: string
  label: string
  tooltip: string
  price: number
}

// ─── Service variants ────────────────────────────────────────────────────────

export const SERVICE_VARIANTS: ServiceVariantOption[] = [
  {
    id: 'exterior',
    label: 'Exterior',
    tagline: 'Full exterior decontamination & protection',
    included: [
      'Snow Foam Prewash — loosens soiling on panels, wheels & arches',
      'Contact Wash — two-bucket hand wash, every panel by hand',
      'Blow Dry & Hand Finish — microfibre dry, zero water spots',
      'Paint Decontamination — iron fallout & tar removed',
      'Wheels & Wheel Arches — decontaminated, tyre dressing applied',
      'Glass & Seals — streak-free polish, rubber seals treated',
      'Trim & Details — plastics, tips, cameras & sensors dressed',
      'Paint Protection — protective finish for shine & longevity',
    ],
  },
  {
    id: 'interior',
    label: 'Interior',
    tagline: 'Deep interior clean & conditioning',
    included: [
      'Full Vacuum — seats, carpets, boot & door pockets',
      'Steam Clean — dashboard, vents, door cards & pedals',
      'Leather / Fabric Care — cleaned, conditioned & protected',
      'Seat Belts — fully extended, cleaned & dried',
      'Headlining (Ceiling) — cleaned & refreshed throughout',
      'Interior Glass — streak-free polish inside',
      'Plastics & Trim — dressed & UV-protected',
      'Ozone Treatment — eliminates odours at the source',
    ],
  },
  {
    id: 'complete',
    label: 'Complete',
    tagline: 'Full exterior & interior — the works',
    included: [
      'Snow Foam Prewash — loosens soiling on panels, wheels & arches',
      'Contact Wash — two-bucket hand wash, every panel by hand',
      'Blow Dry & Hand Finish — microfibre dry, zero water spots',
      'Paint Decontamination — iron fallout & tar removed',
      'Wheels & Wheel Arches — decontaminated, tyre dressing applied',
      'Full Vacuum & Steam Clean — every surface, vent & crevice',
      'Leather / Fabric Care — cleaned, conditioned & protected',
      'Seat Belts — fully extended, cleaned & dried',
      'Headlining (Ceiling) — cleaned & refreshed throughout',
      'Glass — streak-free inside and out',
      'Trim & Details — plastics, tips, cameras & sensors dressed',
      'Ozone Treatment — eliminates odours at the source',
      'Paint Protection — protective finish for shine & longevity',
    ],
  },
]

// ─── Vehicle sizes ────────────────────────────────────────────────────────────

export const VEHICLE_SIZES: VehicleSizeOption[] = [
  {
    id: 'S',
    label: 'Small',
    description: 'Small hatchback',
    examples: ['VW Polo', 'Toyota Yaris', 'Ford Fiesta', 'Opel Corsa'],
    prices: { exterior: 110, interior: 120, complete: 200 },
    durationHours: { exterior: 3, interior: 3, complete: 5 },
  },
  {
    id: 'M',
    label: 'Medium',
    description: 'Saloon / estate / compact SUV (≤4.6 m)',
    examples: ['BMW 3 Series', 'Audi A4', 'Skoda Octavia', 'VW Tiguan', 'Tesla Model 3'],
    prices: { exterior: 130, interior: 140, complete: 240 },
    durationHours: { exterior: 3.5, interior: 3.5, complete: 6 },
  },
  {
    id: 'L',
    label: 'Large',
    description: 'Large SUV / executive saloon',
    examples: ['BMW X5', 'Audi Q7', 'Land Rover Discovery', 'Mercedes E-Class'],
    prices: { exterior: 160, interior: 170, complete: 290 },
    durationHours: { exterior: 4.5, interior: 4.5, complete: 7 },
  },
  {
    id: 'XL',
    label: 'XL',
    description: 'Van / 7-seater MPV',
    examples: ['VW Transporter', 'Ford Transit Custom', 'VW Caravelle'],
    prices: { exterior: 190, interior: 200, complete: 340 },
    durationHours: { exterior: 5.5, interior: 5.5, complete: 8 },
  },
]

// ─── Finish options ───────────────────────────────────────────────────────────

export const FINISH_OPTIONS: FinishOption[] = [
  {
    id: 'wax',
    label: 'Wax',
    description: 'Depth of colour, wet-look gloss and water repellency lasting weeks',
    surcharge: 0,
  },
  {
    id: 'ceramic-sealant',
    label: 'Ceramic Sealant',
    // Note: this is a mid-tier sealant finish, NOT the same as the Spray Ceramic Coating add-on below
    description: 'More durable hydrophobic protection lasting months — a step up from wax',
    surcharge: 60,
  },
]

// ─── Add-ons ──────────────────────────────────────────────────────────────────

export const ADD_ONS: AddOn[] = [
  {
    id: 'spray-ceramic',
    label: 'Spray Ceramic Coating',
    // Note: this is a true coating bonded to paint (1–2 yr), different from the Ceramic Sealant finish option above
    tooltip: '1–2 year protection — a true coating layer bonded to the paint surface. A longer-lasting upgrade beyond the Ceramic Sealant finish.',
    price: 250,
  },
  {
    id: 'glass-ceramic',
    label: 'Glass Ceramic / Rain Repellent',
    tooltip: 'Hydrophobic coating applied to windscreen and all glass — dramatically improves visibility in rain.',
    price: 60,
  },
  {
    id: 'wheel-ceramic',
    label: 'Wheel Ceramic Coating',
    tooltip: 'Ceramic protection on all four wheels — repels brake dust and makes future cleaning far easier.',
    price: 90,
  },
  {
    id: 'engine-bay',
    label: 'Engine Bay Detailing',
    tooltip: 'Careful degreasing and dressing of the engine bay — impressive at inspection and keeps dirt from baking on.',
    price: 50,
  },
  {
    id: 'trim-restoration',
    label: 'Trim Restoration & Protection',
    tooltip: 'Restores faded exterior plastic trim to deep black, with UV protection to prevent future fading.',
    price: 40,
  },
  {
    id: 'headlight-restoration',
    label: 'Headlight Restoration (pair)',
    tooltip: 'Removes yellowing and haze from headlight lenses — restores clarity and improves night visibility.',
    price: 70,
  },
  {
    id: 'pet-hair',
    label: 'Pet Hair Removal',
    tooltip: 'Specialist removal of deeply embedded pet hair from seats, carpets and boot area.',
    price: 40,
  },
]
