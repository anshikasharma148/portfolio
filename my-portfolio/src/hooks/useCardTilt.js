import { useCallback, useEffect, useRef, useState } from 'react'

const maxTilt = 7

/**
 * Subtle 3D tilt for cards (pointer devices only).
 */
export function useCardTilt(reducedMotion) {
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })
  const [coarse, setCoarse] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)')
    const update = () => setCoarse(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const onMove = useCallback(
    (e) => {
      if (reducedMotion || coarse) return
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      setTilt({
        rx: Math.max(-maxTilt, Math.min(maxTilt, -py * maxTilt * 1.4)),
        ry: Math.max(-maxTilt, Math.min(maxTilt, px * maxTilt * 1.4)),
      })
    },
    [reducedMotion, coarse],
  )

  const onLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0 })
  }, [])

  const disabled = reducedMotion || coarse
  const style = disabled
    ? undefined
    : {
        transform: `perspective(920px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.12s ease-out',
      }

  return { ref, style, onMove, onLeave, disabled }
}
