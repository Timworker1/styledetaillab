import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { GripVertical, ChevronLeft, ChevronRight } from 'lucide-react'

const base = import.meta.env.BASE_URL

interface Pair { before: string; after: string; label: string }
const PAIRS: Pair[] = [
  { before: `${base}before-after/01-before.jpg`, after: `${base}before-after/01-after.jpg`, label: 'Interior Detail' },
  { before: `${base}before-after/02-before.jpg`, after: `${base}before-after/02-after.jpg`, label: 'Exterior Detail' },
]

interface VideoPair { id: string; before: string; after: string; label: string }
const VIDEO_PAIRS: VideoPair[] = [
  { id: 'seats', before: `${base}gallery/seats-before.mp4`, after: `${base}gallery/seats-after.mp4`, label: 'Seats Deep Clean' },
  { id: 'boot',  before: `${base}gallery/boot-before.mp4`,  after: `${base}gallery/boot-after.mp4`,  label: 'Boot / Trunk' },
  { id: 'sill',  before: `${base}gallery/sill-before.mp4`,  after: `${base}gallery/sill-after.mp4`,  label: 'Door Sills' },
  { id: 'cargo', before: `${base}gallery/cargo-before.mp4`, after: `${base}gallery/cargo-after.mp4`, label: 'Cargo Area' },
]

function BeforeAfterSlider() {
  const [[pairIndex, direction], setPair] = useState([0, 0])
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const navigate = (dir: number) => {
    setPair(([i]) => [(i + dir + PAIRS.length) % PAIRS.length, dir])
  }

  const variants = {
    enter: (dir: number) => ({ rotateY: dir > 0 ? 90 : -90, scale: 0.3, opacity: 0, z: -600 }),
    center: { rotateY: 0, scale: 1, opacity: 1, z: 0 },
    exit: (dir: number) => ({ rotateY: dir > 0 ? -90 : 90, scale: 0.3, opacity: 0, z: -600 }),
  }

  const springTransition = { type: 'spring' as const, stiffness: 220, damping: 26, mass: 0.9 }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative max-w-3xl mx-auto"
    >
      {/* Left arrow */}
      <button
        onClick={() => navigate(-1)}
        className="absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 sm:-translate-x-[calc(100%+16px)] z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border bg-bg-base/90 sm:bg-bg-base hover:border-accent hover:bg-accent/10 flex items-center justify-center text-text-muted hover:text-accent transition-all duration-200"
        aria-label="Previous"
      >
        <ChevronLeft size={22} />
      </button>

      {/* 3D carousel window */}
      <div className="rounded-2xl border border-border overflow-hidden" style={{ perspective: '1400px' }}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={pairIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={springTransition}
            style={{ backfaceVisibility: 'hidden', position: 'relative' }}
          >
            <SliderPair pair={PAIRS[pairIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right arrow */}
      <button
        onClick={() => navigate(1)}
        className="absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 sm:translate-x-[calc(100%+16px)] z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border bg-bg-base/90 sm:bg-bg-base hover:border-accent hover:bg-accent/10 flex items-center justify-center text-text-muted hover:text-accent transition-all duration-200"
        aria-label="Next"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-5">
        {PAIRS.map((_, i) => (
          <button
            key={i}
            onClick={() => setPair([i, i > pairIndex ? 1 : -1])}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === pairIndex ? 'bg-accent w-5' : 'bg-border w-1.5 hover:bg-text-muted'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </motion.div>
  )
}

function SliderPair({ pair }: { pair: Pair }) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const [imagesLoaded, setImagesLoaded] = useState({ before: false, after: false })

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setPosition((Math.max(0, Math.min(clientX - rect.left, rect.width)) / rect.width) * 100)
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => { if (dragging.current) updatePosition(e.clientX) }
    const onUp = () => { dragging.current = false }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
  }, [updatePosition])

  const allLoaded = imagesLoaded.before && imagesLoaded.after

  return (
    <div
      ref={containerRef}
      className="relative select-none overflow-hidden aspect-[4/3] bg-bg-base cursor-col-resize"
      onMouseDown={(e) => { dragging.current = true; updatePosition(e.clientX) }}
      onTouchMove={(e) => updatePosition(e.touches[0].clientX)}
      onTouchStart={(e) => updatePosition(e.touches[0].clientX)}
    >
      {!allLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-2 border-border border-t-accent animate-spin" />
        </div>
      )}
      <img src={pair.after} alt="After" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${allLoaded ? 'opacity-100' : 'opacity-0'}`} draggable={false} onLoad={() => setImagesLoaded((s) => ({ ...s, after: true }))} />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <img src={pair.before} alt="Before" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${allLoaded ? 'opacity-100' : 'opacity-0'}`} style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%', maxWidth: 'none' }} draggable={false} onLoad={() => setImagesLoaded((s) => ({ ...s, before: true }))} />
      </div>
      {allLoaded && (
        <>
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-bg-base/80 backdrop-blur-sm border border-border">
            <span className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">Before</span>
          </div>
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/40">
            <span className="font-body text-xs font-semibold text-accent uppercase tracking-wider">After</span>
          </div>
        </>
      )}
      <div className="absolute top-0 bottom-0 flex items-center justify-center" style={{ left: `${position}%`, transform: 'translateX(-50%)' }}>
        <div className="absolute top-0 bottom-0 w-px bg-white/60" />
        <div className="relative z-10 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center">
          <GripVertical size={16} className="text-bg-base" />
        </div>
      </div>
    </div>
  )
}

