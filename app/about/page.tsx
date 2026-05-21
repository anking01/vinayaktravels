import type { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'About Us – Vinayak Travels',
  description: 'Our story, mission, vision, values and the people behind Vinayak Travels.',
}

const values = [
  { emoji: '🛡️', title: 'Safety First', desc: 'Every vehicle & driver on Safetrax. GPS tracking, background verification, first-aid kits and valid insurance in every single trip.' },
  { emoji: '😊', title: 'Customer Satisfaction', desc: 'We go the extra mile — 24/7 support, post-trip follow-ups, personalized service. Our 4.2★ rating is built on genuine happiness.' },
  { emoji: '🤝', title: 'Integrity', desc: 'No hidden charges, ever. Written quotations before every booking. Clear terms. Honest communication — always.' },
  { emoji: '⭐', title: 'Quality', desc: 'Regular servicing, sanitized interiors, modern amenities, push-back seats. We believe quality travel should be for everyone.' },
  { emoji: '💡', title: 'Innovation', desc: 'Safetrax real-time tracking, digital payments, WhatsApp booking, online coordination — technology that makes travel safer and easier.' },
]

export default async function AboutPage() {
  const [teamMembers, settingRows] = await Promise.all([
    prisma.teamMember.findMany({ orderBy: { order: 'asc' } }),
    prisma.siteSetting.findMany(),
  ])
  const settings: Record<string, string> = {}
  for (const r of settingRows) settings[r.key] = r.value
  const tagline = settings.about_tagline || 'Your Trusted Travel Partner in Maharashtra — built on safety, trust and a genuine love for the road.'

  const team = teamMembers.length > 0 ? teamMembers.map(m => ({
    name: m.name,
    role: m.role,
    photo: m.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=1a2744&color=C9A84C&size=200&bold=true`,
    desc: m.bio,
  })) : [
    { name: 'Team Member 1', role: 'Founder & CEO', photo: 'https://ui-avatars.com/api/?name=Owner+One&background=1a2744&color=C9A84C&size=200&bold=true', desc: 'Visionary behind Vinayak Travels. 10+ years of experience in transportation.' },
    { name: 'Team Member 2', role: 'Operations Head', photo: 'https://ui-avatars.com/api/?name=Manager+Two&background=C9A84C&color=0f1a2e&size=200&bold=true', desc: 'Manages day-to-day fleet operations and driver coordination.' },
    { name: 'Team Member 3', role: 'Tour Coordinator', photo: 'https://ui-avatars.com/api/?name=Coordinator+Three&background=16a34a&color=ffffff&size=200&bold=true', desc: 'Plans and executes all tour packages with passion and precision.' },
  ]

  return (
    <>
      {/* BANNER */}
      <section className="relative overflow-hidden" style={{ minHeight: '420px' }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1400&q=85)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-navy/80" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center text-white">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            About <span className="text-gold">Vinayak Travels</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">{tagline}</p>
        </div>
      </section>

      {/* EMOTIONAL STORY */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block bg-beige text-navy border border-navy/20 text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              📖 Our Journey
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy">
              The Story Behind Vinayak Travels
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Story 1 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all">
              <div className="h-1 bg-gold" />
              <div className="p-8">
                <div className="w-14 h-14 bg-navy/10 rounded-2xl flex items-center justify-center text-3xl mb-5">🌱</div>
                <h3 className="font-heading text-xl font-bold text-navy mb-3">Where It All Began</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  It started with a single bus and a simple belief — that every person deserves to travel safely and
                  comfortably, without breaking the bank. Over a decade ago, we began our journey serving a handful of
                  local businesses in Maharashtra. We treated every client like family, every vehicle like our own, and
                  every trip like it was the most important one we would ever make.
                </p>
                <p className="text-gray-600 leading-relaxed text-sm mt-3">
                  Those early days taught us the true meaning of trust. Companies started calling us not because we were
                  the cheapest — but because we always showed up. On time. Every time.
                </p>
              </div>
            </div>

            {/* Story 2 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all">
              <div className="h-3 bg-beige-dark" />
              <div className="p-8">
                <div className="w-14 h-14 bg-beige rounded-2xl flex items-center justify-center text-3xl mb-5">📈</div>
                <h3 className="font-heading text-xl font-bold text-navy mb-3">Growing with Purpose</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  As the years passed, our fleet grew — but more importantly, our team&apos;s commitment grew stronger. We
                  registered all our vehicles and drivers on Safetrax, giving parents, employers and travelers complete
                  visibility into every trip. We didn&apos;t do it because someone asked us to — we did it because we believed
                  safety should never be a luxury.
                </p>
                <p className="text-gray-600 leading-relaxed text-sm mt-3">
                  Today with 100+ vehicles, we serve hundreds of businesses across Maharashtra — from daily employee
                  transport to corporate events, airport transfers to executive travel. Each trip carries the same values
                  we started with.
                </p>
              </div>
            </div>

            {/* Story 3 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all">
              <div className="h-3 bg-green-500" />
              <div className="p-8">
                <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center text-3xl mb-5">🙏</div>
                <h3 className="font-heading text-xl font-bold text-navy mb-3">A New Dream — Touching Souls</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  In 2024, we took a leap of faith. We launched our tour packages — not just as a business decision, but
                  as a heartfelt mission. We had seen our drivers take families to pilgrimage sites, and we knew how
                  deeply those journeys moved people. A grandmother visiting Trimbakeshwar for the first time. A family
                  completing their Jyotirling yatra after years of planning.
                </p>
                <p className="text-gray-600 leading-relaxed text-sm mt-3">
                  Within one year, 50+ trips completed, 4.2★ Google rating — and countless memories made. This is why
                  we travel. Not just to transport people — but to connect them with places that matter to their soul.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-2">Our Mission &amp; Vision</h2>
            <p className="text-gray-500">The principles that guide every journey we take</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-navy/5 rounded-full -translate-x-6 -translate-y-6" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 bg-navy rounded-xl flex items-center justify-center text-2xl">🎯</div>
                  <div>
                    <div className="text-xs font-semibold text-beige-dark uppercase tracking-wider">Our Mission</div>
                    <h3 className="font-heading text-xl font-bold text-navy">Why We Exist</h3>
                  </div>
                </div>
                <p className="text-navy-light font-heading font-semibold text-lg italic mb-4 leading-relaxed border-l-4 border-beige-dark pl-4">
                  &ldquo;To make travel accessible, affordable, and enjoyable for everyone while maintaining the highest standards of safety and customer service.&rdquo;
                </p>
                <ul className="space-y-2">
                  {['Affordable pricing without compromising quality', 'Safety as the absolute top priority', 'Comfort and dignity throughout every journey', 'Transparent, honest service always', 'Customer satisfaction at every touchpoint'].map((i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-beige-dark shrink-0" /> {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Vision */}
            <div className="relative bg-navy rounded-2xl p-8 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-x-6 -translate-y-6" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 bg-beige-dark rounded-xl flex items-center justify-center text-2xl">🌟</div>
                  <div>
                    <div className="text-xs font-semibold text-beige-dark uppercase tracking-wider">Our Vision</div>
                    <h3 className="font-heading text-xl font-bold text-white">Where We&apos;re Going</h3>
                  </div>
                </div>
                <p className="text-white font-heading font-semibold text-lg italic mb-4 leading-relaxed border-l-4 border-beige-dark pl-4">
                  &ldquo;To become India&apos;s most trusted and preferred travel partner, known for reliability, punctuality, and exceptional service.&rdquo;
                </p>
                <ul className="space-y-2">
                  {['Expand to 200+ vehicle fleet', 'Serve 5000+ happy customers', 'Achieve 4.5+ star rating', 'Expand to more destinations across India', 'Establish presence in multiple states'].map((i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-white/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-beige-dark shrink-0" /> {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-2">Our Values</h2>
            <p className="text-gray-500">The principles we live and work by — every single day</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {values.map((v) => (
              <div key={v.title} className="bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm hover:shadow-md hover:border-beige-dark/30 transition-all">
                <div className="text-3xl mb-3">{v.emoji}</div>
                <h3 className="font-heading font-bold text-navy text-base mb-2">{v.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-beige text-navy border border-navy/20 text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              👥 Our People
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy mb-2">Our Team</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              The passionate people who make every journey memorable — day in, day out.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-beige-dark shadow-md"
                  />
                </div>
                <h3 className="font-heading font-bold text-navy text-lg">{member.name}</h3>
                <div className="text-beige-dark font-semibold text-sm mb-2">{member.role}</div>
                <p className="text-gray-500 text-xs leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>
          {teamMembers.length === 0 && (
            <p className="text-center text-gray-400 text-sm mt-6 italic">
              Add team members from the Admin Panel → Team Members section
            </p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-beige-dark text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-navy mb-4">Travel with People Who Care</h2>
          <p className="text-navy/80 mb-6">Experience safety, comfort and unforgettable journeys with Vinayak Travels.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="bg-navy text-white font-heading font-bold px-6 py-3 rounded-full hover:bg-navy-light transition-colors">Contact Us</Link>
            <Link href="/packages" className="bg-white text-navy font-heading font-bold px-6 py-3 rounded-full hover:bg-gray-100 transition-colors">View Packages</Link>
          </div>
        </div>
      </section>
    </>
  )
}
