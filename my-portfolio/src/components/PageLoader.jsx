import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { easePremium } from '../motion/variants'

const minMs = 720
const maxWaitMs = 3200

export default function PageLoader({ reduce, onComplete }) {
  useEffect(() => {
    let cancelled = false
    let finished = false
    let innerTimeout
    const t0 = performance.now()

    const finish = () => {
      if (cancelled || finished) return
      finished = true
      const elapsed = performance.now() - t0
      const rest = reduce ? 0 : Math.max(0, minMs - elapsed)
      innerTimeout = window.setTimeout(() => {
        if (!cancelled) onComplete()
      }, rest)
    }

    const hardCap = window.setTimeout(finish, maxWaitMs)

    if (document.fonts && typeof document.fonts.ready?.then === 'function') {
      document.fonts.ready.then(() => {
        window.clearTimeout(hardCap)
        finish()
      }).catch(() => {
        window.clearTimeout(hardCap)
        finish()
      })
    } else {
      window.clearTimeout(hardCap)
      finish()
    }

    return () => {
      cancelled = true
      window.clearTimeout(hardCap)
      if (innerTimeout) window.clearTimeout(innerTimeout)
    }
  }, [reduce, onComplete])

  return (
    <motion.div
      className="page-loader"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading portfolio"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: reduce ? 0 : 0.45, ease: easePremium } }}
    >
      <div className="page-loader-inner">
        <motion.div
          className="page-loader-mark"
          initial={{ scale: reduce ? 1 : 0.92, opacity: reduce ? 1 : 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: reduce ? 0 : 0.55, ease: easePremium }}
        >
          AS
        </motion.div>
        <motion.div
          className="page-loader-line"
          initial={{ scaleX: reduce ? 1 : 0.2, opacity: reduce ? 1 : 0.4 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: reduce ? 0 : 0.9, ease: easePremium, delay: reduce ? 0 : 0.12 }}
        />
        <p className="page-loader-caption">Anshika Sharma</p>
      </div>
    </motion.div>
  )
}
