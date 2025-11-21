import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/landing/hero-section';
import { ServicesSection } from '@/components/landing/services-section';
import { HowItWorksSection } from '@/components/landing/how-it-works-section';
import { TrackLocateSection } from '@/components/landing/track-locate-section';

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex-1">
        <HeroSection />
        <ServicesSection />
        <HowItWorksSection />
        <TrackLocateSection />
      </div>
      <Footer />
    </>
  );
}
