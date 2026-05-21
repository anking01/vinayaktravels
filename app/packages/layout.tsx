import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tour Packages – Vinayak Travels',
  description: 'Explore pilgrimage, beach, hill station & weekend packages organized by Vinayak Travels. Click any trip to see full itinerary.',
}

export default function PackagesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
