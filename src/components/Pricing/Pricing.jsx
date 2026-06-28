import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { pricingPlans } from '../../data/pricing'
import ScrollReveal from '../ScrollReveal/ScrollReveal'
import styles from './Pricing.module.css'

/**
 * Pricing — three-tier pricing table. The featured plan is visually lifted
 * and flagged for screen readers.
 */
export default function Pricing() {
  return (
    <div className={styles.grid}>
      {pricingPlans.map((plan, i) => (
        <ScrollReveal
          key={plan.id}
          delay={i * 120}
          className={`${styles.card} ${plan.featured ? styles.featured : ''}`}
        >
          {plan.featured && (
            <span className={styles.badge}>Most chosen</span>
          )}
          <h3 className={styles.name}>{plan.name}</h3>
          <p className={styles.tagline}>{plan.tagline}</p>

          <p className={styles.price}>
            <span className={styles.amount}>{plan.price}</span>
            <span className={styles.period}>{plan.period}</span>
          </p>

          <ul className={styles.features}>
            {plan.features.map((f) => (
              <li key={f} className={styles.feature}>
                <Check size={16} className={styles.check} aria-hidden="true" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <Link
            to="/contact"
            className={`btn ${plan.featured ? 'btn--accent' : 'btn--ghost'} ${styles.cta}`}
          >
            {plan.cta}
          </Link>
        </ScrollReveal>
      ))}
    </div>
  )
}
