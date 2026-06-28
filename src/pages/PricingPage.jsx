import Pricing from '../components/Pricing/Pricing'
import FAQ from '../components/FAQ/FAQ'
import ScrollReveal from '../components/ScrollReveal/ScrollReveal'
import page from './Page.module.css'
import styles from './PricingPage.module.css'

/**
 * PricingPage — pricing table tiers followed by an FAQ accordion. Named
 * PricingPage to avoid clashing with the Pricing table component.
 */
export default function PricingPage() {
  return (
    <>
      <header className={page.banner}>
        <div className="container">
          <p className={page.crumb}>./pricing --plans</p>
          <h1 className={page.bannerTitle}>
            Pick your <span>tier.</span>
          </h1>
          <p className={page.bannerSub}>
            Transparent pricing for individuals, teams and agencies. Every tier includes live
            ranges and verifiable credentials.
          </p>
        </div>
      </header>

      {/* ---- Pricing tiers ---- */}
      <section className="section container" aria-labelledby="plans-h">
        <ScrollReveal as="header" className={styles.head}>
          <p className="eyebrow">plans</p>
          <h2 id="plans-h" className={styles.title}>
            Scale from one seat to an entire program.
          </h2>
        </ScrollReveal>
        <Pricing />
      </section>

      {/* ---- FAQ ---- */}
      <section className={`section ${styles.faqSection}`} aria-labelledby="faq-h">
        <div className="container">
          <ScrollReveal as="header" className={styles.head}>
            <p className="eyebrow">questions</p>
            <h2 id="faq-h" className={styles.title}>
              Frequently asked.
            </h2>
          </ScrollReveal>
          <FAQ />
        </div>
      </section>
    </>
  )
}
