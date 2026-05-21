import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const services = await prisma.service.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(services)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const service = await prisma.service.create({
    data: {
      icon: body.icon || '🚌',
      title: body.title,
      desc: body.desc,
      order: Number(body.order) || 0,
      active: body.active !== false,
    },
  })
  return NextResponse.json(service)
}
