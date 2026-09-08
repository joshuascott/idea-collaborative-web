import { contact, areaServed, founder, brand } from './contact';

const SITE = 'https://ideacollaborative.com';

export const organizationId = `${SITE}/#organization`;

export const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': organizationId,
  name: brand.name,
  url: SITE,
  description: brand.boilerplate,
  slogan: brand.tagline,
  telephone: contact.phone,
  email: contact.email,
  image: `${SITE}/og-default.jpg`,
  logo: `${SITE}/logo.svg`,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: contact.locality,
    addressRegion: contact.region,
    addressCountry: contact.country,
  },
  areaServed: areaServed.map((name) => ({
    '@type': 'City',
    name: `${name}, Colorado`,
  })),
  founder: {
    '@type': 'Person',
    name: founder.name,
    jobTitle: founder.jobTitle,
    sameAs: [founder.linkedin],
  },
  sameAs: [founder.linkedin],
  knowsAbout: [
    'Artificial intelligence adoption for small business',
    'AI workshops and training',
    'Business process automation',
  ],
};

export const breadcrumbs = (
  trail: { name: string; path: string }[]
) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: `${SITE}${item.path}`,
  })),
});

export const faqPage = (faqs: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

export const service = (opts: {
  name: string;
  description: string;
  path: string;
  audience?: string;
  price?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: opts.name,
  description: opts.description,
  url: `${SITE}${opts.path}`,
  serviceType: 'AI workshop and consulting',
  provider: { '@id': organizationId },
  areaServed: areaServed.map((name) => ({
    '@type': 'City',
    name: `${name}, Colorado`,
  })),
  ...(opts.audience
    ? { audience: { '@type': 'Audience', audienceType: opts.audience } }
    : {}),
  ...(opts.price
    ? {
        offers: {
          '@type': 'Offer',
          price: opts.price,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
      }
    : {}),
});

export const article = (opts: {
  title: string;
  description: string;
  path: string;
  date: Date;
  updated?: Date;
  image?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: opts.title,
  description: opts.description,
  url: `${SITE}${opts.path}`,
  mainEntityOfPage: `${SITE}${opts.path}`,
  datePublished: opts.date.toISOString(),
  dateModified: (opts.updated ?? opts.date).toISOString(),
  image: `${SITE}${opts.image ?? '/og-default.jpg'}`,
  author: {
    '@type': 'Person',
    name: founder.name,
    url: founder.linkedin,
  },
  publisher: { '@id': organizationId },
});
