import { Link } from 'react-router-dom'
import { Home, Phone } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-base text-text-primary flex flex-col items-center justify-center px-6 text-center overflow-hidden relative">
      {/* Studio light cone */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(31,163,122,0.12) 0%, transparent 80%)' }}
      />

      <div className="relative z-10 flex flex-col items-center">
        <span
          className="font-heading font-black leading-none"
          style={{
            fontSize: 'clamp(5rem, 22vw, 11rem)',
            background: 'linear-gradient(160deg, #FFFFFF 30%, #1FA37A 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          404
        </span>

        <h1 className="mt-2 font-heading font-black uppercase tracking-heading text-2xl sm:text-3xl">
          Page Not Found
        </h1>
        <p className="mt-3 max-w-md font-body text-sm sm:text-base text-text-muted">
          This page took a wrong turn. Let's get you back on the road.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-accent/90"
          >
            <Home size={16} />
            Back to homepage
          </Link>
          <a
            href={`tel:${SITE_CONFIG.phone}`}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 font-body text-sm font-semibold text-text-secondary transition-colors hover:border-accent hover:text-text-primary"
          >
            <Phone size={16} />
            {SITE_CONFIG.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  )
}
