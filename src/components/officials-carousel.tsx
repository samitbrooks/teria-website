// src/components/officials-carousel.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import type { Official } from '@/types';
import { Loader2 } from 'lucide-react';

const OfficialsCarousel = () => {
  const [officials, setOfficials] = useState<Official[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const officialsCollection = collection(db, 'officials');
    const q = query(officialsCollection, orderBy('order', 'asc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const officialsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Official));
      setOfficials(officialsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>;
  }
  
  if (officials.length === 0) {
    return <p className="text-center text-muted-foreground">No officials found.</p>;
  }

  return (
    <div className="mb-16">
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
            className="pb-8"
            // @ts-ignore
            style={{
                '--swiper-navigation-color': 'hsl(var(--primary))',
                '--swiper-navigation-size': '22px',
            }}
            >
            {officials.map((official) => (
                <SwiperSlide key={official.id} className="h-auto pb-4">
                <Card className="shadow-lg h-full flex flex-col text-center hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-6 flex flex-col items-center space-y-4 flex-grow">
                    <Image
                        src={official.imageUrl}
                        alt={`Portrait of ${official.name}`}
                        width={150}
                        height={150}
                        className="rounded-full object-cover w-36 h-36 shadow-lg border-4 border-white"
                        data-ai-hint={official.imageHint}
                    />
                    <div className="mt-4">
                        <p className="font-semibold text-xl text-primary">{official.name}</p>
                        <p className="text-base text-accent font-medium">{official.role}</p>
                    </div>
                    </CardContent>
                </Card>
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
  );
};

export default OfficialsCarousel;
