import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { MessageCircle, CheckCircle, Phone, X } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'

const base = import.meta.env.BASE_URL
const waNumber = SITE_CONFIG.whatsapp.replace(/\D/g, '')

interface FormState {
  name: string
  phone: string
  eircode: string
  vehicle: string
  date: string
  message: string
  gdpr: boolean
}

const EMPTY: FormState = {
  name: '', phone: '', eircode: '', vehicle: '', date: '', message: '', gdpr: false,
}

export default function ContactForm() {
  const headRef = useRef<HTMLDivElement>(null)
  const inView = useInView(headRef, { once: true, margin: '-60px' })
  const [form, setForm] = useState<FormState>(EMPTY)
  const [submitted, setSubmitted] = useState(false)
  // Package chosen in the calculator (carried over so the client barely types).
  const [selection, setSelection] = useState('')

  useEffect(() => {
    const read = () => setSelection(sessionStorage.getItem('sdl-quote') || '')
    read()
    window.addEventListener('sdl-quote', read)
    return () => window.removeEventListener('sdl-quote', read)
  }, [])

  const set = (field: keyof FormState, value: string | boolean) =>
    setForm((f) => ({ ...f, [field]: value }))

  const summaryLines = () => [
    selection && `Selected: ${selection}`,
    `Name: ${form.name}`,
    `Phone / Email: ${form.phone}`,
    form.eircode && `Eircode: ${form.eircode}`,
    form.vehicle && `Vehicle: ${form.vehicle}`,
    form.date && `Preferred date: ${form.date}`,
    form.message && `Message: ${form.message}`,
  ].filter(Boolean) as string[]

  // Ready-to-send WhatsApp message from the form + calculator selection.
  const buildWhatsAppUrl = () => {
    const text = ['New booking enquiry — Style Detail Lab', ...summaryLines()].join('\n')
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.gdpr) return
    // 1) Open WhatsApp with everything pre-filled (hot leads chat instantly).
    window.open(buildWhatsAppUrl(), '_blank', 'noopener,noreferrer')
    // 2) Also email the lead so nothing is lost, if a Web3Forms key is set.
    if (SITE_CONFIG.web3formsKey) {
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: SITE_CONFIG.web3formsKey,
          subject: 'New booking enquiry — Style Detail Lab',
          from_name: form.name || 'Website enquiry',
          selection, ...form,
        }),
      }).catch(() => {})
    }
    setSubmitted(true)
  }

  const clearSelection = () => { sessionStorage.removeItem('sdl-quote'); setSelection('') }

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-bg-base overflow-hidden">
      {/* Studio light */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-72 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(31,163,122,0.08) 0%, transparent 80%)' }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <p className="font-body text-sm font-semibold uppercase tracking-widest text-accent mb-3">
            Get in Touch
          </p>
          <h2 className="font-heading font-black uppercase tracking-heading text-4xl sm:text-5xl text-text-primary mb-4">
            Book Your Detail
          </h2>
          <p className="font-body text-text-muted max-w-md mx-auto">
            Fill in your details and send them straight to us on WhatsApp —
            we'll confirm your booking fast. Prefer to call? Use the button below.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="bg-bg-panel border border-border rounded-2xl p-6 sm:p-8"
        >
          {submitted ? (
            <div className="flex flex-col items-center text-center py-12 gap-5">
              <CheckCircle size={48} className="text-accent" />
              <div>
                <p className="font-heading font-black uppercase tracking-heading text-2xl text-text-primary mb-2">
                  Opening WhatsApp…
                </p>
                <p className="font-body text-text-muted">
                  Your details are ready in WhatsApp — just hit send and we'll confirm your booking. If it didn't open, use the WhatsApp or Call buttons below.
                </p>
              </div>
              <button
                onClick={() => { setForm(EMPTY); setSubmitted(false) }}
                className="mt-2 font-body text-sm text-accent hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Package carried over from the calculator */}
              {selection && (
                <div className="flex items-start justify-between gap-3 p-4 rounded-xl border border-accent/40 bg-accent/10">
                  <div>
                    <p className="font-body text-xs font-semibold uppercase tracking-widest text-accent mb-1">Your selection</p>
                    <p className="font-body text-sm text-text-primary leading-snug">{selection}</p>
                  </div>
                  <button type="button" onClick={clearSelection} aria-label="Clear selection" className="flex-shrink-0 text-text-muted hover:text-text-primary transition-colors">
                    <X size={16} />
                  </button>
                </div>
              )}
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Your Name *" required>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    placeholder="John Smith"
                    required
                    className={inputCls}
                  />
                </Field>
                <Field label="Phone or Email *" required>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => set('phone', e.target.value)}
                    placeholder="+353 87 … or email@…"
                    required
                    className={inputCls}
                  />
                </Field>
                <Field label="Eircode">
                  <input
                    type="text"
                    value={form.eircode}
                    onChange={(e) => set('eircode', e.target.value.toUpperCase())}
                    placeholder="D04 XY12"
                    maxLength={8}
                    className={inputCls}
                  />
                </Field>
                <Field label="Your Vehicle">
                  <input
                    type="text"
                    value={form.vehicle}
                    onChange={(e) => set('vehicle', e.target.value)}
                    placeholder="e.g. BMW X5 2021"
                    className={inputCls}
                  />
                </Field>
              </div>
              <Field label="Preferred Date">
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => set('date', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className={inputCls}
                />
              </Field>
              <Field label="Message / Package of Interest">
                <textarea
                  value={form.message}
                  onChange={(e) => set('message', e.target.value)}
                  placeholder="e.g. Complete Detail on a Medium SUV, interested in Ceramic Sealant…"
                  rows={4}
                  className={`${inputCls} resize-none`}
                />
              </Field>

              {/* GDPR */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <div
                  className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded border transition-colors flex items-center justify-center ${
                    form.gdpr ? 'bg-accent border-accent' : 'border-border group-hover:border-text-muted'
                  }`}
                  onClick={() => set('gdpr', !form.gdpr)}
                >
                  {form.gdpr && (
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                      <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <input type="checkbox" className="sr-only" checked={form.gdpr} onChange={() => set('gdpr', !form.gdpr)} required />
                <span className="font-body text-xs text-text-muted leading-relaxed">
                  I agree to my data being stored and used to respond to this enquiry.
                  See our <a href={`${base}privacy.html`} className="text-accent hover:underline">Privacy Policy</a>.
                </span>
              </label>

              {/* Submit row */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  disabled={!form.gdpr}
                  className="btn-neon flex-1 flex items-center justify-center gap-2 py-3.5 rounded-lg bg-accent hover:bg-accent-dark disabled:opacity-40 disabled:cursor-not-allowed text-white font-body font-semibold text-sm"
                >
                  <MessageCircle size={15} />
                  Send via WhatsApp
                </button>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-lg border border-border hover:border-accent text-text-primary font-body font-semibold text-sm transition-colors"
                >
                  <Phone size={15} />
                  Call Us
                </a>
              </div>
            </form>
          )}
        </motion.div>

        {/* Price disclaimer */}
        <p className="mt-6 text-center font-body text-xs text-text-muted">
          Final price confirmed after inspection. Heavily soiled or oversized vehicles may incur an additional charge.
        </p>
      </div>
    </section>
  )
}

const inputCls =
  'w-full px-4 py-3 rounded-lg border border-border bg-bg-base text-text-primary font-body text-sm placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors duration-200'

function Field({ label, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-body text-xs font-medium text-text-muted uppercase tracking-wider">
        {label}
      </label>
      {children}
    </div>
  )
}
