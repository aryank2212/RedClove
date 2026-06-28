import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { faqs } from '../../data/faqs'
import styles from './FAQ.module.css'

/**
 * FAQ — an accessible accordion. Only one panel is open at a time. Each
 * trigger is a real <button> wired with aria-expanded / aria-controls, and
 * panels use role="region" so assistive tech announces them correctly.
 */
export default function FAQ() {
  const [open, setOpen] = useState(0)

  const toggle = (i) => setOpen((cur) => (cur === i ? -1 : i))

  return (
    <div className={styles.list}>
      {faqs.map((item, i) => {
        const isOpen = open === i
        return (
          <div className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`} key={item.q}>
            <h3 className={styles.heading}>
              <button
                className={styles.trigger}
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-trigger-${i}`}
              >
                <span className={styles.prompt} aria-hidden="true">{isOpen ? '~' : '$'}</span>
                <span className={styles.q}>{item.q}</span>
                {isOpen ? (
                  <Minus size={18} className={styles.icon} aria-hidden="true" />
                ) : (
                  <Plus size={18} className={styles.icon} aria-hidden="true" />
                )}
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-trigger-${i}`}
              className={styles.panel}
              hidden={!isOpen}
            >
              <p className={styles.answer}>{item.a}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
