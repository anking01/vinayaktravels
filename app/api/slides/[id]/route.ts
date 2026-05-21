import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()
  const slide = await prisma.heroSlide.update({
    where: { id },
    data: {
      type: body.type,
      mediaUrl: body.mediaUrl,
      title: body.title,
      subtitle: body.subtitle,
      order: Number(body.order),
      active: body.active,
    },
  })
  return NextResponse.json(slide)
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await prisma.heroSlide.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
