'use client';

import { MotionConfig } from 'framer-motion';
import { ReferenceHero } from '@/components';
import { VideoWall } from '@/components';
import { PhotoShotsSection } from '@/components';
import { JourneySection } from '@/components';
import { BookingSection } from '@/components';
import { SiteFooter } from '@/components';
import { SiteNav } from '@/components';
import { ScrollProgress } from '@/components';

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <ScrollProgress />
      <SiteNav />
      <main id="main">
        <ReferenceHero cta={<a className="button light" href="#booking">Book a call<span className="button-dot" /></a>} />
        <VideoWall />
        <PhotoShotsSection />
        <JourneySection />
        <BookingSection />
      </main>
      <SiteFooter />
    </MotionConfig>
  );
}
