
'use server';

import { contactFormSchema, type ContactFormData } from '@/lib/schemas/contact-schema';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';


export interface SubmitContactFormResponse {
  success: boolean;
  message: string;
  errors?: { field: keyof ContactFormData | 'root'; message: string }[];
}

export async function handleContactSubmit(data: ContactFormData): Promise<SubmitContactFormResponse> {
  const validationResult = contactFormSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      message: 'Validation failed. Please check your input.',
      errors: validationResult.error.issues.map(issue => ({
        field: (issue.path.join('.') || 'root') as keyof ContactFormData | 'root',
        message: issue.message,
      })),
    };
  }

  const { name, email, subject, message } = validationResult.data;
  
  try {
    // Save submission to Firestore
    await addDoc(collection(db, 'contactSubmissions'), {
      name,
      email,
      subject,
      message,
      submittedAt: serverTimestamp(),
      read: false, // Default to unread
    });

    // Email sending simulation can remain for logging if desired
    console.log('--- Contact Form Submission Attempt (Email Sending Simulated) ---');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Intended Recipient:', 'teria.cbo@gmail.com');

    return { 
      success: true, 
      message: 'Your message has been sent successfully! We will get back to you shortly.' 
    };
  } catch (error) {
    console.error('Error processing contact form:', error);
    return { 
      success: false, 
      message: 'An error occurred while attempting to send your message. Please try again later.' 
    };
  }
}
