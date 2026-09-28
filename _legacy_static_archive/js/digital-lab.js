/**
 * AAKASH K Portfolio — Digital Lab (Hardware, AI, Web, SIH)
 * Communicates: Aakash is not only a marketer. He is learning to build technology.
 * Categories: WEB, AI/DATA, HARDWARE, SIH
 */

export const labProjects = [
  {
    id: 'mineguardian',
    category: 'sih',
    categoryLabel: 'SIH / HARDWARE',
    title: 'MineGuardian / MineCore',
    subtitle: 'Underground Mine Safety & Hazardous Gas Telemetry System',
    description: 'Engineered for Smart India Hackathon: an integrated sensor network deploying multi-gas monitoring (CH4, CO, O2 deficiency), seismic telemetry, and environmental condition tracking with real-time alerting for underground miners.',
    tech: ['ESP32', 'MQ-4 / MQ-7 Sensors', 'IoT Telemetry', 'Dashboard UI', 'Hardware Prototyping'],
    status: 'SIH PROTOTYPE',
    featured: true,
    image: 'assets/lab_mineguardian.jpg'
  },
  {
    id: 'jayashakthi-lab',
    category: 'web',
    categoryLabel: 'WEB / ARCHITECTURE',
    title: 'Jayashakthi Fleet Platform & Admin Portal',
    subtitle: 'Production Travel & Fleet Infrastructure',
    description: 'Designed and engineered the commercial web platform and administrative control center for Jayashakthi Tours & Travels, featuring dynamic vehicle fleet listings, route dispatch architecture, and direct lead generation.',
    tech: ['HTML5 / CSS3', 'JavaScript ES6+', 'Information Architecture', 'SEO & Performance', 'Responsive UI'],
    status: 'PRODUCTION ACTIVE',
    featured: true,
    image: 'assets/project_jayashakthi.jpg',
    url: 'https://www.jayashakthitoursandtravels.com/'
  },
  {
    id: 'esp32-env',
    category: 'hardware',
    categoryLabel: 'HARDWARE / IOT',
    title: 'ESP32 Fire & Thermal Telemetry Hub',
    subtitle: 'Microcontroller Environmental Monitoring',
    description: 'Configured an ESP32 microcontroller with flame detectors, DHT22 ambient sensors, and an MQTT cloud link to stream live temperature, humidity, and fire-risk alerts to a centralized remote dashboard.',
    tech: ['ESP32', 'C++ / Arduino IDE', 'DHT22', 'Flame Sensor', 'MQTT Protocol'],
    status: 'HARDWARE LAB',
    featured: false
  },
  {
    id: 'grandcare',
    category: 'sih',
    categoryLabel: 'SIH / IOT',
    title: 'GrandCare — Assistive Health Telemetry',
    subtitle: 'Elderly Safety & Fall Detection Monitor',
    description: 'Concept and sensor telemetry prototype developed for emergency assistance, automated accelerometer-based fall detection, and health vitals reporting for geriatric home care.',
    tech: ['MPU-6050 Accelerometer', 'ESP32', 'Firebase Realtime DB', 'Alerting Webhook'],
    status: 'RESEARCH CONCEPT',
    featured: false
  },
  {
    id: 'powersense',
    category: 'hardware',
    categoryLabel: 'HARDWARE / ENERGY',
    title: 'PowerSense Energy Telemetry',
    subtitle: 'Smart Current & Consumption Profiler',
    description: 'Non-invasive CT current sensor architecture designed to capture real-time electrical load fluctuations, computing instantaneous wattage and alerting on anomalous power spikes.',
    tech: ['SCT-013 Sensor', 'Microcontroller ADC', 'Energy Profiling', 'Data Visualization'],
    status: 'PROTOTYPE',
    featured: false
  },
  {
    id: 'ai-experiments',
    category: 'ai',
    categoryLabel: 'AI & DATA SCIENCE',
    title: 'Data Science & Predictive Experiments',
    subtitle: 'Foundational ML Models & Statistical Analytics',
    description: 'Applied machine learning notebooks and data analytics exploring regression, classification algorithms, and exploratory data analysis (EDA) as part of B.Tech AI & Data Science coursework at Rathinam.',
    tech: ['Python', 'Pandas & NumPy', 'Scikit-Learn', 'Matplotlib / Seaborn', 'Data Pipelines'],
    status: 'ACTIVE STUDY',
    featured: false
  },
  {
    id: 'solidworks-cad',
    category: 'hardware',
    categoryLabel: 'CAD / HARDWARE',
    title: 'SolidWorks & Tinkercad Prototyping',
    subtitle: '3D Mechanical Enclosures & Circuit Simulation',
    description: 'Computer-aided design (CAD) of hardware enclosures, component mounts for sensor modules, and Tinkercad schematic validation before physical circuit breadboarding.',
    tech: ['SolidWorks', 'Tinkercad', '3D Modeling', 'Circuit Schematics'],
    status: 'LAB PROTOTYPE',
    featured: false
  }
];

export function initDigitalLab() {
  const container = document.getElementById('lab');
  if (!container) return;

  const filterBtns = container.querySelectorAll('.lab-filter-btn');
  const grid = container.querySelector('.lab-grid');
  if (!filterBtns.length || !grid) return;

  function render(category = 'all') {
    const filtered = category === 'all' 
      ? labProjects 
      : labProjects.filter(p => p.category === category);

    grid.innerHTML = filtered.map(p => `
      <div class="lab-card spotlight-card ${p.featured ? 'lab-card-featured' : ''}" data-category="${p.category}">
        ${p.image ? `
          <div class="lab-card-image-wrap">
            <img src="${p.image}" alt="${p.title}" class="lab-card-img" loading="lazy" />
            <div class="lab-card-image-overlay"></div>
          </div>
        ` : ''}

        <div class="lab-card-content">
          <div class="lab-card-header">
            <span class="lab-cat-badge">${p.categoryLabel}</span>
            <span class="lab-status-badge ${p.status.includes('PRODUCTION') ? 'status-prod' : ''}">${p.status}</span>
          </div>

          <h3 class="lab-title">${p.title}</h3>
          <h4 class="lab-subtitle">${p.subtitle}</h4>
          <p class="lab-desc">${p.description}</p>

          <div class="lab-tech-tags">
            ${p.tech.map(t => `<span class="lab-tag">${t}</span>`).join('')}
          </div>

          ${p.url ? `
            <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="lab-link-cta">
              <span>EXPLORE PLATFORM ↗</span>
            </a>
          ` : ''}
        </div>
      </div>
    `).join('');

    if (window.__refreshCursor) window.__refreshCursor();
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter') || 'all';
      render(cat);
    });
  });

  // Initial render all
  render('all');
}
