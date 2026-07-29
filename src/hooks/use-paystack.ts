'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { usePaystackPayment } from 'react-paystack';
import type { PaystackProps } from 'react-paystack/dist/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Heart, Loader2 } from 'lucide-react';
import { verifyDonation } from './actions';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const donationSchema = z.object({
  name: z.string().min(2, 'Please enter a valid name.'),
  email: z.string().email('Please enter a valid email address.'),
  amount: z.coerce.number().min(100, 'Minimum donation is KES 100.'),
});

type DonationFormValues = z.infer<typeof donationSchema>;

export default function DonatePage() {
    const [isProcessing, setIsProcessing] = useState(false);
    const { toast } = useToast();
    
    const form = useForm<DonationFormValues>({
        resolver: zodResolver(donationSchema),
        defaultValues: {
            name: '',
            email: '',
            amount: 1000,
        },
    });

    const { name, email, amount } = form.watch();

    const config: PaystackProps = {
        reference: new Date().getTime().toString(),
        email: email,
        amount: amount * 100, // Amount is in the lowest currency unit (e.g., kobo)
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
        metadata: {
            name: name,
        },
    };

    const initializePayment = usePaystackPayment(config);

    const handleSuccess = async (reference: any) => {
        setIsProcessing(true);
        try {
            const result = await verifyDonation(reference.reference);
            if (result.success) {
                toast({
                    title: 'Donation Successful!',
                    description: 'Thank you for your generous support.',
                });
                form.reset();
            } else {
                throw new Error(result.message || 'Verification failed');
            }
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Payment Verification Failed',
                description: error.message || 'An error occurred. Please contact us if you were charged.',
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

    function onSubmit(data: DonationFormValues) {
        setIsProcessing(true);
        initializePayment({
            onSuccess: handleSuccess,
            onClose: handleClose,
        });
    }

    return (
        <div>
        <section className="bg-primary/10 py-16 sm:py-20" data-aos="fade-in">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold font-headline text-primary">Support TERIA</h1>
            <p className="mt-4 text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto">
                Your generous contribution makes our work possible and brings hope to communities.
            </p>
            </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
            <Card className="shadow-xl" data-aos="fade-up">
                <CardHeader className="text-center">
                <Heart className="w-12 h-12 mx-auto text-accent mb-4" />
                <CardTitle className="font-headline text-2xl sm:text-3xl text-primary">Make a Donation</CardTitle>
                </CardHeader>
                <CardContent className="p-6 sm:p-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                        <FormItem>
                            <Label htmlFor="name">Full Name</Label>
                            <FormControl>
                            <Input id="name" placeholder="Jane Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                        <FormItem>
                            <Label htmlFor="email">Email Address</Label>
                            <FormControl>
                            <Input id="email" type="email" placeholder="jane.doe@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                        <FormItem>
                            <Label htmlFor="amount">Amount (KES)</Label>
                            <FormControl>
                            <Input id="amount" type="number" placeholder="1000" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
                        {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Donate Now'}
                    </Button>
                    </form>
                </Form>
                </CardContent>
            </Card>
            </div>
        </section>
        </div>
    );
}