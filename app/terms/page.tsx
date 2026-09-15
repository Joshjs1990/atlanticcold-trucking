import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SubpageFooter } from '@/components/subpage-footer';

export const metadata: Metadata = {
  title: 'Terms of Use | Atlantic Cold Trucking',
  description: 'Terms of use for the Atlantic Cold Trucking website.',
};

export default function TermsPage() {
  return (
    <main className="legal-page">
      <SiteHeader darkOnTop />
      <section className="legal-hero">
        <div>
          <span className="section-label">Atlantic Cold Trucking</span>
          <h1>
            Terms of
            <br />
            <span>use.</span>
          </h1>
          <p>Last updated September 15, 2026.</p>
        </div>
      </section>

      <article className="legal-content">
        <section>
          <h2>Using this website</h2>
          <p>
            This website provides general information about Atlantic Cold
            Trucking, our transportation services, facilities, coverage, and
            forms. You agree to use the site lawfully and not to interfere with
            its operation or misuse its content.
          </p>
        </section>
        <section>
          <h2>Transportation inquiries</h2>
          <p>
            A form submission or email is an inquiry, not a transportation
            contract, rate confirmation, credit approval, or guarantee of
            service. Any engagement is subject to separate written terms,
            availability, and applicable shipping documentation.
          </p>
        </section>
        <section>
          <h2>Content and links</h2>
          <p>
            We work to keep the information on this site current, but we do not
            guarantee that every page is complete or error-free. The site may
            link to third-party websites and documents; Atlantic Cold Trucking
            is not responsible for their content or availability.
          </p>
        </section>
        <section>
          <h2>Intellectual property</h2>
          <p>
            Unless otherwise noted, the text, branding, images, and other
            materials on this site belong to Atlantic Cold Trucking or its
            licensors. Please do not reproduce or reuse them without written
            permission.
          </p>
        </section>
        <section>
          <h2>Contact us</h2>
          <p>
            Questions about these terms can be sent to{' '}
            <a href="mailto:MarkD@atlanticcold.com">MarkD@atlanticcold.com</a>{' '}
            or 973-837-8585.
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
