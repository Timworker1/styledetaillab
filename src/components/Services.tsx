import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Check, ArrowRight, Clock, Sparkles, ShieldCheck, Layers } from 'lucide-react'
import { SERVICE_VARIANTS, ADD_ONS, VEHICLE_SIZES } from '../config/pricing'

const base = import.meta.env.BASE_URL

const PACKAGE_HIGHLIGHTS: Record<string, { icon: string; tagline: string }> = {
  exterior: { icon: '✦', tagline: 'Paint, wheels, glass & every detail outside' },
  interior: { icon: '◈', tagline: 'Deep clean, steam & conditioning inside' },
  complete: { icon: '◉', tagline: 'The full works — outside and in' },
}

function useFadeUp(ref: React.RefObject<Element | null>, delay = 0) {
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return {
    initial: { opacity: 0, y: 32 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  }
}

export default function Services() {
  const headRef = useRef<HTMLDivElement>(null)
  const headAnim = useFadeUp(headRef)
  const [selectedSize, setSelectedSize] = useState<string>('M')

  const currentSize = VEHICLE_SIZES.find(s => s.id === selectedSize)!

  return (
    <section id="services" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-bg-base overflow-hidden">
      <div className="absolute inset-0 bg-dots pointer-events-none opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-64 pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(31,163,122,0.04) 0%, transparent 70%)' }} />
      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div ref={headRef} {...headAnim} className="text-center mb-10">
          <p className="font-body text-sm font-semibold uppercase tracking-widest text-accent mb-3">
            What We Offer
          </p>
          <h2 className="font-heading font-black uppercase tracking-heading text-4xl sm:text-5xl text-text-primary">
            Our Packages
          </h2>
          <p className="mt-4 font-body text-text-muted max-w-lg mx-auto">
            Every service is performed at your location — we bring everything needed.
          </p>
        </motion.div>

        {/* Vehicle size selector */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center gap-3 mb-10"
        >
          <p className="font-body text-xs uppercase tracking-widest text-text-muted">Select your vehicle size</p>
          <div className="flex items-center gap-2 p-1 rounded-xl border border-border bg-bg-panel">
            {VEHICLE_SIZES.map((size) => (
              <button
                key={size.id}
                onClick={() => setSelectedSize(size.id)}
                className={`relative px-5 py-2 rounded-lg font-body text-sm font-semibold transition-all duration-200
                  ${selectedSize === size.id
                    ? 'bg-accent text-white shadow-sm'
                    : 'text-text-muted hover:text-text-primary'
                  }`}
              >
                {size.label}
              </button>
            ))}
          </div>
          <p className="font-body text-xs text-text-muted">
            {currentSize.description} — <span className="text-text-secondary">{currentSize.examples.slice(0, 3).join(', ')}</span>
          </p>
        </motion.div>

        {/* Package cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {SERVICE_VARIANTS.map((variant, i) => (
            <PackageCard key={variant.id} variant={variant} index={i} selectedSize={selectedSize} />
          ))}
        </div>

        {/* Explore full services page */}
        <div className="flex justify-center mb-16">
          <Link
            to="/services"
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg border border-border hover:border-accent text-text-secondary hover:text-accent font-body font-semibold text-sm transition-colors duration-200"
          >
            See All Services In Detail
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-border" />
          <span className="font-body text-xs uppercase tracking-widest text-text-muted">Enhance your detail</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Add-ons grid */}
        <AddOnsGrid />

        {/* Consultation card */}
        <ConsultationCard />

        {/* Paint protection film / wraps */}
        <FilmBlock />
      </div>
    </section>
  )
}

const FILM_MEDIA = [
  { type: 'video' as const, src: `${base}gallery/film-1.mp4` },
  { type: 'video' as const, src: `${base}gallery/film-2.mp4` },
  { type: 'image' as const, src: `${base}gallery/film-photo.webp` },
]

function FilmBlock() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const vids = Array.from(root.querySelectorAll('video'))
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        const v = e.target as HTMLVideoElement
        e.isIntersecting ? v.play().catch(() => {}) : v.pause()
      }),
      { threshold: 0.4 }
    )
    vids.forEach((v) => io.observe(v))
    return () => io.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mt-4 p-6 sm:p-8 rounded-2xl border border-border bg-bg-panel"
    >
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
        {/* Copy */}
        <div>
          <p className="font-body text-xs uppercase tracking-widest text-accent mb-2">Also Available</p>
          <h3 className="font-heading font-black uppercase tracking-heading text-xl sm:text-2xl text-text-primary mb-3">
            Paint Protection Film &amp; Wraps
          </h3>
          <p className="font-body text-sm text-text-muted leading-relaxed mb-4">
            Beyond cleaning — we protect and transform. Self-healing clear film shields your
            paintwork from stone chips, scratches and road rash, keeping it flawless underneath.
            Prefer a new look? We also wrap in <span className="text-text-secondary">gloss</span>,{' '}
            <span className="text-text-secondary">matte</span> or <span className="text-text-secondary">satin</span> finishes —
            applied by hand, precise and seamless.
          </p>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="inline-flex items-center gap-2 font-body text-sm font-semibold text-accent hover:underline"
          >
            Ask about film &amp; wraps
            <ArrowRight size={14} />
          </a>
        </div>

        {/* Media */}
        <div className="grid grid-cols-3 gap-2.5">
          {FILM_MEDIA.map((m) => (
            <div key={m.src} className="relative overflow-hidden rounded-xl border border-border bg-bg-base" style={{ aspectRatio: '9/16' }}>
              {m.type === 'video' ? (
                <video src={m.src} muted loop playsInline preload="metadata" className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <img src={m.src} alt="Paint protection film application" className="absolute inset-0 w-full h-full object-cover" />
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function PackageCard({ variant, index, selectedSize }: { variant: typeof SERVICE_VARIANTS[0]; index: number; selectedSize: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isComplete = variant.id === 'complete'

  const sizeData = VEHICLE_SIZES.find(s => s.id === selectedSize)!
  const price = sizeData.prices[variant.id]
  const duration = sizeData.durationHours[variant.id]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative group flex flex-col rounded-2xl border p-5 transition-all duration-300 cursor-default
        ${isComplete
          ? 'border-accent/50 bg-accent/5 hover:border-accent hover:bg-accent/10'
          : 'border-border bg-bg-panel hover:border-text-muted/40'
        }`}
      style={{ willChange: 'transform' }}
      onMouseMove={(e) => {
        const el = e.currentTarget
        const rect = el.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10
        el.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) translateZ(4px)`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = ''
      }}
    >
      {isComplete && (
        <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-accent text-white font-body text-xs font-semibold">
          Most Popular
        </div>
      )}

      {/* Icon + name */}
      <div className="flex items-center gap-3 mb-1">
        <span className={`text-xl ${isComplete ? 'text-accent' : 'text-text-muted'}`}>
          {PACKAGE_HIGHLIGHTS[variant.id].icon}
        </span>
        <h3 className="font-heading font-black uppercase tracking-heading text-xl text-text-primary">
          {variant.label}
        </h3>
      </div>

      <p className="font-body text-sm text-text-muted mb-4 leading-relaxed">
        {PACKAGE_HIGHLIGHTS[variant.id].tagline}
      </p>

      {/* Included list */}
      <ul className="space-y-2.5 flex-1 mb-5">
        {variant.included.map((item) => {
          const [title, desc] = item.split(' — ')
          return (
            <li key={item} className="flex items-start gap-2.5">
              <Check
                size={12}
                className={`mt-0.5 flex-shrink-0 ${isComplete ? 'text-accent' : 'text-text-muted'}`}
                strokeWidth={2.5}
              />
              <span className="font-body text-xs leading-snug">
                <span className="text-text-secondary font-semibold">{title}</span>
                {desc && <span className="text-text-muted"> — {desc}</span>}
              </span>
            </li>
          )
        })}
      </ul>

      {/* Price + CTA */}
      <div className="border-t border-border pt-5 mt-auto">
        <div className="flex items-end justify-between mb-4">
          <div>
            <p className="font-body text-xs text-text-muted mb-0.5">{sizeData.label} vehicle</p>
            <motion.p
              key={price}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="font-heading font-black text-3xl text-text-primary"
            >
              €{price}
            </motion.p>
          </div>
          <div className="flex items-center gap-1.5 text-text-muted">
            <Clock size={12} />
            <p className="font-body text-xs">{duration}–{duration + 1}h</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <a
            href="#calculator"
            onClick={(e) => { e.preventDefault(); document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="btn-neon group/cp flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-accent hover:bg-accent-dark text-white font-body font-semibold text-sm transition-colors duration-200"
          >
            Configure & Price
            <ArrowRight size={14} className="transition-transform duration-200 group-hover/cp:translate-x-0.5" />
          </a>
          <Link
            to="/services"
            className="group/vd flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-border hover:border-accent/60 text-text-secondary hover:text-accent font-body font-medium text-sm transition-colors duration-200"
          >
            View Full Details
            <ArrowRight size={13} className="transition-transform duration-200 group-hover/vd:translate-x-0.5" />
          </Link>
        </div>
      </div>

      {/* Hover shimmer */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'radial-gradient(circle at 50% 0%, rgba(31,163,122,0.08) 0%, transparent 60%)' }}
      />
    </motion.div>
  )
}

function AddonCard({ addon, className = '' }: { addon: typeof ADD_ONS[0]; className?: string }) {
  return (
    <div className={`flex flex-col items-start p-4 rounded-xl border border-border bg-bg-panel hover:border-accent/50 transition-colors duration-200 group ${className}`}>
      <p className="font-body text-sm font-semibold text-text-primary mb-1 leading-snug group-hover:text-accent transition-colors duration-200">
        {addon.label}
      </p>
      <p className="font-body text-xs text-text-muted mt-auto pt-3 font-semibold">
        from €{addon.price}
      </p>
    </div>
  )
}

function AddOnsGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mb-10"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {ADD_ONS.map((addon) => (
          <AddonCard key={addon.id} addon={addon} />
        ))}
      </div>
    </motion.div>
  )
}

