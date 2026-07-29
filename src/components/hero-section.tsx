
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Handshake, Heart } from 'lucide-react';

const HeroSection = () => {
  return (
    <section 
      className="relative flex items-center justify-center w-full min-h-screen text-center text-white"
      data-aos="fade-in"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/homeimages/NEWBG.jpg"
          alt="A collage of TERIA's community work and impact"
          fill
          className="object-cover"
          priority
          data-ai-hint="community collage"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      <div className="relative z-10 p-6 space-y-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl font-headline">
          Empowering Communities for a Better Tomorrow
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-white/90 md:text-xl">
          The Empowerment, Relief and Inclusion Agenda (TERIA) is a non-profit organization committed to empowering marginalized and vulnerable groups in Kenya. We improve livelihoods and provide access to equal opportunities through sustainable, community-driven initiatives.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
          <Button size="lg" asChild className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg hover:scale-105 transition-transform duration-300">
            <Link href="/contact">
              <Handshake className="mr-2 h-5 w-5" />
              Get Involved
            </Link>
          </Button>
          <Button size="lg" asChild className="w-full sm:w-auto bg-tertiary text-tertiary-foreground hover:bg-tertiary/90 shadow-lg hover:scale-105 transition-transform duration-300">
            <Link href="/donations">
              <Heart className="mr-2 h-5 w-5" />
              Donate
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
