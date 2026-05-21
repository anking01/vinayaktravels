import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const trips = await prisma.trip.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(trips)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const trip = await prisma.trip.create({
    data: {
      title: body.title,
      emoji: body.emoji || '🗺️',
      status: body.status || 'UPCOMING',
      duration: body.duration,
      type: body.type,
      badge: body.badge || '',
      departure: body.departure,
      price: body.price,
      priceNum: Number(body.priceNum) || 0,
      rating: Number(body.rating) || 4.5,
      reviews: Number(body.reviews) || 0,
      image: body.image || '',
      groupSize: body.groupSize || '15-45 people',
      highlights: typeof body.highlights === 'string' ? body.highlights : JSON.stringify(body.highlights || []),
      included: typeof body.included === 'string' ? body.included : JSON.stringify(body.included || []),
      itinerary: typeof body.itinerary === 'string' ? body.itinerary : JSON.stringify(body.itinerary || []),
      active: body.active !== false,
    },
  })
  return NextResponse.json(trip, { status: 201 })
}
