export interface ProofItem {
  id?: string;
  title: string;
  category: string;
  period?: string;
  type: 'image' | 'video';
  image?: string;
  video?: string;
  poster?: string;
  src?: string;
  desc?: string;
  storyOrProof?: string;
  linkText?: string;
  linkUrl?: string;
  caption?: string;
  project?: string;
  year?: string;
}

export const proofData: Record<string, ProofItem> = {
    'digi-cert': {
      title: 'Digi Marketrix — Certified Internship Completion',
      category: 'OFFICIAL CREDENTIAL',
      period: 'May 1, 2026 — July 1, 2026 // Tuticorin',
      type: 'image',
      image: '/assets/proofs_optimized/digi_marketrix_certificate.jpg',
      desc: 'Official internship completion certificate issued and signed by Antony Joyson Fernando, CEO of Digi Marketrix. Formally verifies full-time agency experience in commercial scripting, on-location videography, and post-production video editing.',
      linkText: 'View Digi Marketrix LinkedIn ↗',
      linkUrl: 'https://www.linkedin.com/company/digimarketrix/'
    },
    'digi-office': {
      title: 'Digi Marketrix — Agency Studio & 3D Logo Wall',
      category: 'AGENCY ENVIRONMENT',
      period: 'Thoothukudi Studio // Agency Headquarters',
      type: 'image',
      image: '/assets/proofs_optimized/digi_marketrix_office.jpg',
      desc: 'The physical workplace at Digi Marketrix featuring the illuminated 3D logo wall. The creative operations hub where commercial campaigns, client pitches, and video production strategies were formulated.',
      linkText: 'Explore Agency LinkedIn ↗',
      linkUrl: 'https://www.linkedin.com/company/digimarketrix/'
    },
    'digi-working': {
      title: 'Digi Marketrix — In-House Editing & Timeline Workflow',
      category: 'POST-PRODUCTION',
      period: 'Premiere Pro Timeline // Video Editing',
      type: 'image',
      image: '/assets/proofs_optimized/digi_marketrix_working.jpg',
      desc: 'Behind-the-scenes photograph capturing commercial video post-production in Adobe Premiere Pro at Digi Marketrix. Demonstrates multi-layer timeline cutting, rhythm pacing, sound effects, and color grading.',
      linkText: 'Digi Marketrix on LinkedIn ↗',
      linkUrl: 'https://www.linkedin.com/company/digimarketrix/'
    },
    'digi-gimbal': {
      title: 'Digi Marketrix — On-Location Gimbal Videography',
      category: 'FIELD PRODUCTION',
      period: '3-Axis Gimbal Stabilization // Commercial Shoot',
      type: 'image',
      image: '/assets/proofs_optimized/digi_marketrix_gimbal_shoot.jpg',
      desc: 'On-location videography shoot utilizing a 3-axis motorized gimbal for dynamic, fluid commercial camera movement across retail, hospitality, and automotive client spaces.',
      linkText: 'Digi Marketrix on LinkedIn ↗',
      linkUrl: 'https://www.linkedin.com/company/digimarketrix/'
    },
    'digi-video-shooting': {
      title: 'Digi Marketrix — Shooting to Uploading Production Reel',
      category: 'PRODUCTION REEL',
      period: 'End-to-End Workflow // Shoot to Post',
      type: 'video',
      video: '/assets/proofs_optimized/digi_work_shooting_uploading.mp4',
      poster: '/assets/proofs_optimized/poster_digi_shooting_uploading.jpg',
      desc: 'Full workflow record demonstrating the complete creative cycle: storyboard planning, field camera operation, post-production timeline editing, client review, and final digital distribution.',
      linkText: 'Digi Marketrix on LinkedIn ↗',
      linkUrl: 'https://www.linkedin.com/company/digimarketrix/'
    },
    'salemrr-bts': {
      title: 'Salem RR Biriyani — Commercial Shoot Production',
      category: 'CLIENT CAMPAIGN',
      period: 'Thoothukudi // Food & Hospitality',
      type: 'image',
      image: '/assets/proofs_optimized/salemrr_shoot_bts.jpg',
      desc: 'Behind-the-scenes photography during the commercial video shoot for Salem RR Biriyani. Handled on-camera VJ presentation, culinary lighting, and close-up food videography.',
      linkText: 'Watch Reel on Instagram ↗',
      linkUrl: 'https://www.instagram.com/reel/DahRlLUSNZ0/'
    },
    'salemrr-food': {
      title: 'Salem RR Biriyani — Commercial Food Promotion Reel',
      category: 'COMMERCIAL REEL',
      period: 'VJ, Scripting & Editing // Salem RR Biriyani',
      type: 'image',
      image: '/assets/proofs_optimized/salemrr_reel_2848.jpg',
      desc: 'Featured commercial reel frame from Salem RR Biriyani campaign. Seamlessly combined dynamic culinary closeups, pacing, and engaging on-screen VJ storytelling.',
      linkText: 'Watch Reel on Instagram ↗',
      linkUrl: 'https://www.instagram.com/reel/DahRlLUSNZ0/'
    },
    'talentrix-reel': {
      title: 'Talentrix — Sub-Brand Influencer Marketing Reel',
      category: 'SUB-BRAND INITIATIVE',
      period: 'Digi Marketrix Influencer Division',
      type: 'image',
      image: '/assets/proofs_optimized/salemrr_reel_2870.jpg',
      desc: 'Commercial reel produced for Talentrix (@talentrix_), the specialized talent & influencer marketing division under Digi Marketrix, connecting brands with high-retention regional creators.',
      linkText: 'View Reel on Instagram ↗',
      linkUrl: 'https://www.instagram.com/reel/DYhJlysI9Nr/'
    },
    'purple-bts': {
      title: 'Purple Collection — Personal Branding Shoot BTS',
      category: 'PERSONAL BRANDING',
      period: 'Client Production // Fashion & Retail',
      type: 'image',
      image: '/assets/proofs_optimized/purple_collection_bts_large.jpg',
      desc: 'On-location personal branding direction and video capture for Purple Collection. Establishing premium editorial tone, camera framing, and scripted talking points.',
      linkText: 'Visit Client Instagram ↗',
      linkUrl: 'https://www.instagram.com/mr._aku_vlogs/'
    },
    'purple-video': {
      title: 'Purple Collection — Complete Client Campaign Video',
      category: 'CLIENT VIDEO',
      period: 'Direction, Filming & Editing by Aakash',
      type: 'video',
      video: '/assets/proofs_optimized/personal_branding_video.mp4',
      poster: '/assets/proofs_optimized/poster_personal_branding_video.jpg',
      desc: 'Full promotional video conceived, filmed, and edited for Purple Collection. Employs rhythmic pacing, music synchronization, and compelling visual hooks.',
      linkText: 'Visit Client Instagram ↗',
      linkUrl: 'https://www.instagram.com/mr._aku_vlogs/'
    },
    'personal-branding-video': {
      title: 'Personal Branding Client Video — 100% Executed by Aakash',
      category: 'COMMERCIAL VIDEO REEL',
      period: 'Direction, Filming & Editing by Aakash',
      type: 'video',
      video: '/assets/proofs_optimized/personal_branding_video.mp4',
      poster: '/assets/proofs_optimized/poster_personal_branding_video.jpg',
      desc: 'Complete commercial video planned, scripted, shot, and edited by Aakash. Incorporates high-retention hook architecture, sound design, and narrative pacing.',
      linkText: 'Explore Selected Work ↗',
      linkUrl: '#clients'
    },
    'purple-growth': {
      title: 'Purple Collection — Verified +3,000 Reach Growth',
      category: 'ANALYTICS & RESULTS',
      period: 'Meta Business Suite Analytics Screenshot',
      type: 'image',
      image: '/assets/proofs_optimized/purple_collection_growth_3000.jpg',
      desc: 'Verified platform metrics showing a 3,000+ follower and impression increase following the targeted personal branding content release for the client.',
      linkText: 'Visit Client Profile ↗',
      linkUrl: 'https://www.instagram.com/mr._aku_vlogs/'
    },
    'jayashakthi-site': {
      title: 'Jayashakthi Tours & Travels — Commercial Web Platform',
      category: 'WEB ENGINEERING',
      period: 'Live Production Deployment // Responsive Architecture',
      type: 'image',
      image: '/assets/proofs_optimized/jayashakthi_website.jpg',
      desc: 'Production commercial web portal built for Jayashakthi Tours & Travels, featuring responsive fleet showcase, inquiry workflows, and administrative management.',
      linkText: 'Visit Live Website ↗',
      linkUrl: 'https://www.jayashakthitoursandtravels.com/'
    },
    'tech-jayashakthi': {
      title: 'Jayashakthi Tours & Travels — Full-Stack Deployment',
      category: 'WEB ENGINEERING',
      period: 'Deployed Commercial Platform',
      type: 'image',
      image: '/assets/proofs_optimized/jayashakthi_website.jpg',
      desc: 'Complete commercial website deployed for regional tour operator, engineered with lightweight vanilla stack, fast page load speeds, and intuitive booking inquiries.',
      linkText: 'Visit Live Website ↗',
      linkUrl: 'https://www.jayashakthitoursandtravels.com/'
    },
    'chinnadurai-scripting': {
      title: 'Chinnadurai Textiles — Commercial Scripting Document',
      category: 'SCRIPTING & STRATEGY',
      period: 'Pre-Production Concept & Script',
      type: 'image',
      image: '/assets/proofs_optimized/chinnadurai_scripting.jpg',
      desc: 'Pre-production concept and script notes for retail commercial content. Outlined visual hooks, sequence transitions, and promotional call-to-actions.',
      linkText: 'Explore Selected Work ↗',
      linkUrl: '#other-work'
    },
    'chinnadurai-retention': {
      title: 'Chinnadurai Textiles — Audience Retention Analytics',
      category: 'RETENTION ANALYTICS',
      period: '10K–15K Organic Views // Non-Paid',
      type: 'image',
      image: '/assets/proofs_optimized/chinnadurai_retention.jpg',
      desc: 'Analytics graph demonstrating sustained organic viewership and high watch time for Chinnadurai Textiles video campaigns, generated without paid ad spend.',
      linkText: 'Explore Selected Work ↗',
      linkUrl: '#other-work'
    },
    'vedha-rice': {
      title: 'Vedha Rice — Commercial VJ Reel Frame',
      category: 'BRAND PROMOTION',
      period: 'Commercial VJ & Scripting // FMCG',
      type: 'image',
      image: '/assets/proofs_optimized/vedha_rice_vj.jpg',
      desc: 'On-screen commercial presentation for Vedha Rice, delivering clear brand value, quality differentiation, and engaging regional consumer connection.',
      linkText: 'Explore Selected Work ↗',
      linkUrl: '#other-work'
    },
    'lwa-views': {
      title: 'Life With Aakash — 59K Peak Viewership Analytics',
      category: 'ORGANIC METRICS',
      period: '59.1K Impressions // Organic Audience Retention',
      type: 'image',
      image: '/assets/proofs_optimized/lwa_organic_views.jpg',
      desc: 'Verified platform insights displaying 59.1K organic views on Life With Aakash motivational reel, proving hook retention and viral distribution mechanics.',
      linkText: 'Visit @life.with_aakash ↗',
      linkUrl: 'https://www.instagram.com/life.with_aakash?stkn=MXcwa2ZraGllYXBuOA=='
    },
    'lwa-profile': {
      title: 'Life With Aakash — Official Instagram Profile',
      category: 'CREATOR PLATFORM',
      period: '@life.with_aakash // Motivational Content',
      type: 'image',
      image: '/assets/proofs_optimized/lwa_page.jpg',
      desc: 'Dedicated personal growth and motivational communication platform. Features original reflections, spoken-word perspectives, and life mindset lessons.',
      linkText: 'Visit @life.with_aakash ↗',
      linkUrl: 'https://www.instagram.com/life.with_aakash?stkn=MXcwa2ZraGllYXBuOA=='
    },
    'lwa-feedback': {
      title: 'Life With Aakash — Community Direct Feedback & DMs',
      category: 'AUDIENCE TRUST',
      period: 'Verified Direct Messages & Viewer Feedback',
      type: 'image',
      image: '/assets/proofs_optimized/lwa_congrats_IMG_2888.jpg',
      desc: 'Direct responses and messages from viewers appreciating the clarity, motivation, and practical mindset advice shared through Life With Aakash videos.',
      linkText: 'Visit @life.with_aakash ↗',
      linkUrl: 'https://www.instagram.com/life.with_aakash?stkn=MXcwa2ZraGllYXBuOA=='
    },
    'award-business-excellence': {
      title: 'Twin Heart Business Excellence Award',
      category: 'VERIFIED RECOGNITION',
      period: 'Stage Presentation // Excellence Trophy & Certificate',
      type: 'image',
      image: '/assets/proofs_optimized/award_1_business_excellence.jpg',
      desc: 'Prestigious Twin Heart Business Excellence Award presented on stage for outstanding contribution in digital marketing, brand promotion, and creative execution.',
      linkText: 'Explore Journey Timeline ↗',
      linkUrl: '#journey'
    },
    'award-talent-competition': {
      title: 'State Level Talent Competition 2025 Award',
      category: 'STAGE HONORS',
      period: '2025 // State Level Recognition',
      type: 'image',
      image: '/assets/proofs_optimized/award_2_talent_competition.jpg',
      desc: 'State-level recognition honoring creative communication, visual storytelling, and digital content impact at the 2025 talent competition.',
      linkText: 'Explore Journey Timeline ↗',
      linkUrl: '#journey'
    },
    'award-talent-video': {
      title: 'State Level Talent Competition 2025 — Stage Ceremony Video',
      category: 'STAGE CEREMONY',
      period: 'Live On-Stage Award Presentation',
      type: 'video',
      video: '/assets/proofs_optimized/award_2_video.mov',
      poster: '/assets/proofs_optimized/poster_award2_video.jpg',
      desc: 'Live stage recording capturing the announcement and presentation of the 2025 State Level Talent Competition award.',
      linkText: 'Explore Journey Timeline ↗',
      linkUrl: '#journey'
    },
    'mraku-joined': {
      title: 'Mr Aku Vlogs — Account Creation & Early Origin (2020)',
      category: 'CREATOR ARCHIVE',
      period: 'Instagram Joined Record // September 2020',
      type: 'image',
      image: '/assets/proofs_optimized/mr_aku_joined_proof.jpg',
      desc: 'Official platform proof showing the account creation date in 2020. Verifies the authentic five-year foundation in digital video, audience growth, and content creation.',
      linkText: 'Visit @mr._aku_vlogs ↗',
      linkUrl: 'https://www.instagram.com/mr._aku_vlogs/'
    },
    'mraku-profile': {
      title: 'Mr Aku Vlogs — Verified Creator Profile (2,177+ Followers)',
      category: 'CREATOR ARCHIVE',
      period: '2,177+ Verified Followers // 332 Posts',
      type: 'image',
      image: '/assets/proofs_optimized/mr_aku_instagram_page.jpg',
      desc: 'Primary creator channel demonstrating consistent multi-year publishing, regional food reviews, local brand promotions, and creator collaborations.',
      linkText: 'Visit @mr._aku_vlogs ↗',
      linkUrl: 'https://www.instagram.com/mr._aku_vlogs/'
    },
    'mraku-vj': {
      title: 'Mr Aku Vlogs — On-Camera VJ Mic Field Shoot',
      category: 'FIELD PRODUCTION',
      period: 'Live VJ Mic Presentation // Street Interviews',
      type: 'image',
      image: '/assets/proofs_optimized/mr_aku_vj_shoot.jpg',
      desc: 'On-camera hosting and street interview coverage for Mr Aku Vlogs, mastering quick audience engagement, improvised dialogue, and live event energy.',
      linkText: 'Visit @mr._aku_vlogs ↗',
      linkUrl: 'https://www.instagram.com/mr._aku_vlogs/'
    },
    'mraku-roshan': {
      title: 'Music Album Video Shoot with Actor Roshan',
      category: 'MEDIA COLLABORATION',
      period: 'Cinema & Music Album Production',
      type: 'image',
      image: '/assets/proofs_optimized/album_song_shoot_roshan.jpg',
      desc: 'Collaborative shoot alongside actor Roshan during production of a commercial music album video, integrating cinematic direction with high-tempo performance.',
      linkText: 'Visit @mr._aku_vlogs ↗',
      linkUrl: 'https://www.instagram.com/mr._aku_vlogs/'
    },
    'mraku-paranthu': {
      title: 'Movie Promotion // Paranthu Po',
      category: 'CINEMA PROMOTION',
      period: 'Film Promotional Interview & Creator Coverage',
      type: 'image',
      image: '/assets/proofs_optimized/movie_paranthu_po.jpg',
      desc: 'Promotional interview and digital media coverage for the Tamil film Paranthu Po, connecting the film\'s cast with regional digital audiences.',
      linkText: 'Visit @mr._aku_vlogs ↗',
      linkUrl: 'https://www.instagram.com/mr._aku_vlogs/'
    },
    'mraku-tourist': {
      title: 'Film Collaboration // Tourist Family',
      category: 'CINEMA PROMOTION',
      period: 'Entertainment & Cinema Promotional Coverage',
      type: 'image',
      image: '/assets/proofs_optimized/movie_tourist_family.jpg',
      desc: 'Entertainment media shoot and promotional interview coverage for the movie Tourist Family, expanding creator reach into mainstream Tamil cinema.',
      linkText: 'Visit @mr._aku_vlogs ↗',
      linkUrl: 'https://www.instagram.com/mr._aku_vlogs/'
    },
    'mraku-nayanthara': {
      title: 'Nayanthara Production Collaboration Shoot',
      category: 'PRODUCTION COLLABORATION',
      period: 'Commercial Production Shoot with Leading Banner',
      type: 'image',
      image: '/assets/proofs_optimized/mr_aku_nayanthara_production.jpg',
      desc: 'Commercial collaboration shoot linked with a major production associated with actress Nayanthara, executing creative promotional formats.',
      linkText: 'Visit @mr._aku_vlogs ↗',
      linkUrl: 'https://www.instagram.com/mr._aku_vlogs/'
    },
    'mraku-bts-video': {
      title: 'Mr Aku Vlogs Production BTS',
      category: 'BTS VIDEO',
      period: 'Behind-the-Scenes Camera Setups & Filming',
      type: 'video',
      video: '/assets/proofs_optimized/mr_aku_bts.mov',
      poster: '/assets/proofs_optimized/poster_mr_aku_bts.jpg',
      desc: 'Behind-the-scenes recording revealing on-location camera setups, lighting, mobile gear, and spontaneous content creation in the field.',
      linkText: 'Visit @mr._aku_vlogs ↗',
      linkUrl: 'https://www.instagram.com/mr._aku_vlogs/'
    },
    'mraku-promo-1': {
      title: 'Mr Aku Vlogs — Retail Store Promotion Campaign',
      category: 'SHOP PROMOTION',
      period: 'Regional Commercial Client Promotion',
      type: 'image',
      image: '/assets/proofs_optimized/mr_aku_promo_2876.jpg',
      desc: 'High-impact promotional campaign video for regional retail store, featuring product demonstrations, offer announcements, and store walk-throughs.',
      linkText: 'Visit @mr._aku_vlogs ↗',
      linkUrl: 'https://www.instagram.com/mr._aku_vlogs/'
    },
    'tech-mineguardian': {
      title: 'MineGuardian / MineCore — Autonomous Underground Rover',
      category: 'AI & HARDWARE TELEMETRY',
      period: 'Smart India Hackathon // IoT & Sensor Fusion',
      type: 'image',
      image: '/assets/lab_mineguardian.jpg',
      desc: 'Hazardous underground coal mine rover concept designed to monitor toxic methane (MQ-4), temperature (DHT22), and structural cave-in vibrations. Transmits real-time environmental telemetry to an emergency dashboard before miners enter hazardous shafts.',
      linkText: 'Explore Digital Lab ↗',
      linkUrl: 'lab.html#mineguardian'
    }
  };

export const proofKeys = Object.keys(proofData);
