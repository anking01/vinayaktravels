import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()
  const t = await prisma.testimonial.update({
    where: { id },
    data: {
      name: body.name,
      location: body.location,
      photo: body.photo,
      rating: Number(body.rating),
      text: body.text,
      trip: body.trip,
      approved: body.approved,
    },
  })
  return NextResponse.json(t)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await prisma.testimonial.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
