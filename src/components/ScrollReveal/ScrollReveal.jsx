import useScrollReveal from '../../hooks/useScrollReveal'
import styles from './ScrollReveal.module.css'

/**
 * ScrollReveal
 * Wrapper that fades + slides its children into view the first time they
 * enter the viewport. `as` lets callers pick the rendered element so the
 * markup stays semantic; `delay` staggers items in a list.
 */
export default function ScrollReveal({ children, as: Tag = 'div', delay = 0, className = '' }) {
  const [ref, visible] = useScrollReveal()

  return (
    <Tag
      ref={ref}
      className={`${styles.reveal} ${visible ? styles.visible : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
