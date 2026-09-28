export interface ProjectItem {
  id: string;
  num: string;
  title: string;
  service: string;
  category: string;
  scope: string;
  proofKey: string;
  previewImg: string;
  year?: string;
  drawerId?: string;
}

export const selectedProjects: ProjectItem[] = [
  {
    id: 'proj-jayashakthi',
    num: '01',
    title: 'JAYASHAKTHI TOURS & TRAVELS',
    service: 'WEBSITE DESIGN & DEPLOYMENT',
    category: 'WEBSITE BUILDER // FULL-STACK',
    scope: 'Designed, developed, and deployed full responsive commercial website driving regional travel bookings and vehicle inquiries.',
    proofKey: 'jayashakthi-site',
    previewImg: '/assets/proofs_optimized/jayashakthi_website.jpg',
    year: '2025',
    drawerId: 'drawer-jaya',
  },
  {
    id: 'proj-salemrr',
    num: '02',
    title: 'SALEM RR',
    service: 'VIDEOGRAPHY / SCRIPTING / EDITING',
    category: 'COMMERCIAL VIDEOGRAPHY & POST-PRODUCTION',
    scope: 'On-location commercial shoots, multi-angle camera movement, and fast-paced social reel edits.',
    proofKey: 'salemrr-bts',
    previewImg: '/assets/proofs_optimized/salemrr_shoot_bts.jpg',
    year: '2024',
    drawerId: 'drawer-salemrr',
  },
  {
    id: 'proj-chinnadurai',
    num: '03',
    title: 'CHINNADURAI MD',
    service: 'PERSONAL BRANDING / SCRIPTING',
    category: 'PERSONAL BRANDING STRATEGY',
    scope: 'Executive positioning, commercial hook architecture, and retention analytics reaching 15k+ organic views.',
    proofKey: 'chinnadurai-retention',
    previewImg: '/assets/proofs_optimized/chinnadurai_retention.jpg',
    year: '2024',
    drawerId: 'drawer-branding',
  },
  {
    id: 'proj-purple',
    num: '04',
    title: 'PURPLE COLLECTION',
    service: 'GROWTH CAMPAIGN / BTS SHOOT',
    category: 'RETAIL GROWTH CAMPAIGN',
    scope: 'On-location creative direction resulting in a verified +3000% organic reach surge and heightened retail footfalls.',
    proofKey: 'purple-bts',
    previewImg: '/assets/proofs_optimized/purple_collection_bts.jpg',
    year: '2024',
    drawerId: 'drawer-purple',
  },
  {
    id: 'proj-mraku',
    num: '05',
    title: 'MR AKU VLOGS',
    service: 'CREATOR PLATFORM & CINEMA PROMOS',
    category: 'CREATOR PLATFORM ARCHIVE',
    scope: '5-year video production foundation, street VJ mic hosting, and promotional interviews for Tamil cinema.',
    proofKey: 'mraku-profile',
    previewImg: '/assets/proofs_optimized/mr_aku_instagram_page.jpg',
    year: '2020–Present',
    drawerId: 'drawer-mraku',
  },
  {
    id: 'proj-vedha',
    num: '06',
    title: 'VEDHA RICE',
    service: 'COMMERCIAL VJ / PRODUCT REEL',
    category: 'BRAND PROMOTION // FMCG',
    scope: 'Commercial on-camera presentation delivering brand value, quality differentiation, and regional connection.',
    proofKey: 'vedha-rice',
    previewImg: '/assets/proofs_optimized/vedha_rice_vj.jpg',
    year: '2024',
    drawerId: 'drawer-vedha',
  },
];

export const PROJECTS_DATA = selectedProjects;