/** Portrait clip that only plays while on screen (saves data / battery). */
function VideoTile({ src, kind }: { src: string; kind: 'BEFORE' | 'AFTER' }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    const io = new IntersectionObserver(
      ([entry]) => { entry.isIntersecting ? v.play().catch(() => {}) : v.pause() },
      { threshold: 0.5 }
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-bg-base" style={{ aspectRatio: '9/16' }}>
      <video
        ref={ref}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(10,10,11,0.55) 0%, transparent 38%)' }} />
      <span className={`absolute top-2 left-2 font-heading font-black text-[10px] tracking-widest px-2 py-0.5 rounded-full ${
        kind === 'AFTER' ? 'bg-accent text-white' : 'bg-bg-base/80 border border-border text-text-muted'
      }`}>
        {kind}
      </span>
      {kind === 'AFTER' && <div className="absolute inset-0 rounded-xl ring-1 ring-accent/25 pointer-events-none" />}
    </div>
  )
}

function VideoPairCard({ pair, index, inView }: { pair: VideoPair; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.1 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border bg-bg-base/40 p-2.5"
    >
      <p className="font-body text-xs font-semibold uppercase tracking-widest text-text-secondary text-center mb-2.5">
        {pair.label}
      </p>
      <div className="grid grid-cols-2 gap-2">
        <VideoTile src={pair.before} kind="BEFORE" />
        <VideoTile src={pair.after} kind="AFTER" />
      </div>
    </motion.div>
  )
}

