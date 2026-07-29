
'use server';

import { z } from 'zod';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';

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
  
  const validatedEmail = validationResult.data.email;

  try {
    // Check if email already exists
    const subscribersCollection = collection(db, 'newsletterSubscribers');
    const q = query(subscribersCollection, where('email', '==', validatedEmail));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return {
        success: false,
        message: 'This email is already subscribed.',
      };
    }

    // Add new subscriber to Firestore
    await addDoc(subscribersCollection, {
      email: validatedEmail,
      subscribedAt: serverTimestamp(),
    });

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
