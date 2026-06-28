# RedClove Academy

> -Making the world a better place.

A production-ready, multi-page marketing & course site for **RedClove** — the defense and
intelligence company — and its training arm, **RedClove Academy**. Built with React + Vite and a
terminal / hacker aesthetic (monospace type, sharp edges, scanline accents, an interactive
particle-network hero).

## Stack

- **React 18** (JSX) with **CSS Modules** for scoped, component-level styling
- **React Router v6** for the four-page experience
- **Vite 5** dev server & build
- **lucide-react** for icons
- No global UI framework — all styling is hand-written with **CSS custom properties**

## Pages

| Route        | Page         | Highlights                                                        |
| ------------ | ------------ | ----------------------------------------------------------------- |
| `/`          | Home         | Interactive particle hero, parallax code panels, capability pillars, animated stats counter, masonry course preview, testimonial carousel, newsletter |
| `/courses`   | Courses      | Category-filtered masonry grid + keyboard-navigable lightbox gallery |
| `/pricing`   | Pricing      | Three-tier pricing table + FAQ accordion                          |
| `/contact`   | Contact      | Fully validated enrollment form + contact details                 |

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (opens http://localhost:5173)
npm run dev

# 3. Production build
npm run build

# 4. Preview the production build locally
npm run preview
```

## Project structure

```
website/
├── index.html              # SEO meta, fonts, JSON-LD structured data
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx            # App bootstrap + Router
    ├── App.jsx             # Shell: nav, footer, cursor, routes
    ├── index.css           # Global reset + design tokens (CSS variables)
    ├── data/               # Courses, testimonials, FAQs, pricing content
    ├── hooks/              # useScrollReveal, useParallax
    ├── components/         # Reusable UI (each with its own .module.css)
    │   ├── Navbar/  Footer/  CustomCursor/  ParticleHero/
    │   ├── BackToTop/  StickyCTA/  ScrollReveal/
    │   ├── StatsCounter/  Testimonials/  FAQ/  Pricing/
    │   └── MasonryGrid/  Lightbox/  Newsletter/  ContactForm/
    └── pages/              # Home, Courses, PricingPage, Contact
```

## Implemented interactive features

Responsive hamburger menu · smooth-scroll navigation · scroll-triggered fade-ins ·
contact form with validation · testimonial carousel · pricing table · FAQ accordion ·
back-to-top button · parallax scrolling · animated statistics counter · image lightbox gallery ·
newsletter form · social icon links · sticky CTA button · custom cursor.

## Design tokens

The palette and type scale live as CSS custom properties in [`src/index.css`](src/index.css):

| Token              | Value     | Use                |
| ------------------ | --------- | ------------------ |
| `--color-primary`  | `#000000` | Ink / primary      |
| `--color-accent`   | `#c92626` | RedClove red       |
| `--color-bg`       | `#ffffff` | Background          |
| `--color-text`     | `#000000` | Body text          |
| `--color-secondary`| `#212121` | Secondary surfaces |

Re-skin the whole site by editing those variables in one place.

## Accessibility

- Semantic HTML5 landmarks (`header`, `nav`, `main`, `section`, `footer`, `article`, `figure`)
- Skip-to-content link, visible focus rings, `aria-*` wiring on menu, carousel, accordion, lightbox and form
- `prefers-reduced-motion` disables animations, parallax and the particle loop
- Custom cursor only activates on fine-pointer devices; touch keeps native behaviour

## Notes

- Images are placeholders from [picsum.photos](https://picsum.photos) using stable seeds.
- Forms validate on the client and simulate submission — wire `ContactForm` / `Newsletter`
  to your backend where the comments indicate.
- All offensive-security content is framed for **authorized, lawful and defensive** training only.

---

© RedClove. -Making the world a better place.
"# RedClove" 
