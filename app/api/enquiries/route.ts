import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const enquiries = await prisma.enquiry.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(enquiries)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const enquiry = await prisma.enquiry.create({
    data: {
      name: body.name,
      phone: body.phone,
      email: body.email || '',
      service: body.service || 'General',
      message: body.message,
    },
  })
  return NextResponse.json(enquiry, { status: 201 })
}
