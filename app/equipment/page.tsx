import type { Metadata } from 'next';
import { ArrowRight, Check, Snowflake, Truck } from 'lucide-react';
import Link from 'next/link';
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

export default function EquipmentPage() {
  return (
    <main className="equipment-page">
      <SiteHeader />

      <section className="equipment-page-hero" id="top">
        <div className="equipment-page-intro">
          <span className="section-label section-label-light">
            Purpose-built fleet
          </span>
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

      <section className="equipment-page-details">
        <div>
          <span className="section-label">Fleet details</span>
          <h2>
            Built around
            <br />
            <span>the delivery.</span>
          </h2>
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
          <Link className="text-cta dark-cta" href="/contact">
            Talk to our team <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <SubpageFooter />
    </main>
  );
}
