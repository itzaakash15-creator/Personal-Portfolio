import type { Metadata } from 'next';
import React from 'react';
import '../styles/main.css';
import '../styles/nav.css';
import '../styles/editorial.css';

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600&family=Playfair+Display:ital,wght@0,600;0,700;1,400;1,600;1,700&family=JetBrains+Mono:wght@400;500;600&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
