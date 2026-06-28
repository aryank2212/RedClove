import { useEffect, useRef, useState } from 'react'
import useScrollReveal from '../../hooks/useScrollReveal'
import styles from './StatsCounter.module.css'

// Each stat counts up from 0 to `value` the first time the section is seen.
const stats = [
  { value: 12000, suffix: '+', label: 'Operators trained' },
  { value: 64, suffix: '', label: 'Live lab ranges' },
  { value: 98, suffix: '%', label: 'Completion rate' },
  { value: 40, suffix: '+', label: 'Partner agencies' },
]

/**
 * Animate a single number from 0 to `target` over `duration` ms using an
 * ease-out curve. Only starts when `run` becomes true.
 */
function useCountUp(target, run, duration = 1800) {
  const [n, setN] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!run || startedRef.current) return
    startedRef.current = true

    let startTime = null
    let frame = null

    const tick = (t) => {
      if (startTime === null) startTime = t
      const progress = Math.min((t - startTime) / duration, 1)
      // easeOutCubic for a snappy finish
      const eased = 1 - Math.pow(1 - progress, 3)
      setN(Math.round(eased * target))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => frame && cancelAnimationFrame(frame)
  }, [run, target, duration])

  return n
}

function Stat({ value, suffix, label, run }) {
  const n = useCountUp(value, run)
  return (
    <div className={styles.stat}>
      <span className={styles.num}>
        {n.toLocaleString()}
        <span className={styles.suffix}>{suffix}</span>
      </span>
      <span className={styles.label}>{label}</span>
    </div>
  )
}

/**
 * StatsCounter — animated statistics band. Numbers count up once the band
 * scrolls into view.
 */
export default function StatsCounter() {
  const [ref, visible] = useScrollReveal({ threshold: 0.3 })

  return (
    <section className={styles.band} ref={ref} aria-label="RedClove Academy by the numbers">
      <div className={`container ${styles.grid}`}>
        {stats.map((s) => (
          <Stat key={s.label} {...s} run={visible} />
        ))}
      </div>
    </section>
  )
}
