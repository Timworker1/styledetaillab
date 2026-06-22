import { useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Check, ArrowLeft, ArrowRight, Clock, Car, Sparkles, MessageCircle, Truck, Home, Eye, CreditCard } from 'lucide-react'
import { SERVICE_VARIANTS, VEHICLE_SIZES } from '../config/pricing'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FloatingButtons from '../components/FloatingButtons'
import Cursor from '../components/Cursor'

const base = import.meta.env.BASE_URL

interface ServiceMeta {
  photo: string
  photoPosition: string
  photoCar: string
  headline: string
  description: string
  perfectFor: string[]
  badge: string
}

const SERVICE_META: Record<string, ServiceMeta> = {
  exterior: {
    photo: `${base}gallery/bmw-grey.jpg`,
    photoPosition: 'object-[center_30%]',
    photoCar: 'BMW 3 Series - Exterior Detail',
    badge: 'Most Requested',
    headline: 'Beyond a wash. A proper detail.',
    description: `A standard car wash cleans the surface - we go deeper. We begin with a snow foam prewash on the lower panels, wheels and arches to lift heavy soiling safely before any contact with the paint. Every panel is then hand-washed using the two-bucket method, rinsed and dried with microfibre towels to leave zero water spots. Chemical decontamination follows - removing bonded iron fallout and tar that a normal wash can't touch. Wheels, arches, glass, trim and all exterior details are cleaned and dressed. We finish with a protective coating applied to the paintwork, leaving your car cleaner for longer and easier to maintain.`,
    perfectFor: ['Pre-event prep', 'Maintenance detail', 'Recently purchased car', 'Post-winter refresh'],
  },
  interior: {
    photo: `${base}gallery/audi.jpg`,
    photoPosition: 'object-[center_35%]',
    photoCar: 'Audi A Series - Interior Detail',
    badge: 'Most Transformative',
    headline: 'Your interior, completely refreshed.',
    description: `The inside of your car gets used every day - and it shows in ways a quick wipe-down can't fix. We vacuum every surface thoroughly, then steam clean the dashboard, vents, door cards, cup holders and pedals using professional equipment that sanitises as it cleans. Leather is treated and conditioned; fabric is deep-cleaned and extracted. Seat belts are fully extended and cleaned, the headlining is carefully refreshed, and all interior glass is polished streak-free. Every plastic and trim surface is dressed and UV-protected. We finish with an ozone treatment that eliminates odours at the source - not just masks them.`,
    perfectFor: ['Families & pets', 'Smoke odour removal', 'Post-winter interior', 'Pre-sale preparation'],
  },
  complete: {
    photo: `${base}gallery/range-rover.jpg`,
    photoPosition: 'object-[center_40%]',
    photoCar: 'Range Rover - Complete Detail',
    badge: 'Best Value',
    headline: 'Every inch. Inside and out.',
    description: `The Complete Detail is for those who want the best result possible - every surface, inside and out, treated in a single visit. We work through the full exterior process: snow foam prewash, two-bucket hand wash, blow dry, chemical decontamination, wheel and arch cleaning, glass polishing and a protective paint finish. Then we move inside: full vacuum, professional steam clean, leather or fabric treatment, seat belts, headlining, interior glass and all trim dressed and protected. We close with an ozone treatment to leave the cabin smelling completely fresh. The result is a car that looks, feels and smells like it just left the showroom.`,
    perfectFor: ['Pre-sale preparation', 'Spring full refresh', 'Special occasions', 'Best overall result'],
  },
}

export default function ServicesPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-screen bg-bg-base text-text-primary overflow-x-hidden">
      <Cursor />
      <Header />

      <main>
        {/* Hero header */}
        <PageHero />

        {/* Service sections */}
        {SERVICE_VARIANTS.map((variant, i) => (
          <ServiceSection key={variant.id} variant={variant} index={i} />
        ))}

        {/* What to expect */}
        <WhatToExpectCards />

        {/* Bottom CTA */}
        <BottomCTA />
      </main>

      <Footer />
      <FloatingButtons />
    </div>
  )
}

