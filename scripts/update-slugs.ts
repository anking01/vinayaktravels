import { prisma } from '../lib/prisma'

function toSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

async function main() {
  const trips = await prisma.trip.findMany()
  for (const trip of trips) {
    const slug = toSlug(trip.title)
    await prisma.trip.update({
      where: { id: trip.id },
      data: { slug }
    })
    console.log(`✅ ${trip.title} → ${slug}`)
  }
  console.log('Done!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
