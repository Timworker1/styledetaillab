import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Phone, Menu, X, MessageCircle, ChevronRight } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'

const base = import.meta.env.BASE_URL
const waNumber = SITE_CONFIG.whatsapp.replace(/\D/g, '')

const NAV_LINKS: { label: string; id: string; to?: string }[] = [
  { label: 'Services', id: 'services', to: '/services' },
  { label: 'Calculator', id: 'calculator' },
  { label: 'Before & After', id: 'before-after' },
  { label: 'Reviews', id: 'reviews' },
  { label: 'Contact', id: 'contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  const scrollTo = (id: string) => {
    if (!document.getElementById(id)) {
      navigate('/', { state: { scrollTo: id } })
      return
    }
    // Defer the scroll to the next tick. Running window.scrollTo synchronously
    // inside the click handler (while the mobile menu closes and React
    // re-renders) causes mobile browsers to cancel the smooth scroll, so the
    // page doesn't move. Deferring lets the click/layout settle first.
    setTimeout(() => {
      const el = document.getElementById(id)
      if (!el) return
      const headerOffset = window.innerWidth >= 1024 ? 88 : 72
      const top = el.getBoundingClientRect().top + window.scrollY - headerOffset - 8
      window.scrollTo({ top, behavior: 'smooth' })
    }, 60)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-bg-base/95 lg:backdrop-blur-md border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <a href="/" onClick={(e) => { e.preventDefault(); if (document.getElementById('services')) window.scrollTo({ top: 0, behavior: 'smooth' }); else navigate('/') }} className="flex-shrink-0">
              <img
                src={`${base}gallery/logotip.png`}
                alt="StyleDetailLab — Vehicle Protection"
                className="h-12 lg:h-14 w-auto object-contain"
              />
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.to ?? `#${link.id}`}
                  onClick={(e) => { e.preventDefault(); link.to ? navigate(link.to) : scrollTo(link.id) }}
                  className="font-body text-sm font-medium text-text-muted hover:text-text-primary transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop right */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="flex items-center gap-2 font-body text-sm font-medium text-text-muted hover:text-text-primary transition-colors"
              >
                <Phone size={15} />
                {SITE_CONFIG.phoneDisplay}
              </a>
              <a
                href="#calculator"
                onClick={(e) => { e.preventDefault(); scrollTo('calculator') }}
                className="btn-neon px-5 py-2.5 rounded-lg bg-accent hover:bg-accent-dark text-white font-body font-semibold text-sm"
              >
                Get a Quote
              </a>
            </div>

            {/* Mobile burger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden p-2 text-text-muted hover:text-text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-bg-panel border-t border-border overflow-hidden"
            >
              <nav className="flex flex-col px-4 py-5">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.id}
                    href={link.to ?? `#${link.id}`}
                    onClick={(e) => { e.preventDefault(); closeMenu(); link.to ? navigate(link.to) : scrollTo(link.id) }}
                    className="group flex items-center justify-between font-body font-medium text-text-secondary hover:text-text-primary py-3.5 border-b border-border/60 transition-colors"
                  >
                    {link.label}
                    <ChevronRight size={16} className="text-text-muted/60 group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
                  </a>
                ))}

                <a
                  href="#calculator"
                  onClick={(e) => { e.preventDefault(); closeMenu(); scrollTo('calculator') }}
                  className="btn-neon mt-5 px-5 py-3.5 rounded-lg bg-accent hover:bg-accent-dark text-white font-body font-semibold text-sm text-center transition-colors"
                >
                  Get a Quote
                </a>

                <div className="grid grid-cols-2 gap-3 mt-3">
                  <a
                    href={`tel:${SITE_CONFIG.phone}`}
                    className="flex items-center justify-center gap-2 py-3 rounded-lg border border-border hover:border-accent text-text-primary font-body font-semibold text-sm transition-colors"
                  >
                    <Phone size={15} />
                    Call
                  </a>
                  <a
                    href={`https://wa.me/${waNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 rounded-lg border border-border hover:border-accent text-text-primary font-body font-semibold text-sm transition-colors"
                  >
                    <MessageCircle size={15} />
                    WhatsApp
                  </a>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-bg-panel border-t border-border px-4 py-3 flex gap-3">
        <a
          href={`tel:${SITE_CONFIG.phone}`}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border border-border text-text-primary font-body font-semibold text-sm transition-colors hover:border-accent"
        >
          <Phone size={16} />
          Call
        </a>
        <a
          href={`https://wa.me/${SITE_CONFIG.whatsapp.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-accent hover:bg-accent-dark text-white font-body font-semibold text-sm transition-colors"
        >
          <MessageCircle size={16} />
          WhatsApp
        </a>
      </div>
    </>
  )
}

