
'use client';

import { useState, useEffect } from 'react';
import type { GalleryImageItem } from '@/types';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, A11y } from 'swiper/modules';
import { Camera } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

interface BlogImageCarouselProps {
  images: GalleryImageItem[];
}

const galleryTitles = [
  'Impact in Pictures',
  'Media Showcase',
  'Moments in Focus',
  'Photo Highlights',
  'Our Visual Journey',
];

const BlogImageCarousel: React.FC<BlogImageCarouselProps> = ({ images }) => {
  const [galleryTitle, setGalleryTitle] = useState('Image Gallery'); // Default for SSR

  useEffect(() => {
    // This will only run on the client, after initial hydration
    setGalleryTitle(galleryTitles[Math.floor(Math.random() * galleryTitles.length)]);
  }, []); // Empty dependency array ensures this runs once on mount

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 mb-10">
      <h2 className="text-3xl text-primary font-semibold mb-6 flex items-center">
        <Camera className="mr-3 h-6 w-6 text-accent" />
        {galleryTitle}
      </h2>
      <div className="relative">
        <Swiper
          modules={[Navigation, Autoplay, A11y]}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          loop={true}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          className="rounded-lg shadow-lg overflow-hidden h-96" // Set a fixed height or aspect ratio
          // Style variables for default Swiper controls
          // @ts-ignore
          style={{
            '--swiper-navigation-color': 'hsl(0 0% 100%)', // White arrows
            '--swiper-navigation-size': '22px', // For arrow icon size inside button
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-full relative">
                <Image
                  src={image.src}
                  alt={image.alt || `Gallery image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 700px"
                  className="object-cover"
                  data-ai-hint={image.imageHint}
                />
                {/* Captions removed from here */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default BlogImageCarousel;
