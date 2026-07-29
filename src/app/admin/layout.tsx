// src/app/admin/layout.tsx
'use client';

import { AuthProvider, useAuth } from '@/hooks/use-auth';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Newspaper, LogOut, Loader2, DollarSign, Users, Mail, Bell, Settings, Image as ImageIcon, UserSquare, ChevronDown, ShieldCheck, PanelLeft } from 'lucide-react';
import Logo from '@/components/logo';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';


function AdminSidebarNav() {
    const pathname = usePathname();
    const [openAccordion, setOpenAccordion] = useState<string | undefined>(undefined);

    const navLinks = [
        { href: '/admin', icon: Home, label: 'Dashboard' },
        { href: '/admin/posts', icon: Newspaper, label: 'Posts' },
        { href: '/admin/donations', icon: DollarSign, label: 'Donations' },
        { href: '/admin/messages', icon: Mail, label: 'Messages' },
        { href: '/admin/subscribers', icon: Bell, label: 'Subscribers' },
        { href: '/admin/officials', icon: UserSquare, label: 'Officials' },
        { href: '/admin/gallery', icon: ImageIcon, label: 'Gallery' },
        { href: '/admin/users', icon: Users, label: 'Users' },
        { href: '/admin/audit-log', icon: ShieldCheck, label: 'Audit Log' },
    ];

    const settingsSubLinks = [
        { href: '/admin/settings', label: 'General' },
        { href: '/admin/settings/paystack', label: 'Paystack' },
    ];
    
     useEffect(() => {
        if (pathname.startsWith('/admin/settings')) {
        setOpenAccordion('settings');
        } else {
            const currentLink = navLinks.find(link => link.href === pathname || (link.href !== '/admin' && pathname.startsWith(link.href)));
            if (!currentLink || !settingsSubLinks.some(sub => sub.href === currentLink.href)) {
                setOpenAccordion(undefined);
            }
        }
    }, [pathname]);


    return (
        <>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(`flex items-center px-2 py-3 text-gray-700 hover:bg-gray-200 rounded-md text-sm`,
                  pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href)) ? 'bg-gray-200' : ''
                )}
              >
                <link.icon className="h-5 w-5" />
                <span className="ml-3">{link.label}</span>
              </Link>
            ))}

            <Accordion type="single" collapsible value={openAccordion} onValueChange={setOpenAccordion}>
                <AccordionItem value="settings" className="border-b-0">
                    <AccordionTrigger className={cn(`flex items-center px-2 py-3 text-gray-700 hover:bg-gray-200 rounded-md text-sm w-full`, { 'bg-gray-200': openAccordion === 'settings'})}>
                         <div className="flex items-center">
                            <Settings className="h-5 w-5" />
                            <span className="ml-3">Settings</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-4">
                       {settingsSubLinks.map(link => (
                         <Link
                            key={link.href}
                            href={link.href}
                            className={cn(`flex items-center px-2 py-3 text-gray-700 hover:bg-gray-200 rounded-md text-sm`,
                                pathname === link.href ? 'bg-gray-200' : ''
                            )}
                         >
                            <span className="ml-3">{link.label}</span>
                         </Link>
                       ))}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </>
    )
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  
  const getInitials = (email: string | null | undefined) => {
    if (!email) return 'A';
    return email.charAt(0).toUpperCase();
  }

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);


  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user && pathname !== '/admin/login') {
     return null;
  }
  
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-background sm:flex">
        <div className="flex h-16 items-center border-b px-6">
          <Logo />
        </div>
        <nav className="flex-1 overflow-auto py-4 px-4">
            <AdminSidebarNav />
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-60">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" variant="outline" className="sm:hidden">
                        <PanelLeft className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="sm:max-w-xs">
                    <nav className="grid gap-6 text-lg font-medium">
                        <div className="flex h-16 items-center border-b px-6 -ml-6">
                            <Logo />
                        </div>
                        <AdminSidebarNav />
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="relative ml-auto flex-1 md:grow-0">
                {/* Could be a search bar */}
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                         <Avatar>
                            <AvatarFallback>{getInitials(user?.email)}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
        <main className="flex-1 p-4 sm:px-6 sm:py-0">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AuthProvider>
  );
}
