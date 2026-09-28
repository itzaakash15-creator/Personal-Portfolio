export interface ProofItem {
  key: string;
  title: string;
  category: string;
  date: string;
  issuer: string;
  src: string;
  description: string;
  metrics?: { label: string; value: string }[];
}

export const PROOFS_DATA: Record<string, ProofItem> = {
  'cert-digi-experience': {
    key: 'cert-digi-experience',
    title: 'Digi Marketrix 3-Year Strategic Experience Verification',
    category: 'Agency Experience',
    date: '2022 — Present',
    issuer: 'Digi Marketrix Leadership',
    src: '/assets/proofs_optimized/digi_marketrix_experience_letter.jpg',
    description: 'Documented 3-year track record across digital marketing, client campaigns, creative direction, and Talentrix.',
    metrics: [
      { label: 'Tenure', value: '3+ Years' },
      { label: 'Role', value: 'Marketing Strategist & Creative Lead' },
    ],
  },
  'cert-digi-internship': {
    key: 'cert-digi-internship',
    title: 'Digital Marketing & Social Media Internship Credential',
    category: 'Agency Experience',
    date: '2022',
    issuer: 'Digi Marketrix',
    src: '/assets/proofs_optimized/digi_marketrix_internship.jpg',
    description: 'Foundational agency internship completing campaign planning, content execution, and digital distribution.',
  },
  'award-tcs-presentation': {
    key: 'award-tcs-presentation',
    title: 'TCS Inframind National Finalist & Presentation Honor',
    category: 'Recognition',
    date: '2023',
    issuer: 'Tata Consultancy Services',
    src: '/assets/proofs_optimized/award_tcs_presentation.jpg',
    description: 'Nationwide technical and communication presentation distinction representing university engineering excellence.',
  },
  'award-academic-excellence': {
    key: 'award-academic-excellence',
    title: 'Academic Distinction in Artificial Intelligence & Data Science',
    category: 'Recognition',
    date: '2021 — 2025',
    issuer: 'Faculty of Engineering',
    src: '/assets/proofs_optimized/award_academic_excellence.jpg',
    description: 'Sustained top academic standing in AI architecture, software engineering, and machine learning systems.',
  },
  'lab-mineguardian': {
    key: 'lab-mineguardian',
    title: 'MineGuardian AI Research Lab & Computer Vision System',
    category: 'Engineering',
    date: '2024',
    issuer: 'Applied AI Laboratory',
    src: '/assets/lab_mineguardian.jpg',
    description: 'Deep learning system for industrial safety monitoring, edge detection, and real-time hazard classification.',
  },
  'client-jaya': {
    key: 'client-jaya',
    title: 'Jaya Shakthi Agencies Commercial Catalog & Brand Production',
    category: 'Client Work',
    date: '2023',
    issuer: 'Jaya Shakthi Agencies',
    src: '/assets/project_jayashakthi.jpg',
    description: 'Comprehensive commercial brand system, product cataloging, and dealer marketing assets.',
  },
  'client-vedha': {
    key: 'client-vedha',
    title: 'Vedha Rice FMCG Packaging Architecture & Brand Identity',
    category: 'Client Work',
    date: '2024',
    issuer: 'Vedha Rice Mills',
    src: '/assets/project_vedha_rice.jpg',
    description: 'Complete brand packaging design, retail shelf presentation, and consumer distribution identity.',
  },
  'client-mraku': {
    key: 'client-mraku',
    title: 'Mr Aku Vlogs Cinematic Travel Media & YouTube Production',
    category: 'Media Production',
    date: '2022 — Present',
    issuer: 'Mr Aku Vlogs Media',
    src: '/assets/mraku_vlogs.jpg',
    description: 'Over 100 cinematic video productions, travelogues, and high-engagement narrative edits on YouTube.',
  },
};
