import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ScrollReveal from '../ScrollReveal/ScrollReveal'
import styles from './MasonryGrid.module.css'

/**
 * MasonryGrid — a Pinterest-style course grid using CSS columns so cards of
 * varying heights tile naturally. Cards flagged `tall` get a taller image to
 * create the staggered masonry rhythm.
 */
export default function MasonryGrid({ items }) {
  return (
    <div className={styles.masonry}>
      {items.map((c, i) => (
        <ScrollReveal key={c.id} delay={(i % 3) * 100} className={styles.cardWrap}>
          <article className={styles.card}>
            <div className={styles.media}>
              <img
                src={`https://picsum.photos/seed/${c.seed}/600/${c.tall ? 760 : 460}`}
                alt={`${c.title} course cover`}
                loading="lazy"
                className={styles.img}
              />
              <span className={styles.code}>{c.code}</span>
            </div>
            <div className={styles.body}>
              <div className={styles.meta}>
                <span className={styles.category}>{c.category}</span>
                <span className={styles.dot} aria-hidden="true">•</span>
                <span>{c.level}</span>
                <span className={styles.dot} aria-hidden="true">•</span>
                <span>{c.duration}</span>
              </div>
              <h3 className={styles.title}>{c.title}</h3>
              <p className={styles.blurb}>{c.blurb}</p>
              <Link to="/contact" className={styles.link}>
                Request syllabus <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </article>
        </ScrollReveal>
      ))}
    </div>
  )
}
