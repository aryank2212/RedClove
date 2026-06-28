import { useState } from 'react'
import { Send, CheckCircle2, AlertCircle } from 'lucide-react'
import styles from './ContactForm.module.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Initial / empty form state.
const EMPTY = { name: '', email: '', org: '', interest: 'Intelligence', message: '' }

/**
 * Validate the whole form, returning an object of field -> error message.
 * An empty object means the form is valid.
 */
function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Name is required.'
  if (!values.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }
  if (!values.org.trim()) errors.org = 'Organization is required.'
  if (values.message.trim().length < 20) {
    errors.message = 'Tell us a little more (20+ characters).'
  }
  return errors
}

/**
 * ContactForm — accessible, fully validated enrollment / contact form.
 * Validates on submit and re-validates a field on change once it has an
 * error. Shows a success panel on valid submission (no backend — simulated).
 */
export default function ContactForm() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const update = (field) => (e) => {
    const next = { ...values, [field]: e.target.value }
    setValues(next)
    // Live-clear an error as the user fixes it.
    if (errors[field]) {
      setErrors(validate(next))
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length === 0) {
      setSubmitted(true)
      // Production: POST `values` to the intake endpoint here.
    } else {
      // Move focus to the first invalid field for accessibility.
      const first = Object.keys(found)[0]
      document.getElementById(`cf-${first}`)?.focus()
    }
  }

  if (submitted) {
    return (
      <div className={styles.success} role="status">
        <CheckCircle2 size={40} className={styles.successIcon} aria-hidden="true" />
        <h3>Transmission received.</h3>
        <p>
          Thanks, {values.name.split(' ')[0]}. A RedClove program lead will reach out within one
          business day to verify access and next steps.
        </p>
        <button
          className="btn btn--ghost"
          onClick={() => {
            setValues(EMPTY)
            setSubmitted(false)
          }}
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate aria-label="Contact RedClove Academy">
      <div className={styles.row}>
        <Field
          id="cf-name"
          label="Name"
          error={errors.name}
        >
          <input
            id="cf-name"
            type="text"
            value={values.name}
            onChange={update('name')}
            className={styles.input}
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'err-name' : undefined}
          />
        </Field>

        <Field id="cf-email" label="Email" error={errors.email}>
          <input
            id="cf-email"
            type="email"
            value={values.email}
            onChange={update('email')}
            className={styles.input}
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'err-email' : undefined}
          />
        </Field>
      </div>

      <div className={styles.row}>
        <Field id="cf-org" label="Organization" error={errors.org}>
          <input
            id="cf-org"
            type="text"
            value={values.org}
            onChange={update('org')}
            className={styles.input}
            autoComplete="organization"
            aria-invalid={!!errors.org}
            aria-describedby={errors.org ? 'err-org' : undefined}
          />
        </Field>

        <Field id="cf-interest" label="Track of interest">
          <select
            id="cf-interest"
            value={values.interest}
            onChange={update('interest')}
            className={styles.input}
          >
            <option>Intelligence</option>
            <option>Cyber</option>
            <option>Defense</option>
            <option>Enterprise program</option>
          </select>
        </Field>
      </div>

      <Field id="cf-message" label="How can we help?" error={errors.message}>
        <textarea
          id="cf-message"
          rows={5}
          value={values.message}
          onChange={update('message')}
          className={styles.input}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'err-message' : undefined}
        />
      </Field>

      <button type="submit" className={`btn btn--accent ${styles.submit}`}>
        <Send size={16} aria-hidden="true" /> Transmit request
      </button>
      <p className={styles.note}>
        Submissions are reviewed under our responsible-use policy. We never share your details.
      </p>
    </form>
  )
}

/**
 * Field — small wrapper rendering a label, the input (via children) and an
 * optional error message with the matching id for aria-describedby.
 */
function Field({ id, label, error, children }) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      {children}
      {error && (
        <span id={`err-${id.replace('cf-', '')}`} className={styles.error} role="alert">
          <AlertCircle size={13} aria-hidden="true" /> {error}
        </span>
      )}
    </div>
  )
}
