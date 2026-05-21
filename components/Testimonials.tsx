'use client'
import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

type Testimonial = {
  id: string
  name: string
  location: string
  photo: string
  rating: number
  text: string
  trip: string
  approved?: boolean
}

const FALLBACK = [
  { id: '1', name: 'Rajesh Sharma', location: 'Pune', photo: 'https://ui-avatars.com/api/?name=Rajesh+Sharma&background=1a2744&color=C9A84C&size=100&bold=true', rating: 5, text: 'Amazing Jyotirlings trip! Bus was comfortable, driver professional and punctual. All darshan arrangements perfect. Will travel again with Vinayak Travels!', trip: 'Jyotirlings Tour – 3D/2N' },
  { id: '2', name: 'Priya Deshmukh', location: 'Mumbai', photo: 'https://ui-avatars.com/api/?name=Priya+Deshmukh&background=C9A84C&color=0f1a2e&size=100&bold=true', rating: 5, text: 'Goa trip was absolutely fantastic! Everything well organized — hotel great, food good. Bus comfortable for long journey. Group of 30 had wonderful time. Highly recommended!', trip: 'Goa Beach Holiday – 3D/2N' },
  { id: '3', name: 'Suresh Patil', location: 'Nashik', photo: 'https://ui-avatars.com/api/?name=Suresh+Patil&background=16a34a&color=ffffff&size=100&bold=true', rating: 5, text: 'Used for company offsite — 45 employees, very smooth coordination. Driver professional. Will definitely use again for next corporate event.', trip: 'Corporate Transport – Company Offsite' },
  { id: '4', name: 'Anita Kulkarni', location: 'Aurangabad', photo: 'https://ui-avatars.com/api/?name=Anita+Kulkarni&background=2d4470&color=F5EDD8&size=100&bold=true', rating: 5, text: 'Shirdi trip with family was peaceful and well-managed. Guide very knowledgeable about darshan timings. Bus clean and comfortable. Strongly recommend!', trip: 'Shirdi Day Trip' },
  { id: '5', name: 'Meena Wagh', location: 'Kolhapur', photo: 'https://ui-avatars.com/api/?name=Meena+Wagh&background=1a2744&color=C9A84C&size=100&bold=true', rating: 5, text: 'Best travel company in Maharashtra! Done 3 trips with Vinayak Travels. Each time experience gets better. Very honest pricing — no hidden charges. Always available on WhatsApp.', trip: 'Multiple Trips – Repeat Customer' },
]

export default function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>([])
  const [center, setCenter] = useState(0)

  useEffect(() => {
    fetch('/api/testimonials')
      .then(r => r.json())
      .then((data: Testimonial[]) => {
        const approved = data.filter(t => t.approved !== false)
        setItems(approved.length > 0 ? approved : FALLBACK)
      })
      .catch(() => setItems(FALLBACK))
  }, [])

  const list = items.length > 0 ? items : FALLBACK

  const next = useCallback(() => setCenter(c => (c + 1) % list.length), [list.length])
  const prev = () => setCenter(c => (c - 1 + list.length) % list.length)

  useEffect(() => {
    const t = setInterval(next, 4500)
    return () => clearInterval(t)
  }, [next])

  const getIdx = (offset: number) => (center + offset + list.length) % list.length

  if (list.length === 0) return null

  return (
    <section className="py-14 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs font-bold text-navy uppercase tracking-widest mb-2">❤️ Customer Stories</p>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-navy-dark">
            What Our Travelers Say
          </h2>
        </div>

        <div className="relative flex items-center justify-center gap-4">
          <button onClick={prev} className="absolute left-0 z-10 p-3 rounded-full border-2 border-navy text-navy hover:bg-navy hover:text-white transition bg-white shadow-md">
            <ChevronLeft size={20} />
          </button>

          <div className="flex gap-4 w-full max-w-5xl overflow-hidden">
            {[-1, 0, 1].map((offset) => {
              const t = list[getIdx(offset)]
              const isCenter = offset === 0
              return (
                <div
                  key={t.id + offset}
                  className={`flex-shrink-0 transition-all duration-500 ${
                    isCenter ? 'w-full sm:w-2/3 lg:w-2/4 scale-100 opacity-100 z-10' : 'hidden sm:block sm:w-1/4 lg:w-1/4 scale-95 opacity-50'
                  }`}
                >
                  <div className={`bg-beige-light rounded-2xl p-6 h-full border ${isCenter ? 'border-navy/30 shadow-xl' : 'border-beige-dark'}`}>
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} size={14} className="text-gold fill-gold" />
                      ))}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">&ldquo;{t.text}&rdquo;</p>
                    <div className="flex items-center gap-3">
                      <img
                        src={t.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=1a2744&color=C9A84C&size=100&bold=true`}
                        alt={t.name}
                        className="w-11 h-11 rounded-full"
                      />
                      <div>
                        <p className="font-bold text-gray-800 text-sm">{t.name}</p>
                        <p className="text-xs text-gray-500">{t.location} · {t.trip}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <button onClick={next} className="absolute right-0 z-10 p-3 rounded-full border-2 border-navy text-navy hover:bg-navy hover:text-white transition bg-white shadow-md">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {list.map((_, i) => (
            <button key={i} onClick={() => setCenter(i)} className={`rounded-full transition-all ${i === center ? 'w-6 h-2 bg-navy' : 'w-2 h-2 bg-beige-dark hover:bg-navy/50'}`} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-3 bg-beige rounded-full px-6 py-3 border border-beige-dark">
            <span className="text-2xl">⭐</span>
            <div className="text-left">
              <p className="font-bold text-navy text-sm">4.8/5 on Google</p>
              <p className="text-gray-500 text-xs">Based on 50+ verified reviews</p>
            </div>
            <a href="https://wa.me/918928947322" target="_blank" rel="noopener noreferrer" className="ml-4 bg-navy text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-navy-dark transition">
              Share Your Story
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
