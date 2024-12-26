import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <div className="space-y-8 text-center">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Share Your Thoughts
          <span className="text-primary block">Anonymously</span>
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Create your private space for anonymous messages. Share your unique link and start receiving honest feedback.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/create">
          <Button size="lg" className="font-semibold">
            <MessageCircle className="mr-2 h-5 w-5" />
            Create Your Space
          </Button>
        </Link>
        <Link href="/how-it-works">
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </Link>
      </div>
    </div>
  );
}