function PageHero() {
  return (
    <section className="relative pt-36 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background photo */}
      <div className="absolute inset-0">
        <img
          src={`${base}gallery/hero-services.jpg`}
          alt=""
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-bg-base/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-base/40 via-transparent to-bg-base" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-body text-sm text-text-muted hover:text-accent transition-colors duration-200 mb-12 group"
          >
            <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-body text-sm font-semibold uppercase tracking-widest text-accent mb-5"
            >
              What We Offer
            </motion.p>
            <h1 className="font-heading font-black uppercase tracking-heading text-6xl sm:text-7xl lg:text-8xl leading-none">
              <div className="overflow-hidden">
                {'Our'.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: '110%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block text-text-primary"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
              <div className="overflow-hidden">
                {'Services'.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: '110%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.45 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block text-accent"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:max-w-xs"
          >
            <p className="font-body text-text-muted leading-relaxed">
              Three packages, one goal — leaving your car in the best condition possible. Every service performed at your location, fully equipped.
            </p>
            <div className="flex items-center gap-6 mt-6">
              {SERVICE_VARIANTS.map((v, i) => (
                <a
                  key={v.id}
                  href={`#service-${v.id}`}
                  onClick={(e) => { e.preventDefault(); document.getElementById(`service-${v.id}`)?.scrollIntoView({ behavior: 'smooth' }) }}
                  className="font-body text-xs font-semibold uppercase tracking-widest text-text-muted hover:text-accent transition-colors duration-200"
                >
                  {String(i + 1).padStart(2, '0')} {v.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ServiceSection({ variant, index }: { variant: typeof SERVICE_VARIANTS[0]; index: number }) {
  const navigate = useNavigate()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])

  const isReversed = index % 2 !== 0
  const meta = SERVICE_META[variant.id]
  const priceFrom = Math.min(...VEHICLE_SIZES.map(s => s.prices[variant.id]))
  const durationFrom = Math.min(...VEHICLE_SIZES.map(s => s.durationHours[variant.id]))
  const durationTo = Math.max(...VEHICLE_SIZES.map(s => s.durationHours[variant.id]))
  const num = String(index + 1).padStart(2, '0')

  return (
    <section
      id={`service-${variant.id}`}
      ref={ref}
      className={`relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden ${index % 2 !== 0 ? 'bg-bg-panel' : 'bg-bg-base'}`}
    >
      {/* Subtle divider top */}
      <div className="absolute top-0 inset-x-0 h-px bg-border" />

      {/* Giant watermark number */}
      <div
        className="absolute inset-y-0 flex items-center pointer-events-none select-none overflow-hidden"
        style={{ [isReversed ? 'right' : 'left']: '-1rem' }}
      >
        <span className="font-heading font-black text-[18rem] leading-none text-text-primary opacity-[0.02]">
          {num}
        </span>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Section label row */}
        <motion.div
          initial={{ opacity: 0, x: isReversed ? 20 : -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4 mb-12"
        >
          <span className="font-heading font-black text-6xl text-accent/20 leading-none">{num}</span>
          <div className="h-px flex-1 bg-border" />
          <span className="font-body text-xs uppercase tracking-widest text-accent font-semibold px-3 py-1 rounded-full border border-accent/30">
            {meta.badge}
          </span>
        </motion.div>

        {/* Main content grid */}
        <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-16 items-start`}>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[48%] flex-shrink-0"
          >
            <div className="relative rounded-2xl overflow-hidden border border-border group"
              style={{ aspectRatio: '3/4' }}
            >
              {/* Parallax photo */}
              <motion.img
                src={meta.photo}
                alt={meta.photoCar}
                style={{ y: imgY }}
                className={`absolute inset-0 w-full h-[115%] -top-[7.5%] object-cover ${meta.photoPosition}`}
              />

              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-base/80 via-bg-base/10 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Top badge */}
              <div className="absolute top-5 left-5">
                <span className="font-heading font-black text-xs uppercase tracking-widest px-4 py-2 rounded-full bg-accent text-white">
                  {variant.label}
                </span>
              </div>

              {/* Accent ring on hover */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-accent/0 group-hover:ring-accent/30 transition-all duration-500 pointer-events-none" />

              {/* Bottom photo info */}
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <p className="font-body text-xs text-white/40">{meta.photoCar}</p>
                <div className="flex items-center gap-1.5 bg-bg-base/60 backdrop-blur-sm border border-border rounded-full px-3 py-1.5">
                  <Clock size={11} className="text-accent" />
                  <span className="font-body text-xs text-text-muted">{durationFrom}–{durationTo + 1}h</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[52%]"
          >
            {/* Headline */}
            <h2 className="font-heading font-black uppercase tracking-heading text-4xl sm:text-5xl text-text-primary leading-none mb-3">
              {variant.label}
            </h2>
            <p className="font-body text-accent font-semibold text-base mb-6 italic">
              "{meta.headline}"
            </p>

            {/* Description paragraph */}
            <p className="font-body text-text-muted leading-relaxed text-sm mb-10 border-l-2 border-accent/30 pl-5">
              {meta.description}
            </p>

            {/* Included list */}
            <div className="mb-8">
              <p className="font-body text-xs font-semibold uppercase tracking-widest text-text-muted mb-4">
                What's included
              </p>
              <ul className="grid grid-cols-1 gap-2.5">
                {variant.included.map((item, i) => {
                  const [title, desc] = item.split(' — ')
                  return (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-start gap-3 group/item"
                    >
                      <div className="w-5 h-5 rounded-full border border-accent/30 group-hover/item:border-accent group-hover/item:bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200">
                        <Check size={10} className="text-accent" strokeWidth={2.5} />
                      </div>
                      <span className="font-body text-xs text-text-muted leading-relaxed">
                        <span className="text-text-secondary font-semibold">{title}</span>
                        {desc && <span className="text-text-muted"> — {desc}</span>}
                      </span>
                    </motion.li>
                  )
                })}
              </ul>
            </div>

            {/* Perfect for */}
            <div className="mb-8">
              <p className="font-body text-xs font-semibold uppercase tracking-widest text-text-muted mb-3 flex items-center gap-2">
                <Sparkles size={12} className="text-accent" />
                Perfect for
              </p>
              <div className="flex flex-wrap gap-2">
                {meta.perfectFor.map(tag => (
                  <span key={tag} className="font-body text-xs px-3 py-1.5 rounded-full border border-border text-text-muted hover:border-accent/50 hover:text-text-secondary transition-colors duration-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Price + CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-6 border-t border-border">
              <div>
                <p className="font-body text-xs text-text-muted mb-0.5">Starting from</p>
                <p className="font-heading font-black text-4xl text-text-primary">€{priceFrom}</p>
                <p className="font-body text-xs text-text-muted mt-0.5 flex items-center gap-1">
                  <Car size={11} />
                  Prices vary by vehicle size
                </p>
              </div>
              <div className="sm:ml-auto flex flex-col sm:flex-row gap-3">
                <a
                  href="/"
                  onClick={(e) => { e.preventDefault(); navigate('/', { state: { scrollTo: 'calculator' } }) }}
                  className="btn-neon flex items-center gap-2 px-6 py-3 rounded-lg bg-accent hover:bg-accent-dark text-white font-body font-semibold text-sm whitespace-nowrap"
                >
                  Get a Price
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function BottomCTA() {
  const navigate = useNavigate()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 bg-bg-base relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-border" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(15,138,84,0.06) 0%, transparent 70%)' }}
      />
      <div className="absolute inset-0 bg-dots opacity-20 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        <p className="font-body text-sm font-semibold uppercase tracking-widest text-accent mb-5">
          Ready to book?
        </p>
        <h2 className="font-heading font-black uppercase tracking-heading text-4xl sm:text-5xl text-text-primary mb-6 leading-none">
          We Come<br />To You
        </h2>
        <p className="font-body text-text-muted max-w-md mx-auto mb-10 leading-relaxed">
          Fully equipped with our own water and power. No need to leave home — get your instant price estimate in under a minute.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); navigate('/', { state: { scrollTo: 'calculator' } }) }}
            className="btn-neon w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-accent hover:bg-accent-dark text-white font-body font-semibold text-base"
          >
            Get My Instant Estimate
            <ArrowRight size={16} />
          </a>
          <Link
            to="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-border hover:border-accent text-text-muted hover:text-text-primary font-body font-semibold text-base transition-colors duration-200"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </section>
  )
}

const EXPECT_ITEMS = [
  {
    icon: MessageCircle,
    num: '01',
    title: 'Get in Touch',
    description: 'Call, WhatsApp or email us. Tell us your car, location and preferred date — we confirm your slot within hours and answer any questions.',
  },
  {
    icon: Truck,
    num: '02',
    title: 'We Come to You',
    description: 'Our fully equipped van arrives at your home or workplace — own water, own power, professional products. Nothing to prepare on your end.',
  },
  {
    icon: Home,
    num: '03',
    title: 'Prep the Space',
    description: 'Just make sure we have access to your vehicle and a bit of room around it. A driveway, car park or open area is perfect.',
  },
  {
    icon: Clock,
    num: '04',
    title: 'We Get to Work',
    description: 'We work through every step at the right pace — no rushing, no corners cut. Plan for 3 to 8 hours depending on the service chosen.',
  },
  {
    icon: Eye,
    num: '05',
    title: 'Walk-Through',
    description: 'Once we\'re done, we show you every result up close so you can see exactly what\'s been done. No surprises — just a spotless car.',
  },
  {
    icon: CreditCard,
    num: '06',
    title: 'Pay on Completion',
    description: 'Payment is taken only once you\'re completely happy with the finish. Cash, card or bank transfer — whichever suits you best.',
  },
]

function WhatToExpectCards() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-bg-panel overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-border" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-border" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-64 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(15,138,84,0.06) 0%, transparent 70%)' }}
      />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <p className="font-body text-sm font-semibold uppercase tracking-widest text-accent mb-3">
            From Booking to Shine
          </p>
          <h2 className="font-heading font-black uppercase tracking-heading text-4xl sm:text-5xl text-text-primary mb-4">
            What to Expect
          </h2>
          <p className="font-body text-text-muted max-w-sm mx-auto text-sm leading-relaxed">
            First time booking a mobile detail? Here's exactly how it works.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {EXPECT_ITEMS.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col p-6 rounded-2xl border border-border bg-bg-base hover:border-accent/50 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Step number — faint top-right */}
                <span
                  className="absolute top-4 right-5 font-heading font-black leading-none select-none"
                  style={{
                    fontSize: '3rem',
                    color: 'transparent',
                    WebkitTextStroke: '1px rgba(15,138,84,0.15)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {item.num}
                </span>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-5 group-hover:bg-accent/15 group-hover:border-accent/40 transition-all duration-300">
                  <Icon size={22} className="text-accent" strokeWidth={1.5} />
                </div>

                {/* Text */}
                <h3 className="font-heading font-black uppercase tracking-heading text-lg text-text-primary mb-2 group-hover:text-white transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-text-muted leading-relaxed">
                  {item.description}
                </p>

                {/* Hover inner glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'radial-gradient(circle at 30% 0%, rgba(15,138,84,0.07) 0%, transparent 65%)' }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
