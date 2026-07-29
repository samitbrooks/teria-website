import type { FocusAreaItem } from '@/types';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Brain, Droplets, BookOpen, Leaf, Waves, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const focusAreas: FocusAreaItem[] = [
  {
    icon: Users,
    title: 'Economic Empowerment',
    description: 'Enhancing economic opportunities and self-reliance for women and youth.',
    href: '/focus-areas#empowerment',
  },
  {
    icon: Brain,
    title: 'Mental Health Awareness',
    description: 'Raising awareness and providing support for community mental well-being.',
    href: '/focus-areas#mental-health',
  },
  {
    icon: Droplets,
    title: 'MHHM & SRHR',
    description: 'Championing menstrual health, hygiene, and sexual reproductive rights for youth.',
    href: '/focus-areas#mhhm',
  },
  {
    icon: BookOpen,
    title: 'Literacy & Education',
    description: 'Improving reading and writing skills in schools and the community.',
    href: '/focus-areas#literacy',
  },
  {
    icon: Leaf,
    title: 'Climate Action',
    description: 'Promoting environmental sustainability and community resilience.',
    href: '/focus-areas#climate-action',
  },
  {
    icon: Waves,
    title: 'WASH',
    description: 'Improving access to clean water, sanitation, and hygiene services.',
    href: '/focus-areas#wash',
  },
];

const FocusAreasHomeSection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold font-headline text-primary mb-3">Our Focus Areas</h2>
          <p className="text-base sm:text-lg text-foreground/80 max-w-2xl mx-auto">
            We are committed to addressing key challenges and creating opportunities in these critical areas.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {focusAreas.map((area, index) => (
            <Card 
              key={area.title} 
              className="flex flex-col shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300 ease-in-out"
              data-aos="fade-up"
              data-aos-delay={(index * 100).toString()}
            >
              <CardHeader className="flex flex-row items-center space-x-4 pb-4">
                <area.icon className="w-10 h-10 text-accent group-hover:scale-110 transition-transform duration-300" />
                <CardTitle className="font-headline text-xl text-primary">{area.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-foreground/70 mb-4">{area.description}</p>
                 <Button variant="link" asChild className="text-accent p-0 h-auto link-underline">
                  <Link href={area.href} aria-label={`Learn more about ${area.title}`}>
                    Learn More <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FocusAreasHomeSection;
