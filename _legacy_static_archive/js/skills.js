/**
 * AAKASH K Portfolio — Interactive Skills Constellation System
 * No fake percentage bars!
 * Categorized into CREATIVE, DIGITAL, TECH.
 * Hovering on a skill highlights the connected real-world work.
 */

export const skillsMapping = {
  // CREATIVE
  'Content Creation': {
    category: 'CREATIVE',
    projects: ['Life With Aakash (59K Peak Reel)', 'Purple Collection', 'Salemrr Biriyani'],
    summary: 'High-impact visual narratives engineered to capture and hold user attention.'
  },
  'Video Editing': {
    category: 'CREATIVE',
    projects: ['Transformation Series (5-Video Lift)', 'Purple Collection', 'Salemrr Biriyani'],
    summary: 'Pacing, sound design (ASMR), color grading, and retention-oriented cuts.'
  },
  'Videography': {
    category: 'CREATIVE',
    projects: ['Salemrr Biriyani Commercial Shoot', 'Editorial Model Videography'],
    summary: 'High-frame-rate cinematic camera operation, macro food captures, and lighting.'
  },
  'Script Writing': {
    category: 'CREATIVE',
    projects: ['Chinnadurai Textiles (10K–15K Views)', 'Salemrr Biriyani VJ Screenplay'],
    summary: 'Scroll-stopping 2-second hooks, value-dense narrative arcs, and calls-to-action.'
  },
  'Storytelling': {
    category: 'CREATIVE',
    projects: ['Southern Textile Heritage Series', 'Personal Branding Founder Narratives'],
    summary: 'Translating complex traditional craftsmanship and founder vision into emotional resonance.'
  },

  // DIGITAL
  'Digital Marketing': {
    category: 'DIGITAL',
    projects: ['Digi Marketrix Commercial Internship', 'Jayashakthi Tours & Travels Promotion'],
    summary: 'Organic customer acquisition, market positioning, and digital distribution flywheels.'
  },
  'Personal Branding': {
    category: 'DIGITAL',
    projects: ['Purple Collection (3K+ Followers)', 'Life With Aakash', 'Chinnadurai Textiles'],
    summary: 'Architecting executive and creator digital personas that compound trust and opportunity.'
  },
  'Content Strategy': {
    category: 'DIGITAL',
    projects: ['Digi Marketrix Content Calendars', 'Chinnadurai Video Roadmaps'],
    summary: 'Audience persona research, competitor gap analysis, and content taxonomy.'
  },
  'Instagram Strategy': {
    category: 'DIGITAL',
    projects: ['Best Reels Creator Award 2025', 'Purple Collection Account Growth'],
    summary: 'Algorithm optimization, audio trend capitalization, and profile conversion architecture.'
  },
  'Social Media Strategy': {
    category: 'DIGITAL',
    projects: ['Young Informative Content Award 2025', 'Client Brand Expansions'],
    summary: 'Multi-platform content distribution, community nurturing, and analytics tracking.'
  },
  'Brand Communication': {
    category: 'DIGITAL',
    projects: ['Founder Positioning Campaigns', 'Textile Artisan Showcases'],
    summary: 'Eliminating jargon to convey a brand’s core competitive value proposition clearly.'
  },
  'SEO': {
    category: 'DIGITAL',
    projects: ['Jayashakthi Tours & Travels Search Indexing', 'Local Search Presence'],
    summary: 'Semantic metadata, on-page search indexing, high-intent travel keyword targeting.'
  },
  'Website Building': {
    category: 'DIGITAL',
    projects: ['jayashakthitoursandtravels.com', 'Aakash K Command Portfolio'],
    summary: 'Modern semantic web development, responsive UX architecture, and business conversion.'
  },

  // TECH
  'AI & Data Science': {
    category: 'TECH',
    projects: ['B.Tech AI & Data Science (Rathinam)', 'Machine Learning Pipelines & Data Experiments'],
    summary: 'Mathematical modeling, exploratory data analysis, and intelligent algorithms.'
  },
  'Web Development': {
    category: 'TECH',
    projects: ['Jayashakthi Production Portal', 'Portfolio Command Center'],
    summary: 'Vanilla ES6+, HTML5, CSS design systems, Web Audio API, Canvas rendering.'
  },
  'IoT': {
    category: 'TECH',
    projects: ['MineGuardian Telemetry (SIH)', 'ESP32 Fire & Environmental System'],
    summary: 'Microcontroller hardware networks, sensor telemetry, and cloud data transmission.'
  },
  'Hardware Prototyping': {
    category: 'TECH',
    projects: ['PowerSense Current Profiler', 'GrandCare Sensor Module'],
    summary: 'Breadboard circuit assembly, ADC telemetry, sensor calibration, and wiring.'
  },
  'Firebase': {
    category: 'TECH',
    projects: ['Realtime IoT Cloud Sync', 'Sensor Data Telemetry Store'],
    summary: 'NoSQL cloud database sync and instant event triggers for connected hardware.'
  },
  'Git / GitHub': {
    category: 'TECH',
    projects: ['github.com/itzaakash15-creator', 'Collaborative Code Repositories'],
    summary: 'Version control, atomic commits, repository documentation, and branch management.'
  }
};

export function initSkills() {
  const container = document.getElementById('skills');
  if (!container) return;

  const skillPills = container.querySelectorAll('.skill-pill');
  const previewPanel = container.querySelector('.skills-interactive-preview');
  if (!skillPills.length || !previewPanel) return;

  function updatePreview(skillName) {
    const data = skillsMapping[skillName];
    if (!data) return;

    previewPanel.innerHTML = `
      <div class="skill-preview-badge">
        <span class="preview-dot"></span>
        <span>${data.category} // SKILL CONNECTIONS</span>
      </div>
      <h3 class="skill-preview-name">${skillName}</h3>
      <p class="skill-preview-summary">${data.summary}</p>
      
      <div class="skill-preview-linked-wrap">
        <span class="linked-label">DIRECT REAL-WORLD EVIDENCE & DELIVERABLES:</span>
        <ul class="skill-linked-projects">
          ${data.projects.map(p => `
            <li>
              <span class="linked-bullet">→</span>
              <span class="linked-title">${p}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `;

    skillPills.forEach(p => {
      p.classList.toggle('active', p.getAttribute('data-skill') === skillName);
    });
  }

  skillPills.forEach(pill => {
    const name = pill.getAttribute('data-skill');
    pill.addEventListener('mouseenter', () => updatePreview(name));
    pill.addEventListener('click', () => updatePreview(name));
  });

  // Default to Personal Branding
  updatePreview('Personal Branding');
}
