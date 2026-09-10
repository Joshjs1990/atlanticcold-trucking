import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Route, Snowflake } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SubpageFooter } from '@/components/subpage-footer';

const areas = [
  {
    name: 'New York',
    code: 'NY',
    slug: 'new-york',
    copy: 'Hudson Valley, Capital Region, and New York City metro routes.',
  },
  {
    name: 'New Jersey',
    code: 'NJ',
    slug: 'new-jersey',
    copy: 'Northern New Jersey, Newark, Trenton, and Camden corridors.',
  },
  {
    name: 'Pennsylvania',
    code: 'PA',
    slug: 'pennsylvania',
    copy: 'Philadelphia, Lehigh Valley, Scranton, and Harrisburg routes.',
  },
  {
    name: 'Connecticut',
    code: 'CT',
    slug: 'connecticut',
    copy: 'Hartford, New Haven, Bridgeport, and Stamford corridors.',
  },
] as const;

export const metadata: Metadata = {
  title: 'Coverage | AtlanticCold Trucking',
  description:
    'AtlanticCold refrigerated and frozen food transportation coverage across New York, New Jersey, Pennsylvania, and Connecticut.',
};

export default function CoveragePage() {
  return (
    <main className="overview-page coverage-overview-page">
      <SiteHeader />

      <section className="overview-hero" id="top">
        <div className="overview-hero-media">
          <Image
            src="/stock/ny-highway-fleet.webp"
            alt="Freight trucks travelling together on a Northeast highway"
            fill
            priority
            unoptimized
            sizes="100vw"
          />
        </div>
        <div className="overview-hero-overlay" aria-hidden="true" />
        <div className="overview-hero-inner">
          <div>
            <span className="section-label section-label-light">
              Northeast coverage
            </span>
            <h1>
              Four states.
              <br />
              <span>One cold chain.</span>
            </h1>
            <p>
              AtlanticCold transports refrigerated and frozen food throughout
              New York, New Jersey, Pennsylvania, and Connecticut.
            </p>
            <Link className="footer-button" href="/#contact">
              Confirm a lane <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="coverage-overview-map-section">
        <div className="overview-section-heading">
          <div>
            <span className="section-label">Where we cover</span>
            <h2>
              Regional reach,
              <br />
              <span>clear routes.</span>
            </h2>
          </div>
          <p>
            Our Northeast network is focused on practical food freight lanes,
            consistent delivery windows, and direct communication.
          </p>
        </div>

        <div className="coverage-overview-content">
          <div className="coverage-overview-map">
            <Image
              src="/actmap.webp"
              alt="Map showing AtlanticCold coverage across New York, New Jersey, Pennsylvania, and Connecticut"
              fill
              unoptimized
              sizes="(max-width: 820px) 100vw, 50vw"
            />
            <span className="coverage-map-note">
              <MapPin size={14} /> Northeast service network
            </span>
          </div>

          <div className="coverage-overview-areas">
            {areas.map((area) => (
              <Link
                className="coverage-overview-card"
                href={`/service-areas/${area.slug}`}
                key={area.slug}
              >
                <span className="coverage-overview-code">{area.code}</span>
                <div>
                  <h3>{area.name}</h3>
                  <p>{area.copy}</p>
                </div>
                <ArrowRight size={18} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="coverage-overview-note-section">
        <div>
          <span className="section-label">Built for regional freight</span>
          <h2>
            A clear route from
            <br />
            <span>pickup to delivery.</span>
          </h2>
        </div>
        <div className="coverage-overview-note-copy">
          <p>
            Whether the load is recurring, time-sensitive, or moving through
            multiple stops, our team can help confirm the right lane and next
            step.
          </p>
          <div className="coverage-overview-note-points">
            <span>
              <Route size={17} /> Northeast route planning
            </span>
            <span>
              <Snowflake size={17} /> Refrigerated and frozen food
            </span>
          </div>
        </div>
      </section>

      <section className="overview-cta">
        <div>
          <span className="section-label section-label-light">
            Planning a Northeast move?
          </span>
          <h2>
            Let’s confirm
            <br />
            <span>your lane.</span>
          </h2>
        </div>
        <Link className="footer-button" href="/#contact">
          Talk to our team <ArrowRight size={17} />
        </Link>
      </section>

      <SubpageFooter />
    </main>
  );
}
