import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function Dashboard() {
  const [trips, enquiries, testimonials, team, services] = await Promise.all([
    prisma.trip.count(),
    prisma.enquiry.count(),
    prisma.testimonial.count(),
    prisma.teamMember.count(),
    prisma.service.count(),
  ])

  const recentEnquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
  })

  const newEnquiriesCount = await prisma.enquiry.count({ where: { status: 'NEW' } })

  const stats = [
    { label: 'Total Trips', value: trips, icon: '🗺️', href: '/admin/trips', color: 'bg-blue-50 text-blue-700', badge: null },
    { label: 'Enquiries', value: enquiries, icon: '📩', href: '/admin/enquiries', color: 'bg-amber-50 text-amber-700', badge: newEnquiriesCount > 0 ? `${newEnquiriesCount} new` : null },
    { label: 'Services', value: services, icon: '🚌', href: '/admin/services', color: 'bg-purple-50 text-purple-700', badge: null },
    { label: 'Testimonials', value: testimonials, icon: '⭐', href: '/admin/testimonials', color: 'bg-yellow-50 text-yellow-700', badge: null },
    { label: 'Team Members', value: team, icon: '👥', href: '/admin/team', color: 'bg-green-50 text-green-700', badge: null },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1a3557]">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back! Here's an overview of your website.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <Link key={s.label} href={s.href} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition border border-gray-100 group">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm">{s.label}</p>
                <p className="text-3xl font-bold text-[#1a3557] mt-1">{s.value}</p>
                {s.badge && (
                  <span className="inline-block mt-2 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">{s.badge}</span>
                )}
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${s.color}`}>
                {s.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent enquiries */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-[#1a3557]">Recent Enquiries</h2>
            <Link href="/admin/enquiries" className="text-sm text-[#f59e0b] hover:underline font-medium">View all</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentEnquiries.length === 0 ? (
              <p className="text-gray-400 text-sm px-6 py-8 text-center">No enquiries yet</p>
            ) : recentEnquiries.map(e => (
              <div key={e.id} className="px-6 py-4 flex items-start gap-3">
                <div className="w-8 h-8 bg-[#1a3557] rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {e.name[0]}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-800 text-sm">{e.name}</p>
                    {e.status === 'NEW' && <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">New</span>}
                  </div>
                  <p className="text-gray-500 text-xs">{e.phone} · {e.service}</p>
                  <p className="text-gray-600 text-xs mt-0.5 truncate">{e.message}</p>
                </div>
                <p className="text-gray-400 text-xs flex-shrink-0">
                  {new Date(e.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-[#1a3557]">Quick Actions</h2>
          </div>
          <div className="p-6 space-y-3">
            {[
              { href: '/admin/trips/new', label: 'Add New Trip / Package', icon: '➕', desc: 'Create a new tour package listing' },
              { href: '/admin/testimonials', label: 'Manage Testimonials', icon: '⭐', desc: 'Approve or edit customer reviews' },
              { href: '/admin/team', label: 'Update Team Members', icon: '👥', desc: 'Add or edit team member profiles' },
              { href: '/admin/enquiries', label: 'View All Enquiries', icon: '📩', desc: 'Respond to customer contact requests' },
            ].map(item => (
              <Link key={item.href} href={item.href} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-[#f59e0b] hover:bg-amber-50 transition group">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="font-medium text-gray-800 text-sm group-hover:text-[#1a3557]">{item.label}</p>
                  <p className="text-gray-500 text-xs">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Seed button (dev helper) */}
      <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-dashed border-gray-300 text-center">
        <p className="text-gray-500 text-sm mb-3">Database empty? Seed with sample data:</p>
        <form action="/api/seed" method="POST">
          <button type="submit" className="bg-[#1a3557] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#2d5488] transition">
            Seed Database
          </button>
        </form>
      </div>
    </div>
  )
}
