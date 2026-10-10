// src/app/actions/newsletter.ts
'use server';

import { z } from 'zod';
import { createSubscriber } from '@/lib/d1';

const newsletterSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

export interface SubscribeNewsletterResponse {
  success: boolean;
  message: string;
}

export async function handleNewsletterSubscribe(formData: FormData): Promise<SubscribeNewsletterResponse> {
  const email = formData.get('email');
  const validationResult = newsletterSchema.safeParse({ email });

  if (!validationResult.success) {
    return {
      success: false,
      message: validationResult.error.issues[0].message,
    };
  }

  const validatedEmail = validationResult.data.email.trim().toLowerCase();

  try {
    const res = await createSubscriber(validatedEmail);

    if (res.alreadyExists) {
      return {
        success: false,
        message: 'This email is already subscribed.',
      };
    }

    if (!res.success) {
      return {
        success: false,
        message: 'Failed to record subscription. Please try again.',
      };
    }

    return {
      success: true,
      message: "Thank you for subscribing! You're now on our list.",
    };
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return {
      success: false,
      message: 'An error occurred. Please try again later.',
    };
  }
}
