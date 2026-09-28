export interface ProjectItem {
  id: string;
  num: string;
  title: string;
  service: string;
  category: string;
  year: string;
  scope: string;
  previewImg: string;
  proofKey: string;
  externalUrl?: string;
}

export const selectedProjects: ProjectItem[] = [
  {
    id: 'jayashakthi',
    num: '01',
    title: 'JAYASHAKTHI TOURS & TRAVELS',
    service: 'WEBSITE DESIGN & DEPLOYMENT',
    category: 'WEBSITE BUILDER // FULL-STACK',
    year: '2025',
    scope: 'Designed, developed, and deployed full responsive commercial website driving regional travel bookings and vehicle inquiries.',
    previewImg: '/assets/proofs_optimized/jayashakthi_website.jpg',
    proofKey: 'jayashakthi-site',
    externalUrl: 'https://jayashakthitoursandtravels.com',
  },
  {
    id: 'salemrr',
    num: '02',
    title: 'SALEM RR',
    service: 'VIDEOGRAPHY / SCRIPTING / EDITING',
    category: 'COMMERCIAL VIDEOGRAPHY & POST-PRODUCTION',
    year: '2024–2025',
    scope: 'On-location commercial shoots, multi-angle camera movement, and fast-paced social reel edits.',
    previewImg: '/assets/proofs_optimized/salemrr_shoot_bts.jpg',
    proofKey: 'salemrr-bts',
    externalUrl: 'https://www.instagram.com/reel/DahRlLUSNZ0/',
  },
  {
    id: 'chinnadurai',
    num: '03',
    title: 'CHINNADURAI MD',
    service: 'PERSONAL BRANDING / SCRIPTING',
    category: 'PERSONAL BRANDING STRATEGY',
    year: '2024–2025',
    scope: 'Executive positioning, commercial hook architecture, and retention analytics reaching 15k+ organic views.',
    previewImg: '/assets/proofs_optimized/chinnadurai_retention.jpg',
    proofKey: 'chinnadurai-retention',
  },
  {
    id: 'purple-collection',
    num: '04',
    title: 'PURPLE COLLECTION',
    service: 'GROWTH CAMPAIGN / BTS SHOOT',
    category: 'RETAIL GROWTH CAMPAIGN',
    year: '2024',
    scope: 'On-location creative direction resulting in a verified +3000% organic reach surge and heightened retail footfalls.',
    previewImg: '/assets/proofs_optimized/purple_collection_bts.jpg',
    proofKey: 'purple-bts',
  },
  {
    id: 'mraku-vlogs',
    num: '05',
    title: 'MR AKU VLOGS',
    service: 'CREATOR PLATFORM & CINEMA PROMOS',
    category: 'CREATOR PLATFORM ARCHIVE',
    year: '2020–2025',
    scope: '5-year video production foundation, street VJ mic hosting, and promotional interviews for Tamil cinema.',
    previewImg: '/assets/proofs_optimized/mr_aku_instagram_page.jpg',
    proofKey: 'mraku-profile',
    externalUrl: 'https://www.instagram.com/mr._aku_vlogs/',
  },
  {
    id: 'vedha-rice',
    num: '06',
    title: 'VEDHA RICE',
    service: 'COMMERCIAL VJ / PRODUCT REEL',
    category: 'BRAND PROMOTION // FMCG',
    year: '2024',
    scope: 'Commercial on-camera presentation delivering brand value, quality differentiation, and regional connection.',
    previewImg: '/assets/proofs_optimized/vedha_rice_vj.jpg',
    proofKey: 'vedha-rice',
  },
];
