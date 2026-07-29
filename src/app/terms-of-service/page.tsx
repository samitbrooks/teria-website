
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Terms of Service | TERIA',
  description: 'Terms of Service for The Empowerment, Relief and Inclusion Agenda (TERIA). Read the terms and conditions for using our website and services.',
};

const TermsOfServicePage = () => {
  return (
    <div>
      <section className="bg-primary/10 py-16 sm:py-20" data-aos="fade-in">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold font-headline text-primary">Terms of Service</h1>
          <p className="mt-4 text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto">
            Effective Date: July 26, 2024
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20" data-aos="fade-up">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          
          <div className="space-y-8 text-foreground/80 leading-relaxed">
            <article className="space-y-4">
              <h2 className="text-2xl font-semibold font-headline text-primary mt-6 mb-3">1. Agreement to Terms</h2>
              <p>
                These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and The Empowerment, Relief and Inclusion Agenda ("TERIA", "we", "us", or "our"), concerning your access to and use of the www.teria.org website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").
              </p>
              <p>
                You agree that by accessing the Site, you have read, understood, and agreed to be bound by all of these Terms of Service. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF SERVICE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SITE AND YOU MUST DISCONTINUE USE IMMEDIATELY.
              </p>
              <p>
                Supplemental terms and conditions or documents that may be posted on the Site from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Terms of Service at any time and for any reason.
              </p>
            </article>

            <article className="space-y-4">
              <h2 className="text-2xl font-semibold font-headline text-primary mt-6 mb-3">2. Intellectual Property Rights</h2>
              <p>
                Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of the Republic of Kenya, foreign jurisdictions, and international conventions.
              </p>
              <p>
                The Content and the Marks are provided on the Site "AS IS" for your information and personal use only. Except as expressly provided in these Terms of Service, no part of the Site and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
              </p>
            </article>

            <article className="space-y-4">
              <h2 className="text-2xl font-semibold font-headline text-primary mt-6 mb-3">3. User Representations</h2>
              <p>
                By using the Site, you represent and warrant that: (1) you have the legal capacity and you agree to comply with these Terms of Service; (2) you are not a minor in the jurisdiction in which you reside; (3) you will not access the Site through automated or non-human means, whether through a bot, script or otherwise; (4) you will not use the Site for any illegal or unauthorized purpose; and (5) your use of the Site will not violate any applicable law or regulation.
              </p>
            </article>

            <article className="space-y-4">
              <h2 className="text-2xl font-semibold font-headline text-primary mt-6 mb-3">4. Prohibited Activities</h2>
              <p>
                You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
              </p>
              <p>As a user of the Site, you agree not to:</p>
              <ul className="list-disc list-inside ml-4">
                <li>Systematically retrieve data or other content from the Site to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
                <li>Make any unauthorized use of the Site, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses.</li>
                <li>Use the Site to advertise or offer to sell goods and services not related to TERIA's mission.</li>
                <li>Circumvent, disable, or otherwise interfere with security-related features of the Site.</li>
                <li>Engage in unauthorized framing of or linking to the Site.</li>
                <li>Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Site to you.</li>
                <li>Use the Site in a manner inconsistent with any applicable laws or regulations.</li>
                <li>[Add any other specific prohibitions relevant to TERIA]</li>
              </ul>
            </article>

            <article className="space-y-4">
              <h2 className="text-2xl font-semibold font-headline text-primary mt-6 mb-3">5. Site Management</h2>
              <p>
                We reserve the right, but not the obligation, to: (1) monitor the Site for violations of these Terms of Service; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Terms of Service; (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof; (4) otherwise manage the Site in a manner designed to protect our rights and property and to facilitate the proper functioning of the Site.
              </p>
            </article>

            <article className="space-y-4">
              <h2 className="text-2xl font-semibold font-headline text-primary mt-6 mb-3">6. Term and Termination</h2>
              <p>
                These Terms of Service shall remain in full force and effect while you use the Site. WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS OF SERVICE, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SITE (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON.
              </p>
            </article>

            <article className="space-y-4">
              <h2 className="text-2xl font-semibold font-headline text-primary mt-6 mb-3">7. Modifications and Interruptions</h2>
              <p>
                We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. We also reserve the right to modify or discontinue all or part of the Site without notice at any time. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Site.
              </p>
              <p>
                We cannot guarantee the Site will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Site, resulting in interruptions, delays, or errors.
              </p>
            </article>

            <article className="space-y-4">
              <h2 className="text-2xl font-semibold font-headline text-primary mt-6 mb-3">8. Governing Law</h2>
              <p>
                These Terms of Service and your use of the Site are governed by and construed in accordance with the laws of the Republic of Kenya applicable to agreements made and to be entirely performed within the Republic of Kenya, without regard to its conflict of law principles.
              </p>
            </article>

            <article className="space-y-4">
              <h2 className="text-2xl font-semibold font-headline text-primary mt-6 mb-3">9. Disclaimer</h2>
              <p>
                THE SITE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SITE AND OUR SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SITE AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SITE’S CONTENT OR THE CONTENT OF ANY WEBSITES LINKED TO THE SITE AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE SITE, ... [This section should be thoroughly reviewed by legal counsel].
              </p>
            </article>

            <article className="space-y-4">
              <h2 className="text-2xl font-semibold font-headline text-primary mt-6 mb-3">10. Limitation of Liability</h2>
              <p>
                IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES... [This section should be thoroughly reviewed by legal counsel].
              </p>
            </article>

             <article className="space-y-4">
              <h2 className="text-2xl font-semibold font-headline text-primary mt-6 mb-3">11. Indemnification</h2>
              <p>
                You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys’ fees and expenses, made by any third party due to or arising out of: (1) use of the Site; (2) breach of these Terms of Service; ... [This section should be thoroughly reviewed by legal counsel].
              </p>
            </article>


            <article className="space-y-4">
              <h2 className="text-2xl font-semibold font-headline text-primary mt-6 mb-3">12. Contact Us</h2>
              <p>
                In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
              </p>
              <p>
                The Empowerment, Relief and Inclusion Agenda (TERIA)<br />
                [Your Organization's Full Address, e.g., P.O Box 44-40604-Ragengni, Kenya]<br />
                [Your Organization's Contact Email or Link to Contact Page]
              </p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfServicePage;
