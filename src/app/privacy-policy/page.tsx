
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Privacy Policy | TERIA',
  description: 'Privacy Policy for The Empowerment, Relief and Inclusion Agenda (TERIA). Learn how we collect, use, and protect your personal information.',
};

const PrivacyPolicyPage = () => {
  return (
    <div>
      <section className="bg-primary/10 py-16 sm:py-20" data-aos="fade-in">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold font-headline text-primary">Privacy Policy</h1>
          <p className="mt-4 text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto">
            Effective Date: July 26, 2024
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20" data-aos="fade-up">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          

          <div className="space-y-8 text-foreground/80 leading-relaxed">
            <article className="space-y-4">
              <h2 className="text-2xl font-semibold font-headline text-primary mt-6 mb-3">1. Introduction</h2>
              <p>
                Welcome to The Empowerment, Relief and Inclusion Agenda ("TERIA", "we", "us", "our"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at [Insert TERIA's Contact Email or Link to Contact Page].
              </p>
              <p>
                This privacy notice describes how we might use your information if you:
              </p>
              <ul className="list-disc list-inside ml-4">
                <li>Visit our website at www.teria.org</li>
                <li>Engage with us in other related ways, including any sales, marketing, or events.</li>
              </ul>
              <p>
                In this privacy notice, if we refer to:
              </p>
              <ul className="list-disc list-inside ml-4">
                <li>"Website", we are referring to any website of ours that references or links to this policy.</li>
                <li>"Services", we are referring to our Website, and other related services, including any sales, marketing, or events.</li>
              </ul>
              <p>
                The purpose of this privacy notice is to explain to you in the clearest way possible what information we collect, how we use it, and what rights you have in relation to it. If there are any terms in this privacy notice that you do not agree with, please discontinue use of our Services immediately.
              </p>
            </article>

            <article className="space-y-4">
              <h2 className="text-2xl font-semibold font-headline text-primary mt-6 mb-3">2. What Information Do We Collect?</h2>
              <h3 className="text-xl font-semibold text-primary/90 mt-4 mb-2">Personal information you disclose to us</h3>
              <p>
                <em>In Short: We collect personal information that you provide to us.</em>
              </p>
              <p>
                We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Website or otherwise when you contact us.
              </p>
              <p>
                The personal information that we collect depends on the context of your interactions with us and the Website, the choices you make and the products and features you use. The personal information we collect may include the following:
              </p>
              <ul className="list-disc list-inside ml-4">
                <li><strong>Contact Information:</strong> Names, email addresses, phone numbers, mailing addresses. (e.g., from contact forms)</li>
                <li><strong>Usage Data:</strong> Information on how you use our Website.</li>
                <li>[Add any other types of data you collect, e.g., donation information, volunteer application data]</li>
              </ul>
              <h3 className="text-xl font-semibold text-primary/90 mt-4 mb-2">Information automatically collected</h3>
              <p>
                <em>In Short: Some information – such as your Internet Protocol (IP) address and/or browser and device characteristics – is collected automatically when you visit our Website.</em>
              </p>
              <p>
                We automatically collect certain information when you visit, use or navigate the Website. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Website and other technical information. This information is primarily needed to maintain the security and operation of our Website, and for our internal analytics and reporting purposes.
              </p>
              <p>
                Like many businesses, we also collect information through cookies and similar technologies. [If you use cookies extensively, consider a separate Cookie Policy and link to it here.]
              </p>
            </article>

            <article className="space-y-4">
              <h2 className="text-2xl font-semibold font-headline text-primary mt-6 mb-3">3. How Do We Use Your Information?</h2>
              <p>
                <em>In Short: We process your information for purposes based on legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent.</em>
              </p>
              <p>
                We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations. We indicate the specific processing grounds we rely on next to each purpose listed below.
              </p>
              <ul className="list-disc list-inside ml-4">
                <li>To send administrative information to you.</li>
                <li>To protect our Services (e.g., for fraud monitoring and prevention).</li>
                <li>To respond to user inquiries/offer support to users.</li>
                <li>To send you marketing and promotional communications (if in line with your marketing preferences).</li>
                <li>For other business purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Website, products, marketing and your experience.</li>
                <li>[Add other specific uses relevant to TERIA, e.g., processing donations, managing volunteer applications, sending newsletters]</li>
              </ul>
            </article>

            <article className="space-y-4">
              <h2 className="text-2xl font-semibold font-headline text-primary mt-6 mb-3">4. Will Your Information Be Shared With Anyone?</h2>
              <p>
                <em>In Short: We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</em>
              </p>
              <p>
                We may process or share your data that we hold based on the following legal basis:
              </p>
              <ul className="list-disc list-inside ml-4">
                <li><strong>Consent:</strong> We may process your data if you have given us specific consent to use your personal information for a specific purpose.</li>
                <li><strong>Legitimate Interests:</strong> We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
                <li><strong>Performance of a Contract:</strong> Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.</li>
                <li><strong>Legal Obligations:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
                <li><strong>Vital Interests:</strong> We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.</li>
                <li>[Specify if you share data with third-party service providers, e.g., email marketing services, payment processors, analytics providers, and why.]</li>
              </ul>
            </article>

            <article className="space-y-4">
              <h2 className="text-2xl font-semibold font-headline text-primary mt-6 mb-3">5. How Long Do We Keep Your Information?</h2>
              <p>
                <em>In Short: We keep your information for as long as necessary to fulfill the purposes outlined in this privacy notice unless otherwise required by law.</em>
              </p>
              <p>
                We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements). No purpose in this notice will require us keeping your personal information for longer than [Specify Time Period, e.g., 2 years after the user's last interaction or termination of account].
              </p>
            </article>

            <article className="space-y-4">
              <h2 className="text-2xl font-semibold font-headline text-primary mt-6 mb-3">6. How Do We Keep Your Information Safe?</h2>
              <p>
                <em>In Short: We aim to protect your personal information through a system of organizational and technical security measures.</em>
              </p>
              <p>
                We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security, and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our Website is at your own risk. You should only access the Website within a secure environment.
              </p>
            </article>

            <article className="space-y-4">
              <h2 className="text-2xl font-semibold font-headline text-primary mt-6 mb-3">7. What Are Your Privacy Rights?</h2>
              <p>
                <em>In Short: In some regions, such as the European Economic Area (EEA) and United Kingdom (UK), you have rights that allow you greater access to and control over your personal information. [Adapt this based on relevant jurisdictions, e.g., CCPA for California residents].</em>
              </p>
              <p>
                In some regions (like the EEA and UK), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability. In certain circumstances, you may also have the right to object to the processing of your personal information. To make such a request, please use the contact details provided below. We will consider and act upon any request in accordance with applicable data protection laws.
              </p>
              <p>
                [Add specific details about how users can exercise their rights, e.g., "You can review, change, or terminate your account at any time by..."]
              </p>
            </article>

            <article className="space-y-4">
              <h2 className="text-2xl font-semibold font-headline text-primary mt-6 mb-3">8. Controls for Do-Not-Track Features</h2>
              <p>
                Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy notice.
              </p>
            </article>

            <article className="space-y-4">
              <h2 className="text-2xl font-semibold font-headline text-primary mt-6 mb-3">9. Do We Make Updates to This Notice?</h2>
              <p>
                <em>In Short: Yes, we will update this notice as necessary to stay compliant with relevant laws.</em>
              </p>
              <p>
                We may update this privacy notice from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.
              </p>
            </article>

            <article className="space-y-4">
              <h2 className="text-2xl font-semibold font-headline text-primary mt-6 mb-3">10. How Can You Contact Us About This Notice?</h2>
              <p>
                If you have questions or comments about this notice, you may email us at [Insert TERIA's Privacy Contact Email, e.g., privacy@teria.org] or by post to:
              </p>
              <p>
                The Empowerment, Relief and Inclusion Agenda (TERIA)<br />
                [Your Organization's Full Address]<br />
                [e.g., P.O Box 44-40604-Ragengni, Kenya]
              </p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
