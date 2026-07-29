
import HeroSection from '@/components/hero-section';
import FocusAreasHomeSection from '@/components/focus-areas-home-section';
import BlogTeaserSection from '@/components/blog-teaser-section';
import CTABannerSection from '@/components/cta-banner-section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TERIA - Empowering Communities for a Better Tomorrow in Kenya',
  description: 'TERIA is a non-profit Community Based Organization in Rarieda, Siaya County, Kenya, dedicated to empowering vulnerable groups through initiatives in economic empowerment, health, education, and climate action.',
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <FocusAreasHomeSection />
      <BlogTeaserSection />
      <CTABannerSection />
    </>
  );
}
