import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { Star, Users, Clock, MapPin, CheckCircle } from 'lucide-react'

function parse<T>(val: string, fallback: T): T {
  try { return JSON.parse(val) } catch { return fallback }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const trip = await prisma.trip.findFirst({ where: { slug: params.slug } })
  if (!trip) return {}
  return {
    title: trip.title + ' | Vinayak Travels',
    description: 'Book ' + trip.title + ' with Vinayak Travels. ' + trip.duration + ' package from ' + trip.price + ' per person.',
  }
}

export default async function TripPage({ params }: { params: { slug: string } }) {
  const trip = await prisma.trip.findFirst({ where: { slug: params.slug } })
  if (!trip) notFound()

  const highlights = parse(trip.highlights, [])
  const included = parse(trip.included, [])
  const itinerary = parse<{day: string; title: string; desc: string}[]>(trip.itinerary, [])

  return (
    <main className="min-h-screen bg-beige-light">
      <section className="relative h-72 overflow-hidden">
        {trip.image ? <img src={trip.image} alt={trip.title} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-navy flex items-center justify-center text-8xl">{trip.emoji}</div>}
        <div className="absolute inset-0 bg-navy/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <p className="text-5xl mb-3">{trip.emoji}</p>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold mb-2">{trip.title}</h1>
          <div className="flex gap-4 text-sm text-white/80 flex-wrap justify-center">
            {trip.duration && <span className="flex items-center gap-1"><Clock size={13} /> {trip.duration}</span>}
            {trip.departure && <span className="flex items-center gap-1"><MapPin size={13} /> {trip.departure}</span>}
            {trip.groupSize && <span className="flex items-center gap-1"><Users size={13} /> {trip.groupSize}</span>}
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        <div className="bg-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div>
            <p className="text-3xl font-bold text-gold">{trip.price}</p>
            <p className="text-sm text-gray-500">per person</p>
            <div className="flex items-center gap-1 mt-1">
              <Star size={14} className="text-gold fill-gold" />
              <span className="font-semibold text-navy">{trip.rating}</span>
              {trip.reviews > 0 && <span className="text-gray-400 text-sm">({trip.reviews} reviews)</span>}
            </div>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <a href="https://wa.me/918928947322" target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-xl text-center transition">💬 Book on WhatsApp</a>
            <a href="tel:+918928947322" className="flex-1 sm:flex-none bg-navy hover:bg-navy-light text-white font-bold px-6 py-3 rounded-xl text-center transition">📞 Call Us</a>
          </div>
        </div>

        {highlights.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-heading text-xl font-bold text-navy mb-4">Highlights</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {highlights.map((h, i) => <div key={i} className="flex items-start gap-2 text-gray-700"><span className="text-gold mt-1">*</span> {h}</div>)}
            </div>
          </div>
        )}

        {included.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-heading text-xl font-bold text-navy mb-4">Included</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {included.map((item, i) => <div key={i} className="flex items-center gap-2 text-gray-700"><CheckCircle size={16} className="text-green-500 shrink-0" /> {item}</div>)}
            </div>
          </div>
        )}

        {itinerary.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-heading text-xl font-bold text-navy mb-4">Itinerary</h2>
            <div className="space-y-4">
              {itinerary.map((day, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-9 h-9 rounded-full bg-navy text-white text-sm font-bold flex items-center justify-center shrink-0">{i + 1}</div>
                  <div className="pb-4">
                    <p className="text-xs font-semibold text-gold uppercase">{day.day}</p>
                    <p className="font-semibold text-navy">{day.title}</p>
                    {day.desc && <p className="text-gray-500 text-sm mt-1">{day.desc}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-navy rounded-2xl p-6 text-center text-white">
          <h3 className="font-heading text-xl font-bold mb-2">Ready to Book?</h3>
          <p className="text-white/70 mb-4">Contact us now — seats fill up fast!</p>
          <a href="https://wa.me/918928947322" target="_blank" rel="noopener noreferrer" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3 rounded-xl transition">💬 Book Now on WhatsApp</a>
        </div>
      </div>
    </main>
  )
}
