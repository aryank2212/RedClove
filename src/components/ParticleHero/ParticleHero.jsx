import { useEffect, useRef } from 'react'
import styles from './ParticleHero.module.css'

/**
 * ParticleHero — an interactive canvas background. Nodes drift across the
 * field and connect with lines when close, forming a shifting network graph
 * (a nod to signals / intelligence meshes). The network gently reacts to the
 * pointer, pushing nodes away from the cursor.
 *
 * Pure Canvas 2D — no dependencies. Respects prefers-reduced-motion by
 * rendering a single static frame.
 */
export default function ParticleHero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let particles = []
    let raf = null
    const mouse = { x: -9999, y: -9999 }

    // Recompute canvas size and particle count on resize.
    const resize = () => {
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Scale particle count to area, capped for performance.
      const count = Math.min(90, Math.floor((width * height) / 14000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 1.6 + 0.8,
      }))
    }

    const LINK_DIST = 130

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        if (!reduce) {
          // Drift
          p.x += p.vx
          p.y += p.vy

          // Pointer repulsion within a radius
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.hypot(dx, dy)
          if (dist < 120) {
            const force = (120 - dist) / 120
            p.x += (dx / dist) * force * 1.5
            p.y += (dy / dist) * force * 1.5
          }

          // Wrap around the edges
          if (p.x < 0) p.x = width
          if (p.x > width) p.x = 0
          if (p.y < 0) p.y = height
          if (p.y > height) p.y = 0
        }

        // Node
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = '#c92626'
        ctx.fill()

        // Links to nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const d = Math.hypot(p.x - q.x, p.y - q.y)
          if (d < LINK_DIST) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            // Closer nodes draw darker, more opaque links.
            const alpha = (1 - d / LINK_DIST) * 0.4
            ctx.strokeStyle = `rgba(20, 20, 20, ${alpha})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      if (!reduce) raf = requestAnimationFrame(draw)
    }

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onMouseLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
}
