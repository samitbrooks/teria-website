// src/app/impact/page.tsx
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Users, BarChart3, Star, Leaf, Award, Building, Milestone, CalendarDays, Waves, BriefcaseMedical, Construction, UsersRound, Archive, Footprints, HeartHandshake } from 'lucide-react';
import type { PartnerLogo, GalleryImageItem } from '@/types';
import { cn } from '@/lib/utils';
import AnimatedNumber from '@/components/animated-number';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { useState, useEffect } from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Loader2 } from 'lucide-react';

const projectStats = [
  { icon: Users, value: "5,000+", label: "People Reached" },
  { icon: BarChart3, value: "50+", label: "Programs Run" },
  { icon: CheckCircle, value: "20+", label: "Schools Involved" },
  { icon: Leaf, value: "10,000+", label: "Trees Planted" },
  { icon: Award, value: "1,000+", label: "Youth Empowered" },
  { icon: Building, value: "15+", label: "Communities Served" },
];

const testimonials = [
  {
    quote: "TERIA's mentorship program changed my life. I now run my own successful business thanks to their guidance.",
    name: "Jane Achieng",
    role: "Program Beneficiary",
    imageUrl: "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxNnx8YWZyaWNhbiUyMHdvbWFufGVufDB8fHx8MTc1MDQ1MDg2NHww&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "woman smiling"
  },
  {
    quote: "The mental health support I received from TERIA was invaluable. Their compassionate approach made all the difference.",
    name: "Peter Omondi",
    role: "Community Member",
    imageUrl: "https://images.unsplash.com/photo-1614890094520-7b8dd0ec56d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxOHx8YWZyaWNhbiUyMG1hbnxlbnwwfHx8fDE3NTA0NTA4MjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "man portrait"
  },
  {
    quote: "Thanks to TERIA, our village planted over 500 trees. We're building a greener future together!",
    name: "Aisha Bakari",
    role: "Farmer & Volunteer",
    imageUrl: "https://images.unsplash.com/photo-1613005341945-35e159e522f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxhZnJpY2FuJTIwd29tYW58ZW58MHx8fHwxNzUwNDUwODY0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "woman farmer"
  },
  {
    quote: "TERIA's MHHM workshops empowered our young girls. They are now more confident and well-informed.",
    name: "David Mwangi",
    role: "School Principal",
    imageUrl: "https://images.unsplash.com/photo-1666866850021-a843a45479af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxhZnJpY2FuJTIwbWFuJTIwaW4lMjBzdWl0fGVufDB8fHx8MTc1MDQ1MDkzNXww&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "man professional"
  },
];


const partnerLogos: PartnerLogo[] = [
  { name: "Femme International", logoUrl: "/partnerlogos/femme.png", logoHint: "organization logo" },
  { name: "Garden of Hope Foundation", logoUrl: "/partnerlogos/goh.png", logoHint: "organization logo" },
  { name: "Matibabu Foundation", logoUrl: "/partnerlogos/matibabu.png", logoHint: "organization logo" },
  { name: "Zana Africa", logoUrl: "/partnerlogos/zana.png", logoHint: "organization logo" },
];

const galleryTitles = [
  'Impact in Pictures',
  'Media Showcase',
  'Moments in Focus',
  'Photo Highlights',
  'Our Visual Journey',
];

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


