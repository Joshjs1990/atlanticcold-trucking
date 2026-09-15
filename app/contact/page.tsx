import type { Metadata } from 'next';
import Image from 'next/image';
import { Mail, MapPin, Phone, Printer } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SubpageFooter } from '@/components/subpage-footer';
import { ContactForm } from '@/components/contact-form';

const faqs = [
  [
    'What freight does AtlanticCold transport?',
    'We focus on refrigerated and frozen food freight moving through the Northeast.',
  ],
  [
    'Which states do you cover?',
    'Our primary coverage includes New York, New Jersey, Pennsylvania, and Connecticut.',
  ],
  [
    'Can you support recurring delivery routes?',
    'Yes. We can discuss dedicated and recurring capacity based on your lanes, frequency, and delivery windows.',
  ],
  [
    'Do you offer cross-dock services?',
    'Yes. Our cross-dock support helps refrigerated and frozen food move through transfer and consolidation points efficiently.',
  ],
  [
    'What should I include in a quote request?',
    'Include the pickup and delivery locations, timing, product type, temperature requirements, and any recurring schedule details.',
  ],
] as const;

export const metadata: Metadata = {
  title: 'Contact | AtlanticCold Trucking',
  description:
    'Contact Atlantic Cold Trucking in Totowa, New Jersey about refrigerated and frozen truckload and LTL transportation.',
};

const contactHeroImage =
  'https://images.unsplash.com/photo-1769697756481-ef0b61fbd7cf?auto=format&fit=crop&w=2200&q=84';

export default function ContactPage() {
  return (
    <main className="contact-page">
      <SiteHeader />

      <section className="contact-page-hero" id="top">
        <div className="contact-page-hero-media" aria-hidden="true">
          <Image
            src={contactHeroImage}
            alt="Trucks travelling on a snowy highway"
            fill
            priority
            unoptimized
            sizes="100vw"
          />
        </div>
        <div className="contact-page-hero-overlay" aria-hidden="true" />
        <div className="contact-page-inner">
          <div className="contact-page-copy">
            <span className="section-label section-label-light">
              Start a conversation
            </span>
            <h1>
              Let’s plan
              <br />
              <span>the move.</span>
            </h1>
            <p>
              Tell us what you are moving, where it needs to go, and when it
              needs to arrive. Our team will help identify the right service and
              next step.
            </p>
            <div className="contact-page-details">
              <span>
                <MapPin size={17} /> 111 Maltese Drive, 1st Floor, Totowa, NJ
                07512
              </span>
              <a href="mailto:MarkD@atlanticcold.com">
                <Mail size={17} /> MarkD@atlanticcold.com
              </a>
              <a href="tel:+19738378585">
                <Phone size={17} /> 973-837-8585
              </a>
              <span>
                <Printer size={17} /> Fax: 973-837-8586
              </span>
            </div>
          </div>

          <ContactForm variant="quote" />
        </div>
      </section>

      <section className="location-faq contact-page-faq">
        <div className="location-faq-heading">
          <span className="section-label">Before you reach out</span>
          <h2>
            Frequently asked
            <br />
            <span>questions.</span>
          </h2>
        </div>
        <div className="location-faq-list">
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <SubpageFooter />
    </main>
  );
}
