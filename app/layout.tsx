import type { Metadata } from 'next';
import React from 'react';
import { Inter, Playfair_Display, JetBrains_Mono, Syne } from 'next/font/google';
import '../styles/main.css';
import '../styles/nav.css';
import '../styles/editorial.css';
import '../styles/professional-redesign.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://aakashk.vercel.app'),
  title: 'AAKASH — Marketer, Brand Builder, Creator, Speaker',
  description:
    'A marketer, creator, web builder and motivational speaker turning ideas into real opportunities. Explore selected case studies, verified proof of work, and creative direction.',
  keywords: [
    'AAKASH',
    'Aakash K',
    'Personal Branding',
    'Digital Marketing',
    'Creative Director',
    'Digi Marketrix',
    'U6NICK',
    'Life With Aakash',
    'Mr Aku Vlogs',
    'Speaker',
    'AI and Data Science',
  ],
  authors: [{ name: 'AAKASH (Aakash K)' }],
  openGraph: {
    title: 'AAKASH — Marketer, Brand Builder, Creator, Speaker',
    description:
      'I build brands, digital experiences and ideas that move people. Portfolio & case studies of AAKASH.',
    type: 'website',
    url: 'https://aakashk.vercel.app/',
    images: [
      {
        url: '/assets/aakash_authentic_portrait.png',
        alt: 'AAKASH',
      },
    ],
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable} ${syne.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
