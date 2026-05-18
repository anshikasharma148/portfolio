import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const spring = { stiffness: 420, damping: 36, mass: 0.35 }

export default function CursorGlow({ enabled }) {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, spring)
  const sy = useSpring(y, spring)

  useEffect(() => {
    if (!enabled) return undefined

    const html = document.documentElement
    html.classList.add('portfolio-cursor-active')

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }

    window.addEventListener('pointermove', move, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      html.classList.remove('portfolio-cursor-active')
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <motion.div
      className="cursor-glow"
      aria-hidden
      style={{ left: sx, top: sy }}
    />
  )
}
