
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { handleContactSubmit, type SubmitContactFormResponse } from './actions';
import { contactFormSchema, type ContactFormData } from '@/lib/schemas/contact-schema';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const ContactPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  async function onSubmit(data: ContactFormData) {
    setIsSubmitting(true);
    try {
      const result: SubmitContactFormResponse = await handleContactSubmit(data);
      if (result.success) {
        toast({
          title: 'Message Sent!',
          description: result.message,
        });
        form.reset();
      } else {
        toast({
          variant: 'destructive',
          title: 'Submission Failed',
          description: result.message || 'Please check your input and try again.',
        });
        if (result.errors) {
          result.errors.forEach(error => {
            const fieldName = error.field === 'root' ? 'message' : error.field; 
            form.setError(fieldName as keyof ContactFormData, {
              type: 'server',
              message: error.message,
            });
          });
        }
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'An Unexpected Error Occurred',
        description: 'Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      {/* Page Header */}
      <section className="bg-primary/10 py-16 sm:py-20" data-aos="fade-in">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold font-headline text-primary">Contact Us</h1>
          <p className="mt-4 text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto">
            We&apos;d love to hear from you. Whether you have a question, a proposal, or just want to say hello, feel free to reach out.
          </p>
        </div>
      </section>

      {/* Contact Details and Form Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16">
            {/* Contact Information */}
            <div className="space-y-8" data-aos="fade-right">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-headline text-primary mb-4">Get in Touch Directly</h2>
                <Card className="shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out" data-aos="fade-up">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start">
                      <Phone className="w-6 h-6 text-accent mr-3 mt-1 shrink-0" />
                      <div>
                        <h3 className="font-semibold text-primary">Phone Numbers</h3>
                        <p className="text-foreground/80">
                          <a href="tel:+254795185979" className="hover:text-primary link-underline font-medium">+254 795 185 979</a> (0795185979)
                        </p>
                        <p className="text-foreground/80">
                          <a href="tel:+254754929777" className="hover:text-primary link-underline font-medium">+254 754 929 777</a> (0754929777)
                        </p>
                      </div>
                    </div>
                     <div className="flex items-start">
                      <Mail className="w-6 h-6 text-accent mr-3 mt-1 shrink-0" />
                      <div>
                        <h3 className="font-semibold text-primary">Email Addresses</h3>
                        <a href="mailto:teria.cbo@gmail.com" className="block text-foreground/80 hover:text-primary break-all link-underline">teria.cbo@gmail.com</a>
                        <a href="mailto:linetk.amollo@gmail.com" className="block text-foreground/80 hover:text-primary break-all link-underline">linetk.amollo@gmail.com</a>
                      </div>
                    </div>
                     <div className="flex items-start">
                      <MapPin className="w-6 h-6 text-accent mr-3 mt-1 shrink-0" />
                      <div>
                        <h3 className="font-semibold text-primary">Physical Address</h3>
                        <p className="text-foreground/80">Chianda Marketplace (Kilo),</p>
                        <p className="text-foreground/80">Rarieda Sub County,</p>
                        <p className="text-foreground/80">Siaya County, Kenya.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Map Placeholder */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-headline text-primary mb-4">Find Us Here</h2>
                <div className="rounded-lg shadow-xl overflow-hidden hover:scale-[1.02] transition-transform duration-300 ease-in-out" data-aos="fade-up">
                  <iframe
                    src="https://maps.google.com/maps?q=Q83V%2BVX7%2C%20Pap%20Kodero&t=&z=17&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="400"
                    style={{ border:0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="TERIA Location: Q83V+VX7, Pap Kodero, Chianda Market, Kenya"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div data-aos="fade-left" data-aos-delay="100">
              <h2 className="text-2xl sm:text-3xl font-bold font-headline text-primary mb-4">Send Us a Message</h2>
              <Card className="shadow-xl p-6 sm:p-8 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 ease-in-out">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="contact-name" className="font-semibold">Full Name</FormLabel>
                          <FormControl>
                            <Input id="contact-name" placeholder="Your Full Name" {...field} className="mt-1" />
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
                          <FormLabel htmlFor="contact-email" className="font-semibold">Email Address</FormLabel>
                          <FormControl>
                            <Input id="contact-email" type="email" placeholder="your.email@example.com" {...field} className="mt-1" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="contact-subject" className="font-semibold">Subject</FormLabel>
                          <FormControl>
                            <Input id="contact-subject" placeholder="Subject of your message" {...field} className="mt-1" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="contact-message" className="font-semibold">Message</FormLabel>
                          <FormControl>
                            <Textarea id="contact-message" placeholder="Your message here..." rows={5} {...field} className="mt-1" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div>
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-tertiary hover:bg-tertiary/90 text-tertiary-foreground hover:scale-105 transition-transform duration-200"
                        disabled={isSubmitting}
                      >
                         {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5" /> Send Message
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
