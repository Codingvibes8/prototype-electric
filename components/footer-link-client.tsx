'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

export function FooterLinkClient({ href, label }: { href: string; label: string }) {
  const pathname = usePathname()
  const router = useRouter()

  const linkClass = "text-sm text-slate-50 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"

  // Page links (not hash)
  if (href.startsWith('/')) {
    return (
      <Link
        href={href}
        className={linkClass}
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
      className={linkClass}
    >
      {label}
    </button>
  )
}
