// src/components/footer.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Mail, Phone, MapPin, Twitter, Send } from 'lucide-react';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { handleNewsletterSubscribe } from '@/app/actions/newsletter';
import { useRef, useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import type { SiteSettings } from '@/types';

const Footer = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    const docRef = doc(db, 'settings', 'site');
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setSettings(docSnap.data() as SiteSettings);
      }
    });
    return () => unsubscribe();
  }, []);

  const quickLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Focus Areas', href: '/focus-areas' },
    { label: 'Our Impact', href: '/impact' },
    { label: 'Blog', href: '/blog' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy-policy' }, 
    { label: 'Terms of Service', href: '/terms-of-service' }, 
    { label: 'Admin Login', href: '/admin' },
  ];
  
  const handleFormSubmit = async (formData: FormData) => {
    const result = await handleNewsletterSubscribe(formData);
    if (result.success) {
      toast({
        title: 'Subscribed!',
        description: result.message,
      });
      formRef.current?.reset();
    } else {
      toast({
        variant: 'destructive',
        title: 'Subscription Failed',
        description: result.message,
      });
    }
  };


  return (
    <footer className="bg-slate-100 text-foreground/80 py-12 sm:py-16 font-body">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <Logo width={200} height={60} />
            <p className="text-sm font-bold text-primary">
              &quot;Empowering the Excluded&quot;
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold font-headline text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm hover:text-primary transition-colors link-underline">
                    {link.label}
                  </Link>
                </li>
              ))}
               <li>
                 <Link href="/contact" className="text-sm hover:text-primary transition-colors link-underline">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold font-headline text-foreground mb-4">Contact Us</h3>
            <address className="space-y-2 text-sm not-italic">
              <p className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-1 shrink-0" />
                <span>Chianda Marketplace (Kilo), Rarieda Sub County, Siaya County, Kenya</span>
              </p>
              {settings && (
                <>
                  <p className="flex items-start">
                    <Phone className="w-4 h-4 mr-2 mt-1 shrink-0" />
                    <span>
                      <a href={`tel:${settings.contactPhone1}`} className="block hover:text-primary link-underline">{settings.contactPhone1}</a>
                      <a href={`tel:${settings.contactPhone2}`} className="block hover:text-primary link-underline">{settings.contactPhone2}</a>
                    </span>
                  </p>
                  <p className="flex items-start"> 
                    <Mail className="w-4 h-4 mr-2 mt-1 shrink-0" /> 
                    <span>
                        <a href={`mailto:${settings.contactEmail}`} className="block hover:text-primary break-all link-underline">{settings.contactEmail}</a>
                    </span>
                  </p>
                </>
              )}
            </address>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold font-headline text-foreground mb-4">Stay Updated</h3>
            <p className="text-sm mb-3">Subscribe to our newsletter for the latest updates and news.</p>
            <form ref={formRef} action={handleFormSubmit} className="flex gap-2">
              <Input name="email" type="email" placeholder="Enter your email" className="bg-background" aria-label="Email for newsletter" required />
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105 transition-transform duration-200" aria-label="Subscribe to newsletter">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} TERIA. All rights reserved.</p>
          {settings && (
            <div className="flex space-x-4 mt-4 sm:mt-0">
                <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-black transition hover:scale-110"><Facebook className="w-5 h-5" /></a>
                <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-black transition hover:scale-110"><Instagram className="w-5 h-5" /></a>
                <a href={settings.tiktokUrl} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-black transition hover:scale-110"><Image src="/logo-tiktok-svgrepo-com.svg" alt="TikTok logo" width={20} height={20} className="w-5 h-5" /></a>
                <a href={settings.twitterUrl} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="text-black transition hover:scale-110"><Twitter className="w-5 h-5" /></a>
            </div>
          )}
          <div className="flex space-x-4 mt-4 sm:mt-0">
             {legalLinks.map((link) => (
                <Link key={link.label} href={link.href} className="hover:text-primary transition-colors link-underline">
                  {link.label}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
