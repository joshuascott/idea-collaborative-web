// Single source of truth for tier names, durations, and prices.
// Titles are verbatim from brand guide section 8. Never paraphrase a title.

export type Tier = {
  level: 1 | 2 | 3;
  slug: string;
  title: string;
  shortTitle: string;
  duration: string;
  publicPrice: string;
  privatePrice: string;
  capacity: string;
  forWhom: string;
  leaveWith: string;
  blurb: string;
  agenda: { time: string; heading: string; detail: string }[];
  recommended?: boolean;
};

export const tiers: Tier[] = [
  {
    level: 1,
    slug: 'ai-advantage',
    title: 'AI Advantage: Your Business, Amplified',
    shortTitle: 'AI Advantage',
    duration: '90 minutes',
    publicPrice: '$129/person',
    privatePrice: '$2,200',
    capacity: 'Up to 25 people in a private session',
    forWhom:
      'The owner who has heard about AI and wants to know what is real.',
    leaveWith: 'Three tools you can use this week.',
    blurb:
      'Ninety minutes, no slideware marathon. We show you what the tools actually do on your own work, and you leave able to run three of them on Monday.',
    agenda: [
      {
        time: '0:00',
        heading: 'What is real and what is marketing',
        detail:
          'A plain tour of what the current tools do well, where they fail, and how to tell the difference without a technical background.',
      },
      {
        time: '0:20',
        heading: 'Three tools, run live on your work',
        detail:
          'We take a real task from someone in the room and do it in front of everyone. Drafting, summarizing, and cleaning up messy information.',
      },
      {
        time: '0:55',
        heading: 'Where your hours are going',
        detail:
          'A short exercise that finds the repetitive work in your week. Most rooms surface 5 to 10 hours per person.',
      },
      {
        time: '1:15',
        heading: 'Your 30-day action plan',
        detail:
          'You write it, we help. One workflow, one owner, one date. You keep the prompt library we used.',
      },
    ],
  },
  {
    level: 2,
    slug: 'implementation-bootcamp',
    title: 'AI Implementation Bootcamp',
    shortTitle: 'Implementation Bootcamp',
    duration: '4 hours',
    publicPrice: '$349/person',
    privatePrice: '$5,850',
    capacity: 'Up to 20 people in a private session',
    forWhom: 'The team that is ready to build.',
    leaveWith: 'Working workflows and a 90-day plan.',
    blurb:
      'Half a day, hands on keyboards. Your team builds the workflows on your real processes, tests them, and leaves with something running rather than something planned.',
    recommended: true,
    agenda: [
      {
        time: '0:00',
        heading: 'Pick the work worth automating',
        detail:
          'We map your current process on the wall and mark the steps where a tool helps and the steps where it will not. Some steps stay human.',
      },
      {
        time: '0:45',
        heading: 'Build the first workflow',
        detail:
          'Everyone builds. We work on your documents, your templates, and your data, not a sample dataset.',
      },
      {
        time: '2:00',
        heading: 'Review, break it, fix it',
        detail:
          'The review step is the part most teams skip and the part that decides whether this holds up. We build yours and practice it.',
      },
      {
        time: '3:00',
        heading: 'Your prompt library and your 90-day plan',
        detail:
          'You leave with a documented library your team owns, named owners for each workflow, and a written plan with dates.',
      },
    ],
  },
  {
    level: 3,
    slug: 'leadership-intensive',
    title: 'AI Leadership Intensive',
    shortTitle: 'Leadership Intensive',
    duration: 'Full day',
    publicPrice: '$749/person',
    privatePrice: '$11,250',
    capacity: 'Up to 15 people in a private session',
    forWhom: 'Leadership deciding where AI fits in the business.',
    leaveWith: 'A roadmap and a way to measure it.',
    blurb:
      'A full day with the people who decide. We work through where this belongs in your business, what it costs, what it saves, and how you will know whether it worked.',
    agenda: [
      {
        time: '0:00',
        heading: 'Where you actually are',
        detail:
          'An honest read on your data, your processes, and your team, with the parts that are not ready named out loud.',
      },
      {
        time: '1:30',
        heading: 'The shortlist',
        detail:
          'We size the candidate workflows by hours saved, revenue affected, and errors reduced, then cut the list to the few worth doing first.',
      },
      {
        time: '3:00',
        heading: 'Cost, risk, and the parts to leave alone',
        detail:
          'What the tools cost, what your team costs, where the review burden sits, and which processes should stay exactly as they are.',
      },
      {
        time: '4:30',
        heading: 'The roadmap and the measures',
        detail:
          'A sequenced roadmap with owners and dates, and the small set of numbers you will watch to know whether it is working.',
      },
    ],
  },
];

export const byLevel = (level: 1 | 2 | 3) =>
  tiers.find((t) => t.level === level)!;
export const bySlug = (slug: string) => tiers.find((t) => t.slug === slug)!;

// Guide section 8. Transparent pricing is the differentiator, so the numbers
// go on the page.
export const consultingRates = [
  {
    label: 'Standard implementation',
    rate: '$175 to $225 per hour',
    detail:
      'Building the workflow, wiring up the tools, training the person who will own it.',
  },
  {
    label: 'Executive advisory',
    rate: '$250 to $300 per hour',
    detail:
      'Working with owners and leadership on where this fits, what it costs, and what to skip.',
  },
  {
    label: 'Nonprofit rate',
    rate: '$125 to $150 per hour',
    detail: 'For registered nonprofits doing work in Northern Colorado.',
  },
];

export const consultingNote = 'Two-hour minimum in person.';

// Guide section 8, calls to action.
export const cta = {
  primary: { label: 'Start a conversation', href: '/contact' },
  workshop: { label: 'Book Your Workshop', href: '/contact' },
  assessment: {
    label: 'Get Your Free AI Readiness Assessment',
    href: '/ai-readiness-assessment',
  },
  breakfast: {
    label: 'Come to an AI Briefing Breakfast',
    href: '/ai-briefing-breakfast',
  },
  pricing: { label: 'See our pricing', href: '/workshops' },
  preview: { label: 'Book the free preview', href: '/realtors#book' },
} as const;
