
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Active | TERIA',
  description: 'This page is currently not active.',
};

const GetInvolvedPageRemoved = () => {
  return (
    <div className="py-16 sm:py-20" data-aos="fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold font-headline text-primary">Page Not Active</h1>
        <p className="mt-4 text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto">
          This page is no longer in use. Please navigate using the menu.
        </p>
      </div>
    </div>
  );
};

export default GetInvolvedPageRemoved;
