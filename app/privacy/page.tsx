import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SubpageFooter } from '@/components/subpage-footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | Atlantic Cold Trucking',
  description: 'Privacy information for the Atlantic Cold Trucking website.',
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <SiteHeader darkOnTop />
      <section className="legal-hero">
        <div>
          <span className="section-label">Atlantic Cold Trucking</span>
          <h1>
            Privacy
            <br />
            <span>policy.</span>
          </h1>
          <p>Last updated September 15, 2026.</p>
        </div>
      </section>

      <article className="legal-content">
        <section>
          <h2>Information we collect</h2>
          <p>
            When you contact Atlantic Cold Trucking through this website, we may
            collect your name, email address, company, phone number, and the
            message or shipment details you choose to provide.
          </p>
        </section>
        <section>
          <h2>How we use information</h2>
          <p>
            We use submitted information to respond to inquiries, prepare
            transportation discussions, and provide customer service. Contact
            form submissions are sent through our email delivery provider,
            Resend, to Atlantic Cold Trucking.
          </p>
        </section>
        <section>
          <h2>Sharing and retention</h2>
          <p>
            We do not sell contact information. We share it only with service
            providers that help us operate the website and respond to your
            request, or when required by law. We retain inquiries only as long
            as reasonably needed for business, legal, or customer-service
            purposes.
          </p>
        </section>
        <section>
          <h2>Third-party content</h2>
          <p>
            Some pages may include third-party services or links, such as
            embedded video or downloadable documents. Those services have their
            own privacy practices and policies.
          </p>
        </section>
        <section>
          <h2>Contact us</h2>
          <p>
            Questions about this policy can be sent to{' '}
            <a href="mailto:MarkD@atlanticcold.com">MarkD@atlanticcold.com</a>{' '}
            or mailed to 111 Maltese Drive, 1st Floor, Totowa, New Jersey 07512.
          </p>
        </section>
        <a className="text-cta dark-cta" href="/contact">
          Contact Atlantic Cold Trucking <ArrowRight size={17} />
        </a>
      </article>
      <SubpageFooter />
    </main>
  );
}
