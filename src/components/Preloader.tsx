import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const base = import.meta.env.BASE_URL
const CIRCUMFERENCE = 2 * Math.PI * 88

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setExiting(true), 2200)
    const t2 = setTimeout(onDone, 2800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onDone])

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="preloader"
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#080D0A] overflow-hidden"
        >
          {/* Dot grid */}
          <div className="absolute inset-0 bg-dots opacity-30 pointer-events-none" />

          {/* Centre glow */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            aria-hidden
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="w-[480px] h-[480px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(15,138,84,0.18) 0%, transparent 68%)' }}
            />
          </div>

          {/* Ring + logo */}
          <div className="relative flex items-center justify-center mb-10">
            {/* Track ring */}
            <svg
              className="absolute w-[220px] h-[220px] -rotate-90"
              viewBox="0 0 200 200"
              aria-hidden
            >
              <circle
                cx="100" cy="100" r="88"
                fill="none"
                stroke="rgba(15,138,84,0.12)"
                strokeWidth="1"
              />
              {/* Animated arc */}
              <motion.circle
                cx="100" cy="100" r="88"
                fill="none"
                stroke="#0F8A54"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                initial={{ strokeDashoffset: CIRCUMFERENCE }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
              />
              {/* Glowing dot at tip */}
              <motion.circle
                cx="100" cy="12"
                r="3"
                fill="#1FA37A"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2, times: [0, 0.05, 0.9, 1] }}
                style={{ filter: 'drop-shadow(0 0 4px #1FA37A)' }}
              />
            </svg>

            {/* Logo */}
            <motion.img
              src={`${base}gallery/logotip.png`}
              alt="Emerald Mobile Detailing"
              className="w-32 h-32 object-contain relative z-10"
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          {/* Progress bar */}
          <div className="w-40 h-px bg-white/10 rounded-full overflow-hidden mb-4">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #0F8A54, #1FA37A)' }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.9, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-body text-[11px] uppercase tracking-[0.25em] text-white/30"
          >
            Mobile Detailing · Dublin
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
