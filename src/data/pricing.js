// Pricing tiers for the Pricing page table.

export const pricingPlans = [
  {
    id: 'recruit',
    name: 'Recruit',
    price: '$1,200',
    period: '/ seat',
    tagline: 'Individual operators getting started.',
    features: [
      'Access to 3 foundation courses',
      'Shared lab range (8h/week)',
      'Community channel access',
      'Verifiable completion credential',
      'Email support',
    ],
    featured: false,
    cta: 'Enroll now',
  },
  {
    id: 'operator',
    name: 'Operator',
    price: '$4,800',
    period: '/ team',
    tagline: 'Small teams running full programs.',
    features: [
      'All courses, all tracks',
      'Dedicated lab range (unlimited)',
      'Live instructor office hours',
      'Cohort progress dashboards',
      'Priority support + Slack channel',
      'Custom scenario injects',
    ],
    featured: true,
    cta: 'Start a cohort',
  },
  {
    id: 'command',
    name: 'Command',
    price: 'Custom',
    period: '',
    tagline: 'Agencies & enterprises at scale.',
    features: [
      'Everything in Operator',
      'On-site / air-gapped delivery',
      'Bespoke curriculum design',
      'Dedicated program manager',
      'SSO + audit logging',
      'Annual capability assessments',
    ],
    featured: false,
    cta: 'Contact sales',
  },
]
