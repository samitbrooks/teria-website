
'use client';

import Link from 'next/link';
import { Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

const CallFAB = () => {
  const phoneNumber = '+254795185979'; // Second phone number with country code

  return (
    <Link
      href={`tel:${phoneNumber}`}
      aria-label="Call us"
      className={cn(
        'fixed bottom-6 right-6 z-50',
        'flex items-center justify-center',
        'w-14 h-14', // Small size
        'bg-accent text-accent-foreground', // Sync with page colors (accent)
        'rounded-full shadow-lg',
        'hover:bg-accent/90 transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background'
      )}
    >
      <Phone className="h-6 w-6" />
    </Link>
  );
};

export default CallFAB;
