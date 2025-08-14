"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
const tabs = [
  { href: '/create', label: 'Create New' },
  { href: '/memes', label: 'All Memes' },
  { href: '/accounts', label: 'Accounts' }
]
export default function NavBar() {
  const p = usePathname()
  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-black/30 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">🔥 MemeForge</Link>
        <div className="flex gap-2">
          {tabs.map(t => (
            <Link key={t.href} href={t.href}
              className={`px-3 py-2 rounded-xl hover:bg-white/10 ${p.startsWith(t.href) ? 'bg-white/15' : ''}`}>
              {t.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}