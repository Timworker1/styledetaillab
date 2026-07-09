import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Star, Shield, Droplets } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'

const base = import.meta.env.BASE_URL

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    videoRef.current?.play().catch(() => {})
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Subtle parallax + fade of the content as you scroll away
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Background video ────────────────────────────────────────────── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 scale-105">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={`${base}gallery/hero-audi-poster.jpg`}
          src={`${base}gallery/hero-audi.mp4`}
        />

        {/* Dark gradient — legibility for logo/headline + blend into section */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-base/75 via-bg-base/35 to-bg-base" />
        {/* Extra top scrim so the bright sky doesn't wash out the logo/slogan */}
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-bg-base/70 to-transparent" />

        {/* Emerald studio glow */}
        <div
          className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #00572F 0%, transparent 70%)' }}
        />
      </motion.div>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-24 lg:pt-32"
      >
        {/* Brand logo */}
        <motion.img
          src={`${base}gallery/logotip.png`}
          alt="StyleDetailLab — Vehicle Protection"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          style={{ filter: 'drop-shadow(0 2px 14px rgba(0,0,0,0.65))' }}
          className="h-28 sm:h-36 w-auto object-contain mx-auto mb-6"
        />

        {/* Eyebrow */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.1}
          className="font-body text-sm font-semibold uppercase tracking-widest text-accent-light mb-5"
        >
          Dublin's Premium Mobile Detailing
        </motion.p>

        {/* Headline — per-line clip-path reveal */}
        <h1 className="font-heading font-black uppercase tracking-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-text-primary leading-none mb-6">
          {[
            { text: 'We Bring The', delay: 0.2,  cls: 'chrome-text' },
            { text: 'Showroom',     delay: 0.38, cls: 'text-accent-gradient' },
            { text: 'To You.',      delay: 0.56, cls: 'chrome-text' },
          ].map(({ text, delay, cls }) => (
            <div key={text} className="overflow-hidden">
              <motion.div
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
                className={cls || undefined}
              >
                {text}
              </motion.div>
            </div>
          ))}
        </h1>

        {/* Sub-heading */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.4}
          className="font-body text-lg sm:text-xl text-text-muted max-w-xl mx-auto mb-10"
        >
          We come to you — fully equipped with our own water & power.
          Professional detailing without leaving home.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.55}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href="#calculator"
            onClick={(e) => { e.preventDefault(); document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="btn-neon w-full sm:w-auto px-8 py-4 rounded-lg bg-accent hover:bg-accent-dark text-white font-body font-semibold text-base duration-200"
          >
            Get My Instant Estimate
          </a>
          <a
            href="#before-after"
            onClick={(e) => { e.preventDefault(); document.getElementById('before-after')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="w-full sm:w-auto px-8 py-4 rounded-lg border border-border hover:border-text-muted text-text-primary font-body font-semibold text-base transition-colors duration-200 bg-bg-base/20 backdrop-blur-sm"
          >
            See Our Work
          </a>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.7}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
        >
          <TrustBadge icon={<StarRow />} label={`Google ${SITE_CONFIG.googleRating} ★`} />
          <Divider />
          <TrustBadge icon={<Shield size={15} className="text-accent" />} label="Fully Insured" />
          <Divider />
          <TrustBadge icon={<Droplets size={15} className="text-accent" />} label="Own Water & Power" />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-border z-10" />
    </section>
  )
}

function TrustBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className="font-body text-sm font-medium text-text-secondary">{label}</span>
    </div>
  )
}

function Divider() {
  return <span className="hidden sm:block w-px h-4 bg-border" />
}

function StarRow() {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={13} className="text-accent fill-accent" />
      ))}
    </div>
  )
}
