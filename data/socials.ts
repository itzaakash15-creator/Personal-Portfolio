export interface SocialLink {
  label: string;
  url: string;
  external?: boolean;
}

export const contactDetails = {
  name: 'Aakash K',
  email: 'itzaakash15@gmail.com',
  phone: '+91 85906 37715',
  phoneClean: '8590637715',
  location: 'Tamil Nadu, India',
};

export const socialLinks: SocialLink[] = [
  {
    label: 'LINKEDIN ↗',
    url: 'https://www.linkedin.com/in/aakashk15/',
    external: true,
  },
  {
    label: 'PERSONAL IG ↗',
    url: 'https://www.instagram.com/itzaakash_15?igsh=MWF5ODJ2dWR3ZzVpdA==',
    external: true,
  },
  {
    label: 'LIFE WITH AAKASH ↗',
    url: 'https://www.instagram.com/life.with_aakash?stkn=MXcwa2ZraGllYXBuOA==',
    external: true,
  },
  {
    label: 'MR AKU VLOGS ↗',
    url: 'https://www.instagram.com/mr._aku_vlogs/',
    external: true,
  },
  {
    label: 'DOWNLOAD RESUME ↗',
    url: '/resume.html',
    external: false,
  },
];
