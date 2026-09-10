import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SubpageFooter } from '@/components/subpage-footer';

const services = [
  {
    name: 'Refrigerated Transportation',
    slug: 'refrigerated-transportation',
    copy: 'Temperature-controlled freight that arrives in spec, across every mile.',
    image: '/stock/home-refrigerated-snow-highway.webp',
    alt: 'Refrigerated truck travelling on a snow-covered highway',
  },
  {
    name: 'Dedicated Solutions',
    slug: 'dedicated-solutions',
    copy: 'A consistent team, route, and plan built around your operation.',
    image: '/stock/home-refrigerated-fleet.webp',
    alt: 'Fleet of refrigerated trucks ready for dispatch',
  },
  {
    name: 'Supply Chain Support',
    slug: 'supply-chain-support',
    copy: 'Practical coordination that keeps the cold chain moving end to end.',
    image: '/stock/ct-supply-chain-truck.webp',
    alt: 'Supply-chain truck travelling on a highway',
  },
  {
    name: 'Safety & Compliance',
    slug: 'safety-compliance',
    copy: 'Disciplined processes and clear visibility from pickup to delivery.',
    image: '/stock/pa-white-semi.webp',
    alt: 'White refrigerated semi-truck travelling through Pennsylvania',
  },
  {
    name: 'Cross Dock Services',
    slug: 'cross-dock-services',
    copy: 'Fast transfer, consolidation, and short-term handling for refrigerated food.',
    image: '/stock/nj-loading-dock.webp',
    alt: 'Refrigerated truck at a cross-dock loading facility',
  },
] as const;

export const metadata: Metadata = {
  title: 'Services | AtlanticCold Trucking',
  description:
    'Refrigerated and frozen food transportation services across New York, New Jersey, Pennsylvania, and Connecticut.',
};

export default function ServicesPage() {
  return (
    <main className="overview-page">
      <SiteHeader />

      <section className="overview-hero" id="top">
        <div className="overview-hero-media">
          <Image
            src="/stock/home-refrigerated-snow-highway.webp"
            alt="Refrigerated truck travelling through winter weather"
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
              AtlanticCold services
            </span>
            <h1>
              Refrigerated freight
              <br />
              <span>handled properly.</span>
            </h1>
            <p>
              Transportation, dedicated capacity, cross-dock support, and
              cold-chain coordination for food shippers across the Northeast.
            </p>
            <Link className="footer-button" href="/#contact">
              Talk to our team <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="overview-section overview-services-list">
        <div className="overview-section-heading">
          <div>
            <span className="section-label">What we do</span>
            <h2>
              Services for the
              <br />
              <span>cold chain.</span>
            </h2>
          </div>
          <p>
            Choose the service that matches your lane, schedule, and operating
            requirements. Every option is built around temperature-sensitive
            food freight.
          </p>
        </div>

        <div className="overview-service-grid">
          {services.map((service) => (
            <article className="overview-service-card" key={service.slug}>
              <div className="overview-card-image">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  unoptimized
                  sizes="(max-width: 680px) 100vw, (max-width: 1000px) 50vw, 33vw"
                />
              </div>
              <div className="overview-card-body">
                <h3>{service.name}</h3>
                <p>{service.copy}</p>
                <Link href={`/services/${service.slug}`}>
                  Explore service <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="overview-cta">
        <div>
          <span className="section-label section-label-light">
            Need a transportation plan?
          </span>
          <h2>
            Tell us about
            <br />
            <span>your freight.</span>
          </h2>
        </div>
        <Link className="footer-button" href="/#contact">
          Request a quote <ArrowRight size={17} />
        </Link>
      </section>

      <SubpageFooter />
    </main>
  );
}
