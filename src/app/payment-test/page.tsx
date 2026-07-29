// src/app/payment-test/page.tsx
'use client';

import React from 'react';
import { PaystackButton } from 'react-paystack';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const PaymentTestPage = () => {
  const { toast } = useToast();
  
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '';

  const config = {
    reference: new Date().getTime().toString(),
    email: "test.user@example.com",
    amount: 50000, // Amount is in kobo (500 KES)
    currency: 'KES', // Explicitly set the currency
    publicKey: publicKey,
  };

  const handlePaystackSuccessAction = (reference: any) => {
    console.log('Payment Successful, reference: ', reference);
    toast({
      title: 'Test Payment Successful!',
      description: `Reference: ${reference.reference}`,
    });
  };

  const handlePaystackCloseAction = () => {
    console.log('Payment modal closed');
    toast({
      variant: 'destructive',
      title: 'Payment Closed',
      description: 'The payment pop-up was closed before completion.',
    });
  };

  const componentProps = {
    ...config,
    text: 'Pay 500 KES',
    onSuccess: handlePaystackSuccessAction,
    onClose: handlePaystackCloseAction,
  };

  return (
    <div className="container mx-auto py-20">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Paystack Integration Test</CardTitle>
          <CardDescription>
            This page is for testing the Paystack payment pop-up. Click the button below to initiate a test transaction.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <p><strong>Email:</strong> {config.email}</p>
          <p><strong>Amount:</strong> KES {(config.amount / 100).toFixed(2)}</p>
          
          {publicKey ? (
            <PaystackButton {...componentProps} className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2" />
          ) : (
            <Button disabled>Paystack Public Key not configured</Button>
          )}

        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentTestPage;
