export interface ExperienceChapter {
  id: string;
  number: string;
  kicker: string;
  headline: {
    line1: string;
    highlight: string;
    line2: string;
  };
  title: string;
  tagline: string;
  overview: string;
  duration: string;
  role: string;
  scope: string;
  stats: {
    label: string;
    value: string;
  }[];
  pillars: {
    title: string;
    description: string;
    deliverables: string[];
  }[];
  talentrix: {
    kicker: string;
    title: string;
    badge: string;
    description: string;
    stats: {
      label: string;
      value: string;
    }[];
  };
}

export const DIGI_MARKETRIX_DATA: ExperienceChapter = {
  id: 'work',
  number: '01',
  kicker: '01 // THE PRIMARY FOUNDATION',
  headline: {
    line1: 'THREE YEARS.',
    highlight: 'ONE PLACE THAT',
    line2: 'CHANGED HOW I WORK.',
  },
  title: 'DIGI MARKETRIX',
  tagline: 'MARKETING THE DIGITAL PRESENCE',
  overview:
    'Digi Marketrix is where digital marketing stopped being theory and became daily execution. Over nearly three years, I contributed across creative direction, digital strategy, brand positioning, client execution, and in-house venture building.',
  duration: '2022 — Present (3+ Years)',
  role: 'Digital Marketing Strategist & Creative Lead',
  scope: 'Digital Marketing · Social Strategy · Brand Identity · Influencer Media',
  stats: [
    { label: 'Agency Exposure', value: '3+ Years' },
    { label: 'Brands Serviced', value: '15+' },
    { label: 'Campaigns Delivered', value: '50+' },
    { label: 'Talentrix Pipeline', value: 'Active' },
  ],
  pillars: [
    {
      title: 'AGENCY FOUNDATION',
      description:
        'Managing comprehensive marketing funnels from creative ideation to cross-platform digital distribution, tracking performance and driving tangible business conversions.',
      deliverables: ['Social Strategy', 'Paid Media Campaigns', 'Performance Analytics', 'Client Management'],
    },
    {
      title: 'CREATIVE DIRECTION',
      description:
        'Overseeing end-to-end visual systems, video production, graphic design, and brand storytelling that captivates audiences and strengthens corporate identities.',
      deliverables: ['Campaign Filmmaking', 'Visual Identity Systems', 'Editorial Copywriting', 'Art Direction'],
    },
  ],
  talentrix: {
    kicker: 'IN-HOUSE VENTURE // DIVISION',
    title: 'TALENTRIX',
    badge: 'INFLUENCER MEDIA VENTURE',
    description:
      'An internal influencer marketing and creator talent initiative born inside Digi Marketrix to bridge the gap between regional brands and creator audiences with precision storytelling.',
    stats: [
      { label: 'Venture Status', value: 'Active Initiative' },
      { label: 'Creator Network', value: 'Regional & National' },
      { label: 'Campaign ROI', value: 'Performance-Driven' },
    ],
  },
};
