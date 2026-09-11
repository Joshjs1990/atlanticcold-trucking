import type { Metadata } from 'next';
import { Mail, MapPin, Phone } from 'lucide-react';
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
    'Contact AtlanticCold about refrigerated and frozen food transportation across New York, New Jersey, Pennsylvania, and Connecticut.',
};

export default function ContactPage() {
  return (
    <main className="contact-page">
      <SiteHeader />

      <section className="contact-page-hero" id="top">
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
                <MapPin size={17} /> New York, New Jersey, Pennsylvania, and
                Connecticut
              </span>
              <a href="mailto:hello@atlanticcold.com">
                <Mail size={17} /> hello@atlanticcold.com
              </a>
              <a href="tel:+12015550190">
                <Phone size={17} /> (201) 555-0190
              </a>
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
