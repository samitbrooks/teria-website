
import Image from 'next/image';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Target, Eye, MapPin, ClipboardCheck, HandHeart, ShieldCheck, Scale, ArrowRight, Briefcase, BookOpen, Award, Lightbulb, UsersRound, UserSquare, ListChecks, Settings, Leaf, MessageCircle, CircleHelp, Zap, HeartHandshake, UserCircle2, Waves, BriefcaseMedical, Construction, Archive, Footprints, CalendarDays, Milestone } from 'lucide-react';
import { cn } from '@/lib/utils';
import OfficialsCarousel from '@/components/officials-carousel';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export const metadata: Metadata = {
  title: 'About TERIA | Our Mission, Values, and Impact in Kenya',
  description: 'Learn about TERIA (The Empowerment, Relief and Inclusion Agenda), our mission to empower marginalized communities in Kenya, our core values, leadership, objectives, focus areas, initiatives, and how to get involved.',
  openGraph: {
    title: 'About TERIA | Our Mission, Values, and Impact in Kenya',
    description: 'Discover the story behind TERIA, our dedicated team, and our commitment to creating sustainable change in Siaya County.',
    images: [{
      url: 'https://teriacbo.org/gallery%20of%20moments/IMG-20250618-WA0035%20(1).jpg',
      width: 600,
      height: 450,
      alt: 'TERIA team during a community event',
    }]
  },
  twitter: {
    title: 'About TERIA | Mission, Vision & Team',
    description: 'Learn about TERIA (The Empowerment, Relief and Inclusion Agenda) and our work to empower vulnerable communities in Kenya.',
    images: ['https://teriacbo.org/gallery%20of%20moments/IMG-20250618-WA0035%20(1).jpg'],
  }
};

const firstActivityImages = [
    { src: "/events/IMG-20250703-WA0022.jpg", alt: "TERIA's first MHM initiative event" },
    { src: "/events/IMG-20250703-WA0023.jpg", alt: "TERIA's first MHM initiative event" },
    { src: "/events/IMG-20250703-WA0024.jpg", alt: "TERIA's first MHM initiative event" },
    { src: "/events/IMG-20250703-WA0025.jpg", alt: "TERIA's first MHM initiative event" },
    { src: "/events/IMG-20250703-WA0026.jpg", alt: "TERIA's first MHM initiative event" },
    { src: "/events/IMG-20250703-WA0027.jpg", alt: "TERIA's first MHM initiative event" },
    { src: "/events/IMG-20250703-WA0028.jpg", alt: "TERIA's first MHM initiative event" },
    { src: "/events/IMG-20250703-WA0029.jpg", alt: "TERIA's first MHM initiative event" },
    { src: "/events/IMG-20250703-WA0030.jpg", alt: "TERIA's first MHM initiative event" },
    { src: "/events/IMG-20250703-WA0031.jpg", alt: "TERIA's first MHM initiative event" },
    { src: "/events/IMG-20250703-WA0032.jpg", alt: "TERIA's first MHM initiative event" },
    { src: "/events/IMG-20250703-WA0033.jpg", alt: "TERIA's first MHM initiative event" },
    { src: "/events/IMG-20250703-WA0034.jpg", alt: "TERIA's first MHM initiative event" },
    { src: "/events/IMG-20250703-WA0035.jpg", alt: "TERIA's first MHM initiative event" },
    { src: "/events/IMG-20250703-WA0036.jpg", alt: "TERIA's first MHM initiative event" },
    { src: "/events/IMG-20250703-WA0037.jpg", alt: "TERIA's first MHM initiative event" },
    { src: "/events/IMG-20250703-WA0038.jpg", alt: "TERIA's first MHM initiative event" },
    { src: "/events/IMG-20250703-WA0039.jpg", alt: "TERIA's first MHM initiative event" },
    { src: "/events/IMG-20250703-WA0040.jpg", alt: "TERIA's first MHM initiative event" },
];

