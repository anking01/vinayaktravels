'use client'
export const dynamic = 'force-dynamic'

import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react'
import { useState } from 'react'

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    value: '+91 8928947322',
    sub: 'Available 24/7 for bookings and support',
    href: 'tel:+918928947322',
  },
  {
    icon: MessageSquare,
    title: 'WhatsApp',
    value: '+91 8928947322',
    sub: 'Quick booking via WhatsApp',
    href: 'https://wa.me/918928947322',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'vinayaktravels971@gmail.com',
    sub: 'For detailed inquiries and quotations',
    href: 'mailto:vinayaktravels971@gmail.com',
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'Maharashtra, India',
    sub: 'Serving Maharashtra and neighboring states',
    href: undefined,
  },
  {
    icon: Clock,
    title: 'Business Hours',
    value: '24/7 Available',
    sub: 'Office: 9:00 AM – 9:00 PM',
    href: undefined,
  },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Save to DB
    try {
      await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    } catch {
      // Non-blocking — still open WhatsApp
    }
    const msg = encodeURIComponent(
      `Hello Vinayak Travels!\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nService: ${form.service}\n\nMessage: ${form.message}`
    )
    window.open(`https://wa.me/918928947322?text=${msg}`, '_blank')
    setSent(true)
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-20 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-white/80">Get in touch for bookings, quotes & support</p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {contactInfo.map((c) => {
              const Icon = c.icon
              const inner = (
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full">
                  <div className="w-12 h-12 bg-navy rounded-xl flex items-center justify-center mb-4">
                    <Icon size={20} className="text-beige-dark" />
                  </div>
                  <div className="font-semibold text-gray-500 text-sm mb-1">{c.title}</div>
                  <div className="font-bold text-navy text-lg break-all">{c.value}</div>
                  <div className="text-sm text-gray-500 mt-1">{c.sub}</div>
                </div>
              )
              return c.href ? (
                <a key={c.title} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                  {inner}
                </a>
              ) : (
                <div key={c.title}>{inner}</div>
              )
            })}
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+918928947322"
              className="flex items-center gap-2 bg-navy text-white font-bold px-6 py-3 rounded-full hover:bg-navy-light transition-colors"
            >
              <Phone size={16} /> Call Now
            </a>
            <a
              href="https://wa.me/918928947322"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-green-600 text-white font-bold px-6 py-3 rounded-full hover:bg-green-700 transition-colors"
            >
              💬 WhatsApp Us
            </a>
            <a
              href="mailto:vinayaktravels971@gmail.com"
              className="flex items-center gap-2 bg-beige-dark text-navy font-bold px-6 py-3 rounded-full hover:bg-navy-dark transition-colors"
            >
              <Mail size={16} /> Send Email
            </a>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-navy mb-2">Send us an Enquiry</h2>
            <p className="text-gray-600">Fill in the form and we&apos;ll reach you within 30 minutes</p>
          </div>

          {sent ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-green-700 mb-2">Enquiry Sent!</h3>
              <p className="text-green-600">Your enquiry was sent via WhatsApp. We will get back to you shortly!</p>
              <button
                onClick={() => setSent(false)}
                className="mt-6 bg-navy text-white font-bold px-6 py-2 rounded-full hover:bg-navy-light transition-colors"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                  <input
                    required
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full name"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-navy text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    required
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-navy text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-navy text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Required *</label>
                <select
                  required
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-navy text-sm bg-white"
                >
                  <option value="">Select a service</option>
                  <option>Tour Package</option>
                  <option>Corporate Transportation</option>
                  <option>Vehicle Rental</option>
                  <option>Outstation Trip</option>
                  <option>Airport Transfer</option>
                  <option>Pilgrimage Tour</option>
                  <option>Custom/Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Message / Requirements *</label>
                <textarea
                  required
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us your destination, travel dates, group size, and any special requirements..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-navy text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-navy text-white font-bold py-3 rounded-xl hover:bg-navy-light transition-colors text-base"
              >
                💬 Send via WhatsApp
              </button>
              <p className="text-center text-xs text-gray-400">
                Submitting will open WhatsApp with your message pre-filled. We respond within 30 minutes.
              </p>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
