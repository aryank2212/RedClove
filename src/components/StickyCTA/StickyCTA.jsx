import { Link } from 'react-router-dom'
import { Zap } from 'lucide-react'
import styles from './StickyCTA.module.css'

/**
 * StickyCTA — a persistent call-to-action button pinned to the bottom-left
 * of the viewport, nudging visitors toward enrolling from any page.
 */
export default function StickyCTA() {
  return (
    <Link to="/contact" className={styles.cta} aria-label="Request access to RedClove Academy">
      <Zap size={16} aria-hidden="true" />
      <span className={styles.label}>Request access</span>
    </Link>
  )
}
