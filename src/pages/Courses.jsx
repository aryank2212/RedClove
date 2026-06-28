import { useMemo, useState } from 'react'
import MasonryGrid from '../components/MasonryGrid/MasonryGrid'
import Lightbox from '../components/Lightbox/Lightbox'
import ScrollReveal from '../components/ScrollReveal/ScrollReveal'
import { courses } from '../data/courses'
import page from './Page.module.css'
import styles from './Courses.module.css'

// Filter categories derived from the catalogue.
const categories = ['All', 'Intelligence', 'Cyber', 'Defense']

/**
 * Courses — the full catalogue. A category filter narrows the masonry grid,
 * followed by an image lightbox gallery of range photography.
 */
export default function Courses() {
  const [filter, setFilter] = useState('All')

  // Memoize the filtered list so we don't recompute on unrelated renders.
  const filtered = useMemo(
    () => (filter === 'All' ? courses : courses.filter((c) => c.category === filter)),
    [filter]
  )

  return (
    <>
      <header className={page.banner}>
        <div className="container">
          <p className={page.crumb}>cat courses.md</p>
          <h1 className={page.bannerTitle}>
            The <span>catalogue.</span>
          </h1>
          <p className={page.bannerSub}>
            Eight operational tracks across intelligence, cyber and defense. Every one runs on a
            live range with real tooling.
          </p>
        </div>
      </header>

      {/* ---- Filter + grid ---- */}
      <section className="section container" aria-labelledby="catalog-h">
        <div className={styles.toolbar}>
          <h2 id="catalog-h" className={styles.toolbarTitle}>
            {filtered.length} course{filtered.length !== 1 ? 's' : ''}
          </h2>
          <div className={styles.filters} role="group" aria-label="Filter courses by track">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.filter} ${filter === cat ? styles.filterActive : ''}`}
                onClick={() => setFilter(cat)}
                aria-pressed={filter === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <MasonryGrid items={filtered} />
      </section>

      {/* ---- Lightbox gallery ---- */}
      <section className={`section ${styles.gallerySection}`} aria-labelledby="gallery-h">
        <div className="container">
          <ScrollReveal as="header" className={styles.galleryHead}>
            <p className="eyebrow">inside the range</p>
            <h2 id="gallery-h" className={styles.galleryTitle}>
              Where the training happens.
            </h2>
            <p className={styles.gallerySub}>
              Click any frame to open the gallery. Use the arrow keys to move between images.
            </p>
          </ScrollReveal>
          <Lightbox />
        </div>
      </section>
    </>
  )
}
