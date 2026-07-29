
"use client";

import type { NavItem } from '@/types';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Logo from '@/components/logo';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Focus Areas', href: '/focus-areas' },
  { label: 'Our Impact', href: '/impact' },
  { label: 'Blog', href: '/blog' },
  { label: 'Donate', href: '/donations' },
  { label: 'Contact', href: '/contact' },
];

const Navbar = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeSheet = () => setIsSheetOpen(false);

  const headerClass = isMounted && isScrolled
    ? "bg-background/80 backdrop-blur-md shadow-md"
    : "bg-transparent";

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 ease-in-out",
        headerClass
      )}
    >
      <div className="container mx-auto flex h-24 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo width={180} height={54} />
        <nav className="hidden md:flex space-x-6 items-center">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "text-base font-semibold text-foreground transition-colors hover:text-primary link-underline", 
                pathname === item.href && "text-primary font-bold" 
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background p-6">
              <SheetHeader className="mb-6 text-left">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              
              <div className="mb-6">
                 <Logo width={150} height={45} />
              </div>

              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={closeSheet} 
                    className={cn(
                      "block text-lg font-semibold text-foreground transition-colors hover:text-primary link-underline",
                       pathname === item.href && "text-primary font-bold" 
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
