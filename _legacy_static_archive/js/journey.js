/**
 * AAKASH K Portfolio — Interactive Creator → Builder Journey
 * Timeline milestones: 2020, 2023, 2025, 2026 (Client Work), 2026 (AI & Data Science), NEXT
 * Clicking or hovering timeline nodes dynamically updates the active node,
 * animates connecting lines, and presents rich metadata.
 */

export const journeyData = [
  {
    year: '2020',
    phase: 'STAGE 01',
    title: 'CONTENT CREATION',
    headline: 'The Creative Inception & Video Editing Fundamentals',
    workingOn: 'Started personal YouTube projects, vlogging, and self-directed video experiments. Deconstructed camera framing, cutting rhythms, and narrative pacing on mobile and entry-level workstations.',
    skills: ['Video Editing', 'Framing & Composition', 'Pacing & Flow', 'Basic Audio Sync', 'YouTube Mechanics'],
    relevantWork: 'Early short films, YouTube vlog cuts, raw storytelling tests that developed creative stamina.'
  },
  {
    year: '2023',
    phase: 'STAGE 02',
    title: 'SOCIAL MEDIA',
    headline: 'Short-Form Retention & Algorithmic Psychology',
    workingOn: 'Mastered vertical video formats across Instagram Reels. Analyzed the psychology of the 2-second hook, audience retention curves, and viral distribution mechanics.',
    skills: ['Short-Form Scripting', 'Retention Hooks', 'Trend Analysis', 'Fast-Paced Editing', 'Audience Psychology'],
    relevantWork: 'Life With Aakash Instagram content, achieving a 59K peak viral reel and rapid audience growth.'
  },
  {
    year: '2025',
    phase: 'STAGE 03',
    title: 'DIGITAL MARKETING',
    headline: 'Strategic Personal Branding & Founder Positioning',
    workingOn: 'Transitioned from pure content production to strategic marketing. Began structuring positioning frameworks for creators and regional businesses looking to elevate their perceived authority.',
    skills: ['Personal Branding', 'Digital Marketing', 'Content Strategy', 'Social Media Strategy', 'Brand Communication'],
    relevantWork: 'Awarded Best Reels Creator (Tuticorin, 2025) and Young Informative Content Award (2025).'
  },
  {
    year: '2026',
    phase: 'STAGE 04',
    title: 'CLIENT WORK',
    headline: 'Commercial Agency Production & Real-World Impact',
    workingOn: 'Executing high-stakes client deliverables spanning fashion personal branding, culinary brand promotions, and textile storytelling. Formal internship at Digi Marketrix.',
    skills: ['Client Account Strategy', 'High-Definition Videography', 'Script Writing', 'Videography & Editing', 'Digi Marketrix'],
    relevantWork: 'Purple Collection (3K+ followers), Salemrr Biriyani (cinematic VJ promo), Chinnadurai Textiles (10K–15K views).'
  },
  {
    year: '2026',
    phase: 'STAGE 05',
    title: 'AI & DATA SCIENCE',
    headline: 'Technical Rigor & Machine Intelligence',
    workingOn: 'Commenced B.Tech in Artificial Intelligence & Data Science at Rathinam Technical Campus. Exploring predictive data models, IoT telemetry, and technical web architectures.',
    skills: ['Python', 'Data Analytics', 'Web Development', 'IoT Telemetry (ESP32)', 'Smart India Hackathon (MineGuardian)'],
    relevantWork: 'Jayashakthi Tours & Travels web platform, MineGuardian mine safety telemetry dashboard, ESP32 prototypes.'
  },
  {
    year: 'NEXT',
    phase: 'STAGE 06',
    title: 'BUILDING SOMETHING BIGGER',
    headline: 'From Services to Systems to AI-Assisted Products',
    workingOn: 'The convergence of digital marketing, personal branding, and artificial intelligence. Architecting scalable marketing automation systems and high-value agency workflows.',
    skills: ['System Architecture', 'Product Strategy', 'AI-Assisted Marketing', 'Venture Building', 'Full-Stack Ecosystems'],
    relevantWork: 'The long-term foundation: building an agency and technology platform that redefines digital brand positioning.'
  }
];

export function initJourney() {
  const container = document.getElementById('journey');
  if (!container) return;

  const nodeBtns = container.querySelectorAll('.journey-timeline-node');
  const detailCard = container.querySelector('.journey-detail-card');
  if (!nodeBtns.length || !detailCard) return;

  function setNode(index) {
    const data = journeyData[index];
    if (!data) return;

    nodeBtns.forEach((btn, idx) => {
      btn.classList.toggle('active', idx === index);
      btn.setAttribute('aria-selected', idx === index ? 'true' : 'false');
    });

    detailCard.innerHTML = `
      <div class="journey-card-top">
        <div class="journey-card-badge">
          <span class="badge-dot"></span>
          <span>${data.phase} // ${data.year}</span>
        </div>
        <span class="journey-card-year-huge">${data.year}</span>
      </div>

      <h3 class="journey-card-title">${data.title}</h3>
      <p class="journey-card-headline">${data.headline}</p>

      <div class="journey-card-grid">
        <div class="journey-card-col">
          <span class="journey-col-label">WHAT AAKASH WAS WORKING ON</span>
          <p class="journey-col-text">${data.workingOn}</p>
        </div>

        <div class="journey-card-col">
          <span class="journey-col-label">SKILLS DEVELOPED</span>
          <div class="journey-skills-pills">
            ${data.skills.map(s => `<span class="journey-skill-tag">${s}</span>`).join('')}
          </div>
        </div>

        <div class="journey-card-col">
          <span class="journey-col-label">RELEVANT WORK & MILESTONES</span>
          <p class="journey-col-text">${data.relevantWork}</p>
        </div>
      </div>
    `;

    detailCard.classList.remove('animate-in');
    void detailCard.offsetWidth; // Trigger reflow
    detailCard.classList.add('animate-in');
  }

  nodeBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => setNode(idx));
    btn.addEventListener('mouseenter', () => setNode(idx));
  });

  // Default to Stage 4 (Current Client Work & Agency execution)
  setNode(3);
}
