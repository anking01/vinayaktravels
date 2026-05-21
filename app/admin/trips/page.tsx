import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import TripDeleteButton from './TripDeleteButton'

export default async function TripsPage() {
  const trips = await prisma.trip.findMany({ orderBy: { createdAt: 'desc' } })

  const live = trips.filter(t => t.status === 'LIVE')
  const upcoming = trips.filter(t => t.status === 'UPCOMING')
  const inactive = trips.filter(t => !t.active)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1a3557]">Trips & Packages</h1>
          <p className="text-gray-500 text-sm mt-1">{live.length} live · {upcoming.length} upcoming</p>
        </div>
        <Link href="/admin/trips/new" className="bg-[#1a3557] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[#2d5488] transition text-sm">
          + New Trip
        </Link>
      </div>

      {trips.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <p className="text-4xl mb-3">🗺️</p>
          <p className="text-gray-700 font-medium">No trips yet</p>
          <p className="text-gray-500 text-sm mt-1">Create your first tour package</p>
          <Link href="/admin/trips/new" className="inline-block mt-4 bg-[#1a3557] text-white px-6 py-2.5 rounded-xl text-sm font-medium">
            + Add First Trip
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {trips.map(trip => (
            <div key={trip.id} className={`bg-white rounded-2xl border shadow-sm overflow-hidden flex ${!trip.active ? 'opacity-60' : ''}`}>
              <div className="w-1 flex-shrink-0" style={{ backgroundColor: trip.status === 'LIVE' ? '#16a34a' : trip.status === 'UPCOMING' ? '#2563eb' : '#9ca3af' }} />
              {trip.image && (
                <div className="w-20 h-20 flex-shrink-0 m-3 rounded-xl overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={trip.image} alt={trip.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1 p-4 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xl">{trip.emoji}</span>
                  <h3 className="font-bold text-gray-800">{trip.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${trip.status === 'LIVE' ? 'bg-green-100 text-green-700' : trip.status === 'UPCOMING' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                    {trip.status}
                  </span>
                  {!trip.active && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Inactive</span>}
                </div>
                <div className="flex gap-4 text-sm text-gray-500 mt-1 flex-wrap">
                  <span>💰 {trip.price}</span>
                  <span>⏱ {trip.duration}</span>
                  <span>📅 {trip.departure}</span>
                  <span>⭐ {trip.rating} ({trip.reviews} reviews)</span>
                </div>
              </div>
              <div className="flex items-center gap-2 p-4 flex-shrink-0">
                <Link href={`/admin/trips/${trip.id}/edit`} className="text-sm bg-blue-100 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-200 transition">
                  Edit
                </Link>
                <TripDeleteButton id={trip.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
