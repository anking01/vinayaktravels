import { prisma } from '@/lib/prisma'

export default async function sitemap() {
  const trips = await prisma.trip.findMany({ where: { active: true } })

  const tripUrls = trips.map(trip => ({
    url: `https://www.vinayak-travels.com/packages/${trip.slug}`,
    lastModified: trip.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    { url: 'https://www.vinayak-travels.com', lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
    { url: 'https://www.vinayak-travels.com/packages', lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: 'https://www.vinayak-travels.com/services', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: 'https://www.vinayak-travels.com/about', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: 'https://www.vinayak-travels.com/contact', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    ...tripUrls,
  ]
}
