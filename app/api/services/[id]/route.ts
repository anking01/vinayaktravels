import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()
  const service = await prisma.service.update({
    where: { id },
    data: {
      icon: body.icon,
      title: body.title,
      desc: body.desc,
      order: Number(body.order),
      active: body.active,
    },
  })
  return NextResponse.json(service)
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await prisma.service.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
