'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'

type Settings = Record<string, string>

const DEFAULTS: Settings = {
  contact_phone: '+91 89289 47322',
  contact_whatsapp: '918928947322',
  contact_email: 'vinayaktravels971@gmail.com',
  contact_address: 'Maharashtra, India',
  social_facebook: '',
  social_instagram: '',
  social_youtube: '',
}

export default function Footer() {
  const [s, setS] = useState<Settings>(DEFAULTS)

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then((data: Settings) => setS({ ...DEFAULTS, ...data }))
      .catch(() => {})
  }, [])

  const facebook = s.social_facebook && s.social_facebook !== '#' ? s.social_facebook : null
  const instagram = s.social_instagram && s.social_instagram !== '#' ? s.social_instagram : null
  const youtube = s.social_youtube && s.social_youtube !== '#' ? s.social_youtube : null

  return (
    <footer className="bg-navy-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center border-2 border-beige/30">
                <span className="text-beige font-bold text-base" style={{fontFamily:'var(--font-heading)'}}>VT</span>
              </div>
              <div>
                <p className="font-bold text-beige text-xl" style={{fontFamily:'var(--font-heading)'}}>Vinayak Travels</p>
                <p className="text-white/50 text-xs">Maharashtra&apos;s Most Trusted</p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              10+ years of trusted travel services across Maharashtra. Specializing in corporate transportation and tour packages since 2013. Safetrax registered fleet.
            </p>
            <div className="space-y-2">
              <a href={`tel:${s.contact_phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-sm text-white/70 hover:text-beige transition">
                <Phone size={14} className="text-beige/60" /> {s.contact_phone}
              </a>
              <a href={`mailto:${s.contact_email}`} className="flex items-center gap-2 text-sm text-white/70 hover:text-beige transition">
                <Mail size={14} className="text-beige/60" /> {s.contact_email}
              </a>
              <p className="flex items-center gap-2 text-sm text-white/70">
                <MapPin size={14} className="text-beige/60" /> {s.contact_address}
              </p>
            </div>
            <div className="flex gap-3 mt-5">
              {facebook && (
                <a href={facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/10 hover:bg-navy flex items-center justify-center transition text-sm">📘</a>
              )}
              {instagram && (
                <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/10 hover:bg-navy flex items-center justify-center transition text-sm">📷</a>
              )}
              {youtube && (
                <a href={youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-9 h-9 rounded-full bg-white/10 hover:bg-navy flex items-center justify-center transition text-sm">▶️</a>
              )}
              <a href={`https://wa.me/${s.contact_whatsapp}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center transition">
                <span className="text-sm">💬</span>
              </a>
            </div>
          </div>

          {/* Tour Packages */}
          <div>
            <h4 className="text-beige font-bold text-sm uppercase tracking-widest mb-4">Tour Packages</h4>
            <ul className="space-y-2">
              {['Jyotirlings Tour', 'Shirdi Day Trip', 'Goa Beach Holiday', 'Mahabaleshwar Trip', 'Ashtavinayak Tour', 'Pandharpur Yatra', 'Ellora – Ajanta', 'Custom Tour'].map(item => (
                <li key={item}>
                  <Link href="/packages" className="text-white/60 hover:text-beige text-sm transition">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-beige font-bold text-sm uppercase tracking-widest mb-4">Services</h4>
            <ul className="space-y-2">
              {['Corporate Transport', 'Employee Commute', 'Executive Car Hire', 'Airport Transfer', 'Outstation Cabs', 'Wedding Transport', 'School / College Tours', 'Group Travel'].map(item => (
                <li key={item}>
                  <Link href="/services" className="text-white/60 hover:text-beige text-sm transition">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-beige font-bold text-sm uppercase tracking-widest mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about' },
                { label: 'All Packages', href: '/packages' },
                { label: 'Contact Us', href: '/contact' },
              ].map(item => (
                <li key={item.label}>
                  <Link href={item.href} className="text-white/60 hover:text-beige text-sm transition">{item.label}</Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-beige font-bold text-sm mb-1">24/7 Bookings</p>
              <a href={`https://wa.me/${s.contact_whatsapp}`} target="_blank" rel="noopener noreferrer" className="block bg-green-500 text-white text-center py-2.5 rounded-lg text-sm font-bold hover:bg-green-600 transition mt-2">
                💬 WhatsApp Now
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© 2025 Vinayak Travels. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/contact" className="hover:text-beige transition">Terms &amp; Conditions</Link>
            <Link href="/contact" className="hover:text-beige transition">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-beige transition">Cancellation Policy</Link>
          </div>
          <p>Made with ❤️ in Maharashtra</p>
        </div>
      </div>
    </footer>
  )
}
