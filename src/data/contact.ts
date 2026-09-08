// Contact block order never changes: web, email, phone, city. Guide section 8.
export const contact = {
  web: 'ideacollaborative.com',
  webHref: 'https://ideacollaborative.com',
  email: 'hello@ideacollaborative.com',
  phone: '(970) 286-0922',
  phoneHref: 'tel:+19702860922',
  city: 'Loveland, Colorado',
  locality: 'Loveland',
  region: 'CO',
  postalCode: '80537',
  country: 'US',
} as const;

export const areaServed = [
  'Loveland',
  'Fort Collins',
  'Windsor',
  'Greeley',
  'Longmont',
] as const;

export const founder = {
  name: 'Joshua Scott',
  jobTitle: 'Founder',
  linkedin: 'https://www.linkedin.com/in/joshuaacersscott',
} as const;

export const brand = {
  name: 'Idea Collaborative',
  tagline: 'Practical AI that pays for itself.',
  oneLiner:
    'Idea Collaborative helps Northern Colorado businesses put AI to work in weeks, not years.',
  boilerplate:
    'Idea Collaborative is a Loveland-based AI consultancy serving small and mid-sized businesses across Northern Colorado. Through hands-on workshops and practical implementation, we help owners and operators turn AI from a headline into a working process, with 25+ years of enterprise solutions experience behind every recommendation.',
} as const;

// Guide section 8. Rotate; never stack all five in one piece.
export const proofPoints = [
  '25+ years in enterprise technology and solutions architecture',
  'Digital products delivered across 25+ industries',
  'Enterprise-grade methods, priced for a 20-person company',
  'Based in Loveland, serving Fort Collins, Windsor, and the Front Range',
  'Every workshop ends with a written 30-day action plan',
] as const;
