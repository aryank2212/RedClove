import { useEffect, useRef, useState } from 'react'
import styles from './CustomCursor.module.css'

/**
 * CustomCursor — a terminal-style cursor made of a small dot and a trailing
 * ring. The ring lerps toward the pointer for a smooth lag effect and grows
 * over interactive elements. Disabled on touch / coarse pointers, where the
 * native cursor is kept.
 */
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // Only run on devices with a precise, hovering pointer (i.e. a mouse).
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (fine) setEnabled(true)
  }, [])

  useEffect(() => {
    if (!enabled) return

    document.body.classList.add('custom-cursor-active')

    const dot = dotRef.current
    const ring = ringRef.current

    // Target = real pointer position; ring = eased follower position.
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY
    let raf = null

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      // The dot tracks the pointer exactly.
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`
    }

    // Animation loop: ease the ring toward the pointer each frame.
    const loop = () => {
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`
      raf = requestAnimationFrame(loop)
    }
    loop()

    // Grow the ring when hovering clickable elements.
    const onOver = (e) => {
      if (e.target.closest('a, button, input, textarea, [role="button"], label')) {
        ring.classList.add(styles.hover)
      }
    }
    const onOut = (e) => {
      if (e.target.closest('a, button, input, textarea, [role="button"], label')) {
        ring.classList.remove(styles.hover)
      }
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.body.classList.remove('custom-cursor-active')
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div ref={ringRef} className={styles.ring} aria-hidden="true" />
      <div ref={dotRef} className={styles.dot} aria-hidden="true" />
    </>
  )
}