const PROTECTION = [
  {
    icon: Sparkles,
    title: 'Paint Correction',
    body: 'Machine polishing that removes swirl marks, light scratches and haze — restoring deep gloss and clarity to your paint.',
  },
  {
    icon: ShieldCheck,
    title: 'Ceramic Coating',
    body: 'A durable liquid-glass layer bonded to the paint. Long-lasting protection, easier washing and a permanent wet-look shine — from 6 months up to 5 years.',
  },
  {
    icon: Layers,
    title: 'Paint Protection Film (PPF)',
    body: 'A clear, self-healing film that physically shields high-impact areas from stone chips, scratches and road debris.',
  },
]

function ConsultationCard() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="p-6 sm:p-8 rounded-2xl border border-border bg-bg-panel"
    >
      {/* Header + CTA */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-7">
        <div>
          <p className="font-body text-xs uppercase tracking-widest text-accent mb-2">Premium Protection</p>
          <h3 className="font-heading font-black uppercase tracking-heading text-xl sm:text-2xl text-text-primary">
            Ceramic, PPF &amp; Paint Correction
          </h3>
        </div>
        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
          className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-lg bg-accent hover:bg-accent-dark text-white font-body font-semibold text-sm transition-colors duration-200 whitespace-nowrap"
        >
          Get a Consultation
          <ArrowRight size={14} />
        </a>
      </div>

      {/* What each one does */}
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        {PROTECTION.map(({ icon: Icon, title, body }) => (
          <div key={title} className="p-4 rounded-xl border border-border bg-bg-base">
            <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
              <Icon size={16} className="text-accent" />
            </div>
            <p className="font-body font-semibold text-text-primary text-sm mb-1.5">{title}</p>
            <p className="font-body text-xs text-text-muted leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      <p className="font-body text-xs text-text-muted leading-relaxed">
        Priced individually by your car, its condition and the protection you choose — from
        6-month sealants to 5-year ceramic coatings. Best applied before winter to shield the
        paint from salt, grit and the elements, with a spring refresh to keep it flawless.
      </p>
    </motion.div>
  )
}
