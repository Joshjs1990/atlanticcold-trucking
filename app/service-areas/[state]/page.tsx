import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, MapPin } from 'lucide-react';
import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';

const areas = {
  'new-york': {
    name: 'New York',
    code: 'NY',
    title: 'Refrigerated and frozen food freight across New York.',
    copy: 'AtlanticCold provides temperature-controlled trucking for food shippers moving through New York, from the Hudson Valley and Capital Region to the New York City metro.',
    corridors: 'Hudson Valley / Capital Region / New York City metro',
    heroImage:
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=2200&q=88',
    overviewImage:
      'https://images.unsplash.com/photo-1671656202170-d382ace43d3c?auto=format&fit=crop&w=1600&q=84',
    ctaImage:
      'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=2200&q=86',
  },
  'new-jersey': {
    name: 'New Jersey',
    code: 'NJ',
    title: 'Cold-chain transportation across New Jersey.',
    copy: 'We move refrigerated and frozen food through New Jersey with dependable reefer capacity for distribution centers, wholesalers, and grocery supply chains.',
    corridors: 'Northern New Jersey / Newark / Trenton / Camden',
    heroImage:
      'https://images.unsplash.com/photo-1765571394962-c8d03a8d0ef5?auto=format&fit=crop&w=2200&q=88',
    overviewImage:
      'https://images.unsplash.com/photo-1764046155497-ad7e50737ffa?auto=format&fit=crop&w=1600&q=84',
    ctaImage:
      'https://images.unsplash.com/photo-1664382953403-fc1ac77073a0?auto=format&fit=crop&w=2200&q=86',
  },
  pennsylvania: {
    name: 'Pennsylvania',
    code: 'PA',
    title: 'Refrigerated food freight throughout Pennsylvania.',
    copy: 'AtlanticCold serves Pennsylvania distribution routes with practical coordination, modern reefer equipment, and direct communication from pickup through delivery.',
    corridors: 'Philadelphia / Lehigh Valley / Scranton / Harrisburg',
    heroImage:
      'https://images.unsplash.com/photo-1664382953403-fc1ac77073a0?auto=format&fit=crop&w=2200&q=88',
    overviewImage:
      'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1600&q=84',
    ctaImage:
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=2200&q=86',
  },
  connecticut: {
    name: 'Connecticut',
    code: 'CT',
    title: 'Temperature-controlled trucking across Connecticut.',
    copy: 'From Hartford to the coast, AtlanticCold handles refrigerated and frozen food shipments with the consistency needed for tight delivery windows.',
    corridors: 'Hartford / New Haven / Bridgeport / Stamford',
    heroImage:
      'https://images.unsplash.com/photo-1764046155497-ad7e50737ffa?auto=format&fit=crop&w=2200&q=88',
    overviewImage:
      'https://images.unsplash.com/photo-1765571394962-c8d03a8d0ef5?auto=format&fit=crop&w=1600&q=84',
    ctaImage:
      'https://images.unsplash.com/photo-1671656202170-d382ace43d3c?auto=format&fit=crop&w=2200&q=86',
  },
} as const;

