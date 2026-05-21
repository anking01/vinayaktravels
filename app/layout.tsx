import type { Metadata } from 'next'
import { Poppins, Inter } from 'next/font/google'
import './globals.css'
import LayoutShell from '@/components/LayoutShell'
import Providers from '@/components/Providers'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Vinayak Travels – Safe, Comfortable & Affordable Travel in Maharashtra',
  description:
    'Vinayak Travels offers premium tour packages, corporate transportation, vehicle rental and pilgrimage tours across Maharashtra. 10+ years of experience, 500+ happy customers, 4.2★ Google rating.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} h-full`} data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col antialiased">
        <Providers>
          <LayoutShell>{children}</LayoutShell>
        </Providers>
      </body>
    </html>
  )
}
