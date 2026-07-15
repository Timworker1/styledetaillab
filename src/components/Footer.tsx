import { Phone, Mail, MessageCircle } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'

const base = import.meta.env.BASE_URL

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-bg-panel border-t border-border">
      {/* Top hairline accent */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <img
                src={`${base}gallery/logotip.png`}
                alt="Emerald Mobile Detailing"
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="font-body text-sm text-text-muted leading-relaxed max-w-xs mb-5">
              Premium mobile car detailing in Dublin. We bring the studio to your door — fully insured, own water & power.
            </p>
            <div className="flex items-center gap-3">
              <SocialLink href={`https://wa.me/${SITE_CONFIG.whatsapp.replace(/\D/g, '')}`} label="WhatsApp">
                <MessageCircle size={15} />
              </SocialLink>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-accent mb-4">Contact</p>
            <ul className="space-y-3">
              <li>
                <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-2.5 font-body text-sm text-text-muted hover:text-text-primary transition-colors">
                  <Phone size={13} className="text-accent flex-shrink-0" />
                  {SITE_CONFIG.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-2.5 font-body text-sm text-text-muted hover:text-text-primary transition-colors">
                  <Mail size={13} className="text-accent flex-shrink-0" />
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${SITE_CONFIG.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 font-body text-sm text-text-muted hover:text-text-primary transition-colors">
                  <MessageCircle size={13} className="text-accent flex-shrink-0" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Hours + legal */}
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-accent mb-4">Hours</p>
            <p className="font-body text-sm text-text-muted mb-6 leading-relaxed">
              {SITE_CONFIG.hours}
            </p>
            <p className="font-body text-xs text-text-muted leading-relaxed">
              Final price confirmed after inspection
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-text-muted">
            © {year} {SITE_CONFIG.businessName}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href={`${base}privacy.html`} className="font-body text-xs text-text-muted hover:text-accent transition-colors">
              Privacy Policy
            </a>
            <a href={`${base}terms.html`} className="font-body text-xs text-text-muted hover:text-accent transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent transition-colors duration-200"
    >
      {children}
    </a>
  )
}

