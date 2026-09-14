import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  MapPin,
  MessageCircle,
  Snowflake,
  Thermometer,
} from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SubpageFooter } from '@/components/subpage-footer';

export const metadata: Metadata = {
  title: 'About | AtlanticCold Trucking',
  description:
    'Learn how AtlanticCold handles refrigerated and frozen food freight across New York, New Jersey, Pennsylvania, and Connecticut.',
};

const operatingPrinciples = [
  {
    icon: Thermometer,
    title: 'Protect the temperature',
    copy: 'Refrigerated and frozen food moves with the equipment, checks, and attention the load requires.',
  },
  {
    icon: MessageCircle,
    title: 'Keep communication direct',
    copy: 'You get practical updates from a team that understands the lane, the schedule, and the delivery window.',
  },
  {
    icon: MapPin,
    title: 'Know the Northeast',
    copy: 'Our regional focus covers New York, New Jersey, Pennsylvania, and Connecticut with routes built around real delivery patterns.',
  },
];

const commitments = [
  'Refrigerated and frozen food capability',
  'LTL and FTL flexibility',
  'Recurring route support',
  'Cross-dock coordination',
];

export default function AboutPage() {
  return (
    <main className="about-page">
      <SiteHeader />

      <section className="about-hero" id="top">
        <div className="about-hero-media">
          <Image
            src="/metrics-20260911-140943.webp"
            alt="AtlanticCold refrigerated truck ready for Northeast delivery"
            fill
            priority
            unoptimized
            sizes="100vw"
          />
        </div>
        <div className="about-hero-overlay" aria-hidden="true" />
        <div className="about-hero-inner">
          <span className="section-label section-label-light">About AtlanticCold</span>
          <h1>
            Regional cold-chain
            <br />
            <span>transportation, handled.</span>
          </h1>
          <p>
            AtlanticCold transports refrigerated and frozen food throughout New
            York, New Jersey, Pennsylvania, and Connecticut.
          </p>
          <Link className="footer-button" href="/contact">
            Talk to our team <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <section className="about-intro">
        <div className="about-intro-heading">
          <span className="section-label">Built for the route</span>
          <h2>
            A steady hand for
            <br />
            <span>temperature-sensitive freight.</span>
          </h2>
        </div>
        <div className="about-intro-copy">
          <p>
            Food freight does not get a second chance at the right temperature.
            Our job is to make the move predictable: dependable equipment,
            clear communication, and a regional team that stays close to the
            details from pickup through delivery.
          </p>
          <p>
            We work with manufacturers, distributors, wholesalers, and retailers
            that need refrigerated transportation to fit the way their business
            actually operates.
          </p>
        </div>
      </section>

      <section className="about-principles-section">
        <div className="about-section-heading">
          <div>
            <span className="section-label">How we work</span>
            <h2>
              Clear process.
              <br />
              <span>Consistent delivery.</span>
            </h2>
          </div>
          <p>
            Every shipment has its own timing and constraints. The approach
            stays simple: understand the requirement, plan the route, and keep
            the handoffs visible.
          </p>
        </div>

        <div className="about-principles-grid">
          {operatingPrinciples.map(({ icon: Icon, title, copy }, index) => (
            <article className="about-principle-card" key={title}>
              <div className="about-principle-number">0{index + 1}</div>
              <Icon size={25} strokeWidth={1.7} />
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-commitment">
        <div className="about-commitment-image">
          <Image
            src="/stock/atlanticcold-truck.webp"
            alt="AtlanticCold refrigerated truck ready for delivery"
            fill
            unoptimized
            sizes="(max-width: 820px) 100vw, 48vw"
          />
        </div>
        <div className="about-commitment-content">
          <span className="section-label">What you can expect</span>
          <h2>
            The details matter
            <br />
            <span>because the load does.</span>
          </h2>
          <p>
            From a recurring route to a time-sensitive food shipment, we bring
            the same focus to the work: protect the product, respect the
            schedule, and make it easy to know what happens next.
          </p>
          <ul>
            {commitments.map((commitment) => (
              <li key={commitment}>
                <Check size={16} /> {commitment}
              </li>
            ))}
          </ul>
          <Link className="text-cta dark-cta" href="/services">
            Explore our services <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <section className="about-cta">
        <Snowflake size={24} aria-hidden="true" />
        <div>
          <span className="section-label section-label-light">Ready to plan the move?</span>
          <h2>
            Tell us about
            <br />
            <span>your freight.</span>
          </h2>
        </div>
        <Link className="footer-button" href="/contact">
          Start a conversation <ArrowRight size={17} />
        </Link>
      </section>

      <SubpageFooter />
    </main>
  );
}
