import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us – Vinayak Travels',
  description: 'Get in touch with Vinayak Travels. Call, WhatsApp or fill the form for tour bookings and corporate transport enquiries.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
