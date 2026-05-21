import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import TripForm from '../../TripForm'

export default async function EditTripPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const trip = await prisma.trip.findUnique({ where: { id } })
  if (!trip) notFound()

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1a3557]">Edit Trip</h1>
        <p className="text-gray-500 text-sm mt-1">{trip.title}</p>
      </div>
      <TripForm initialData={trip} />
    </div>
  )
}
