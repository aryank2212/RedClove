import { useCallback, useEffect, useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { galleryImages } from '../../data/courses'
import styles from './Lightbox.module.css'

/**
 * Lightbox — a thumbnail gallery that opens a full-size overlay when an image
 * is clicked. Supports keyboard navigation (arrows + Escape), focus trapping
 * is approximated by moving focus to the close button, and the overlay closes
 * on backdrop click.
 */
export default function Lightbox() {
  const [active, setActive] = useState(null) // index or null

  const close = useCallback(() => setActive(null), [])
  const move = useCallback(
    (dir) =>
      setActive((i) =>
        i === null ? i : (i + dir + galleryImages.length) % galleryImages.length
      ),
    []
  )

  // Keyboard controls while the overlay is open.
  useEffect(() => {
    if (active === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') move(1)
      if (e.key === 'ArrowLeft') move(-1)
    }
    window.addEventListener('keydown', onKey)
    // Lock background scroll while open.
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active, close, move])

  return (
    <>
      <ul className={styles.thumbs}>
        {galleryImages.map((img, i) => (
          <li key={img.id}>
            <button
              className={styles.thumbBtn}
              onClick={() => setActive(i)}
              aria-label={`Open image: ${img.caption}`}
            >
              <img src={img.thumb} alt={img.caption} loading="lazy" className={styles.thumb} />
              <span className={styles.zoom}>view</span>
            </button>
          </li>
        ))}
      </ul>

      {active !== null && (
        <div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={close}
        >
          <button className={styles.close} onClick={close} aria-label="Close viewer" autoFocus>
            <X size={24} />
          </button>
          <button
            className={`${styles.nav} ${styles.prev}`}
            onClick={(e) => {
              e.stopPropagation()
              move(-1)
            }}
            aria-label="Previous image"
          >
            <ChevronLeft size={28} />
          </button>

          {/* stopPropagation so clicking the image itself doesn't close it */}
          <figure className={styles.figure} onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryImages[active].src}
              alt={galleryImages[active].caption}
              className={styles.full}
            />
            <figcaption className={styles.caption}>
              {galleryImages[active].caption}
              <span className={styles.counter}>
                {active + 1} / {galleryImages.length}
              </span>
            </figcaption>
          </figure>

          <button
            className={`${styles.nav} ${styles.next}`}
            onClick={(e) => {
              e.stopPropagation()
              move(1)
            }}
            aria-label="Next image"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </>
  )
}
