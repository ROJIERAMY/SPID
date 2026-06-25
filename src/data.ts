import { Service, Stat, PricingTier, EcosystemBadge, CaseStudy, Testimonial } from './types';

export const services: Service[] = [
  {
    id: 'apps',
    icon: 'Smartphone',
    title: 'SPID Apps',
    description: 'Custom mobile applications for iOS and Android that deliver performance.',
    isSecurity: false,
  },
  {
    id: 'web',
    icon: 'Globe',
    title: 'SPID Web',
    description: 'Modern websites and web applications that drive your business.',
    isSecurity: false,
  },
  {
    id: 'network',
    icon: 'Network',
    title: 'SPID Network',
    description: 'Reliable networking and infrastructure solutions you can trust.',
    isSecurity: false,
  },
  {
    id: 'security',
    icon: 'ShieldCheck',
    title: 'SPID Security',
    description: 'Advanced security solutions to protect what matters.',
    isSecurity: true,
  },
  {
    id: 'systems',
    icon: 'Layers',
    title: 'SPID Systems',
    description: 'Complete business systems for better control and growth.',
    isSecurity: false,
  },
];

export const stats: Stat[] = [
  {
    id: 'completed',
    value: '100+',
    label: 'Projects Completed',
    colorType: 'blue',
  },
  {
    id: 'satisfaction',
    value: '98%',
    label: 'Client Satisfaction',
    colorType: 'blue',
  },
  {
    id: 'experience',
    value: '5+',
    label: 'Years of Experience',
    colorType: 'blue',
  },
  {
    id: 'support',
    value: '24/7',
    label: 'Support Available',
    colorType: 'red',
  },
];

export const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '5,000 - 8,000',
    billing: 'EGP',
    features: [
      '5 Page Website',
      'Responsive Design',
      'Basic SEO',
      'Contact Form',
      '1 Month Support',
    ],
    buttonText: 'Get Started',
    colorType: 'blue',
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '12,000 - 18,000',
    billing: 'EGP',
    features: [
      'Dynamic Website',
      'Admin Panel',
      'SEO Optimization',
      'Social Media Integration',
      '3 Months Support',
    ],
    buttonText: 'Get Started',
    colorType: 'blue',
  },
  {
    id: 'business',
    name: 'Business',
    price: '25,000 - 40,000',
    billing: 'EGP',
    badge: 'Most Popular',
    isPopular: true,
    features: [
      'Custom Web Application',
      'Advanced Features',
      'Payment Integration',
      'SEO Advanced',
      '6 Months Support',
    ],
    buttonText: 'Get Started',
    colorType: 'red',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '50,000+',
    billing: 'EGP',
    features: [
      'Custom ERP / System',
      'Advanced Security',
      'Full Scalability',
      'Dedicated Support',
      '12 Months Support',
    ],
    buttonText: 'Contact Us',
    colorType: 'blue',
  },
];

export const ecosystemBadges: EcosystemBadge[] = [
  {
    id: 'web',
    icon: 'Monitor',
    label: 'Web Platform',
    colorType: 'blue',
  },
  {
    id: 'native',
    icon: 'Smartphone',
    label: 'Native App',
    colorType: 'blue',
  },
  {
    id: 'erp',
    icon: 'Briefcase',
    label: 'Custom ERP',
    colorType: 'blue',
  },
  {
    id: 'pos',
    icon: 'Store',
    label: 'Retail POS',
    colorType: 'blue',
  },
  {
    id: 'defense',
    icon: 'Shield',
    label: 'Threat Defense',
    colorType: 'red',
  },
  {
    id: 'sync',
    icon: 'RefreshCw',
    label: 'Sync Engine',
    colorType: 'blue',
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: 'cafehub',
    title: 'CafeHub System',
    subtitle: 'Full POS & automated retail ordering flow for specialty roasters.',
    category: 'Systems',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_D1WFuFVlqEKYE0sG-aOG003ICv9MMnb6DoRxRPBV3eMS7tT3ONMlHXKNgHc2Qh05gZv6G2vKd8r_8VWW_-tod0IoSKcvUX_A27YUL_4aLvGJfteZl-nFX5tUvxEoW-4f_dhB9_yOZrnevlk3YYb0CTeckUpRRL_pdkvkNHgcltUeFFGMRqT8UbnD45hNqbq8OHUjTtv5DngrBrWym-IpT5wZv8l7zVecuNm54J72QazG1gyGP6dc3MUYtM6hCi4JyoOPFhR5Gnlf',
  },
  {
    id: 'elitecars',
    title: 'Elite Cars',
    subtitle: 'Interactive inventory management & dynamic showcase catalog.',
    category: 'Web Development',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVH1MW9ETee-zp3zGvcqvBG95s25WwLevLlUxeYQ9r6l1m2qmRRAMUlU3V_EB8KRrYI_DLwSHva1SmiDN5i2SzrMccZXNSS26QELpq06Z4hx-06EonSK7yVtjOLU5t5CZv6fPTFCI_l0hIDZitkZWdgp4CnOh2VgBzabQeuBPFBXKbRK_NNhdyS7y5fDuM5sQ4wIBqLzVDF0dTTN2AVfxb6tmlshKvc3h2RAvhY5aiYjCd4n7my5rgD98Sj60GS9a64-CUT00EorH0',
  },
  {
    id: 'taskflow',
    title: 'TaskFlow App',
    subtitle: 'Streamlined task execution & peer-to-peer delegation workflow.',
    category: 'Mobile Apps',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLtilgSUfvS8P7Kkz9CYxcwncurrZ4xb4Hk9ufSE_3ZjqOG3M0vuFaQpnI65iUER-YLdHoOmNa22_293pR_KT0ketU1Q7hJMi1VopgAswWicKPivt-pshYoMnfNKGZcWnwXky2o6gajqvbKFgOvijB9IQxSU0MvEpOGGXf6BM8Zgm68gLtxhG-QLptQ5cBFVdFR46lFGeo_1FGzd0PIDFRuzlZxOoraC0dqO1YE9TP4CRQbvjmruoj52ptEHVlGr2phSbr_Sa01Dhq',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 'julian',
    quote: '"SPID Digital redesigned our entire logistics hub. The latency reduction was measurable within hours. Truly world-class systems."',
    author: 'Julian Sterling',
    role: 'CTO, OmniLogistics',
    initials: 'JS',
    colorType: 'blue',
  },
  {
    id: 'marcus',
    quote: '"The security protocols SPID implemented are impenetrable. We finally have peace of mind with our sensitive data nodes."',
    author: 'Marcus Vane',
    role: 'Head of Security, FinTech Core',
    initials: 'MV',
    colorType: 'red',
  },
  {
    id: 'aria',
    quote: '"Deployment was seamless. Their ecosystem approach meant our Web, App, and POS all launched together without a single sync error."',
    author: 'Aria Knight',
    role: 'Founder, Bloom Retail',
    initials: 'AK',
    colorType: 'blue',
  },
];
