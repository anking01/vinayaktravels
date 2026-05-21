'use client'
import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')
  const isHome = pathname === '/'

  if (isAdmin) {
    return <div className="min-h-screen">{children}</div>
  }

  return (
    <>
      <Navbar />
      {/* Hero slider handles its own top margin. Other pages need padding for fixed navbar. */}
      <main className={`flex-1 ${isHome ? '' : 'pt-[96px] md:pt-[128px]'}`}>
        {children}
      </main>
      <Footer />
    </>
  )
}
