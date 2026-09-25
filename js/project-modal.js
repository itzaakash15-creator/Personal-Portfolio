/**
 * AAKASH K Portfolio — Fullscreen Agency Case Study Modal
 * Implements the 7-part agency architecture:
 * 01 THE CHALLENGE
 * 02 MY ROLE
 * 03 THE APPROACH
 * 04 THE WORK
 * 05 THE RESULT
 * 06 THE PROOF
 * 07 NEXT PROJECT
 */

import { playOpenSound } from './audio.js';

export const projectData = {
  'purple-collection': {
    id: 'purple-collection',
    number: '01',
    title: 'PURPLE COLLECTION',
    subtitle: 'High-Fashion Editorial Talent Personal Branding',
    category: 'PERSONAL BRANDING / FASHION / SOCIAL',
    tags: ['Personal Branding', 'Content Strategy', 'Videography', 'Video Editing', 'Instagram Management'],
    client: 'Fashion & Editorial Model',
    scope: 'Brand Positioning & Content Production',
    image: 'assets/project_fashion.jpg',
    url: null,
    sections: {
      challenge: 'The client possessed high-fashion runway presence and striking visual appeal, but had an uncurated digital presence that failed to attract agency bookings and luxury brand partnerships. Previous posts were casual selfies and inconsistent clips that diluted their perceived market positioning.',
      role: [
        'Content Strategy & Visual Identity Design',
        'Script Writing & Scene Direction',
        'High-Definition Videography & Lighting Setup',
        'Precision Video Editing & Color Grading',
        'Instagram Account Management & Grid Aesthetic',
        'Competitor Research & Trend Benchmarking',
        'Profile Bio Optimization & Conversion Funnel'
      ],
      approach: 'Shifted the narrative from standard influencer posting to a strictly curated high-fashion editorial persona. We planned targeted video themes focusing on runway breakdowns, styling nuances, and behind-the-scenes artistry. Each video hook was engineered to halt the scroll within 1.5 seconds with dark-luxury atmospheric lighting.',
      work: 'Produced multiple episodic short-form reels with custom color grades mimicking Vogue and Harper’s Bazaar editorial tone. Aligned audio with trending high-retention pacing while preserving a bespoke, elevated luxury feel. Refined the client’s Instagram bio, highlights, and pinned reels into a digital agency comp-card.',
      result: 'Accelerated audience growth to approximately 3,000 targeted followers. Multiple reels generated viral algorithmic distribution and established a recognizable high-fashion visual signature.',
      proof: 'Verified metrics: 3,000+ targeted followers, high-performing published reels with organic reach, and tangible inbound inquiries from regional fashion stylists and commercial casting scouts.',
    },
    nextId: 'jayashakthi'
  },

  'jayashakthi': {
    id: 'jayashakthi',
    number: '02',
    title: 'JAYASHAKTHI TOURS & TRAVELS',
    subtitle: 'Modern Business Platform & Fleet Management Portal',
    category: 'WEB / DIGITAL / BUSINESS',
    tags: ['Web Development', 'Admin Portal', 'UI/UX Design', 'Information Architecture', 'Responsive Design'],
    client: 'Jayashakthi Tours & Travels',
    scope: 'End-to-End Web Platform & Fleet Architecture',
    image: 'assets/project_jayashakthi.jpg',
    url: 'https://www.jayashakthitoursandtravels.com/',
    sections: {
      challenge: 'Jayashakthi Tours & Travels operated predominantly through offline word-of-mouth and manual phone scheduling. They needed a contemporary digital presence to capture high-intent travelers, showcase vehicle fleet categories, and streamline inbound booking inquiries without friction.',
      role: [
        'Full Web Platform Architecture & Design',
        'Information Architecture & Navigation Flow',
        'Mobile-Responsive Frontend Development',
        'Fleet Management & Route Presentation UI',
        'Admin Portal UX for Inquiries & Bookings',
        'Business SEO Optimization & Performance Tuning'
      ],
      approach: 'Designed an intuitive, customer-centric booking journey where travelers can view vehicle classes, amenities, route transparent pricing, and instant contact options in seconds. Built a dedicated back-office administrative interface structure for managing fleet availability and incoming customer bookings.',
      work: 'Developed a high-performance, mobile-first website with clean visual hierarchy, crisp typography, and interactive fleet galleries. Engineered an admin dashboard layout that gives operators clear visibility over route requests, vehicle status, and client reservations.',
      result: 'Delivered a production-ready, search-engine-indexed digital asset at jayashakthitoursandtravels.com. The platform provides credibility for commercial clients, corporate travel coordinators, and family tour packages.',
      proof: 'Live published website deployed at https://www.jayashakthitoursandtravels.com/ with responsive UI, integrated route showcase, and business booking architecture.',
    },
    nextId: 'chinnadurai'
  },

  'chinnadurai': {
    id: 'chinnadurai',
    number: '03',
    title: 'CHINNADURAI TEXTILES',
    subtitle: 'Heritage Craftsmanship Scripting & Content Strategy',
    category: 'CONTENT / SCRIPTWRITING / PERSONAL BRANDING',
    tags: ['Content Strategy', 'Script Writing', 'Brand Narrative', 'Competitor Research', 'Personal Branding'],
    client: 'Chinnadurai Textiles',
    scope: 'Content Strategy & Scripting Frameworks',
    image: 'assets/project_textile.jpg',
    url: null,
    sections: {
      challenge: 'Heritage textile businesses frequently struggle to articulate their traditional craftsmanship, premium fabric provenance, and family legacy to younger social audiences who find conventional retail ads monotonous.',
      role: [
        'Content Strategy & Thematic Narrative Planning',
        'High-Retention Script Writing for Video Content',
        'Captions & Social Copywriting',
        'Competitor & Local Market Research',
        'Brand Positioning Strategy'
      ],
      approach: 'Focused strictly on narrative positioning and storytelling scripts. Instead of generic promotional pitches, each script opened with a compelling hook highlighting the intricate handloom weaves, the human stories of artisans, and the sensory quality of the fabrics.',
      work: 'Authored an episodic series of video scripts designed for short-form retention. Structured clear opening questions, paced narrative arcs, and informative hooks that conveyed cultural pride and textile expertise without marketing jargon.',
      result: 'Delivered verified social video performance with individual videos generating 10K to 15K organic views, substantially elevating brand credibility in the region.',
      proof: 'Documented performance evidence showing 10K–15K view milestones on published scripted content with organic audience engagement and positive regional brand sentiment.',
    },
    nextId: 'salemrr'
  },

  'salemrr': {
    id: 'salemrr',
    number: '04',
    title: 'SALEMRR BIRIYANI',
    subtitle: 'Cinematic Culinary Promotion & On-Screen Screenplay',
    category: 'BRAND PROMOTION / VIDEO / FOOD',
    tags: ['Cinematic Videography', 'Script Writing', 'Screenplay', 'Video Editing', 'Video VJ', 'Content Strategy'],
    client: 'Salemrr Biriyani',
    scope: 'Brand Promotional Reel & Sensory Production',
    image: 'assets/project_food.jpg',
    url: null,
    sections: {
      challenge: 'The food & culinary sector is intensely saturated with repetitive quick cuts and low-fidelity smartphone videos. Salemrr Biriyani required a distinctive, high-stimulus promotional reel that highlighted aroma, craft, and authentic flavor to drive foot traffic.',
      role: [
        'Complete Video Script & Screenplay Development',
        'Cinematic High-Frame-Rate Food Videography',
        'On-Camera Presenter / Video VJ Hosting',
        'Sensory Video Editing & Audio Sound Design',
        'Strategic Distribution Recommendations'
      ],
      approach: 'Combined energetic on-screen personality (VJ hosting) with macro culinary close-ups (steam, sizzling meat, cascading saffron rice) and rhythmic sound effects (ASMR sizzles and blade cuts) to trigger instant appetite and memorable recall.',
      work: 'Directed and shot the promotional reel on location, capturing the intense energy of open-fire cauldrons and the signature biriyani dum-breaking ritual. Seamlessly wove on-camera narration with fast-paced visual storytelling.',
      result: 'Created an engaging commercial video sample with strong retention rates and shareability across local food enthusiast communities.',
      proof: 'Published primary promotional reel showcasing end-to-end creative direction, scriptwriting, on-camera presentation, and cinematic food editing.',
    },
    nextId: 'purple-collection'
  }
};

