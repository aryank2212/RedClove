import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Radar, Cpu, Lock } from 'lucide-react'
import ParticleHero from '../components/ParticleHero/ParticleHero'
import StatsCounter from '../components/StatsCounter/StatsCounter'
import MasonryGrid from '../components/MasonryGrid/MasonryGrid'
import Testimonials from '../components/Testimonials/Testimonials'
import Newsletter from '../components/Newsletter/Newsletter'
import ScrollReveal from '../components/ScrollReveal/ScrollReveal'
import useParallax from '../hooks/useParallax'
import { courses } from '../data/courses'
import styles from './Home.module.css'

// Capability pillars shown beneath the hero.
const pillars = [
  {
    icon: Radar,
    title: 'Intelligence Systems',
    body: 'We build the collection, fusion and analysis platforms that turn raw signals into decisions.',
  },
  {
    icon: ShieldCheck,
    title: 'Defense Engineering',
    body: 'Hardened systems and countermeasures, designed and tested against real-world threat profiles.',
  },
  {
    icon: Cpu,
    title: 'Applied AI',
    body: 'Perception, targeting and decision models — engineered with rules of engagement built in.',
  },
  {
    icon: Lock,
    title: 'Cyber Operations',
    body: 'Authorized offensive and defensive tradecraft, taught on live, isolated ranges.',
  },
]

/**
 * Home — landing page. Interactive particle hero, parallax accents, capability
 * pillars, animated stats, a masonry preview of the catalogue, testimonials
 * and a newsletter sign-up.
 */
export default function Home() {
  // Parallax refs for the floating code panels in the hero.
  const float1 = useParallax(-0.15)
  const float2 = useParallax(0.12)

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className={styles.hero} aria-label="Introduction">
        <ParticleHero />

        {/* Decorative parallax code panels */}
        <pre ref={float1} className={`${styles.codePanel} ${styles.panelA}`} aria-hidden="true">
          {`> redclove --init
[ok] threat model loaded
[ok] range online`}
        </pre>
        <pre ref={float2} className={`${styles.codePanel} ${styles.panelB}`} aria-hidden="true">
          {`status: OPERATIONAL`}
        </pre>

        <div className={`container ${styles.heroInner}`}>
          <p className={styles.kicker}>RedClove</p>
          <h1 className={styles.title}>
            AI-POWERED AUTOMATION.
            DEFEND WHAT <span className={styles.titleAccent}>MATTERS.</span>
          </h1>
          <p className={styles.lede}>
            RedClove provides strategic data-handling and intelligence systems that helps Governments and Enterprises to make better stratigic decisions.
          </p>
          <p className={styles.tagline}>-Making the world a better place through smarter decisions</p>

          <div className={styles.heroCtas}>
            <Link to="/courses" className="btn btn--accent">
              Browse our agenda <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link to="/contact" className="btn btn--ghost">
              Request consultation
            </Link>
          </div>
        </div>

        <div className={styles.scrollHint} aria-hidden="true">
          <span>scroll</span>
          <span className={styles.scrollBar} />
        </div>
      </section>

      {/* ---------------- PILLARS ---------------- */}
      <section className="section container" aria-labelledby="pillars-h">
        <ScrollReveal as="header" className={styles.sectionHead}>
          <p className="eyebrow">capabilities</p>
          <h2 id="pillars-h" className={styles.sectionTitle}>
            Four core offerings.
          </h2>
        </ScrollReveal>

        <div className={styles.pillars}>
          {pillars.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 100} className={styles.pillar}>
              <p.icon className={styles.pillarIcon} size={28} aria-hidden="true" />
              <h3 className={styles.pillarTitle}>{p.title}</h3>
              <p className={styles.pillarBody}>{p.body}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ---------------- STATS ---------------- */}
      <StatsCounter />

      {/* ---------------- COURSE PREVIEW (masonry) ---------------- */}
      <section className="section container" aria-labelledby="preview-h">
        <ScrollReveal as="header" className={styles.sectionHead}>
          <p className="eyebrow">Catalouge</p>
          <h2 id="preview-h" className={styles.sectionTitle}>
            Our latest programs.
          </h2>
          <p className={styles.sectionSub}>
            These programs cover a range of topics, including intelligence systems, cyber operations, Applied-AI and more.
          </p>
        </ScrollReveal>

        <MasonryGrid items={courses.slice(0, 6)} />

        <div className={styles.previewCta}>
          <Link to="/courses" className="btn">
            View full catalogue <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ---------------- FOUNDERS ---------------- */}
      <section className={`section ${styles.testiSection}`} aria-labelledby="testi-h">
        <div className="container">
          <ScrollReveal as="header" className={styles.sectionHead}>
            <p className="eyebrow">leadership</p>
            <h2 id="testi-h" className={styles.sectionTitle}>
              Meet the Founders.
            </h2>
          </ScrollReveal>
          <Testimonials />
        </div>
      </section>

      {/* ---------------- NEWSLETTER ---------------- */}
      <section className={styles.newsletter} aria-labelledby="news-h">
        <div className={`container ${styles.newsletterInner}`}>
          <div>
            <p className="eyebrow">intel drops</p>
            <h2 id="news-h" className={styles.newsletterTitle}>
              Get the briefing.
            </h2>
            <p className={styles.newsletterSub}>
              Monthly updates, program dates and insights.
            </p>
          </div>
          <Newsletter />
        </div>
      </section>
    </>
  )
}
