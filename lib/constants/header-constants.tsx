export const scrollToSection = (href: string) => {
    setIsMobileOpen(false)
    setIsMobileServicesOpen(false)

    if (pathname !== '/') {
      router.push('/' + href)
      return
    }

    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const handleDropdownEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current)
    setIsDropdownOpen(true)
  }

  export const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setIsDropdownOpen(false), 150)
  }
    export const handleLocationEnter = () => {
    if (locationTimeout.current) clearTimeout(locationTimeout.current)
    setIsLocationOpen(true)
  }

  export const handleLocationLeave = () => {
    locationTimeout.current = setTimeout(() => setIsLocationOpen(false), 150)
  }