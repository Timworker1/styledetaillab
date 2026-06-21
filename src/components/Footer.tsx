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
              <SocialLink href={SITE_CONFIG.social.instagram} label="Instagram">
                <InstagramIcon />
              </SocialLink>
              <SocialLink href={`https://wa.me/${SITE_CONFIG.whatsapp}`} label="WhatsApp">
                <MessageCircle size={15} />
              </SocialLink>
              <SocialLink href={SITE_CONFIG.social.tiktok} label="TikTok">
                <TikTokIcon />
              </SocialLink>
              <SocialLink href={SITE_CONFIG.social.facebook} label="Facebook">
                <FacebookIcon />
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
                <a href={`https://wa.me/${SITE_CONFIG.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 font-body text-sm text-text-muted hover:text-text-primary transition-colors">
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
              Prices excl. VAT · confirmed after inspection
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-text-muted">
            © {year} {SITE_CONFIG.businessName}. All rights reserved.
          </p>
          <a href={`${base}privacy.html`} className="font-body text-xs text-text-muted hover:text-accent transition-colors">
            Privacy Policy
          </a>
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

function InstagramIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.16 8.16 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z" />
    </svg>
  )
}
