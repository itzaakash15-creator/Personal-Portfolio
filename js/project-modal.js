/**
 * AAKASH K Portfolio — Case Study Project Modal
 * Renders rich case study details and manages accessible modal state.
 */

const projectDetails = {
  fashion: {
    title: 'Fashion Model — Personal Branding',
    category: 'Personal Branding & Visual Direction',
    client: 'High-Fashion Editorial Talent',
    timeline: 'Campaign & Strategy',
    image: 'assets/project_fashion.jpg',
    overview: 'Developed comprehensive content and personal-branding direction for an editorial fashion modeling client, elevating their visual positioning, digital presence, and perceived industry value.',
    challenge: 'The client possessed exceptional talent and runway presence but lacked a cohesive digital narrative. Social content was inconsistent, diluting their perceived exclusivity and making talent agencies treat them as generic commercial talent rather than an editorial leader.',
    strategy: 'Shifted positioning from casual influencer posting to curated high-fashion editorial authority. Re-architected visual style guides, lighting direction, behind-the-scenes storytelling, and targeted industry hashtags.',
    execution: [
      'Engineered a cohesive dark-luxury editorial mood board for all social releases.',
      'Scripted short-form runway breakdown and aesthetic commentary videos.',
      'Optimized Instagram bio, pinned portfolio reels, and story highlights for agency scouts.',
      'Directed video pacing and color grading to mirror luxury magazine standards.'
    ],
    results: [
      'Perceived brand value elevated from regional talent to high-fashion editorial.',
      'Significantly increased inbound inquiries from premium fashion stylists and agencies.',
      'Content retention and profile visit conversion grew dramatically.'
    ]
  },
  textile: {
    title: 'Southern Textile Brand — Personal Branding',
    category: 'Personal Branding / Textile Heritage',
    client: 'Southern Heritage Weaving Label',
    timeline: 'Brand Elevation',
    image: 'assets/project_textile.jpg',
    overview: 'Worked on scripting, content creation, and personal-branding content for a southern luxury textile brand, transforming centuries of craftsmanship into compelling digital authority.',
    challenge: 'Traditional textile craftsmanship was perceived as an older, static industry. The brand was failing to communicate the painstaking human artistry, provenance, and luxurious premium nature of their weaves to modern digital buyers.',
    strategy: 'Positioned the brand founder as an authority in artisanal heritage and sustainable luxury. Humanized the brand through process-driven visual storytelling and cinematic micro-documentaries.',
    execution: [
      'Wrote engaging scripts highlighting the journey from raw thread to luxury heirloom.',
      'Formulated personal branding reels spotlighting master artisans and founder vision.',
      'Unified brand messaging across digital platforms with high-retention video hooks.'
    ],
    results: [
      'Transformed technical manufacturing into evocative luxury storytelling.',
      'Generated higher viewer engagement on long-form craftsmanship breakdowns.',
      'Established the founder as a respected voice in authentic textile preservation.'
    ]
  },
  food: {
    title: 'Food Industry — Digital Marketing',
    category: 'Digital Marketing & Content Strategy',
    client: 'Artisan Gastronomy Brand',
    timeline: 'Marketing & Audience Growth',
    image: 'assets/project_food.jpg',
    overview: 'Executed targeted digital marketing and sensory content creation within the culinary space, driving deep audience engagement and brand recall.',
    challenge: 'In a saturated culinary market, standard food photos failed to halt the scroll or drive reservations. The restaurant needed a visceral digital signature that conveyed flavor and culinary theater.',
    strategy: 'Created high-stimulus, sensory-focused short-form content emphasizing preparation sound (ASMR), flame/smoke visuals, and chef philosophy to trigger immediate craving and curiosity.',
    execution: [
      'Produced dynamic culinary reels capturing plating precision and kitchen atmosphere.',
      'Implemented local engagement strategies that turned food enthusiasts into repeat advocates.',
      'Optimized content release timing around peak dining decision hours.'
    ],
    results: [
      'Noticeable surge in digital engagement and audience shares across food communities.',
      'Built a recognizable digital visual identity distinct from local competitors.',
      'Solidified practical mastery of sensory audience psychology.'
    ]
  },
  industrial: {
    title: 'Startup & Industrial Brands',
    category: 'Digital Marketing / Content & B2B',
    client: 'Precision Engineering & Tech Startups',
    timeline: 'Digital Positioning',
    image: 'assets/project_industrial.jpg',
    overview: 'Engineered digital content strategies across high-precision industrial engineering and early-stage startup environments to communicate complex value propositions clearly.',
    challenge: 'Industrial B2B companies often suffer from dry, impenetrable corporate messaging that obscures their technological edge and forward-thinking engineering.',
    strategy: 'Demystified high-tech machinery and proprietary processes using clean cinematic framing, punchy explanatory scripts, and futuristic visual branding.',
    execution: [
      'Crafted high-definition showcases of precision titanium and metal CNC fabrication.',
      'Designed LinkedIn and digital media strategies targeting decision-makers and founders.',
      'Aligned technical specifications with relatable commercial benefits.'
    ],
    results: [
      'Dramatically increased engagement on professional platforms (LinkedIn).',
      'Proven ability to translate deep industrial and startup jargon into punchy, compelling branding.'
    ]
  }
};

export function initProjectModal() {
  const modalOverlay = document.getElementById('project-modal');
  if (!modalOverlay) return;

  const closeBtn = modalOverlay.querySelector('.modal-close-btn');
  const modalContent = modalOverlay.querySelector('.modal-dynamic-content');

  function openModal(projectId) {
    const data = projectDetails[projectId];
    if (!data) return;

    modalContent.innerHTML = `
      <div class="modal-image-wrapper">
        <img src="${data.image}" alt="${data.title}" loading="lazy" />
      </div>
      
      <div class="modal-header-meta">
        <span class="section-label">${data.category}</span>
        <h3 class="section-heading" style="font-size: clamp(1.6rem, 3.5vw, 2.5rem); margin-bottom: 1.5rem;">${data.title}</h3>
      </div>

      <div class="modal-meta-grid">
        <div class="modal-meta-item">
          <div class="meta-label">Client Type</div>
          <div class="meta-value">${data.client}</div>
        </div>
        <div class="modal-meta-item">
          <div class="meta-label">Focus Area</div>
          <div class="meta-value">${data.category.split('/')[0].trim()}</div>
        </div>
        <div class="modal-meta-item">
          <div class="meta-label">Scope</div>
          <div class="meta-value">${data.timeline}</div>
        </div>
      </div>

      <div class="modal-body">
        <h4>Overview</h4>
        <p>${data.overview}</p>

        <h4>The Challenge</h4>
        <p>${data.challenge}</p>

        <h4>Strategic Angle</h4>
        <p>${data.strategy}</p>

        <h4>Execution & Delivery</h4>
        <ul class="modal-bullets">
          ${data.execution.map(item => `<li>${item}</li>`).join('')}
        </ul>

        <h4>Value Shift & Impact</h4>
        <ul class="modal-bullets">
          ${data.results.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Card click triggers
  const workCards = document.querySelectorAll('.work-card');
  workCards.forEach((card) => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-project');
      if (projectId) openModal(projectId);
    });
  });

  closeBtn?.addEventListener('click', closeModal);

  // Close on backdrop click
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // Close on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}
