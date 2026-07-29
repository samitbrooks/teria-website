
import type { Metadata } from 'next';
import React from 'react'; // Ensure React is imported
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import SiteChrome from '@/components/site-chrome';
import { cn } from '@/lib/utils';
import Script from 'next/script';
import { ABeeZee, Poppins, Montserrat } from 'next/font/google';
import AOSInitializerClient from '@/components/AOSInitializerClient';

export const metadata: Metadata = {
  metadataBase: new URL('https://teriacbo.org'),
  title: {
    default: 'TERIA - Empowering Communities for a Better Tomorrow',
    template: '%s | TERIA CBO',
  },
  description: 'TERIA (The Empowerment, Relief and Inclusion Agenda) is a nonprofit organization in Kenya working in community development, focusing on youth and women empowerment, mental health, MHHM, climate action, and WASH initiatives.',
  keywords: ['TERIA', 'CBO Kenya', 'non-profit Kenya', 'community development', 'women empowerment', 'youth empowerment', 'menstrual health', 'mental health Kenya', 'climate action Africa', 'Siaya County', 'Rarieda'],
  openGraph: {
    title: 'TERIA - Empowering Communities for a Better Tomorrow',
    description: 'Join TERIA in our mission to empower marginalized communities in Kenya through sustainable development projects.',
    url: 'https://teriacbo.org',
    siteName: 'TERIA CBO',
    images: [
      {
        url: 'https://teriacbo.org/homeimages/NEWBG.jpg', // Main hero image
        width: 1200,
        height: 630,
        alt: 'A collage of TERIA\'s community work and impact',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TERIA - Empowering Communities in Kenya',
    description: 'Support TERIA\'s work in youth & women empowerment, mental health, climate action, and more. Learn how you can make a difference.',
    images: ['https://teriacbo.org/homeimages/NEWBG.jpg'],
    creator: '@TeriaCbo',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

const abeezee = ABeeZee({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-abeezee',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-montserrat',
});

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "TERIA (The Empowerment, Relief and Inclusion Agenda)",
  "url": "https://teriacbo.org",
  "logo": "https://teriacbo.org/Logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+254-722-765-847",
    "contactType": "customer service"
  },
  "sameAs": [
    "https://www.facebook.com/share/16kUvw9MEh/",
    "https://www.instagram.com/teriacbo?igsh=ZHA3Mm9pbHN4YTc1",
    "https://x.com/TeriaCbo?t=TFTezkLd9nFmUh3DTHACCQ&s=08",
    "https://www.tiktok.com/@teria.cbo?_t=ZM-8xIuWTbu5oO&_r=1"
  ]
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="google-site-verification" content="tXKEZAaaxEOzrK_cCfKN732eKeU-YAD0VenZksthA94" />
        {/* Font Awesome script for any potential social icons or others that might not be in Lucide */}
        <script src="https://kit.fontawesome.com/a076d05399.js" crossOrigin="anonymous" async></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={cn(abeezee.variable, poppins.variable, montserrat.variable, "font-body antialiased flex flex-col min-h-screen")}>
        <AOSInitializerClient />
        <div className="flex flex-col min-h-screen bg-background">
          <SiteChrome>{children}</SiteChrome>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
