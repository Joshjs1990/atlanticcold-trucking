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
    heroImage: '/stock/ny-winter-truck.webp',
    heroAlt: 'Freight truck travelling through heavy winter weather',
    overviewImage: '/stock/ny-loading-dock.webp',
    overviewAlt: 'Truck moving through an industrial loading dock',
    ctaImage: '/stock/ny-highway-fleet.webp',
    ctaAlt: 'Freight trucks travelling together on a highway',
  },
  'new-jersey': {
    name: 'New Jersey',
    code: 'NJ',
    title: 'Cold-chain transportation across New Jersey.',
    copy: 'We move refrigerated and frozen food through New Jersey with dependable reefer capacity for distribution centers, wholesalers, and grocery supply chains.',
    corridors: 'Northern New Jersey / Newark / Trenton / Camden',
    heroImage: '/stock/nj-snow-road.webp',
    heroAlt: 'Truck travelling along a snow-covered mountain road',
    overviewImage: '/stock/nj-loading-dock.webp',
    overviewAlt: 'Semi-truck backed into an industrial loading dock',
    ctaImage: '/stock/nj-scenic-semi.webp',
    ctaAlt: 'White semi-truck travelling through a mountain corridor',
  },
  pennsylvania: {
    name: 'Pennsylvania',
    code: 'PA',
    title: 'Refrigerated food freight throughout Pennsylvania.',
    copy: 'AtlanticCold serves Pennsylvania distribution routes with practical coordination, modern reefer equipment, and direct communication from pickup through delivery.',
    corridors: 'Philadelphia / Lehigh Valley / Scranton / Harrisburg',
    heroImage: '/stock/pa-white-semi.webp',
    heroAlt: 'White semi-truck travelling under a dramatic sky',
    overviewImage: '/stock/pa-freight-highway.webp',
    overviewAlt: 'Freight truck travelling on a busy highway',
    ctaImage: '/stock/pa-scenic-truck.webp',
    ctaAlt: 'Semi-truck travelling through an open mountain route',
  },
  connecticut: {
    name: 'Connecticut',
    code: 'CT',
    title: 'Temperature-controlled trucking across Connecticut.',
    copy: 'From Hartford to the coast, AtlanticCold handles refrigerated and frozen food shipments with the consistency needed for tight delivery windows.',
    corridors: 'Hartford / New Haven / Bridgeport / Stamford',
    heroImage: '/stock/ct-snow-city-truck.webp',
    heroAlt: 'Commercial trucks operating on a snow-covered city street',
    overviewImage: '/stock/ct-supply-chain-truck.webp',
    overviewAlt: 'Supply-chain semi-truck travelling on the highway',
    ctaImage: '/stock/ct-blue-semi.webp',
    ctaAlt: 'Blue semi-truck travelling through a mountain highway',
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
          alt={area.heroAlt}
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
            alt={area.overviewAlt}
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
            <object
              data={`/location-maps/${state}.svg`}
              type="image/svg+xml"
              aria-label={`Interactive AtlanticCold trucking coverage map for ${area.name}`}
              width="900"
              height="640"
            >
              <Link href={`/service-areas/${state}`}>
                View {area.name} refrigerated trucking coverage
              </Link>
            </object>
            <p className="location-map-instruction">
              Hover a state to preview its corridors. Click to view the service
              area.
            </p>
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
          alt={area.ctaAlt}
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
