export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  isSecurity?: boolean;
}

export interface Stat {
  id: string;
  value: string;
  label: string;
  colorType: 'blue' | 'red';
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  billing: string;
  features: string[];
  disabledFeatures?: string[];
  buttonText: string;
  badge?: string;
  isPopular?: boolean;
  colorType: 'blue' | 'red';
}

export interface EcosystemBadge {
  id: string;
  icon: string;
  label: string;
  colorType: 'blue' | 'red';
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  initials: string;
  colorType: 'blue' | 'red';
}
