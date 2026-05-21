import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Our Services – Vinayak Travels',
  description: 'Tour packages, corporate transportation, and customized travel solutions across Maharashtra.',
}

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { active: true },
    orderBy: { order: 'asc' },
  })

  const defaultServices = [
    { id: 'd1', icon: '🕉️', title: 'Pilgrimage Tours', desc: 'Jyotirlings, Shirdi, Ashtavinayak, Pandharpur Yatra and more. Comfortable AC bus, guide, hotel & darshan arrangements included.', active: true, order: 1 },
    { id: 'd2', icon: '🏖️', title: 'Leisure Tours', desc: 'Goa, Mahabaleshwar, Lonavala, Ellora-Ajanta. Perfect family & group holiday packages with stays and sightseeing.', active: true, order: 2 },
    { id: 'd3', icon: '🏢', title: 'Corporate Transport', desc: 'Daily employee commute, corporate offsite travel, executive car hire. Safetrax GPS-tracked fleet for companies.', active: true, order: 3 },
    { id: 'd4', icon: '✈️', title: 'Airport Transfer', desc: 'Reliable pick-up and drop to Pune, Mumbai airports. On-time guaranteed. Sedan, SUV, tempo traveller options.', active: true, order: 4 },
    { id: 'd5', icon: '🚗', title: 'Outstation Cabs', desc: 'One-way and round-trip outstation cabs across Maharashtra. Fixed pricing, professional drivers.', active: true, order: 5 },
    { id: 'd6', icon: '💍', title: 'Wedding Transport', desc: 'Luxury fleet for weddings — guest pick-up, baraat arrangement, airport transfers. Decorate your fleet too!', active: true, order: 6 },
    { id: 'd7', icon: '🎓', title: 'School & College Tours', desc: 'Educational tours, college excursions, picnic trips. Safe, vetted drivers, fully insured buses.', active: true, order: 7 },
    { id: 'd8', icon: '👥', title: 'Group Travel', desc: 'Large group travel management — up to 1000+ people. Multiple vehicles, coordination, logistics handled.', active: true, order: 8 },
  ]

  const display = services.length > 0 ? services : defaultServices

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: '280px' }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=85)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-navy/75" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-white">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-3">
            Our <span className="text-gold">Services</span>
          </h1>
          <p className="text-white/80 text-lg">Comprehensive travel solutions for every need — safe, comfortable and affordable.</p>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-16 bg-beige-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {display.map(s => (
              <div key={s.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:border-gold/30 transition-all">
                <div className="text-4xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-navy text-base mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-navy text-center mb-8">Why Choose Vinayak Travels?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 text-center">
            {[
              { emoji: '🛡️', label: 'Safetrax GPS Tracked' },
              { emoji: '💰', label: 'No Hidden Charges' },
              { emoji: '📞', label: '24/7 WhatsApp Support' },
              { emoji: '🏆', label: '10+ Years Experience' },
            ].map(f => (
              <div key={f.label} className="bg-beige-light rounded-xl p-5">
                <div className="text-3xl mb-2">{f.emoji}</div>
                <p className="font-semibold text-navy text-sm">{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-navy text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="font-heading text-2xl font-bold text-white mb-3">Ready to Book?</h2>
          <p className="text-white/70 mb-5">Tell us your requirement and we'll arrange everything.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/918928947322?text=Hi! I need a travel service."
              target="_blank" rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-3 rounded-full transition"
            >
              💬 WhatsApp Us
            </a>
            <Link href="/contact" className="bg-white/10 border border-white/30 hover:bg-white/20 text-white font-bold px-8 py-3 rounded-full transition">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
