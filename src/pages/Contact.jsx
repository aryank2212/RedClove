import { Mail, MapPin, Phone, Clock } from 'lucide-react'
import ContactForm from '../components/ContactForm/ContactForm'
import ScrollReveal from '../components/ScrollReveal/ScrollReveal'
import page from './Page.module.css'
import styles from './Contact.module.css'

// Static contact details rendered alongside the form.
const details = [
  { icon: Mail, label: 'Email', value: 'access@redclove.example' },
  { icon: Phone, label: 'Secure line', value: '+1 (202) 555-0142' },
  { icon: MapPin, label: 'HQ', value: 'Arlington, VA — by appointment' },
  { icon: Clock, label: 'Response', value: 'Within 1 business day' },
]

/**
 * Contact — split layout: contact details + responsible-use note on one side,
 * the validated enrollment form on the other.
 */
export default function Contact() {
  return (
    <>
      <header className={page.banner}>
        <div className="container">
          <p className={page.crumb}>./contact --request-access</p>
          <h1 className={page.bannerTitle}>
            Request <span>access.</span>
          </h1>
          <p className={page.bannerSub}>
            Tell us about your team and your mission. We&apos;ll verify eligibility and map you to
            the right track.
          </p>
        </div>
      </header>

      <section className="section container">
        <div className={styles.grid}>
          {/* ---- Aside: details ---- */}
          <ScrollReveal as="aside" className={styles.aside}>
            <p className="eyebrow">direct lines</p>
            <h2 className={styles.asideTitle}>Talk to a program lead.</h2>
            <p className={styles.asideBody}>
              Every enrollment is reviewed by a human. Reach out and we&apos;ll start the
              authorization process together.
            </p>

            <ul className={styles.details}>
              {details.map(({ icon: Icon, label, value }) => (
                <li key={label} className={styles.detail}>
                  <span className={styles.detailIcon}>
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <span>
                    <span className={styles.detailLabel}>{label}</span>
                    <span className={styles.detailValue}>{value}</span>
                  </span>
                </li>
              ))}
            </ul>

            <p className={styles.policy}>
              <strong>Responsible use:</strong> RedClove trains exclusively for lawful, authorized
              and defensive purposes. Access requires agreement to our ethics charter and rules of
              engagement.
            </p>
          </ScrollReveal>

          {/* ---- Form ---- */}
          <ScrollReveal className={styles.formWrap} delay={120}>
            <ContactForm />
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
