import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { testimonials } from '../../data/testimonials'
import styles from './Testimonials.module.css'

/**
 * Testimonials — an accessible auto-advancing carousel. Supports manual
 * prev/next, dot navigation, keyboard control, and pauses on hover/focus.
 */
export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)
  const count = testimonials.length

  const go = useCallback(
    (dir) => {
      setIndex((i) => (i + dir + count) % count)
    },
    [count]
  )

  // Auto-advance every 4.5s with ping-pong logic.
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setIndex((i) => {
        let nextDir = direction
        if (i === 0) nextDir = 1
        else if (i === count - 1) nextDir = -1
        setDirection(nextDir)
        return i + nextDir
      })
    }, 4500)
    return () => clearInterval(id)
  }, [paused, count, direction])

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') go(-1)
    if (e.key === 'ArrowRight') go(1)
  }

  return (
    <section
      className={styles.wrap}
      aria-roledescription="carousel"
      aria-label="Founders"
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
              <div className={styles.personWrap}>
                <img
                  src={`https://picsum.photos/seed/${t.seed}/200/200`}
                  alt=""
                  width="90"
                  height="90"
                  loading="lazy"
                  className={styles.avatar}
                />
                <div className={styles.personInfo}>
                  <strong className={styles.name}>{t.name}</strong>
                  <span className={styles.role}>{t.role}</span>
                  <Link to={`/founder/${t.slug}`} className={styles.viewMore}>view more</Link>
                </div>
              </div>
              <Quote className={styles.quoteIcon} size={36} aria-hidden="true" />
              <blockquote className={styles.quote}>{t.quote}</blockquote>
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
