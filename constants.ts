import { VisaOption, ServicePoint, Testimonial } from './types';

export const VISAS: VisaOption[] = [
  {
    country: 'UK',
    flag: '🇬🇧',
    title: 'UK Innovator Founder Visa',
    description: 'A 3-year pathway to UK settlement, offering a strong base to launch and scale into the UK and EU markets. Eligible founders may apply for Indefinite Leave to Remain after 3 years.',
  },
  {
    country: 'USA',
    flag: '🇺🇸',
    title: 'USA O-1 Visa for Founders',
    description: 'Live and build in the United States, with access to leading investors and top-tier startup networks. Can progress toward Green Card options such as EB-1A or EB-2 NIW.',
  },
  {
    country: 'Canada',
    flag: '🇨🇦',
    title: 'Canada Startup Visa',
    description: 'A direct path to Canadian permanent residency, supported by designated incubators and innovation programs. Successful founders may obtain PR within approximately 12–18 months.',
  },
  {
    country: 'Europe',
    flag: '🇪🇺',
    title: 'Europe Startup / Innovation Visas',
    description: 'Relocate and grow from top EU startup hubs. Some programs include pathways to long-term residency or citizenship (varies by country).',
  },
];

export const FOUNDER_SERVICES: ServicePoint = {
  title: 'Startup Founders',
  points: [
    'Eligibility & innovation narrative',
    'Pitch deck + financials + business plan',
    'Legal application & interview support',
    'Banking, tax, and post-landing launch',
  ],
};

export const COMPANY_SERVICES: ServicePoint = {
  title: 'Companies & Scale-Ups',
  points: [
    'Incorporate and structure internationally',
    'Open global bank & payment rails',
    'Secure talent visas & relocate teams',
    'Manage tax & compliance',
  ],
};

export const TESTIMONIALS: Testimonial[] = [
  {
    role: 'SaaS founder',
    path: 'UK Innovator Founder Visa',
    outcome: 'Raised angel capital & Setup UK Ltd',
  },
  {
    role: 'E-commerce brand',
    path: 'USA expansion',
    outcome: 'Delaware entity + US banking + 3PL logistics',
  },
  {
    role: 'AI startup',
    path: 'EU innovation visa',
    outcome: 'Joined incubator + secured R&D grants',
  },
];
