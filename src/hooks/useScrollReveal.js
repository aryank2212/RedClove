import { useEffect, useRef, useState } from 'react'

/**
 * useScrollReveal
 * Returns a ref + boolean. The boolean flips to true the first time the
 * element scrolls into view, driving CSS fade/slide-in animations.
 * Uses IntersectionObserver and unobserves after the first reveal so the
 * animation only plays once.
 *
 * @param {object} options
 * @param {number} options.threshold - fraction visible before triggering
 * @param {string} options.rootMargin - early/late trigger offset
 */
export default function useScrollReveal({ threshold = 0.15, rootMargin = '0px 0px -10% 0px' } = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Fallback: if the API is unavailable, just show the content.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return [ref, visible]
}
