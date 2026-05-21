import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()
  const enquiry = await prisma.enquiry.update({
    where: { id },
    data: { status: body.status },
  })
  return NextResponse.json(enquiry)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await prisma.enquiry.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
