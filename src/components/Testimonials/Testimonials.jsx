import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { testimonials } from '../../data/testimonials'
import styles from './Testimonials.module.css'

/**
 * Testimonials — an accessible auto-advancing carousel. Supports manual
 * prev/next, dot navigation, keyboard control, and pauses on hover/focus.
 */
export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = testimonials.length

  const go = useCallback(
    (dir) => setIndex((i) => (i + dir + count) % count),
    [count]
  )

  // Auto-advance every 6s unless paused.
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => go(1), 6000)
    return () => clearInterval(id)
  }, [paused, go])

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') go(-1)
    if (e.key === 'ArrowRight') go(1)
  }

  return (
    <section
      className={styles.wrap}
      aria-roledescription="carousel"
      aria-label="What partners say"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={onKeyDown}
    >
      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {testimonials.map((t, i) => (
            <figure
              className={styles.slide}
              key={t.id}
              aria-hidden={i !== index}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
            >
              <Quote className={styles.quoteIcon} size={36} aria-hidden="true" />
              <blockquote className={styles.quote}>{t.quote}</blockquote>
              <figcaption className={styles.person}>
                <img
                  src={`https://picsum.photos/seed/${t.seed}/120/120`}
                  alt=""
                  width="56"
                  height="56"
                  loading="lazy"
                  className={styles.avatar}
                />
                <span>
                  <strong className={styles.name}>{t.name}</strong>
                  <span className={styles.role}>{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <button className={styles.arrow} onClick={() => go(-1)} aria-label="Previous testimonial">
          <ChevronLeft size={20} />
        </button>
        <div className={styles.dots} role="tablist" aria-label="Choose testimonial">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
        <button className={styles.arrow} onClick={() => go(1)} aria-label="Next testimonial">
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  )
}
