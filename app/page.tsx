import { FeatureCard } from '@/components/home/feature-card';
import { HeroSection } from '@/components/home/hero-section';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-8">
          <HeroSection />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <FeatureCard
              title="100% Anonymous"
              description="Messages are completely anonymous. No tracking, no traces."
            />
            <FeatureCard
              title="Two-Way Chat"
              description="Respond to messages while maintaining anonymity."
            />
            <FeatureCard
              title="Secure & Private"
              description="End-to-end encryption keeps your conversations safe."
            />
          </div>
        </div>
      </div>
    </div>
  );
}