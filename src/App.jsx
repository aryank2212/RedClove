import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import CustomCursor from './components/CustomCursor/CustomCursor'
import BackToTop from './components/BackToTop/BackToTop'
import StickyCTA from './components/StickyCTA/StickyCTA'
import Home from './pages/Home'
import Courses from './pages/Courses'
import Contact from './pages/Contact'
import Founder from './pages/Founder'

/**
 * ScrollToTop — resets scroll position on every route change so navigating
 * between pages always starts at the top.
 */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

/**
 * App — application shell. Renders the persistent chrome (nav, footer, global
 * UI affordances) around the routed page content.
 */
export default function App() {
  return (
    <>
      <CustomCursor />
      <ScrollToTop />
      <Navbar />

      {/* Skip link for keyboard users */}
      <a href="#main" className="sr-only">
        Skip to main content
      </a>

      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/founder/:id" element={<Founder />} />
          {/* Fallback: unknown routes render the home page */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <Footer />
      <BackToTop />
      <StickyCTA />
    </>
  )
}
