import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STEPS = [
  {
    num: '01',
    title: 'Get in Touch',
    description: 'Call, WhatsApp or email us. Tell us your car, location and preferred date — we confirm your slot within hours and answer any questions.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h24v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6z"/>
        <path d="M4 6l12 11L28 6"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'We Arrive Ready',
    description: 'Our fully equipped van pulls up to your address — own water, own power, professional products. Nothing to prepare on your end.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="11" width="28" height="14" rx="2"/>
        <path d="M2 15h28"/>
        <circle cx="8" cy="25" r="2.5"/>
        <circle cx="24" cy="25" r="2.5"/>
        <path d="M20 11V7a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v4"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'We Detail Your Car',
    description: 'We work through every step at the right pace — no rushing, no corners cut. Depending on the service, plan for 3 to 8 hours.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="16" cy="17" r="11"/>
        <path d="M16 10v7l4 4"/>
        <path d="M13 3h6M16 3v3"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Drive Away Happy',
    description: 'We walk you through every result. Payment only once you are satisfied — cash, transfer or card. Showroom finish, right at your door.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 3l2.5 8h8.5l-7 5 2.5 8-7-5-7 5 2.5-8-7-5h8.5z"/>
      </svg>
    ),
  },
]

export default function WhatToExpect() {
  const headRef = useRef<HTMLDivElement>(null)
  const inView = useInView(headRef, { once: true, margin: '-60px' })

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-bg-panel overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-border" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-border" />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <p className="font-body text-sm font-semibold uppercase tracking-widest text-accent mb-3">
            From Booking to Shine
          </p>
          <h2 className="font-heading font-black uppercase tracking-heading text-4xl sm:text-5xl text-text-primary">
            Your Experience
          </h2>
          <p className="mt-4 font-body text-text-muted max-w-sm mx-auto text-sm leading-relaxed">
            Here is exactly what to expect — from your first message to driving away.
          </p>
        </motion.div>

        {/* Zigzag steps */}
        <div className="space-y-2">
          {STEPS.map((step, i) => (
            <ZigzagStep key={step.num} step={step} flip={i % 2 === 1} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 text-center"
        >
          <a
            href="#calculator"
            onClick={(e) => { e.preventDefault(); document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="btn-neon inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-accent hover:bg-accent-dark text-white font-body font-semibold text-sm hover:-translate-y-0.5"
          >
            Get My Instant Estimate
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M9 4l4 4-4 4"/>
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  )
}

function ZigzagStep({ step, flip }: { step: typeof STEPS[0]; flip: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const numVariants = {
    hidden: { opacity: 0, x: flip ? 60 : -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  }
  const contentVariants = {
    hidden: { opacity: 0, x: flip ? -40 : 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={`relative flex items-center gap-0 lg:gap-8 py-8 border-b border-border/50 last:border-0 group rounded-xl px-4 -mx-4 hover:bg-accent/[0.03] transition-colors duration-500 flex-row ${flip ? 'lg:flex-row-reverse' : ''}`}
    >
      {/* Giant number */}
      <motion.div
        variants={numVariants}
        className={`hidden lg:flex flex-shrink-0 w-48 ${flip ? 'justify-start' : 'justify-end'}`}
      >
        <span className="font-heading font-black leading-none select-none"
          style={{
            fontSize: 'clamp(80px, 10vw, 130px)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(15,138,84,0.2)',
            letterSpacing: '-0.02em',
            transition: 'all 0.3s ease',
          }}
        >
          {step.num}
        </span>
      </motion.div>

      {/* Content */}
      <motion.div
        variants={contentVariants}
        className={`flex-1 flex items-center gap-6 flex-row ${flip ? 'lg:flex-row-reverse' : ''}`}
      >
        {/* Icon block */}
        <div className="flex-shrink-0">
          {/* Mobile number */}
          <div className="lg:hidden font-body text-xs font-bold uppercase tracking-widest text-accent mb-2">
            Step {step.num}
          </div>
          <div className="w-14 h-14 rounded-2xl bg-bg-base border border-border group-hover:border-accent/40 group-hover:bg-accent/8 flex items-center justify-center text-text-muted group-hover:text-accent transition-all duration-300">
            {step.icon}
          </div>
        </div>

        {/* Text */}
        <div className={`text-left ${flip ? 'lg:text-right' : ''}`}>
          <h3 className="font-heading font-black uppercase tracking-heading text-xl sm:text-2xl text-text-primary group-hover:text-white transition-colors duration-200 mb-2">
            {step.title}
          </h3>
          <p className="font-body text-sm text-text-muted leading-relaxed max-w-xs">
            {step.description}
          </p>
        </div>
      </motion.div>

      {/* Accent dot on the divider line */}
      <div className="hidden lg:block absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent/30 group-hover:bg-accent/70 transition-colors duration-300 z-10" />
    </motion.div>
  )
}
