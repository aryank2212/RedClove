// Course catalogue — consumed by the Courses page masonry grid and Home preview.
// Each entry carries a deterministic picsum seed so images stay stable on reload.

export const courses = [
  {
    id: 'sig-101',
    code: 'SIG-101',
    title: 'Signals Intelligence Foundations',
    category: 'Intelligence',
    level: 'Foundation',
    duration: '6 weeks',
    blurb:
      'Collect, triage and exploit RF and digital signals. Build a working SIGINT pipeline from antenna to actionable report.',
    seed: 'redclove-sig',
    tall: true,
  },
  {
    id: 'cyo-204',
    code: 'CYO-204',
    title: 'Offensive Cyber Operations',
    category: 'Cyber',
    level: 'Advanced',
    duration: '10 weeks',
    blurb:
      'Authorized red-team tradecraft: recon, exploitation, lateral movement and reporting inside a sanctioned range.',
    seed: 'redclove-cyo',
    tall: false,
  },
  {
    id: 'def-150',
    code: 'DEF-150',
    title: 'Defensive Systems Engineering',
    category: 'Defense',
    level: 'Intermediate',
    duration: '8 weeks',
    blurb:
      'Design, harden and test guidance and countermeasure systems against modern threat profiles.',
    seed: 'redclove-def',
    tall: false,
  },
  {
    id: 'osi-110',
    code: 'OSI-110',
    title: 'Open-Source Intelligence Tradecraft',
    category: 'Intelligence',
    level: 'Foundation',
    duration: '5 weeks',
    blurb:
      'Turn public data into structured intelligence with disciplined sourcing, verification and OPSEC.',
    seed: 'redclove-osi',
    tall: true,
  },
  {
    id: 'thr-300',
    code: 'THR-300',
    title: 'Threat Modeling for Critical Systems',
    category: 'Cyber',
    level: 'Advanced',
    duration: '7 weeks',
    blurb:
      'Map attack surfaces across OT/IT estates and prioritize mitigations with quantified risk.',
    seed: 'redclove-thr',
    tall: false,
  },
  {
    id: 'aut-220',
    code: 'AUT-220',
    title: 'Autonomous Systems & ML Targeting Ethics',
    category: 'Defense',
    level: 'Intermediate',
    duration: '9 weeks',
    blurb:
      'Build perception and decision pipelines for autonomous platforms — with rules of engagement baked in.',
    seed: 'redclove-aut',
    tall: true,
  },
  {
    id: 'for-180',
    code: 'FOR-180',
    title: 'Digital Forensics & Incident Response',
    category: 'Cyber',
    level: 'Intermediate',
    duration: '6 weeks',
    blurb:
      'Acquire, preserve and analyze evidence under pressure. Reconstruct intrusions from disk, memory and network.',
    seed: 'redclove-for',
    tall: false,
  },
  {
    id: 'geo-130',
    code: 'GEO-130',
    title: 'Geospatial Intelligence Analysis',
    category: 'Intelligence',
    level: 'Foundation',
    duration: '6 weeks',
    blurb:
      'Fuse imagery, terrain and motion data into briefings decision-makers can act on in minutes.',
    seed: 'redclove-geo',
    tall: false,
  },
]

// Gallery images for the lightbox on the Courses page.
export const galleryImages = courses.slice(0, 6).map((c) => ({
  id: c.id,
  src: `https://picsum.photos/seed/${c.seed}/900/700`,
  thumb: `https://picsum.photos/seed/${c.seed}/500/400`,
  caption: `${c.code} — ${c.title}`,
}))
