'use client'
import { useEffect, useState } from 'react'
import { X, Star, Users, Clock, MapPin, CheckCircle } from 'lucide-react'

type ItineraryDay = { day: string; title: string; desc: string }

type Trip = {
  id: string
  title: string
  emoji: string
  status: string
  duration: string
  type: string
  badge: string
  departure: string
  price: string
  priceNum: number
  rating: number
  reviews: number
  image: string
  groupSize: string
  highlights: string
  included: string
  itinerary: string
  active: boolean
}

function parse<T>(val: string, fallback: T): T {
  try { return JSON.parse(val) } catch { return fallback }
}

export default function TripsGrid({ filter }: { filter?: string }) {
  const [trips, setTrips] = useState<Trip[]>([])
  const [selected, setSelected] = useState<Trip | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/trips')
      .then(r => r.json())
      .then(data => { setTrips(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const visible = trips.filter(t => {
    if (!t.active) return false
    if (filter && filter !== 'ALL') return t.status === filter
    return true
  })

  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-gray-100 rounded-2xl h-80 animate-pulse" />
        ))}
      </div>
    )
  }

  if (visible.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-4xl mb-3">🗺️</p>
        <p>No trips available right now. Check back soon!</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map(trip => (
          <div
            key={trip.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all cursor-pointer group"
            onClick={() => setSelected(trip)}
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden bg-gray-100">
              {trip.image ? (
                <img
                  src={trip.image}
                  alt={trip.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl bg-beige">
                  {trip.emoji}
                </div>
              )}
              {trip.badge && (
                <span className="absolute top-3 left-3 bg-gold text-navy-dark text-xs font-bold px-3 py-1 rounded-full">
                  {trip.badge}
                </span>
              )}
              <span className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full ${
                trip.status === 'LIVE' ? 'bg-green-500 text-white' :
                trip.status === 'UPCOMING' ? 'bg-blue-500 text-white' : 'bg-gray-400 text-white'
              }`}>
                {trip.status}
              </span>
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="flex items-start gap-2 mb-2">
                <span className="text-xl">{trip.emoji}</span>
                <h3 className="font-bold text-navy text-base leading-tight">{trip.title}</h3>
              </div>

              <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-3">
                {trip.duration && <span className="flex items-center gap-1"><Clock size={11} /> {trip.duration}</span>}
                {trip.departure && <span className="flex items-center gap-1"><MapPin size={11} /> {trip.departure}</span>}
                {trip.groupSize && <span className="flex items-center gap-1"><Users size={11} /> {trip.groupSize}</span>}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gold font-bold text-lg">{trip.price}</p>
                  <p className="text-xs text-gray-400">per person</p>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star size={13} className="text-gold fill-gold" />
                  <span className="font-semibold text-gray-700">{trip.rating}</span>
                  {trip.reviews > 0 && <span className="text-gray-400">({trip.reviews})</span>}
                </div>
              </div>

              <button className="mt-3 w-full bg-navy text-white py-2 rounded-xl text-sm font-semibold hover:bg-navy-light transition">
                View Itinerary
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal header image */}
            {selected.image && (
              <div className="relative h-52 overflow-hidden rounded-t-2xl">
                <img src={selected.image} alt={selected.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                <div className="absolute bottom-4 left-5 text-white">
                  <p className="text-2xl font-bold">{selected.emoji} {selected.title}</p>
                  <div className="flex gap-3 text-sm text-white/80 mt-1 flex-wrap">
                    {selected.duration && <span>⏱ {selected.duration}</span>}
                    {selected.departure && <span>📍 {selected.departure}</span>}
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white transition z-10"
            >
              <X size={18} />
            </button>

            <div className="p-6 space-y-6">
              {/* Price + rating */}
              <div className="flex items-center justify-between bg-beige rounded-xl p-4">
                <div>
                  <p className="text-2xl font-bold text-gold">{selected.price}</p>
                  <p className="text-xs text-gray-500">per person</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <Star size={15} className="text-gold fill-gold" />
                    <span className="font-bold text-navy">{selected.rating}</span>
                    {selected.reviews > 0 && <span className="text-gray-400 text-sm">({selected.reviews} reviews)</span>}
                  </div>
                  {selected.groupSize && <p className="text-xs text-gray-500 mt-1">👥 {selected.groupSize}</p>}
                </div>
              </div>

              {/* Highlights */}
              {(() => {
                const hl = parse<string[]>(selected.highlights, [])
                return hl.length > 0 ? (
                  <div>
                    <h4 className="font-bold text-navy mb-3">✨ Highlights</h4>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {hl.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-gold mt-0.5">•</span> {h}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null
              })()}

              {/* Included */}
              {(() => {
                const inc = parse<string[]>(selected.included, [])
                return inc.length > 0 ? (
                  <div>
                    <h4 className="font-bold text-navy mb-3">✅ What's Included</h4>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {inc.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle size={14} className="text-green-500 shrink-0" /> {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null
              })()}

              {/* Itinerary */}
              {(() => {
                const itin = parse<ItineraryDay[]>(selected.itinerary, [])
                return itin.length > 0 ? (
                  <div>
                    <h4 className="font-bold text-navy mb-3">🗓 Day-by-Day Itinerary</h4>
                    <div className="space-y-3">
                      {itin.map((day, i) => (
                        <div key={i} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center shrink-0">
                              {i + 1}
                            </div>
                            {i < itin.length - 1 && <div className="w-0.5 bg-beige-dark flex-1 mt-1" />}
                          </div>
                          <div className="pb-4">
                            <p className="text-xs font-semibold text-gold uppercase tracking-wide">{day.day}</p>
                            <p className="font-semibold text-navy text-sm">{day.title}</p>
                            {day.desc && <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{day.desc}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null
              })()}

              {/* Book CTA */}
              <div className="border-t border-gray-100 pt-4 flex gap-3">
                <a
                  href={`https://wa.me/918928947322?text=Hi! I'm interested in the ${encodeURIComponent(selected.title)} (${selected.duration}). Please share details.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-xl font-bold transition"
                >
                  💬 Book on WhatsApp
                </a>
                <a
                  href="tel:+918928947322"
                  className="flex-1 bg-navy hover:bg-navy-light text-white text-center py-3 rounded-xl font-bold transition"
                >
                  📞 Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
