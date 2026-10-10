
'use client';

import React, { useState, useEffect } from 'react';
import { PaystackButton } from 'react-paystack';
import type { PaystackProps } from 'react-paystack/dist/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Heart, Loader2, Check, BookOpen, Users, Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';
import { verifyDonation, getPaystackPublicKey } from './actions';
import { useAuth } from '@/hooks/use-auth';

const predefinedAmounts = [500, 1000, 2500, 5000, 10000, 20000];

const DonationsPage = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [amount, setAmount] = useState(1000);
  const [email, setEmail] = useState(user?.email || '');
  const [name, setName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [publicKey, setPublicKey] = useState(process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '');
  const [isKeyLoading, setIsKeyLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && data.settings?.paystackPublicKey) {
          setPublicKey(data.settings.paystackPublicKey);
        }
      })
      .catch((err) => console.warn('Could not fetch settings:', err))
      .finally(() => {
        if (isMounted) setIsKeyLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSuccess = async (reference: any) => {
    setIsProcessing(true);
    try {
      const ref = reference?.reference || reference?.trxref || String(reference);
      const res = await fetch('/api/donations/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reference: ref,
          name,
          email,
          amount,
        }),
      });

      const result = await res.json();
      if (result.success) {
        toast({
          title: 'Donation Successful!',
          description: 'Thank you for your generous support.',
        });
        setName('');
        setEmail(user?.email || '');
        setAmount(1000);
      } else {
        throw new Error(result.message || 'Verification failed');
      }
    } catch (error: any) {
      toast({
        title: 'Thank You!',
        description: error.message || 'Your donation has been received.',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setIsProcessing(false);
    toast({
      variant: 'destructive',
      title: 'Payment Closed',
      description: 'The payment pop-up was closed before completion.',
    });
  };

  const componentProps: PaystackProps = {
    email,
    amount: amount * 100,
    currency: 'KES',
    metadata: {
      name,
    },
    publicKey,
    text: isProcessing ? 'Processing...' : `Donate KES ${amount}`,
    onSuccess: (reference: any) => handleSuccess(reference),
    onClose: handleClose,
  };

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div>
      <section className="bg-primary/10 py-16 sm:py-20" data-aos="fade-in">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold font-headline text-primary">Support Our Cause</h1>
          <p className="mt-4 text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto">
            Your generous contribution fuels our mission and brings tangible change to communities in need. Every shilling makes a difference.
          </p>
        </div>
      </section>

       <section className="py-12 sm:py-16 lg:py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
           <Card className="shadow-lg" data-aos="fade-up">
            <CardHeader>
                <CardTitle className="font-headline text-2xl sm:text-3xl text-primary">
                    Empowering Marginalized Communities for a Better Future
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-foreground/80">
                <p className="font-semibold">Dear Supporter,</p>
                <p>This campaign, organized by The Empowerment, Relief, and Inclusion Agenda (TERIA), is dedicated to uplifting marginalized and vulnerable groups in Kenya, particularly women, youth, children, and the elderly. Our mission is to empower these communities through economic, social, and educational opportunities, with a focus on sustainable development, community health, and mental well-being.</p>
                <p>Your support is vital in helping us make a difference. By contributing to TERIA, you are directly impacting the lives of those who need it most, ensuring access to the resources, mentorship, and opportunities that enable them to thrive.</p>
                
                <div className="grid md:grid-cols-2 gap-6 pt-4">
                    <div className="space-y-3">
                        <h3 className="font-semibold text-primary text-lg flex items-center"><BookOpen className="mr-2 h-5 w-5 text-accent"/>Education & Literacy</h3>
                        <ul className="space-y-2 list-inside">
                            <li className="flex items-start"><Check className="h-4 w-4 mr-2 mt-1 text-green-600 shrink-0"/>Enhancing literacy levels through the ‘Read & Learn’ initiative</li>
                            <li className="flex items-start"><Check className="h-4 w-4 mr-2 mt-1 text-green-600 shrink-0"/>Supporting educational programs for children and adults</li>
                            <li className="flex items-start"><Check className="h-4 w-4 mr-2 mt-1 text-green-600 shrink-0"/>Providing materials and mentorship to underserved schools</li>
                            <li className="flex items-start"><Check className="h-4 w-4 mr-2 mt-1 text-green-600 shrink-0"/>Raising awareness about the importance of education</li>
                        </ul>
                    </div>
                     <div className="space-y-3">
                        <h3 className="font-semibold text-primary text-lg flex items-center"><Users className="mr-2 h-5 w-5 text-accent"/>Women & Youth Economic Empowerment</h3>
                        <ul className="space-y-2 list-inside">
                            <li className="flex items-start"><Check className="h-4 w-4 mr-2 mt-1 text-green-600 shrink-0"/>Offering entrepreneurship training and financial literacy</li>
                            <li className="flex items-start"><Check className="h-4 w-4 mr-2 mt-1 text-green-600 shrink-0"/>Providing mentorship and business incubation</li>
                            <li className="flex items-start"><Check className="h-4 w-4 mr-2 mt-1 text-green-600 shrink-0"/>Facilitating access to microfinance to support small businesses</li>
                            <li className="flex items-start"><Check className="h-4 w-4 mr-2 mt-1 text-green-600 shrink-0"/>Building economic independence and resilience</li>
                        </ul>
                    </div>
                     <div className="space-y-3">
                        <h3 className="font-semibold text-primary text-lg flex items-center"><Heart className="mr-2 h-5 w-5 text-accent"/>Health & Well-Being</h3>
                        <ul className="space-y-2 list-inside">
                            <li className="flex items-start"><Check className="h-4 w-4 mr-2 mt-1 text-green-600 shrink-0"/>Promoting menstrual health by distributing dignity kits</li>
                            <li className="flex items-start"><Check className="h-4 w-4 mr-2 mt-1 text-green-600 shrink-0"/>Raising awareness and providing support for mental health</li>
                            <li className="flex items-start"><Check className="h-4 w-4 mr-2 mt-1 text-green-600 shrink-0"/>Providing access to clean water, sanitation, and hygiene (WASH)</li>
                            <li className="flex items-start"><Check className="h-4 w-4 mr-2 mt-1 text-green-600 shrink-0"/>Advocating for sexual and reproductive rights</li>
                        </ul>
                    </div>
                     <div className="space-y-3">
                        <h3 className="font-semibold text-primary text-lg flex items-center"><Leaf className="mr-2 h-5 w-5 text-accent"/>Climate Action</h3>
                        <ul className="space-y-2 list-inside">
                            <li className="flex items-start"><Check className="h-4 w-4 mr-2 mt-1 text-green-600 shrink-0"/>Engaging in environmental education and community clean-ups</li>
                            <li className="flex items-start"><Check className="h-4 w-4 mr-2 mt-1 text-green-600 shrink-0"/>Promoting sustainable practices through tree planting</li>
                            <li className="flex items-start"><Check className="h-4 w-4 mr-2 mt-1 text-green-600 shrink-0"/>Encouraging communities to adopt green solutions</li>
                        </ul>
                    </div>
                </div>

                <div className="text-center pt-6 space-y-2">
                    <p className="font-bold text-lg text-tertiary">Together, Let’s Empower, Uplift, and Include – Building a Better Kenya for All.</p>
                    <p>Your contribution helps create lasting change by supporting sustainable livelihoods, improving access to education, and fostering healthier, more resilient communities. Thank you for joining us in our mission to empower Kenya’s marginalized communities.</p>
                    <p className="font-semibold pt-4">With appreciation,</p>
                    <p className="font-bold text-primary">The Empowerment, Relief, and Inclusion Agenda (TERIA)</p>
                    <p className="text-sm text-muted-foreground">Non-Governmental – Non-Profit – Community-Based Organization</p>
                </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <Card className="shadow-xl" data-aos="fade-up">
            <CardHeader className="text-center">
              <Heart className="w-12 h-12 mx-auto text-accent mb-4" />
              <CardTitle className="font-headline text-2xl sm:text-3xl text-primary">Make a Donation</CardTitle>
              <CardDescription>Your support empowers us to continue our vital work.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="your.email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
              </div>

              <div>
                <Label>Select an Amount (KES)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                  {predefinedAmounts.map((amt) => (
                    <Button
                      key={amt}
                      variant={amount === amt ? 'default' : 'outline'}
                      size="lg"
                      onClick={() => setAmount(amt)}
                      className="font-semibold text-lg"
                    >
                      {amt.toLocaleString()}
                    </Button>
                  ))}
                  <Input
                    type="number"
                    placeholder="Custom Amount"
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="md:col-span-3 text-lg h-12"
                    min="100"
                  />
                </div>
              </div>

              {!publicKey ? (
                <div className="space-y-2">
                  <Button className="w-full h-11" disabled variant="outline">
                    {isKeyLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Preparing secure checkout...
                      </>
                    ) : (
                      'Payment gateway is being configured'
                    )}
                  </Button>
                  {!isKeyLoading && (
                    <p className="text-xs text-center text-muted-foreground">
                      Payments will be enabled once Paystack API keys are set in the admin settings.
                    </p>
                  )}
                </div>
              ) : isValidEmail(email) ? (
                <PaystackButton
                  {...componentProps}
                  className={cn(
                    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
                    'bg-primary text-primary-foreground hover:bg-primary/90 shadow',
                    'h-11 rounded-md px-8 w-full'
                  )}
                  disabled={isProcessing || !name || !email || !amount || amount < 100}
                />
              ) : (
                <Button className="w-full h-11" disabled>
                  Please enter a valid email to donate
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default DonationsPage;
