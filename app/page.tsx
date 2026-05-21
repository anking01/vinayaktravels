import TripsGrid from '@/components/TripsGrid'
import Testimonials from '@/components/Testimonials'
import HeroSlider from '@/components/HeroSlider'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

async function getWhatsApp() {
  const row = await prisma.siteSetting.findUnique({ where: { key: 'contact_whatsapp' } })
  return row?.value || '918928947322'
}

export default async function HomePage() {
  const whatsapp = await getWhatsApp()

  return (
    <>
      {/* HERO SLIDER */}
      <HeroSlider />

      {/* TRIPS */}
      <section className="py-16 bg-beige-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block bg-beige border border-beige-dark text-navy text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              🗺️ Our Tour Packages
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-2">
              Upcoming &amp; Live Trips
            </h2>
            <p className="text-gray-500">Click any trip to see the full itinerary &amp; book instantly</p>
          </div>
          <TripsGrid />
          <div className="text-center mt-8">
            <Link href="/packages" className="inline-block bg-navy text-white font-bold px-8 py-3 rounded-full hover:bg-navy-light transition">
              View All Packages →
            </Link>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-2">Why Choose Vinayak Travels?</h2>
            <p className="text-gray-500">Built on trust, driven by care</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { emoji: '🛡️', title: 'Safetrax GPS Tracked', desc: 'Every vehicle GPS tracked, driver verified, insurance covered.' },
              { emoji: '💰', title: 'No Hidden Charges', desc: 'Written quotation before every booking. Complete transparency.' },
              { emoji: '📞', title: '24/7 Support', desc: 'WhatsApp & phone support round the clock for all your needs.' },
              { emoji: '🏆', title: '10+ Years Experience', desc: '5000+ happy travelers across Maharashtra since 2013.' },
            ].map(f => (
              <div key={f.title} className="bg-beige-light border border-beige-dark rounded-2xl p-6 text-center hover:shadow-md transition">
                <div className="text-4xl mb-3">{f.emoji}</div>
                <h3 className="font-bold text-navy text-base mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* WHATSAPP CTA */}
      <section className="py-16 bg-navy text-center">
        <div className="max-w-2xl mx-auto px-4">
          <p className="text-4xl mb-4">💬</p>
          <h2 className="font-heading text-3xl font-bold text-white mb-3">Ready to Travel?</h2>
          <p className="text-white/70 mb-6">Message us on WhatsApp and we&apos;ll plan your perfect trip.</p>
          <a
            href={`https://wa.me/${whatsapp}?text=Hi! I want to plan a trip with Vinayak Travels.`}
            target="_blank" rel="noopener noreferrer"
            className="inline-block bg-green-500 hover:bg-green-400 text-white font-bold px-10 py-4 rounded-full text-lg transition"
          >
            💬 Chat on WhatsApp Now
          </a>
        </div>
      </section>

      {/* Floating WhatsApp */}
      <a
        href={`https://wa.me/${whatsapp}`}
        target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl text-2xl transition hover:scale-110"
        title="Chat on WhatsApp"
      >
        💬
      </a>
    </>
  )
}
