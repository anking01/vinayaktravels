'use client'
import { useEffect, useState, useCallback, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

type Slide = {
  id: string
  type: string
  mediaUrl: string
  title: string
  subtitle: string
  order: number
  active: boolean
}

type Settings = {
  contact_whatsapp?: string
  stat_years?: string
  stat_customers?: string
  stat_vehicles?: string
  stat_rating?: string
}

const DEFAULT_SLIDES: Slide[] = [
  {
    id: 'd1', type: 'image', active: true, order: 1,
    mediaUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=85',
    title: "Maharashtra's Most Trusted Travel Partner",
    subtitle: 'Pilgrimage tours, corporate transport & custom trips — safe, comfortable, affordable.',
  },
  {
    id: 'd2', type: 'image', active: true, order: 2,
    mediaUrl: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?auto=format&fit=crop&w=1600&q=85',
    title: 'Sacred Jyotirlings Tour',
    subtitle: 'Experience divine journeys across Maharashtra with Safetrax registered buses.',
  },
  {
    id: 'd3', type: 'image', active: true, order: 3,
    mediaUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=85',
    title: 'Goa Beach Holiday',
    subtitle: 'Sun, sand and smiles — group beach packages starting ₹4,999 per person.',
  },
]

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  return match ? match[1] : null
}

function isYouTube(url: string) {
  return url.includes('youtube.com') || url.includes('youtu.be')
}

function isMp4(url: string) {
  return url.match(/\.(mp4|webm|ogg)(\?.*)?$/i) !== null
}

export default function HeroSlider() {
  const [slides, setSlides] = useState<Slide[]>([])
  const [settings, setSettings] = useState<Settings>({})
  const [current, setCurrent] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    Promise.all([
      fetch('/api/slides').then(r => r.json()),
      fetch('/api/settings').then(r => r.json()),
    ]).then(([slidesData, settingsData]) => {
      const active = (slidesData as Slide[]).filter(s => s.active)
      setSlides(active.length > 0 ? active : DEFAULT_SLIDES)
      setSettings(settingsData)
    }).catch(() => {
      setSlides(DEFAULT_SLIDES)
    })
  }, [])

  const list = slides.length > 0 ? slides : DEFAULT_SLIDES

  const goTo = useCallback((idx: number) => {
    if (transitioning) return
    setTransitioning(true)
    setTimeout(() => {
      setCurrent(idx)
      setTransitioning(false)
    }, 300)
  }, [transitioning])

  const next = useCallback(() => goTo((current + 1) % list.length), [current, list.length, goTo])
  const prev = useCallback(() => goTo((current - 1 + list.length) % list.length), [current, list.length, goTo])

  useEffect(() => {
    if (paused || list.length <= 1) return
    timerRef.current = setInterval(next, 5500)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [next, paused, list.length])

  const whatsapp = settings.contact_whatsapp || '918928947322'
  const stats = [
    { label: 'Years', value: settings.stat_years || '10+' },
    { label: 'Travelers', value: settings.stat_customers || '5000+' },
    { label: 'Vehicles', value: settings.stat_vehicles || '100+' },
    { label: 'Rating', value: settings.stat_rating || '4.8★' },
  ]

  const slide = list[current]

  return (
    <div
      className="relative overflow-hidden bg-navy-dark"
      style={{ minHeight: '560px' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Media layer */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${transitioning ? 'opacity-0' : 'opacity-100'}`}>
        {slide.type === 'video' && isYouTube(slide.mediaUrl) ? (
          // YouTube embed
          <iframe
            key={slide.id}
            src={`https://www.youtube.com/embed/${getYouTubeId(slide.mediaUrl)}?autoplay=1&mute=1&loop=1&playlist=${getYouTubeId(slide.mediaUrl)}&controls=0&showinfo=0&rel=0&modestbranding=1`}
            className="absolute inset-0 w-full h-full"
            style={{ border: 'none', pointerEvents: 'none', transform: 'scale(1.15)' }}
            allow="autoplay; fullscreen"
            title="Hero video"
          />
        ) : slide.type === 'video' && isMp4(slide.mediaUrl) ? (
          // MP4 video
          <video
            key={slide.id}
            src={slide.mediaUrl}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay muted loop playsInline
          />
        ) : (
          // Image
          <div
            key={slide.id}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${slide.mediaUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/50 to-navy/80" />

      {/* Content */}
      <div className={`relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center text-white transition-opacity duration-500 ${transitioning ? 'opacity-0' : 'opacity-100'}`}>
        <span className="inline-block bg-gold/20 border border-gold/40 text-gold text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
          🛡️ Safetrax Registered · {settings.stat_years || '10+'}  Years Trusted
        </span>

        {slide.title && (
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight drop-shadow-lg">
            {slide.title}
          </h1>
        )}

        {slide.subtitle && (
          <p className="text-lg sm:text-xl text-white/85 mb-8 max-w-2xl mx-auto drop-shadow">
            {slide.subtitle}
          </p>
        )}

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={`https://wa.me/${whatsapp}?text=Hi! I want to book a trip with Vinayak Travels.`}
            target="_blank" rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-3.5 rounded-full text-base transition shadow-lg"
          >
            💬 Book on WhatsApp
          </a>
          <Link
            href="/packages"
            className="bg-white/15 hover:bg-white/25 border border-white/50 text-white font-bold px-8 py-3.5 rounded-full text-base transition backdrop-blur-sm"
          >
            View All Packages →
          </Link>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-12">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-gold drop-shadow">{s.value}</p>
              <p className="text-sm text-white/65 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next */}
      {list.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-sm transition"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-sm transition"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

      {/* Dots */}
      {list.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {list.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${i === current ? 'w-7 h-2.5 bg-gold' : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'}`}
            />
          ))}
        </div>
      )}

      {/* Slide counter */}
      {list.length > 1 && (
        <div className="absolute top-4 right-4 z-20 text-white/60 text-xs font-medium bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
          {current + 1} / {list.length}
        </div>
      )}

      {/* Progress bar */}
      {!paused && list.length > 1 && (
        <div className="absolute bottom-0 left-0 h-0.5 bg-gold/40 w-full z-20">
          <div
            key={`${current}-progress`}
            className="h-full bg-gold"
            style={{ animation: 'slideProgress 5.5s linear forwards' }}
          />
        </div>
      )}

      <style>{`
        @keyframes slideProgress {
          from { width: 0% }
          to { width: 100% }
        }
      `}</style>
    </div>
  )
}
