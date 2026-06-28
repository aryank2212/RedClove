import { useEffect, useRef } from 'react'

/**
 * useParallax
 * Attaches a scroll listener that translates the referenced element by a
 * fraction of the scroll position, creating a depth-based parallax effect.
 * Movement is applied via requestAnimationFrame for smoothness and is
 * disabled when the user prefers reduced motion.
 *
 * @param {number} speed - negative moves slower than scroll (further away),
 *                         positive moves faster (closer). e.g. -0.2
 */
export default function useParallax(speed = -0.2) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    let frame = null

    const update = () => {
      // Offset relative to the viewport centre so movement feels anchored.
      const rect = node.getBoundingClientRect()
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed
      node.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`
      frame = null
    }

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [speed])

  return ref
}
