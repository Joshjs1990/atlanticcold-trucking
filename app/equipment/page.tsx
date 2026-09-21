import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight, Check, Snowflake, Truck } from 'lucide-react';
import { EquipmentViewer } from '@/components/equipment-viewer';
import { SiteHeader } from '@/components/site-header';
import { SubpageFooter } from '@/components/subpage-footer';

export const metadata: Metadata = {
  title: 'Equipment | AtlanticCold Trucking',
  description:
    'Explore the refrigerated equipment AtlanticCold uses to move temperature-sensitive food freight across the Northeast.',
};

const equipmentPoints = [
  'Refrigerated and frozen food capability',
  'LTL and FTL load flexibility',
  'Practical access for regional delivery',
];

const tractorTrailers = [
  {
    size: '48 foot',
    title: 'Regional capacity',
    copy: 'A flexible trailer length for refrigerated and frozen food moving through regional lanes.',
  },
  {
    size: '53 foot',
    title: 'Full trailer capacity',
    copy: 'More room for higher-volume truckload shipments and recurring programs.',
  },
  {
    size: '40 foot',
    title: 'Liftgate access',
    copy: 'A shorter configuration with liftgates for delivery locations without a dock.',
  },
] as const;

export default function EquipmentPage() {
  return (
    <main className="equipment-page">
      <SiteHeader darkOnTop />

      <section className="equipment-page-hero" id="top">
        <div className="equipment-page-intro">
          <span className="section-label">Purpose-built fleet</span>
          <h1>
            Refrigerated equipment
            <br />
            <span>for the load.</span>
          </h1>
          <p>
            Take a closer look at the straight trucks behind AtlanticCold’s
            temperature-controlled deliveries across the Northeast.
          </p>
        </div>

        <EquipmentViewer />
      </section>

      <section className="equipment-trailers-section">
        <div className="equipment-trailers-inner">
          <div className="equipment-trailers-image">
            <Image
              src="/tractor-trailer-yard.jpeg"
              alt="Tractor trailer ready for freight loading"
              fill
              unoptimized
              sizes="(max-width: 820px) 100vw, 42vw"
            />
            <span>Tractor-trailer fleet</span>
          </div>
          <div className="equipment-trailers-content">
            <span className="section-label section-label-light">
              Tractor-trailer equipment
            </span>
            <h2>
              More room for
              <br />
              <span>the route.</span>
            </h2>
            <p>
              Alongside our straight trucks, Atlantic Cold offers
              tractor-trailer configurations for different shipment sizes,
              delivery patterns, and access requirements.
            </p>
            <div className="equipment-trailer-cards">
              {tractorTrailers.map((trailer, index) => (
                <article className="equipment-trailer-card" key={trailer.size}>
                  <span className="equipment-trailer-number">0{index + 1}</span>
                  <strong>{trailer.size}</strong>
                  <h3>{trailer.title}</h3>
                  <p>{trailer.copy}</p>
                </article>
              ))}
            </div>
            <a className="footer-button" href="/contact">
              Talk to our team <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <section className="equipment-page-details">
        <div className="equipment-page-details-heading">
          <span className="section-label">Fleet details</span>
          <h2>
            Built around
            <br />
            <span>the delivery.</span>
          </h2>
        </div>
        <div className="equipment-page-details-visual">
          <img
            className="equipment-page-details-image"
            src="/stock/atlanticcold-truck.webp"
            alt="AtlanticCold refrigerated truck"
          />
        </div>
        <div className="equipment-page-details-copy">
          <p>
            Our equipment is selected for the practical realities of regional
            refrigerated food freight: dependable cooling, useful capacity, and
            access that works at the dock and on the route.
          </p>
          <div className="equipment-page-points">
            {equipmentPoints.map((point) => (
              <span key={point}>
                <Check size={16} /> {point}
              </span>
            ))}
          </div>
          <div className="equipment-page-links">
            <span>
              <Snowflake size={17} /> Cold-chain focused
            </span>
            <span>
              <Truck size={17} /> Regional fleet
            </span>
          </div>
          <a className="text-cta dark-cta" href="/contact">
            Talk to our team <ArrowRight size={17} />
          </a>
        </div>
      </section>

      <SubpageFooter />
    </main>
  );
}
