import { contact, areaServed, brand } from './contact';

const SITE = 'https://ideacollaborative.com';

export const organizationId = `${SITE}/#organization`;
export const websiteId = `${SITE}/#website`;

const areaServedCities = areaServed.map((name) => ({
  '@type': 'City',
  name: `${name}, Colorado`,
}));

/** Full local entity. Emitted once on Home per CLAUDE.md. */
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
  image: `${SITE}/images/og-default.jpg`,
  logo: `${SITE}/logo.svg`,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: contact.locality,
    addressRegion: contact.region,
    postalCode: contact.postalCode,
    addressCountry: contact.country,
  },
  areaServed: areaServedCities,
  knowsAbout: [
    'Artificial intelligence adoption for small business',
    'AI workshops and training',
    'Business process automation',
    'AI for real estate brokerages',
    'Prompt libraries for small businesses',
    'AI readiness assessment',
  ],
};

/**
 * Compact Organization node so Service / Article `@id` refs resolve on every
 * page. Same `@id` as localBusiness; Home still emits the full ProfessionalService.
 */
export const organizationNode = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': organizationId,
  name: brand.name,
  url: SITE,
  logo: `${SITE}/logo.svg`,
  telephone: contact.phone,
  email: contact.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: contact.locality,
    addressRegion: contact.region,
    postalCode: contact.postalCode,
    addressCountry: contact.country,
  },
};

/** Sitewide WebSite entity. Emitted on Home with the local business. */
export const webSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': websiteId,
  url: SITE,
  name: brand.name,
  description: brand.oneLiner,
  inLanguage: 'en-US',
  publisher: { '@id': organizationId },
};

export const breadcrumbs = (
  trail: { name: string; path: string }[]
) => {
  const full = [{ name: 'Home', path: '/' }, ...trail];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: full.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.path === '/' ? SITE : `${SITE}${item.path}`,
    })),
  };
};

export const faqPage = (faqs: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

type ServiceOffer = {
  name: string;
  price: string;
  description?: string;
};

export const service = (opts: {
  name: string;
  description: string;
  path: string;
  audience?: string;
  serviceType?: string;
  /** Single price (legacy). Prefer `offers` when public and private differ. */
  price?: string;
  offers?: ServiceOffer[];
  /**
   * When false or omitted for paid workshops, availability is omitted so we
   * do not claim InStock with no public dates. Free always-on services may pass true.
   */
  available?: boolean;
}) => {
  const offerList: ServiceOffer[] | undefined = opts.offers
    ? opts.offers
    : opts.price !== undefined
      ? [{ name: opts.name, price: opts.price }]
      : undefined;

  const availability =
    opts.available === true
      ? 'https://schema.org/InStock'
      : opts.available === false
        ? undefined
        : opts.price === '0'
          ? 'https://schema.org/InStock'
          : undefined;

  const toOffer = (o: ServiceOffer) => ({
    '@type': 'Offer',
    name: o.name,
    price: o.price,
    priceCurrency: 'USD',
    ...(o.description ? { description: o.description } : {}),
    ...(availability ? { availability } : {}),
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: `${SITE}${opts.path}`,
    serviceType: opts.serviceType ?? 'AI workshop and consulting',
    provider: { '@id': organizationId },
    areaServed: areaServedCities,
    ...(opts.audience
      ? { audience: { '@type': 'Audience', audienceType: opts.audience } }
      : {}),
    ...(offerList
      ? {
          offers:
            offerList.length === 1 ? toOffer(offerList[0]) : offerList.map(toOffer),
        }
      : {}),
  };
};

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
  image: `${SITE}${opts.image ?? '/images/og-default.jpg'}`,
  author: {
    '@type': 'Organization',
    '@id': organizationId,
    name: brand.name,
  },
  publisher: {
    '@type': 'Organization',
    '@id': organizationId,
    name: brand.name,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE}/logo.svg`,
    },
  },
});
