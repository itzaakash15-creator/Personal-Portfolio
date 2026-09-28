export interface SocialLink {
  label: string;
  url: string;
  icon?: string;
}

export const SOCIALS_DATA: SocialLink[] = [
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/aakashk15/' },
  { label: 'Instagram', url: 'https://www.instagram.com/itzaakash_15?igsh=MWF5ODJ2dWR3ZzVpdA==' },
  { label: 'YouTube', url: 'https://youtube.com/@MrAkuVlogs' },
  { label: 'GitHub', url: 'https://github.com/itzaakash15-creator' },
  { label: 'Email', url: 'mailto:itzaakash15@gmail.com' },
];

export const contactDetails = {
  email: 'itzaakash15@gmail.com',
  phone: '+91 85906 37715',
  phoneClean: '+918590637715',
  location: 'Tamil Nadu, India · Available Worldwide',
  status: 'Available for Select Brand & Web Projects',
};

export const CONTACT_INFO = contactDetails;
