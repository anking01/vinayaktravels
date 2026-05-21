import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(testimonials)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const t = await prisma.testimonial.create({
    data: {
      name: body.name,
      location: body.location,
      photo: body.photo || '',
      rating: Number(body.rating) || 5,
      text: body.text,
      trip: body.trip,
      approved: body.approved !== false,
    },
  })
  return NextResponse.json(t, { status: 201 })
}
