import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const slides = await prisma.heroSlide.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(slides)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const slide = await prisma.heroSlide.create({
    data: {
      type: body.type || 'image',
      mediaUrl: body.mediaUrl,
      title: body.title || '',
      subtitle: body.subtitle || '',
      order: Number(body.order) || 0,
      active: body.active !== false,
    },
  })
  return NextResponse.json(slide)
}
