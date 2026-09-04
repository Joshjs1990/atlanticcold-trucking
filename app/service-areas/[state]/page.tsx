import Link from 'next/link';
import { ArrowLeft, ArrowRight, Snowflake } from 'lucide-react';
import { notFound } from 'next/navigation';

const areas = {
  'new-york': {
    name: 'New York',
    code: 'NY',
    title: 'Temperature-controlled freight across New York.',
    copy: 'From the Hudson Valley to the New York City metro, AtlanticCold keeps sensitive freight moving with dependable reefer capacity and clear communication.',
  },
  'new-jersey': {
    name: 'New Jersey',
    code: 'NJ',
    title: 'Reliable cold-chain delivery across New Jersey.',
    copy: 'Built for dense routes, tight windows, and the pace of the Northeast, our New Jersey coverage is designed around consistency from dock to destination.',
  },
  pennsylvania: {
    name: 'Pennsylvania',
    code: 'PA',
    title: 'Cold-chain coverage that reaches Pennsylvania.',
    copy: 'Whether freight is crossing the state or moving through its major distribution corridors, our team keeps every load within spec and on schedule.',
  },
  connecticut: {
    name: 'Connecticut',
    code: 'CT',
    title: 'Temperature-controlled transportation in Connecticut.',
    copy: 'From Hartford to the coast, AtlanticCold brings practical coordination and modern reefer equipment to every Connecticut route we serve.',
  },
} as const;

export function generateStaticParams() {
  return Object.keys(areas).map((state) => ({ state }));
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
      <div className="location-page-glow" />
      <nav className="location-nav">
        <Link href="/" className="location-back">
          <ArrowLeft size={16} /> Back to AtlanticCold
        </Link>
        <span className="location-mark">
          <Snowflake size={17} /> Northeast coverage
        </span>
      </nav>
      <section className="location-hero">
        <span className="section-label">{area.code} / service area</span>
        <p className="location-kicker">{area.name}</p>
        <h1>{area.title}</h1>
        <p className="location-copy">{area.copy}</p>
        <div className="location-actions">
          <Link href="/#contact" className="footer-button">
            Request a quote <ArrowRight size={18} />
          </Link>
          <Link href="/#coverage" className="location-return">
            View Northeast coverage
          </Link>
        </div>
      </section>
    </main>
  );
}