export function generateStaticParams() {
  return Object.keys(areas).map((state) => ({ state }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const area = areas[state as keyof typeof areas];

  if (!area) return {};

  const title = `${area.name} Refrigerated Trucking | AtlanticCold`;
  const description = area.copy;

  return {
    title,
    description,
    openGraph: { title, description, images: [] },
    twitter: { title, description, images: [] },
  };
}

export default async function ServiceAreaPage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const area = areas[state as keyof typeof areas];

  if (!area) notFound();

  return (
    <main className="location-page">
      <SiteHeader />

      <section className="location-hero" id="top">
        <Image
          className="location-hero-background"
          src={area.heroImage}
          alt={`Refrigerated truck serving ${area.name}`}
          fill
          priority
          unoptimized
          sizes="100vw"
        />
        <div className="location-hero-overlay" aria-hidden="true" />
        <div className="location-hero-inner">
          <div className="location-hero-copy">
            <span className="section-label section-label-light">
              {area.code} refrigerated trucking
            </span>
            <h1>{area.title}</h1>
            <p className="location-copy">{area.copy}</p>
            <div className="location-route-line">
              <MapPin size={17} /> {area.corridors}
            </div>
          </div>
          <form
            className="location-quote-form"
            action="mailto:hello@atlanticcold.com"
            method="post"
            encType="text/plain"
          >
            <span className="location-form-kicker">Request a quote</span>
            <h2>Tell us about the load.</h2>
            <div className="location-form-grid">
              <label>
                <span>Name</span>
                <input name="name" type="text" autoComplete="name" required />
              </label>
              <label>
                <span>Email</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
              </label>
              <label>
                <span>Company</span>
                <input name="company" type="text" autoComplete="organization" />
              </label>
              <label>
                <span>Phone</span>
                <input name="phone" type="tel" autoComplete="tel" />
              </label>
              <label className="location-form-wide">
                <span>Pickup, destination, and freight details</span>
                <textarea name="freight-details" rows={4} required />
              </label>
            </div>
            <button type="submit">
              Send inquiry <ArrowRight size={17} />
            </button>
          </form>
        </div>
      </section>

      <section className="location-overview section-light">
        <div className="location-overview-copy">
          <span className="section-label">Refrigerated food freight</span>
          <h2>
            Built for {area.name}
            <br />
            <span>delivery schedules.</span>
          </h2>
          <p>
            AtlanticCold supports food manufacturers, distributors, wholesalers,
            and retailers moving refrigerated and frozen loads across{' '}
            {area.name} and the wider Northeast.
          </p>
          <div className="location-overview-points">
            {[
              'Refrigerated and frozen food loads',
              'Scheduled and recurring routes',
              'Direct pickup-to-delivery communication',
            ].map((item) => (
              <div key={item}>
                <Check size={17} aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="location-overview-image">
          <Image
            src={area.overviewImage}
            alt={`Temperature-controlled freight serving ${area.name}`}
            fill
            unoptimized
            sizes="(max-width: 820px) 100vw, 48vw"
          />
        </div>
      </section>

      <section className="location-services-section section-light">
        <div className="location-section-heading">
          <span className="section-label">What we provide</span>
          <h2>
            Cold-chain service
            <br /> <span>without the guesswork.</span>
          </h2>
        </div>
        <div className="location-service-cards">
          {[
            [
              'Refrigerated transportation',
              'Consistent reefer capacity for chilled food and temperature-sensitive shipments.',
            ],
            [
              'Frozen food transportation',
              'Equipment and planning for frozen loads moving through Northeast distribution networks.',
            ],
            [
              'Dedicated route support',
              `Recurring capacity and route coordination for businesses shipping throughout ${area.name}.`,
            ],
          ].map(([title, copy], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="location-network-section">
        <div className="location-network-inner">
          <div className="location-network-map">
            <Image
              src="/actmap.webp"
              alt="Northeast service area map"
              fill
              unoptimized
              sizes="(max-width: 820px) 100vw, 44vw"
            />
            <span className="location-network-pin">
              <MapPin size={18} /> {area.code}
            </span>
          </div>
          <div className="location-network-copy">
            <span className="section-label">Coverage focus</span>
            <h2>
              {area.name} routes,
              <br />
              <span>Northeast reach.</span>
            </h2>
            <p>
              Primary corridors include {area.corridors}. Contact our team to
              confirm a lane, delivery window, or recurring freight plan.
            </p>
            <Link href="/#coverage" className="text-cta dark-cta">
              View all coverage <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="location-faq section-light">
        <div className="location-faq-heading">
          <span className="section-label">Frequently asked questions</span>
          <h2>
            Shipping freight
            <br />
            <span>in {area.name}.</span>
          </h2>
        </div>
        <div className="location-faq-list">
          <details>
            <summary>What freight does AtlanticCold transport?</summary>
            <p>
              We focus on refrigerated and frozen food freight moving across the
              Northeast.
            </p>
          </details>
          <details>
            <summary>Which parts of {area.name} do you cover?</summary>
            <p>
              Our primary service corridors include {area.corridors}. Contact us
              to confirm a specific pickup or delivery location.
            </p>
          </details>
          <details>
            <summary>Can you support recurring delivery routes?</summary>
            <p>
              Yes. We can discuss dedicated and recurring capacity based on lane
              requirements, frequency, and delivery windows.
            </p>
          </details>
          <details>
            <summary>How do I request a quote?</summary>
            <p>
              Use the form at the top of this page with your pickup,
              destination, timing, and freight details.
            </p>
          </details>
        </div>
      </section>

      <section className="location-bottom-cta">
        <Image
          src={area.ctaImage}
          alt={`Refrigerated trucking service across ${area.name}`}
          fill
          unoptimized
          sizes="100vw"
        />
        <div className="location-bottom-cta-overlay" />
        <div className="location-bottom-cta-content">
          <span className="section-label section-label-light">
            AtlanticCold Trucking
          </span>
          <h2>
            Refrigerated freight
            <br />
            <span>across {area.name}.</span>
          </h2>
          <Link href="#top" className="footer-button">
            Request a quote <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
