import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'

export default function ScrollToTop({ theme }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      className={`scroll-to-top theme-${theme}${visible ? ' is-visible' : ''}`}
      onClick={scrollUp}
      aria-label="Back to top"
      title="Back to top"
    >
      <ChevronUp size={22} strokeWidth={2.25} aria-hidden />
    </button>
  )
}
