import { ArrowUpRight } from 'lucide-react';
import { BrandMark } from '@/components/site-header';

const footerLinks = [
  ['Services', '/services'],
  ['Coverage', '/coverage'],
  ['Equipment', '/equipment'],
  ['Insights', '/insights'],
  ['About', '/about'],
  ['Forms', '/forms'],
  ['Contact', '/contact'],
] as const;

export function SubpageFooter() {
  return (
    <footer className="subpage-footer">
      <div className="subpage-footer-inner">
        <div className="subpage-footer-brand">
          <BrandMark variant="dark" />
          <p>
            Family-owned refrigerated and frozen truckload and
            less-than-truckload transportation serving the greater New York area
            since 1979.
          </p>
          <div className="subpage-footer-contact-details">
            <a href="tel:+19738378585">973-837-8585</a>
            <a href="mailto:MarkD@atlanticcold.com">MarkD@atlanticcold.com</a>
          </div>
        </div>

        <nav className="subpage-footer-links" aria-label="Footer navigation">
          {footerLinks.map(([label, href]) => (
            <a href={href} key={label}>
              {label}
            </a>
          ))}
        </nav>

        <div className="subpage-footer-meta">
          <a className="subpage-footer-contact" href="/contact">
            Request a quote <ArrowUpRight size={14} />
          </a>
          <span>© 2026 Atlantic Cold Trucking</span>
          <span>
            <a href="/privacy">Privacy</a> / <a href="/terms">Terms</a>
          </span>
          <a
            className="subpage-footer-credit"
            href="https://thecoolmoon.com/"
            target="_blank"
            rel="noreferrer"
          >
            Built by TheCoolMoon
          </a>
        </div>
      </div>
    </footer>
  );
}
