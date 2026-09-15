import type { Metadata } from 'next';
import { ArrowDownToLine, ArrowRight, FileText } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SubpageFooter } from '@/components/subpage-footer';

export const metadata: Metadata = {
  title: 'Forms | Atlantic Cold Trucking',
  description:
    'Download the Atlantic Cold Trucking credit application and bill of lading forms.',
};

const applicationUrl = 'http://atlanticcold.com/application.pdf';
const billOfLadingUrl = 'http://atlanticcold.com/BillOfLading2.pdf';

export default function FormsPage() {
  return (
    <main className="forms-page">
      <SiteHeader darkOnTop />

      <section className="forms-hero" id="top">
        <div className="forms-hero-inner">
          <span className="section-label">Atlantic Cold Trucking</span>
          <h1>
            Forms for the
            <br />
            <span>next shipment.</span>
          </h1>
          <p>
            Download the forms you need to establish a business credit
            relationship or prepare a shipment with Atlantic Cold Trucking.
          </p>
        </div>
      </section>

      <section className="forms-content">
        <div className="forms-heading">
          <span className="section-label">Downloads</span>
          <h2>
            Ready when
            <br />
            <span>you are.</span>
          </h2>
        </div>

        <div className="forms-grid">
          <article className="form-download-card">
            <div className="form-download-icon">
              <FileText size={24} />
            </div>
            <span className="form-download-type">Credit application</span>
            <h3>Apply for 30-day credit terms.</h3>
            <p>
              Print the application, provide all requested information, sign it,
              and fax the completed form to 973-837-8586. Once received and
              processed, a representative from your local facility will contact
              you.
            </p>
            <a href={applicationUrl} target="_blank" rel="noreferrer">
              Download application <ArrowDownToLine size={17} />
            </a>
          </article>

          <article className="form-download-card">
            <div className="form-download-icon">
              <FileText size={24} />
            </div>
            <span className="form-download-type">Bill of lading</span>
            <h3>Prepare the shipment paperwork.</h3>
            <p>
              Print a copy of the Bill of Lading, provide all requested
              information, sign the Bill, and include it with the shipment.
            </p>
            <a href={billOfLadingUrl} target="_blank" rel="noreferrer">
              Download bill of lading <ArrowDownToLine size={17} />
            </a>
          </article>
        </div>

        <div className="forms-contact-note">
          <span>Questions about a form?</span>
          <a href="mailto:MarkD@atlanticcold.com">
            Email MarkD@atlanticcold.com <ArrowRight size={16} />
          </a>
          <a href="tel:+19738378585">
            Call 973-837-8585 <ArrowRight size={16} />
          </a>
        </div>
      </section>

      <SubpageFooter />
    </main>
  );
}