const AboutPage = () => {
  const coreValues = [
    { icon: ClipboardCheck, title: "Transparency and Accountability", description: "Upholding openness and responsibility in all our actions." },
    { icon: Users, title: "Respect for diversity", description: "Valuing and embracing the differences among individuals and groups." },
    { icon: HandHeart, title: "Inclusivity", description: "Ensuring everyone has the opportunity to participate and benefit." },
    { icon: ShieldCheck, title: "Commitment and Integrity", description: "Dedicated to our cause with strong moral principles." },
    { icon: Scale, title: "Equity and justice", description: "Striving for fairness and advocating for the rights of all." },
    { icon: Zap, title: "Empowerment", description: "Fostering self-reliance and building capacity in communities." },
  ];

  const objectives = [
    "To strengthen the economic capacity of women and youth through mentorship, entrepreneurship training, income-generating opportunities, and financial literacy programs.",
    "To promote menstrual health hygiene management and sexual reproductive health rights by providing dignity kits, education, and advocacy for adolescents and youths.",
    "To improve access to clean water, sanitation, and hygiene (WASH) services in schools, institutions and communities, enhancing health and dignity among vulnerable populations.",
    "To enhance literacy levels in schools and the community by supporting reading programs, supplying learning materials, and improving learning environments.",
    "To raise awareness and build support systems for mental health by conducting community sensitization, training, and referrals, especially among youth and caregivers.",
    "To advance climate action initiatives through environmental education, tree planting, and the promotion of sustainable, eco-friendly practices in the community.",
  ];

  const focusAreas = [
    { title: "Women and youth economic empowerment", description: "Enhancing economic opportunities and self-reliance for women and youth.", href: "/focus-areas#empowerment", icon: Zap },
    { title: "Advocacy of Menstrual Health Hygiene Management and Sexual Reproductive Health Rights for adolescents and youths", description: "Championing Menstrual Health Hygiene Management and Sexual Reproductive Health Rights.", href: "/focus-areas#mhhm", icon: HeartHandshake },
    { title: "Water, Sanitation and Hygiene (WASH)", description: "Improving access to clean water, sanitation, and hygiene services.", href: "/focus-areas#wash", icon: Waves },
    { title: "Contribution to literacy in schools and the community", description: "Improving reading and writing skills in schools and the community.", href: "/focus-areas#mentorship", icon: BookOpen },
    { title: "Promotion of Mental Health Awareness", description: "Raising awareness and support for mental well-being.", href: "/focus-areas#mental-health", icon: MessageCircle },
    { title: "Climate Action", description: "Promoting environmental sustainability and resilience.", href: "/focus-areas#climate-action", icon: Leaf },
  ];

  const initiatives = [
    {
      title: "Inuka Initiative",
      description: "Focuses on capacity building the vulnerable and marginalized groups through Income generating activities (IGAs), Mentorships & Linkages.",
      icon: Lightbulb,
    },
    {
      title: "Rarieda Girl Power Initiative",
      description: "Focuses on the mentorship of school girls, distribution of menstrual materials and panties, and sensitization on Menstrual Health Hygiene Management (MHHM) under the 'Hands of Hope for Dignified Periods' slogan. This includes sensitizing school management on period-friendly infrastructure and engaging boys to end period stigma.",
      icon: Users,
    },
    {
      title: "“Water is Life” Initiative",
      description: "Focuses on provision of clean safe water to the community.",
      icon: Waves,
    },
    {
      title: "‘Read & Learn’ Initiative",
      description: "Provision of reading materials to community and school libraries to cultivate a reading culture in the community hence enhancing literacy levels in the schools and community at large.",
      icon: BookOpen,
    },
    {
      title: "Climate Action",
      description: "Tree planting, green energy promotion.",
      icon: Leaf,
    },
     {
      title: "General Support",
      description: "Providing general charitable support to the marginalized and vulnerable groups.",
      icon: HandHeart,
    },
  ];

  const partners = "Femme International, Center for Health Solutions, Garden of Hope, Marie Stopes International, Kenya Red Cross, Matibabu Foundation, Lending Hands Initiative, Menstrual Hygiene Global (MH Global), Chianda Community Development Group, Anaweza Afya, Impact Kenya Initiative, Optimum Life Choices, LUPAN Health, Proudly Kenyan, Nalsa-Kenya, Rarieda Rights Relief and Education Forum, Jipanga Widows Empowerment, Zana Africa, No Taps, and Come Together Widows and Orphans Organization Forum";

  const timelineEvents = [
     {
      year: "2025",
      title: "Expanding Water Access",
      description: "Completed three more boreholes in Masala (February), Agok, and Mahaya (June/July), significantly improving access to clean water across the region.",
      icon: Waves,
    },
    {
      year: "2024",
      title: "Community Health Support",
      description: "Participated in a free medical camp at Chianda Community Hospital, distributing sanitary pads and meals to support community health.",
      icon: BriefcaseMedical,
    },
    {
      year: "2023",
      title: "WASH Infrastructure at Osewre",
      description: "Constructed the Osewre borehole, improving WASH and MHM access for the school and local community.",
      icon: Construction,
    },
    {
      year: "2022-2023",
      title: "Empowering Youth on MHM",
      description: "Provided MHM training and sanitary products to over 3,000 schoolgirls and educated over 2,000 schoolboys to end period stigma.",
      icon: UsersRound,
    },
    {
      year: "2019-2023",
      title: "Greening Rarieda",
      description: "Planted over 10,000 trees, contributing to environmental conservation and climate action.",
      icon: Leaf,
    },
    {
      year: "2019",
      title: "Supporting School MHM",
      description: "Provided a water tank to a primary school to improve menstrual hygiene management for girls.",
      icon: Archive,
    },
    {
      year: "2018",
      title: "Protecting Children's Health",
      description: "Provided footwear to schoolchildren to protect them from jigger infestations.",
      icon: Footprints,
    },
    {
      year: "2017-2018",
      title: "Foundational MHM Initiatives",
      description: "Delivered MHM training and distributed sanitary products to over 1,000 girls in low-income schools, marking our first major activity.",
      icon: HeartHandshake,
      images: firstActivityImages,
    },
  ];


  return (
    <div>
      {/* Page Header - Vision/Mission */}
      <section className="bg-primary/10 py-16 sm:py-20" data-aos="fade-in">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold font-headline text-primary">About TERIA</h1>
          <p className="mt-4 text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto">
            The Empowerment, Relief and Inclusion Agenda (TERIA) is a non-profit, charitable Community-Based Organization locally registered in the Republic of Kenya.
          </p>
          <div className="mt-8 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="shadow-lg text-left hover:scale-[1.03] hover:shadow-xl transition-all duration-300 ease-in-out" data-aos="fade-up">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary flex items-center">
                  <Eye className="w-7 h-7 mr-3 text-accent" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base text-foreground/80 leading-relaxed">
                  We envision an empowered, vibrant, and inclusive society where marginalized and vulnerable groups are productively engaged.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-lg text-left hover:scale-[1.03] hover:shadow-xl transition-all duration-300 ease-in-out" data-aos="fade-up" data-aos-delay="100">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary flex items-center">
                  <Target className="w-7 h-7 mr-3 text-accent" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base text-foreground/80 leading-relaxed">
                  To empower the marginalized and vulnerable groups in the society by improving their livelihoods and access to equal economic and social opportunities through sustainable ways.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Who We Are & Strategic Goal Section */}
      <section className="py-12 sm:py-16 lg:py-20" data-aos="fade-up">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div data-aos="fade-right">
              <h2 className="text-3xl sm:text-4xl font-bold font-headline text-primary mb-6 flex flex-col items-start gap-3">
                <UsersRound className="inline-block w-10 h-10 text-accent" />
                <span>The TERIA Profile</span>
              </h2>
              <p className="text-base sm:text-lg text-foreground/80 mb-4 leading-relaxed">
                <strong>Who We Are:</strong> The Empowerment, Relief and Inclusion Agenda (TERIA) is a non-profit, charitable Community-Based Organization locally registered in the Republic of Kenya.
              </p>
              <p className="text-base sm:text-lg text-foreground/80 mb-4 leading-relaxed">
                <strong>Our Passion:</strong> We are passionate about improving the lives of the vulnerable and marginalized groups in the society, especially girls and women, children, youth, and the elderly.
              </p>
              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                <strong>Strategic Goal:</strong> TERIA’S strategic goal is striving to empower the excluded in the society.
              </p>
            </div>
            <div data-aos="fade-left">
              <Image
                src="/gallery of moments/IMG-20250618-WA0035 (1).jpg"
                alt="TERIA team distributing sanitary pads to students"
                width={600}
                height={450}
                className="rounded-lg shadow-xl"
                data-ai-hint="team photo community"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-slate-50" data-aos="fade-up">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold font-headline text-primary mb-3 text-center">Our Core Values</h2>
          <p className="text-base sm:text-lg text-foreground/80 max-w-2xl mx-auto mb-10 sm:mb-12 text-center">
            The realization of TERIA’s vision and mission is built upon our core values:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {coreValues.map((value, index) => (
              <Card key={value.title} className="text-center shadow-lg p-6 hover:shadow-xl hover:scale-[1.03] transition-all duration-300 ease-in-out" data-aos="fade-up" data-aos-delay={(index * 50).toString()}>
                <CardHeader className="p-0 mb-4">
                  <value.icon className="w-12 h-12 text-accent mx-auto" />
                </CardHeader>
                <CardTitle className="font-headline text-xl text-primary mb-2">{value.title}</CardTitle>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership & Officials Section */}
      <section className="py-12 sm:py-16 lg:py-20" data-aos="fade-up">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold font-headline text-primary mb-12 text-center flex flex-col items-center gap-3">
            <UserSquare className="w-10 h-10 text-accent" />
            <span>Leadership and Officials</span>
          </h2>
          
          <div>
            <h3 className="text-2xl font-semibold font-headline text-primary mb-8 flex items-center justify-center sm:justify-start">
              <UserCircle2 className="w-8 h-8 mr-3 text-accent" />
              Our Officials
            </h3>
            
            <OfficialsCarousel />

            <h3 className="text-2xl font-semibold font-headline text-primary mb-6 flex items-center justify-center sm:justify-start">
              <Settings className="w-8 h-8 mr-3 text-accent" />
              Leadership Structure
            </h3>
            <Card className="shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-300 ease-in-out" data-aos="fade-up">
              <CardContent className="p-6">
                <p className="text-base text-foreground/80 leading-relaxed">
                  TERIA is governed by a Management Committee, which is presided over by a Chairperson. The Committee also includes a Vice-Chairperson, Secretary, Organizing Secretary, and Treasurer, with the roles and responsibilities of these positions clearly defined in the{' '}
                  <a 
                    href="/gallery of moments/Bylaws of the TERIA CBO.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-accent font-semibold link-underline"
                  >
                    by-laws
                  </a>, which also includes the certification of the organization.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-primary/5" data-aos="fade-up">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold font-headline text-primary mb-10 sm:mb-12 text-center flex flex-col items-center justify-center gap-3">
            <ListChecks className="w-10 h-10 text-accent" />
            <span>Our Objectives</span>
          </h2>
          <Card className="shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out" data-aos="fade-up">
            <CardContent className="p-6 sm:p-8">
              <ul className="space-y-3 text-base text-foreground/80 list-decimal list-inside columns-1 md:columns-2">
                {objectives.map((objective, index) => (
                  <li key={index} className="leading-relaxed">{objective}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Focus Areas of Operation Section */}
      <section className="py-12 sm:py-16 lg:py-20" data-aos="fade-up">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold font-headline text-primary mb-3 text-center flex flex-col items-center justify-center gap-3">
            <Briefcase className="w-10 h-10 text-accent" />
            <span>Focus Areas of Operation</span>
          </h2>
          <p className="text-base sm:text-lg text-foreground/80 max-w-2xl mx-auto mb-10 sm:mb-12 text-center">
            We are committed to making a difference in the following areas:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {focusAreas.map((area, index) => (
              <Card key={area.title} className="shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300 ease-in-out" data-aos="fade-up" data-aos-delay={(index * 100).toString()}>
                 <CardHeader className="flex flex-row items-center space-x-3 pb-3">
                  <area.icon className="w-8 h-8 text-accent" />
                  <CardTitle className="font-headline text-xl text-primary">{area.title.split(';')[0]}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/70 mb-4">{area.description}</p>
                  <Button variant="link" asChild className="text-accent p-0 h-auto link-underline">
                    <Link href={area.href}>Learn More <ArrowRight className="ml-1 w-4 h-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-slate-50" data-aos="fade-up">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold font-headline text-primary mb-3 text-center flex flex-col items-center justify-center gap-3">
            <Lightbulb className="w-10 h-10 text-accent" />
            <span>Our Initiatives</span>
          </h2>
           <p className="text-base sm:text-lg text-foreground/80 max-w-3xl mx-auto mb-10 sm:mb-12 text-center">
            In addition to providing general charitable support, TERIA has undertaken the following initiatives:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {initiatives.map((initiative, index) => (
              <Card key={initiative.title} className="shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300 ease-in-out flex flex-col" data-aos="fade-up" data-aos-delay={(index * 100).toString()}>
                <CardHeader className="flex flex-row items-center space-x-3 pb-3">
                  <initiative.icon className="w-8 h-8 text-accent" />
                  <CardTitle className="font-headline text-xl text-primary">{initiative.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-foreground/70">{initiative.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-12 sm:py-16 lg:py-20" data-aos="fade-up">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl sm:text-4xl font-bold font-headline text-primary mb-6 text-center flex flex-col items-center justify-center gap-3">
              <Award className="inline-block w-10 h-10 text-accent" />
              <span>Partners and Support Groups</span>
            </h2>
          <Card className="shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out" data-aos="fade-up">
            <CardContent className="p-6 sm:p-8">
              <p className="text-base text-foreground/80 leading-relaxed mb-4">
                We have so far partnered with {partners} in implementing some of our initiatives.
              </p>
              <p className="text-base text-foreground/80 leading-relaxed">
                TERIA believes in fostering good partnerships that are beneficial to the vulnerable and the marginalized groups and the community at large.
              </p>
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 items-center justify-items-center">
                {Array.from({ length: 14 }).map((_, index) => (
                  <div key={index} className="p-2 transform hover:scale-110 transition-transform duration-200">
                    <Image
                      src={`/partnerlogos/${index + 1}.svg`}
                      alt={`Partner Logo ${index + 1}`}
                      width={120}
                      height={60}
                      className="object-contain rounded"
                      data-ai-hint="partner logo"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Past and Ongoing Activities and Impacts Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-primary/5" data-aos="fade-up">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold font-headline text-primary mb-12 text-center flex flex-col items-center justify-center gap-3">
            <Milestone className="w-10 h-10 text-accent" />
            <span>Our Journey and Impact</span>
          </h2>
          <div className="space-y-8">
            {timelineEvents.map((event, index) => (
              <Card key={event.title} className="shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out" data-aos="fade-up" data-aos-delay={(index * 50).toString()}>
                <CardHeader className="flex flex-row items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <event.icon className="w-10 h-10 text-accent" />
                  </div>
                  <div>
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                       <CalendarDays className="w-4 h-4 mr-2" />
                       <span>{event.year}</span>
                    </div>
                    <CardTitle className="font-headline text-xl text-primary">{event.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="ml-14">
                  <p className="text-base text-foreground/80 leading-relaxed">{event.description}</p>
                  {'images' in event && event.images && (
                     <div className="mt-4">
                      <ScrollArea className="w-full whitespace-nowrap rounded-md">
                        <div className="flex w-max space-x-4 p-4">
                          {(event.images as { src: string; alt: string }[]).map((image, idx) => (
                            <figure key={idx} className="shrink-0">
                              <div className="overflow-hidden rounded-md w-64 h-48 relative">
                                <Image
                                  src={image.src}
                                  alt={image.alt}
                                  className="object-cover"
                                  fill
                                  sizes="(min-width: 640px) 256px, 100vw"
                                  data-ai-hint="community event"
                                />
                              </div>
                            </figure>
                          ))}
                        </div>
                        <ScrollBar orientation="horizontal" />
                      </ScrollArea>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
           <p className="mt-10 text-center text-base text-foreground/70 italic max-w-3xl mx-auto">
            Each activity was developed in close collaboration with the community, ensuring our work is resonant and effective at the grassroots level.
          </p>
        </div>
      </section>


      {/* Location Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-slate-50" data-aos="fade-up">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div data-aos="fade-right">
              <h2 className="text-3xl sm:text-4xl font-bold font-headline text-primary mb-4 flex flex-col items-start gap-3">
                 <MapPin className="inline-block w-8 h-8 text-accent" />
                <span>Our Location</span>
              </h2>
              <p className="text-lg text-foreground/80 mb-4 leading-relaxed font-semibold">
                Chianda Marketplace (Kilo),
                <br />
                Rarieda Sub County,
                <br />
                Siaya County, Kenya.
              </p>
            </div>
            <div data-aos="fade-left">
              <div className="rounded-lg shadow-xl overflow-hidden hover:scale-[1.02] transition-transform duration-300 ease-in-out">
                <iframe
                  src="https://maps.google.com/maps?q=Q83V%2BVX7%2C%20Pap%20Kodero&t=&z=17&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="400"
                  style={{ border:0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Map showing TERIA's location in Chianda Market, Kenya"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 sm:py-20 bg-accent/10" data-aos="fade-in">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold font-headline text-primary mb-4 flex flex-col items-center gap-3">
            <CircleHelp className="w-10 h-10 text-accent" />
            <span>Connect With Us</span>
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-8">
            Reach out to learn more about our work or explore partnership opportunities.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button
              size="lg"
              asChild
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
