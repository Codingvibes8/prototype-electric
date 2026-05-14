'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

export function FooterLinkClient({ href, label }: { href: string; label: string }) {
  const pathname = usePathname()
  const router = useRouter()

  // Page links (not hash)
  if (href.startsWith('/')) {
    return (
      <Link
        href={href}
        className="text-sm text-[#94a3b8] hover:text-[#00b4d8] transition-colors"
      >
        {label}
      </Link>
    )
  }

  const handleClick = () => {
    if (href === '#') {
      if (pathname !== '/') {
        router.push('/')
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }

    if (pathname !== '/') {
      router.push('/' + href)
      return
    }

    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <button
      onClick={handleClick}
      className="text-sm text-[#94a3b8] hover:text-[#00b4d8] transition-colors"
    >
      {label}
    </button>
  )
}
