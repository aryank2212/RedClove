import { Link } from 'react-router-dom'
import { Github, Linkedin, Twitter, Youtube } from 'lucide-react'
import styles from './Footer.module.css'

// Social links rendered inline in the minimal footer.
const socials = [
  { icon: Github, label: 'GitHub', href: 'https://github.com' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: Twitter, label: 'X / Twitter', href: 'https://twitter.com' },
  { icon: Youtube, label: 'YouTube', href: 'https://youtube.com' },
]

/**
 * Footer — minimal one-line layout: copyright on the left, social icons on
 * the right, collapsing to a stacked column on small screens.
 */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.copy}>
          <Link to="/" className={styles.brand}>
            Red<span className={styles.accent}>Clove</span>
          </Link>
          <span className={styles.sep}>//</span>© {year} RedClove. -Making the world a better place.
        </p>

        <ul className={styles.socials}>
          {socials.map(({ icon: Icon, label, href }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={styles.social}
              >
                <Icon size={18} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
