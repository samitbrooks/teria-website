
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Handshake, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

const CTABannerSection = () => {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-primary/10">
       <Image
        src="/homeimages/partner.jpg"
        alt="Community members collaborating and partnering"
        fill
        className="-z-10 opacity-20 object-cover"
        data-ai-hint="collaboration community"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-background/10 to-primary/10 -z-10" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10" data-aos="zoom-in">
        <h2 
          className="text-3xl sm:text-4xl font-bold font-headline text-primary mb-4"
        >
          Partner With Us or Support Our Mission
        </h2>
        <p 
          className="text-base sm:text-lg text-foreground/80 max-w-2xl mx-auto mb-8"
        >
          Collaboration and support are key to transforming lives and building a brighter future. Explore partnership opportunities or contribute to TERIA's cause.
        </p>
        <div 
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <Button
            size="lg"
            asChild
            className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
          >
            <Link href="/contact">
              <Handshake className="mr-2 h-5 w-5" />
              Contact Us for Partnerships
            </Link>
          </Button>
          <Button
            size="lg"
            asChild
            className="bg-tertiary hover:bg-tertiary/90 text-tertiary-foreground shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
          >
            <Link href="/donations">
              <Heart className="mr-2 h-5 w-5" />
              Donate Now
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTABannerSection;
