import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const trip = await prisma.trip.findUnique({ where: { id } })
  if (!trip) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(trip)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()
  const trip = await prisma.trip.update({
    where: { id },
    data: {
      title: body.title,
      emoji: body.emoji,
      status: body.status,
      duration: body.duration,
      type: body.type,
      badge: body.badge,
      departure: body.departure,
      price: body.price,
      priceNum: Number(body.priceNum),
      rating: Number(body.rating),
      reviews: Number(body.reviews),
      image: body.image,
      groupSize: body.groupSize,
      highlights: typeof body.highlights === 'string' ? body.highlights : JSON.stringify(body.highlights),
      included: typeof body.included === 'string' ? body.included : JSON.stringify(body.included),
      itinerary: typeof body.itinerary === 'string' ? body.itinerary : JSON.stringify(body.itinerary),
      active: body.active,
    },
  })
  return NextResponse.json(trip)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await prisma.trip.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
