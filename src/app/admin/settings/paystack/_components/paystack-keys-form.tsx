// src/app/admin/settings/paystack/_components/paystack-keys-form.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { updatePaystackKeys } from '../actions';
import { useAuth } from '@/hooks/use-auth';

const paystackSettingsSchema = z.object({
  paystackPublicKey: z.string().optional(),
  paystackSecretKey: z.string().optional(),
});

type FormValues = z.infer<typeof paystackSettingsSchema>;

export default function PaystackKeysForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(paystackSettingsSchema),
    defaultValues: {
      paystackPublicKey: '',
      paystackSecretKey: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!user?.email) {
        toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in to perform this action.' });
        return;
    }
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('paystackPublicKey', data.paystackPublicKey || '');
    formData.append('paystackSecretKey', data.paystackSecretKey || '');

    const result = await updatePaystackKeys(formData, user.email);
    
    if (result.success) {
      toast({ title: 'Success', description: result.message });
      form.reset({ paystackPublicKey: '', paystackSecretKey: ''});
    } else {
      toast({ variant: 'destructive', title: 'Error', description: result.message });
    }
    
    setIsSubmitting(false);
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
                <Input placeholder="pk_test_..." {...field} />
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
                <Input type="password" placeholder="sk_test_..." {...field} />
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
