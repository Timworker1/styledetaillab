import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star } from 'lucide-react'

const REVIEWS = [
  {
    name: 'Liam D.',
    location: 'Drumcondra, D9',
    rating: 5,
    ago: 'Recent',
    color: '#1FA37A',
    text: "Booked the Complete detail on my A6 — genuinely looked showroom fresh after. Turned up on time with everything, no fuss at all. Delighted.",
  },
  {
    name: 'Emma B.',
    location: 'Clontarf, D3',
    rating: 5,
    ago: 'Recent',
    color: '#3B82F6',
    text: "Two kids and a dog, the interior was a state. They got it completely spotless and smelling brand new. Couldn't believe the difference.",
  },
  {
    name: 'Cathal M.',
    location: 'Terenure, D6W',
    rating: 5,
    ago: 'Recent',
    color: '#8B5CF6',
    text: "Proper attention to detail — you can tell they actually care about the car. The paint came up absolutely incredible.",
  },
  {
    name: 'Orla K.',
    location: 'Malahide',
    rating: 4,
    ago: 'Recent',
    color: '#F59E0B',
    text: "Great job on the exterior, wheels and glass. Ran a little over the estimated time, but honestly the finish was well worth it.",
  },
  {
    name: 'Seán O.',
    location: 'Ballsbridge, D4',
    rating: 5,
    ago: 'Recent',
    color: '#EC4899',
    text: "Paint correction on my black car — swirl marks completely gone, deep glossy finish. Exactly what I was after. Top work.",
  },
  {
    name: 'Aisling N.',
    location: 'Rathgar, D6',
    rating: 5,
    ago: 'Recent',
    color: '#06B6D4',
    text: "So handy having them come to the house. Fully set up with their own water and power — I didn't have to lift a finger.",
  },
  {
    name: 'Darragh F.',
    location: 'Blackrock',
    rating: 5,
    ago: 'Recent',
    color: '#F97316',
    text: "Had the ceramic done before winter. Rain just beads straight off now and it still looks freshly cleaned weeks later.",
  },
  {
    name: 'Róisín T.',
    location: 'Swords',
    rating: 4,
    ago: 'Recent',
    color: '#A855F7',
    text: "Booked it as a gift — really professional and friendly. Car looked unreal afterwards. Will definitely be using them again.",
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={12}
            className={i <= rating ? 'text-[#FBBC05] fill-[#FBBC05]' : 'text-border fill-border'}
          />
        ))}
      </div>
      <span className="font-body text-xs text-text-muted ml-0.5">{rating}.0</span>
    </div>
  )
}

function ReviewCard({ review }: { review: typeof REVIEWS[0] }) {
  const initials = review.name.split(' ').map(w => w[0]).join('')

  return (
    <div className="flex-shrink-0 w-72 mx-2.5 p-5 rounded-2xl border border-border bg-bg-panel hover:border-accent/30 transition-colors duration-300 group select-none">

      {/* Top row: avatar + name + Google icon */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar circle */}
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-white font-heading font-black text-sm"
            style={{ background: review.color }}
          >
            {initials}
          </div>
          <div>
            <p className="font-body text-sm font-semibold text-text-primary leading-none">{review.name}</p>
            <p className="font-body text-[11px] text-text-muted mt-0.5">{review.location}</p>
          </div>
        </div>
      </div>

      {/* Stars */}
      <div className="mb-3">
        <StarRating rating={review.rating} />
      </div>

      {/* Review text */}
      <p className="font-body text-sm text-text-secondary leading-relaxed line-clamp-3 mb-3">
        "{review.text}"
      </p>

      {/* Time ago */}
      <p className="font-body text-[11px] text-text-muted/60">{review.ago}</p>
    </div>
  )
}

// 6 cards per row (not all 8) for less density
const ROW1 = [...REVIEWS.slice(0, 6), ...REVIEWS.slice(0, 6)]
const ROW2 = [...REVIEWS.slice(2),    ...REVIEWS.slice(2)]

export default function Reviews() {
  const headRef = useRef<HTMLDivElement>(null)
  const inView  = useInView(headRef, { once: true, margin: '-60px' })

  return (
    <section id="reviews" className="relative py-24 bg-bg-base overflow-hidden">
      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-44 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(31,163,122,0.055) 0%, transparent 70%)' }}
      />

      {/* Edge fade masks */}
      <div className="absolute inset-y-0 left-0  w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #0A0A0B 40%, transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left,  #0A0A0B 40%, transparent)' }} />

      <div className="relative z-10">

        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 px-4"
        >
          <p className="font-body text-sm font-semibold uppercase tracking-widest text-accent mb-3">
            Customer Feedback
          </p>
          <h2 className="font-heading font-black uppercase tracking-heading text-4xl sm:text-5xl text-text-primary mb-5">
            What Clients Say
          </h2>

          {/* Rating badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-border bg-bg-panel">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className="text-[#FBBC05] fill-[#FBBC05]" />
              ))}
            </div>
            <span className="w-px h-3 bg-border" />
            <span className="font-body text-xs text-text-muted">
              Loved by Dublin drivers
            </span>
          </div>
        </motion.div>

        {/* Row 1 — → */}
        <div className="mb-3 overflow-hidden">
          <div
            className="flex"
            style={{ animation: 'marquee-left 48s linear infinite', width: 'max-content' }}
            onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
            onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
          >
            {ROW1.map((r, i) => <ReviewCard key={i} review={r} />)}
          </div>
        </div>

        {/* Row 2 — ← */}
        <div className="overflow-hidden">
          <div
            className="flex"
            style={{ animation: 'marquee-right 56s linear infinite', width: 'max-content' }}
            onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
            onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
          >
            {ROW2.map((r, i) => <ReviewCard key={i} review={r} />)}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-10 px-4"
        >
          <a
            href="#calculator"
            onClick={(e) => { e.preventDefault(); document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-accent hover:bg-accent-dark text-white font-body text-sm font-semibold transition-colors duration-200"
          >
            Book Your Detail
          </a>
        </motion.div>
      </div>

      <style>{`
        @keyframes marquee-left  { 0% { transform: translateX(0); }    100% { transform: translateX(-50%); } }
        @keyframes marquee-right { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); }    }
        @media (prefers-reduced-motion: reduce) {
          [style*="marquee"] { animation: none !important; }
        }
      `}</style>
    </section>
  )
}
