/** Premium ease — Apple-like deceleration */
export const easePremium = [0.22, 1, 0.36, 1]

/** Default scroll-reveal viewport */
export const defaultViewport = { once: true, amount: 0.16, margin: '-40px 0px' }

export function fadeUp(reduce, delay = 0) {
  return {
    hidden: { opacity: 0, y: reduce ? 0 : 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.55, ease: easePremium, delay: reduce ? 0 : delay },
    },
  }
}

export function staggerContainer(reduce) {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.09,
        delayChildren: reduce ? 0 : 0.06,
      },
    },
  }
}

/** Section heading: kicker → title → lead */
export function headingStagger(reduce) {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.1,
        delayChildren: reduce ? 0 : 0.05,
      },
    },
  }
}

export function headingItem(reduce) {
  return {
    hidden: {
      opacity: 0,
      y: reduce ? 0 : 12,
      filter: reduce ? 'none' : 'blur(8px)',
    },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: reduce ? 0 : 0.52, ease: easePremium },
    },
  }
}
