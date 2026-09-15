import type { Metadata } from 'next';
import Image from 'next/image';
import {
  ArrowRight,
  Check,
  MapPin,
  MessageCircle,
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
    title: 'Truckload + LTL',
    copy: 'Truckload and less-than-truckload transportation built around the size, timing, and temperature of the shipment.',
  },
  {
    icon: MessageCircle,
    title: 'Door to door',
    copy: 'Door-to-door pickup and delivery with same-day service available when the schedule calls for it.',
  },
  {
    icon: MapPin,
    title: 'Cold-chain support',
    copy: 'Refrigerated and frozen storage, labeling and bar coding, EDI and ASN manifesting, and internet shipment tracking.',
  },
];

const commitments = [
  'Reliable and flexible service',
  '24 hour receiving',
  'Error free billing',
  '99% on-time deliveries',
  'Professional drivers',
  'Industry leading low claims ratio',
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
          <span className="section-label section-label-light">
            About AtlanticCold
          </span>
          <h1>
            Family-owned cold-chain
            <br />
            <span>transportation since 1979.</span>
          </h1>
          <p>
            Atlantic Cold Trucking specializes in refrigerated and frozen
            truckload and less-than-truckload transportation in the greater New
            York area.
          </p>
          <a className="footer-button" href="/contact">
            Talk to our team <ArrowRight size={17} />
          </a>
        </div>
      </section>

      <section className="about-intro">
        <div className="about-intro-heading">
          <span className="section-label">Built for the route</span>
          <h2>
            A family business built
            <br />
            <span>around the cold chain.</span>
          </h2>
        </div>
        <div className="about-intro-copy">
          <p>
            For over 25 years, Atlantic Cold Trucking has delivered quality
            service guided by determination, an old-fashioned work ethic, and a
            strong sense of family pride.
          </p>
          <p>
            Since 1979, we have adapted to new technology and stayed one step
            ahead of our customers’ needs while keeping the values that shaped
            the company at the beginning.
          </p>
        </div>
      </section>

      <section className="about-facility-section">
        <div className="about-section-heading">
          <div>
            <span className="section-label">Facility and service</span>
            <h2>
              Positioned for the
              <br />
              <span>greater New York area.</span>
            </h2>
          </div>
          <p>
            Centrally located just two miles from the New Jersey Turnpike in
            Carlstadt, New Jersey, Atlantic Cold Trucking is built to keep
            regional food freight moving.
          </p>
        </div>

        <div className="about-facility-grid">
          <div className="about-facility-copy">
            <p>
              We operate two terminals—a 46-door terminal and a 30-door
              terminal—24 hours a day. The operation sits on six fenced and
              patrolled acres, giving customers a secure, practical base for
              refrigerated and frozen transportation.
            </p>
            <p>
              Our major customers include Atkins Nutritional, Ferrero USA Candy,
              and Farmland Foods. We will gladly provide customer contacts so
              you can obtain first-hand information about our performance.
            </p>
          </div>
          <div className="about-facility-facts">
            <div>
              <strong>2 mi</strong>
              <span>from the New Jersey Turnpike</span>
            </div>
            <div>
              <strong>46 + 30</strong>
              <span>doors across two terminals</span>
            </div>
            <div>
              <strong>24 hrs</strong>
              <span>terminal operations</span>
            </div>
            <div>
              <strong>6 acres</strong>
              <span>fenced and patrolled</span>
            </div>
          </div>
        </div>

        <div className="about-facility-service-note">
          <strong>Dedicated support from pickup to delivery.</strong>
          <span>
            Dedicated people, dispatch, customer service, and operations
            managers for the urgency your transportation needs.
          </span>
          <a href="/coverage">
            View our service area <ArrowRight size={16} />
          </a>
        </div>
      </section>

      <section className="about-principles-section">
        <div className="about-section-heading">
          <div>
            <span className="section-label">Value services</span>
            <h2>
              The services your
              <br />
              <span>shipment needs.</span>
            </h2>
          </div>
          <p>
            Every shipment has its own timing and constraints. Our people,
            dispatch, customer service, and operations managers keep the
            handoffs visible and the work moving with urgency.
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
            The ACT advantage
            <br />
            <span>shows up in the details.</span>
          </h2>
          <p>
            Our corporate policy is simple: stay humble to our beginnings while
            moving forward. That means reliable service, professional drivers,
            and the systems that help customers feel confident in every move.
          </p>
          <ul>
            {commitments.map((commitment) => (
              <li key={commitment}>
                <Check size={16} /> {commitment}
              </li>
            ))}
          </ul>
          <a className="text-cta dark-cta" href="/services">
            Explore our services <ArrowRight size={17} />
          </a>
        </div>
      </section>

      <SubpageFooter />
    </main>
  );
}