const ImpactPage = () => {
  const [galleryTitle, setGalleryTitle] = useState('Gallery of Moments');
  const [galleryImages, setGalleryImages] = useState<GalleryImageItem[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(true);

  useEffect(() => {
    setGalleryTitle(galleryTitles[Math.floor(Math.random() * galleryTitles.length)]);

    let isMounted = true;
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        if (isMounted && data.success && Array.isArray(data.images)) {
          setGalleryImages(data.images);
        }
      })
      .catch(err => console.warn('Error fetching gallery images:', err))
      .finally(() => {
        if (isMounted) setLoadingGallery(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      {/* Page Header */}
      <section className="bg-primary/10 py-16 sm:py-20" data-aos="fade-in">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold font-headline text-primary">Our Impact</h1>
          <p className="mt-4 text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto">
            See the difference we're making. Stories, statistics, and snapshots of our work in action.
          </p>
        </div>
      </section>

      {/* Project Statistics Section */}
      <section className="py-12 sm:py-16 lg:py-20" data-aos="fade-up">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold font-headline text-primary mb-10 sm:mb-12 text-center" data-aos="fade-up">By The Numbers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projectStats.map((stat, index) => (
              <Card 
                key={stat.label} 
                className="text-center shadow-lg p-6 hover:shadow-xl hover:scale-[1.03] transition-all duration-300 ease-in-out"
                data-aos="fade-up"
                data-aos-delay={(index * 100).toString()}
              >
                <CardHeader className="p-0 mb-3">
                  <stat.icon className="w-12 h-12 text-accent mx-auto" />
                </CardHeader>
                <CardContent className="p-0">
                  <AnimatedNumber 
                    valueString={stat.value} 
                    className="text-4xl font-bold text-primary" 
                  />
                  <p className="text-base text-muted-foreground mt-1">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-slate-50" data-aos="fade-up">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold font-headline text-primary mb-10 sm:mb-12 text-center" data-aos="fade-up">Voices of Change</h2>
          <Swiper
            modules={[Navigation, Autoplay, A11y]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={true}
            breakpoints={{
              768: { // md breakpoint
                slidesPerView: 2,
                spaceBetween: 30,
              },
            }}
            // @ts-ignore
             style={{
              '--swiper-navigation-color': 'hsl(0 0% 100%)', // White arrows
              '--swiper-navigation-size': '22px', 
            }}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index} className="h-auto pb-4"> {/* Ensure slides have enough height for content + shadow */}
                <Card className="shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out h-full flex flex-col"> {/* Added h-full and flex flex-col */}
                  <CardContent className="p-6 flex-grow"> {/* Added flex-grow */}
                    <Star className="w-5 h-5 text-yellow-400 mb-2" /> 
                    <blockquote className="text-base text-foreground/80 italic mb-4">
                      "{testimonial.quote}"
                    </blockquote>
                  </CardContent>
                  <div className="flex items-center p-6 pt-0 border-t border-transparent"> {/* Added border-t transparent to keep spacing consistent if card had a footer before */}
                    <Image
                      src={testimonial.imageUrl}
                      alt={testimonial.name}
                      width={50}
                      height={50}
                      className="rounded-full mr-4"
                      data-ai-hint={testimonial.imageHint}
                    />
                    <div>
                      <p className="font-semibold text-primary">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Journey and Impact Section */}
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
      
      {/* Image Gallery Section */}
      <section className="py-12 sm:py-16 lg:py-20" data-aos="fade-up">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold font-headline text-primary mb-10 sm:mb-12 text-center" data-aos="fade-up">{galleryTitle}</h2>
          {loadingGallery ? (
            <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>
          ) : galleryImages.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages.map((image, index) => (
                <div key={image.id} className="group aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 w-full overflow-hidden rounded-lg bg-gray-200" data-aos="fade-up" data-aos-delay={(index % 4 * 100).toString()}>
                  <div className="w-full h-full relative">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                      className="object-cover group-hover:scale-105 group-hover:opacity-90 transition-transform duration-300 ease-in-out"
                      data-ai-hint={image.imageHint}
                      priority={index < 8} // Prioritize loading for the first few images
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-muted p-6 sm:p-8 rounded-lg shadow-md text-center" data-aos="fade-up">
              <p className="text-lg text-foreground/70">Our gallery is currently empty. Check back soon for moments from our work!</p>
            </div>
          )}
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-primary/5" data-aos="fade-up">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold font-headline text-primary mb-10 sm:mb-12 text-center" data-aos="fade-up">Our Valued Partners</h2>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12" data-aos="fade-up">
            {partnerLogos.map((partner, index) => (
              <div 
                key={partner.name} 
                title={partner.name} 
                className="transform hover:scale-110 transition-transform duration-300 ease-in-out"
                data-aos="zoom-in"
                data-aos-delay={(index * 50).toString()}
              >
                <Image
                  src={partner.logoUrl}
                  alt={`${partner.name} logo`}
                  width={150}
                  height={80}
                  className="object-contain" 
                  data-ai-hint={partner.logoHint}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImpactPage;
