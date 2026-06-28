import { useParams, Navigate, Link } from 'react-router-dom'
import { ArrowLeft, Briefcase, Award, Shield } from 'lucide-react'
import { testimonials as founders } from '../data/testimonials'
import ScrollReveal from '../components/ScrollReveal/ScrollReveal'
import page from './Page.module.css'
import styles from './Founder.module.css'

export default function Founder() {
  const { id } = useParams()
  
  // Find the founder by slug
  const founder = founders.find((f) => f.slug === id)
  
  if (!founder) {
    return <Navigate to="/" replace />
  }

  return (
    <>
      <header className={page.banner}>
        <div className="container">
          <p className={page.crumb}>
            <Link to="/" className={styles.backLink}>
              <ArrowLeft size={14} /> ./home
            </Link> 
            --founder-profile
          </p>
          <h1 className={page.bannerTitle}>
            Meet <span>{founder.name}</span>
          </h1>
          <p className={page.bannerSub}>{founder.role}</p>
        </div>
      </header>

      <section className="section container">
        <div className={styles.grid}>
          {/* ---- Aside: Photo and quick stats ---- */}
          <ScrollReveal as="aside" className={styles.aside}>
            <div className={styles.photoWrap}>
              <img
                src={`https://picsum.photos/seed/${founder.seed}/400/400`}
                alt={`Photo of ${founder.name}`}
                width="200"
                height="200"
                className={styles.photo}
              />
            </div>
            
            <ul className={styles.details}>
              <li className={styles.detail}>
                <Briefcase size={18} className={styles.detailIcon} />
                <span>Executive Leadership</span>
              </li>
              <li className={styles.detail}>
                <Shield size={18} className={styles.detailIcon} />
                <span>Strategic Operations</span>
              </li>
              <li className={styles.detail}>
                <Award size={18} className={styles.detailIcon} />
                <span>RedClove Founding Member</span>
              </li>
            </ul>
          </ScrollReveal>

          {/* ---- Main content ---- */}
          <ScrollReveal className={styles.contentWrap} delay={120}>
            <h2 className={styles.contentTitle}>The Mission</h2>
            <blockquote className={styles.quote}>
              "{founder.quote}"
            </blockquote>
            
            <div className={styles.bio}>
              <p>
                As a founding member of RedClove, {founder.name} has been instrumental in shaping the vision and operational capabilities of our intelligence and defense training programs. With a deep commitment to excellence, {founder.name} ensures that every track we offer—from offensive cyber operations to defensive systems engineering—meets the rigorous standards required by modern security challenges.
              </p>
              <br />
              <p>
                Our leadership team brings years of field experience to the table, translating complex, high-stakes operational tradecraft into actionable, hands-on training. Under their guidance, RedClove continues to build weapons and intelligence systems for governments and enterprises, preparing operators who defend what matters most.
              </p>
            </div>
            
            <div className={styles.actions}>
              <Link to="/contact" className="btn btn--accent">
                Request Consultation
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
