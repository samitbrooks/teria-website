
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, Brain, Droplets, BookOpen, Leaf, Waves, ArrowRight, Star } from 'lucide-react';
import type { FocusAreaItem } from '@/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Our Focus Areas | TERIA Initiatives',
  description: 'Explore TERIA\'s key focus areas: Empowerment, Mental Health, MHHM, Literacy, Climate Action, and WASH. Learn how we make a difference.',
};

const focusAreasDetailed: (FocusAreaItem & { sdgs: string[] })[] = [
  {
    icon: Users,
    title: 'Women and Youth Economic Empowerment',
    description: "At the core of our mission is empowering women and youth to eradicate poverty. We provide hands-on skills training, business incubation, and mentorship to foster economic independence. By facilitating access to micro-finance and Village Savings and Loan Associations (VSLAs), we equip individuals with the capital and knowledge to launch or expand their enterprises. This holistic approach builds long-term resilience, promotes self-reliance, and cultivates a new generation of community leaders.",
    href: '#empowerment',
    imageUrl: '/homeimages/focus areas/empowerment.png',
    imageHint: 'empowerment community',
    sdgs: ["SDG 1: No Poverty", "SDG 5: Gender Equality", "SDG 8: Decent Work and Economic Growth"],
  },
  {
    icon: Brain,
    title: 'Promotion of Mental Health Awareness',
    description: "TERIA is committed to dismantling the stigma surrounding mental health. We conduct awareness campaigns, provide accessible counseling services, and establish peer support groups to create safe spaces for open conversation and healing. By focusing on youth and other vulnerable populations, we aim to build resilience and equip people with positive coping mechanisms, ensuring mental wellness is recognized as a vital component of overall community health and well-being.",
    href: '#mental-health',
    imageUrl: 'https://teriacbo.org/homeimages/focus%20areas/mhhm.png',
    imageHint: 'mental health awareness',
    sdgs: ["SDG 3: Good Health and Well-being"],
  },
  {
    icon: Droplets,
    title: 'Menstrual Health, Hygiene, and Sexual Reproductive Rights',
    description: "We champion the right to menstrual dignity and comprehensive sexual reproductive health education for adolescents and youth. Through our 'Rarieda Girl Power Initiative,' we distribute sanitary pads and hygiene products to combat period poverty. Our workshops engage both girls and boys to demystify menstruation and end period stigma. We also advocate for period-friendly infrastructure in schools, empowering school girls to manage their menstrual health hygiene with confidence and continue their education without interruption.",
    href: '#mhhm',
    imageUrl: '/homeimages/focus areas/mhhm.png',
    imageHint: 'hygiene education',
    sdgs: ["SDG 3: Good Health and Well-being", "SDG 4: Quality Education", "SDG 5: Gender Equality"],
  },
  {
    icon: BookOpen,
    title: 'Literacy and Education',
    description: "Through our ‘Read & Learn’ Initiative, we are dedicated to fostering a vibrant culture of reading and learning to enhance literacy across all ages. We supply school and community libraries with diverse and engaging materials, from children's storybooks to educational texts for adults. By supporting reading clubs and workshops, we make learning interactive and accessible, empowering individuals with the critical skills needed to pursue education and participate fully in society.",
    href: '#literacy',
    imageUrl: '/homeimages/focus areas/mentorship.png',
    imageHint: 'literacy books',
    sdgs: ["SDG 4: Quality Education"],
  },
  {
    icon: Leaf,
    title: 'Climate Action',
    description: "TERIA leads community-based climate action initiatives focused on building environmental resilience. We organize large-scale tree planting drives to combat deforestation and promote biodiversity. Our clean-up campaigns and climate education programs raise awareness about waste management and sustainable practices. By equipping communities with the knowledge and tools to implement adaptive strategies and promoting green energy, we empower them to protect their natural heritage for future generations.",
    href: '#climate-action',
    imageUrl: 'https://images.unsplash.com/photo-1570095378004-ce65d6c2d5bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxOHx8Y2xpbWF0ZXxlbnwwfHx8fDE3NTU4NjgwMTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'climate action tree planting',
    sdgs: ["SDG 13: Climate Action", "SDG 15: Life on Land"],
  },
  {
    icon: Waves,
    title: 'Water, Sanitation and Hygiene (WASH)',
    description: "Access to clean water, sanitation, and hygiene is a fundamental human right. Our “Water is Life” Initiative brings safe and sustainable WASH services to underserved communities by sinking boreholes to provide reliable sources of clean drinking water. This reduces waterborne diseases and eases the burden of water collection. We also partner with schools to construct hygienic facilities and promote essential practices like handwashing, improving health, dignity, and creating healthier environments.",
    href: '#wash',
    imageUrl: '/homeimages/focus areas/WASH.jpg',
    imageHint: 'water sanitation',
    sdgs: ["SDG 6: Clean Water and Sanitation"],
  },
];


