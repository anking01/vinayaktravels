'use client'
import { useState } from 'react'
import TripsGrid from '@/components/TripsGrid'

const filters = ['ALL', 'LIVE', 'UPCOMING']

export default function PackagesPage() {
  const [filter, setFilter] = useState('ALL')

  return (
    <>
      {/* Banner */}
      <section className="relative overflow-hidden" style={{ minHeight: '300px' }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?auto=format&fit=crop&w=1400&q=85)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-navy/75" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-white">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-3">
            Our Tour <span className="text-gold">Packages</span>
          </h1>
          <p className="text-white/80 text-lg">
            Click any package to see full itinerary and book instantly via WhatsApp.
          </p>
        </div>
      </section>

      {/* Packages grid */}
      <section className="py-14 bg-beige-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tabs */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                  filter === f
                    ? 'bg-navy text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-navy hover:text-navy'
                }`}
              >
                {f === 'ALL' ? 'All Packages' : f === 'LIVE' ? '🟢 Live Now' : '🔵 Upcoming'}
              </button>
            ))}
          </div>

          <TripsGrid filter={filter} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-navy text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="font-heading text-2xl font-bold text-white mb-3">Need a Custom Package?</h2>
          <p className="text-white/70 mb-5">Tell us your dates and destination — we'll plan it for you.</p>
          <a
            href="https://wa.me/918928947322?text=Hi! I need a custom tour package."
            target="_blank" rel="noopener noreferrer"
            className="inline-block bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-3.5 rounded-full transition"
          >
            💬 WhatsApp for Custom Trip
          </a>
        </div>
      </section>
    </>
  )
}