export function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const container = modal?.querySelector('.modal-dynamic-content');
  const closeBtn = modal?.querySelector('.modal-close-btn');
  if (!modal || !container) return;

  function renderProject(projectId) {
    const p = projectData[projectId];
    if (!p) return;

    const nextProject = projectData[p.nextId];

    container.innerHTML = `
      <article class="case-study-view">
        <!-- Case Study Header Banner -->
        <header class="case-study-hero">
          <div class="case-study-meta-top">
            <span class="case-study-num">${p.number} // CASE STUDY</span>
            <span class="case-study-category">${p.category}</span>
          </div>

          <h2 class="case-study-title">${p.title}</h2>
          <p class="case-study-subtitle">${p.subtitle}</p>

          <div class="case-study-tags">
            ${p.tags.map(t => `<span class="case-tag">${t}</span>`).join('')}
          </div>

          <div class="case-study-media-wrapper">
            <img src="${p.image}" alt="${p.title}" class="case-study-media-img" />
            <div class="case-study-media-gradient"></div>
            ${p.url ? `
              <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="case-study-live-btn btn btn-primary">
                <span>VISIT LIVE PLATFORM ↗</span>
              </a>
            ` : ''}
          </div>
        </header>

        <!-- Project Meta Strip -->
        <div class="case-meta-strip">
          <div class="meta-strip-col">
            <span class="meta-strip-label">CLIENT</span>
            <span class="meta-strip-val">${p.client}</span>
          </div>
          <div class="meta-strip-col">
            <span class="meta-strip-label">SCOPE</span>
            <span class="meta-strip-val">${p.scope}</span>
          </div>
          <div class="meta-strip-col">
            <span class="meta-strip-label">STATUS</span>
            <span class="meta-strip-val text-accent">DELIVERED & VERIFIED</span>
          </div>
        </div>

        <!-- 7-Part Agency Structure -->
        <div class="case-study-body">
          <!-- 01 The Challenge -->
          <section class="case-block">
            <div class="case-block-header">
              <span class="block-step-num">01</span>
              <h3 class="block-step-title">THE CHALLENGE</h3>
            </div>
            <p class="block-step-desc">${p.sections.challenge}</p>
          </section>

          <!-- 02 My Role -->
          <section class="case-block">
            <div class="case-block-header">
              <span class="block-step-num">02</span>
              <h3 class="block-step-title">MY ROLE & DELIVERABLES</h3>
            </div>
            <ul class="case-role-list">
              ${p.sections.role.map(r => `
                <li>
                  <span class="role-bullet">⚡</span>
                  <span>${r}</span>
                </li>
              `).join('')}
            </ul>
          </section>

          <!-- 03 The Approach -->
          <section class="case-block">
            <div class="case-block-header">
              <span class="block-step-num">03</span>
              <h3 class="block-step-title">THE STRATEGIC APPROACH</h3>
            </div>
            <p class="block-step-desc">${p.sections.approach}</p>
          </section>

          <!-- 04 The Work -->
          <section class="case-block">
            <div class="case-block-header">
              <span class="block-step-num">04</span>
              <h3 class="block-step-title">THE EXECUTION & WORK</h3>
            </div>
            <p class="block-step-desc">${p.sections.work}</p>
          </section>

          <!-- 05 The Result -->
          <section class="case-block">
            <div class="case-block-header">
              <span class="block-step-num">05</span>
              <h3 class="block-step-title">THE RESULT</h3>
            </div>
            <div class="case-result-box">
              <p class="block-step-desc">${p.sections.result}</p>
            </div>
          </section>

          <!-- 06 The Proof -->
          <section class="case-block">
            <div class="case-block-header">
              <span class="block-step-num">06</span>
              <h3 class="block-step-title">VERIFIED PROOF & SIGNALS</h3>
            </div>
            <div class="proof-verified-badge">
              <span class="proof-dot"></span>
              <span>VERIFIED REAL-WORLD EVIDENCE</span>
            </div>
            <p class="block-step-desc" style="margin-top: 0.75rem;">${p.sections.proof}</p>
          </section>

          <!-- 07 Next Project -->
          <footer class="case-study-next-footer">
            <span class="block-step-num">07</span>
            <div class="next-project-teaser">
              <span class="next-label">NEXT CASE STUDY</span>
              <h4 class="next-title">${nextProject.title}</h4>
              <p class="next-desc">${nextProject.subtitle}</p>
              <button type="button" class="btn btn-secondary btn-next-case" data-next-id="${nextProject.id}">
                <span>EXPLORE ${nextProject.title} →</span>
              </button>
            </div>
          </footer>
        </div>
      </article>
    `;

    // Hook up Next Project button
    const nextBtn = container.querySelector('.btn-next-case');
    nextBtn?.addEventListener('click', () => {
      const nextId = nextBtn.getAttribute('data-next-id');
      if (nextId) {
        modal.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => renderProject(nextId), 150);
      }
    });

    if (window.__refreshCursor) window.__refreshCursor();
  }

  function openModal(projectId) {
    if (!projectData[projectId]) return;
    renderProject(projectId);
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modal.scrollTo(0, 0);
    playOpenSound();
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Work card triggers
  document.querySelectorAll('[data-project]').forEach((card) => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-project');
      if (id) openModal(id);
    });
  });

  closeBtn?.addEventListener('click', closeModal);

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Close on ESC
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}