const FocusAreasPage = () => {
  return (
    <div>
      {/* Page Header */}
      <section className="bg-primary/10 py-16 sm:py-20" data-aos="fade-in">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold font-headline text-primary">Our Focus Areas</h1>
          <p className="mt-4 text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto">
            TERIA is dedicated to making a tangible impact across several critical areas. Each program is designed to address specific community needs and foster sustainable change.
          </p>
        </div>
      </section>

      {/* Detailed Focus Areas Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12 lg:space-y-16">
            {focusAreasDetailed.map((area, index) => (
              <Card 
                key={area.title} 
                id={area.href.substring(1)} 
                className="shadow-lg overflow-hidden lg:grid lg:grid-cols-5 lg:gap-8 items-center hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out"
                data-aos="fade-up"
              >
                <div 
                  className={`lg:col-span-2 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}
                  data-aos={index % 2 === 0 ? 'fade-left' : 'fade-right'}
                >
                  <div className="aspect-video w-full h-full">
                    <Image
                      src={area.imageUrl}
                      alt={`Visual representation of TERIA's work in ${area.title}`}
                      width={640}
                      height={360}
                      className="w-full h-full object-cover"
                      data-ai-hint={area.imageHint || "community program"}
                    />
                  </div>
                </div>
                <div 
                  className={`p-6 sm:p-8 lg:col-span-3 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}
                  data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
                >
                  <div className="flex items-center mb-3">
                    <area.icon className="w-10 h-10 text-accent mr-4" />
                    <h2 className="text-2xl sm:text-3xl font-bold font-headline text-primary">{area.title}</h2>
                  </div>
                  <p className="text-base text-foreground/80 leading-relaxed mb-6">
                    {area.description}
                  </p>
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-primary/80 mb-2 flex items-center"><Star className="w-4 h-4 mr-2 text-yellow-500" />Aligned SDGs</h4>
                    <div className="flex flex-wrap gap-2">
                      {area.sdgs.map(sdg => (
                        <Badge key={sdg} variant="secondary" className="font-normal">{sdg}</Badge>
                      ))}
                    </div>
                  </div>
                  <Button 
                    asChild 
                    className="bg-accent hover:bg-accent/90 text-accent-foreground hover:scale-105 transition-transform duration-200"
                  >
                    <Link href="/contact" aria-label={`Learn more about ${area.title}`}>
                      Learn More <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 bg-slate-50" data-aos="fade-up">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold font-headline text-primary mb-4">Learn More About Our Work</h2>
          <p className="text-base sm:text-lg text-foreground/80 max-w-xl mx-auto mb-6">
            Discover the impact we are making and how we are changing lives in these vital areas.
          </p>
          <Button 
            size="lg" 
            asChild 
            className="bg-tertiary text-tertiary-foreground hover:bg-tertiary/90 hover:scale-105 transition-transform duration-200"
          >
            <Link href="/impact">Our Impact</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FocusAreasPage;
    
