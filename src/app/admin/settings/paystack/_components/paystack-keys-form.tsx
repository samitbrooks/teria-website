// src/app/admin/settings/paystack/_components/paystack-keys-form.tsx
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';

const paystackSettingsSchema = z.object({
  paystackPublicKey: z.string().optional(),
  paystackSecretKey: z.string().optional(),
});

type FormValues = z.infer<typeof paystackSettingsSchema>;

export default function PaystackKeysForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(paystackSettingsSchema),
    defaultValues: {
      paystackPublicKey: '',
      paystackSecretKey: '',
    },
  });

  useEffect(() => {
    let isMounted = true;
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && data.settings?.paystackPublicKey) {
          form.setValue('paystackPublicKey', data.settings.paystackPublicKey);
        }
      })
      .catch((err) => console.warn('Could not load current settings:', err))
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [form]);

  const onSubmit = async (data: FormValues) => {
    if (!user?.email) {
      toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in to perform this action.' });
      return;
    }
    setIsSubmitting(true);

    try {
      const payload: any = {};
      if (data.paystackPublicKey !== undefined) payload.paystackPublicKey = data.paystackPublicKey.trim();
      if (data.paystackSecretKey !== undefined && data.paystackSecretKey.trim()) {
        payload.paystackSecretKey = data.paystackSecretKey.trim();
      }

      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (result.success) {
        toast({
          title: 'Keys Updated Successfully!',
          description: payload.paystackPublicKey?.startsWith('pk_live_')
            ? 'Paystack is now LIVE! Donors can now make real donations.'
            : 'Paystack keys saved to database.',
        });
        form.setValue('paystackSecretKey', '');
      } else {
        toast({ variant: 'destructive', title: 'Error', description: result.message || 'Failed to update keys.' });
      }
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'Error', description: err.message || 'An unexpected error occurred.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="paystackPublicKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Paystack Public Key</FormLabel>
              <FormControl>
                <Input placeholder="pk_live_... (or pk_test_...)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paystackSecretKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Paystack Secret Key</FormLabel>
              <FormControl>
                <Input type="password" placeholder="sk_live_... (or sk_test_...)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Database Keys
        </Button>
      </form>
    </Form>
  );
}
