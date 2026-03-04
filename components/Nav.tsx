'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Home' },
  { href: '/essays', label: 'Essays' },
  { href: '/notes', label: 'Notes' },
  { href: '/about', label: 'About' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <header className="max-w-2xl mx-auto px-6 py-8">
      <nav className="flex items-center justify-between">
        <Link href="/" className="text-sm font-medium text-[#ededed] hover:text-white transition-colors">
          SM
        </Link>
        <div className="flex items-center gap-6">
          {links.filter(l => l.href !== '/').map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm transition-colors ${
                pathname === href || pathname?.startsWith(href + '/')
                  ? 'text-[#ededed]'
                  : 'text-[#6b7280] hover:text-[#9ca3af]'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
