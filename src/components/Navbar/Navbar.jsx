import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { Menu, X, Terminal } from 'lucide-react'
import styles from './Navbar.module.css'

// Primary navigation links. `to` values map to the routes in App.jsx.
const links = [
  { to: '/', label: 'Home' },
  { to: '/courses', label: 'Courses' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/contact', label: 'Contact' },
]

/**
 * Navbar — fixed top navigation with a responsive hamburger menu.
 * Adds a solid background once the page is scrolled and closes the mobile
 * drawer automatically on route change.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Solidify the bar after a little scroll for legibility over the hero.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // Prevent body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.brand} aria-label="RedClove Academy home">
          <Terminal size={22} aria-hidden="true" className={styles.brandIcon} />
          <span className={styles.brandText}>
            Red<span className={styles.brandAccent}>Clove</span>
            <span className={styles.brandCursor} aria-hidden="true">_</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className={styles.desktop} aria-label="Primary">
          <ul className={styles.list}>
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    `${styles.link} ${isActive ? styles.active : ''}`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link to="/contact" className={`btn btn--accent ${styles.navCta}`}>
            ./enroll
          </Link>
        </nav>

        {/* Mobile hamburger toggle */}
        <button
          className={styles.burger}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <nav
        id="mobile-menu"
        className={`${styles.mobile} ${open ? styles.mobileOpen : ''}`}
        aria-label="Mobile"
        aria-hidden={!open}
      >
        <ul>
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `${styles.mobileLink} ${isActive ? styles.active : ''}`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
          <li>
            <Link to="/contact" className={`btn btn--accent ${styles.mobileCta}`}>
              ./enroll
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
