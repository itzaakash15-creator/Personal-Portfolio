export interface JourneyStep {
  year: string;
  stage: string;
  title: string;
  desc: string;
  proofKey: string;
}

export const progressionSteps = [
  'CREATE',
  'EDIT',
  'SHOOT',
  'PROMOTE',
  'MARKET',
  'BUILD',
  'LEAD.',
];

export const journeyMilestones: JourneyStep[] = [
  {
    year: '2020 // ORIGIN',
    stage: 'CREATE',
    title: 'CREATE',
    desc: 'Started during school lockdown. Built the first YouTube channel and launched Mr Aku Vlogs, mastering raw storytelling and initial video recording.',
    proofKey: 'mraku-joined',
  },
  {
    year: '2021–2022 // CRAFT',
    stage: 'EDIT & SHOOT',
    title: 'EDIT & SHOOT',
    desc: 'Transitioned from phone cuts to professional Adobe Premiere Pro timeline editing, audio soundscapes, and hands-on 3-axis camera stabilization.',
    proofKey: 'digi-working',
  },
  {
    year: '2023 // REACH',
    stage: 'PROMOTE',
    title: 'PROMOTE',
    desc: 'Expanded into regional shop promotions, street mic interviews, and promotional media collaborations for Tamil feature films.',
    proofKey: 'mraku-paranthu',
  },
  {
    year: '2024 // AGENCY',
    stage: 'MARKET',
    title: 'MARKET',
    desc: 'Associated with Digi Marketrix. Immersed in full commercial agency operations, client account strategy, and structured campaigns.',
    proofKey: 'digi-office',
  },
  {
    year: '2025 // SOFTWARE',
    stage: 'BUILD',
    title: 'BUILD',
    desc: 'Authored full-stack production websites including Jayashakthi Tours & Travels, fusing high-performance front-end code with brand direction.',
    proofKey: 'jayashakthi-site',
  },
  {
    year: '2026 // LEADERSHIP',
    stage: 'LEAD',
    title: 'LEAD',
    desc: 'Spearheading Talentrix, earning stage business awards, and architecting high-retention personal branding frameworks for executives.',
    proofKey: 'award-business-excellence',
  },
];
