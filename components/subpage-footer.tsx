import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { BrandMark } from '@/components/site-header';

const footerLinks = [
  ['Services', '/services'],
  ['Coverage', '/coverage'],
  ['Equipment', '/equipment'],
  ['Insights', '/insights'],
  ['About', '/about'],
  ['Contact', '/contact'],
] as const;

export function SubpageFooter() {
  return (
    <footer className="subpage-footer">
      <div className="subpage-footer-inner">
        <div className="subpage-footer-brand">
          <BrandMark variant="dark" />
          <p>
            Refrigerated and frozen food transportation across New York, New
            Jersey, Pennsylvania, and Connecticut.
          </p>
        </div>

        <nav className="subpage-footer-links" aria-label="Footer navigation">
          {footerLinks.map(([label, href]) => (
            <Link href={href} key={label}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="subpage-footer-meta">
          <Link className="subpage-footer-contact" href="/contact">
            Request a quote <ArrowUpRight size={14} />
          </Link>
          <span>© 2025 AtlanticCold Trucking</span>
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
