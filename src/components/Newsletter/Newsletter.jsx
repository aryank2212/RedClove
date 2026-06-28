import { useState } from 'react'
import { Send, CheckCircle2 } from 'lucide-react'
import styles from './Newsletter.module.css'

// Basic but robust email pattern — good enough for client-side UX validation.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Newsletter — a compact subscription form with inline validation and a
 * success state. No backend wiring; submission is simulated.
 */
export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    if (!EMAIL_RE.test(email.trim())) {
      setError('Enter a valid email address.')
      return
    }
    setError('')
    setDone(true)
    // In production this would POST to a mailing-list endpoint.
  }

  if (done) {
    return (
      <div className={styles.success} role="status">
        <CheckCircle2 size={20} aria-hidden="true" />
        <span>Subscribed — watch your inbox for intel drops.</span>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <span className={styles.prompt} aria-hidden="true">$</span>
        <input
          id="newsletter-email"
          type="email"
          inputMode="email"
          placeholder="you@agency.gov"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (error) setError('')
          }}
          className={styles.input}
          aria-invalid={!!error}
          aria-describedby={error ? 'newsletter-error' : undefined}
        />
        <button type="submit" className={styles.btn} aria-label="Subscribe">
          <Send size={16} aria-hidden="true" />
          <span className={styles.btnLabel}>Subscribe</span>
        </button>
      </div>
      {error && (
        <p id="newsletter-error" className={styles.error} role="alert">
          {error}
        </p>
      )}
    </form>
  )
}
