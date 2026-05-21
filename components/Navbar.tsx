'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Packages', href: '/packages' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-beige-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <div className="w-9 h-9 rounded-full bg-navy flex items-center justify-center">
              <span className="text-gold font-bold text-sm" style={{ fontFamily: 'var(--font-heading)' }}>VT</span>
            </div>
            <div className="hidden sm:block">
              <p className="font-bold text-navy text-base leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>Vinayak Travels</p>
              <p className="text-xs text-gray-400 -mt-0.5">Maharashtra's Most Trusted</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  pathname === l.href
                    ? 'bg-beige text-navy font-semibold'
                    : 'text-gray-600 hover:text-navy hover:bg-beige'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-2">
            <a href="tel:+918928947322" className="flex items-center gap-1.5 text-sm font-medium text-navy border border-navy px-3 py-2 rounded-lg hover:bg-navy hover:text-white transition">
              <Phone size={14} /> Call
            </a>
            <a
              href="https://wa.me/918928947322"
              target="_blank" rel="noopener noreferrer"
              className="text-sm font-bold px-4 py-2 rounded-lg transition"
              style={{ background: '#C9A84C', color: '#0f1a2e' }}
            >
              Book Now
            </a>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-2 text-navy" onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-beige-dark px-4 py-3 space-y-1 shadow-lg">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                pathname === l.href ? 'bg-beige text-navy font-semibold' : 'text-gray-600 hover:bg-beige hover:text-navy'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <a href="tel:+918928947322" className="flex items-center justify-center gap-2 border border-navy text-navy py-2.5 rounded-lg text-sm font-semibold">
              <Phone size={13} /> Call
            </a>
            <a href="https://wa.me/918928947322" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center text-sm font-bold py-2.5 rounded-lg"
              style={{ background: '#C9A84C', color: '#0f1a2e' }}
            >
              💬 Book Now
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