/** Featured paint-correction clip — before/after started in sync. */
function BlueSpotlight({ inView }: { inView: boolean }) {
  const beforeRef = useRef<HTMLVideoElement>(null)
  const afterRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const before = beforeRef.current
    const after = afterRef.current
    if (!before || !after) return

    // Restart BOTH from 0 together — keeps them in sync every cycle.
    const restart = () => {
      before.currentTime = 0
      after.currentTime = 0
      before.play().catch(() => {})
      after.play().catch(() => {})
    }
    // 'before' is the longer clip → it drives the loop. 'after' finishes
    // early and holds its last frame (the result) until both restart.
    before.addEventListener('ended', restart)

    const io = new IntersectionObserver(
      ([entry]) => { entry.isIntersecting ? restart() : (before.pause(), after.pause()) },
      { threshold: 0.3 }
    )
    io.observe(before)

    // Mobile autoplay fallback: kick off on the first interaction.
    const kick = () => { restart(); window.removeEventListener('touchstart', kick); window.removeEventListener('click', kick) }
    window.addEventListener('touchstart', kick, { passive: true })
    window.addEventListener('click', kick)

    return () => {
      before.removeEventListener('ended', restart)
      io.disconnect()
      window.removeEventListener('touchstart', kick)
      window.removeEventListener('click', kick)
    }
  }, [])

  const Tile = ({ vref, kind }: { vref: React.RefObject<HTMLVideoElement>; kind: 'BEFORE' | 'AFTER' }) => (
    <div className="relative overflow-hidden rounded-xl border border-border bg-bg-base" style={{ aspectRatio: '9/16' }}>
      <video
        ref={vref}
        src={`${base}gallery/${kind === 'BEFORE' ? 'blue-before' : 'blue-after'}.mp4`}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(10,10,11,0.55) 0%, transparent 38%)' }} />
      <span className={`absolute top-2 left-2 font-heading font-black text-[10px] tracking-widest px-2 py-0.5 rounded-full ${
        kind === 'AFTER' ? 'bg-accent text-white' : 'bg-bg-base/80 border border-border text-text-muted'
      }`}>
        {kind}
      </span>
      {kind === 'AFTER' && <div className="absolute inset-0 rounded-xl ring-1 ring-accent/25 pointer-events-none" />}
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-xl mx-auto mb-5 rounded-2xl border border-accent/25 bg-bg-base/40 p-3 sm:p-4"
    >
      <p className="font-body text-xs font-semibold uppercase tracking-widest text-accent text-center mb-3">
        Paint Correction — Before / After
      </p>
      <div className="grid grid-cols-2 gap-3">
        <Tile vref={beforeRef} kind="BEFORE" />
        <Tile vref={afterRef} kind="AFTER" />
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="gallery" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-bg-panel overflow-hidden">
      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-56 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(31,163,122,0.06) 0%, transparent 70%)' }}
      />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10"
        >
          <div>
            <p className="font-body text-sm font-semibold uppercase tracking-widest text-accent mb-3">
              Real Results
            </p>
            <h2 className="font-heading font-black uppercase tracking-heading text-4xl sm:text-5xl text-text-primary">
              Our Work
            </h2>
          </div>
          <p className="font-body text-text-muted max-w-xs text-sm leading-relaxed sm:text-right">
            Every car treated like our own.<br className="hidden sm:block" /> These are real clients, real results.
          </p>
        </motion.div>

        {/* Before / After slider (drag to compare) */}
        <div id="before-after" />
        <BeforeAfterSlider />

        {/* Divider */}
        <div className="flex items-center gap-4 my-10">
          <div className="flex-1 h-px bg-border" />
          <span className="font-body text-xs uppercase tracking-widest text-text-muted">Before / After — on video</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Paint correction spotlight (blue car, synced before/after) */}
        <BlueSpotlight inView={inView} />

        {/* Video before/after pairs */}
        <div className="grid sm:grid-cols-2 gap-4">
          {VIDEO_PAIRS.map((pair, i) => (
            <VideoPairCard key={pair.id} pair={pair} index={i} inView={inView} />
          ))}
        </div>

        {/* Featured photo — Land Cruiser */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 grid sm:grid-cols-5 gap-0 rounded-2xl border border-border bg-bg-base/40 overflow-hidden"
        >
          <div className="sm:col-span-2 relative min-h-[300px] sm:min-h-full">
            <img
              src={`${base}gallery/landcruiser.jpg`}
              alt="Toyota Land Cruiser after complete detail"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 sm:bg-gradient-to-r sm:from-transparent sm:to-bg-base/30" />
          </div>
          <div className="sm:col-span-3 p-6 sm:p-8 flex flex-col justify-center">
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-accent mb-3">
              Latest Work
            </p>
            <h3 className="font-heading font-black uppercase tracking-heading text-2xl sm:text-3xl text-text-primary mb-3">
              Toyota Land Cruiser
            </h3>
            <p className="font-body text-sm text-text-muted leading-relaxed mb-5 max-w-md">
              Full exterior decontamination, paint protection and a deep interior clean —
              finished to a showroom standard, inside and out.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Complete Detail', 'Paint Protection', 'Interior Deep Clean'].map((t) => (
                <span key={t} className="font-body text-xs px-3 py-1.5 rounded-full border border-border text-text-muted">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
