import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  Clock3,
  MessageCircleMore,
  Route,
  ShieldCheck,
  Snowflake,
  ThermometerSnowflake,
  Truck,
  Warehouse,
} from 'lucide-react';
import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';

const servicePages = {
  'refrigerated-transportation': {
    name: 'Refrigerated Transportation',
    shortLabel: 'Refrigerated freight',
    title: 'Temperature-controlled freight that arrives in spec.',
    intro:
      'AtlanticCold moves refrigerated and frozen food for manufacturers, distributors, wholesalers, and retailers across New York, New Jersey, Pennsylvania, and Connecticut.',
    image: '/stock/home-refrigerated-snow-highway.webp',
    alt: 'Refrigerated truck travelling on a snow-covered Northeast highway',
    whyImage: '/stock/pa-freight-highway.webp',
    whyAlt: 'Refrigerated freight truck moving through Pennsylvania',
    ctaImage: '/stock/ny-highway-fleet.webp',
    ctaAlt: 'Freight trucks travelling together on a New York highway',
    facts: [
      'Chilled and frozen food loads',
      'Scheduled and recurring routes',
      'Pickup-to-delivery communication',
    ],
    whyChoose: [
      ['Temperature-conscious handling', 'cold'],
      ['Northeast route coverage', 'route'],
      ['Reliable delivery windows', 'time'],
      ['Direct shipment updates', 'communication'],
    ],
    process: [
      [
        '01',
        'Plan the lane',
        'We confirm the product, temperature range, pickup window, and delivery requirements.',
      ],
      [
        '02',
        'Protect the load',
        'Reefer equipment is prepared for the load and monitored throughout the movement.',
      ],
      [
        '03',
        'Deliver to spec',
        'Your team gets direct updates as the shipment moves from pickup to delivery.',
      ],
    ],
    insight: 'How to plan a more reliable refrigerated delivery window',
  },
  'dedicated-solutions': {
    name: 'Dedicated Solutions',
    shortLabel: 'Dedicated capacity',
    title: 'A consistent team and route for the freight you move every week.',
    intro:
      'Dedicated transportation gives recurring Northeast freight a dependable operating rhythm, with familiar drivers, equipment, and communication around your schedule.',
    image: '/stock/home-refrigerated-fleet.webp',
    alt: 'Fleet of refrigerated trucks ready for dispatch',
    whyImage: '/stock/ct-blue-semi.webp',
    whyAlt: 'Blue semi-truck travelling through Connecticut',
    ctaImage: '/stock/pa-scenic-truck.webp',
    ctaAlt: 'Semi-truck travelling through a Pennsylvania route',
    facts: [
      'Recurring route coverage',
      'Dedicated operating contact',
      'Capacity built around your schedule',
    ],
    whyChoose: [
      ['Capacity built around your plan', 'truck'],
      ['Consistent route teams', 'route'],
      ['Predictable weekly movements', 'time'],
      ['One clear point of contact', 'communication'],
    ],
    process: [
      [
        '01',
        'Understand the pattern',
        'We map the lanes, stops, volumes, timing, and seasonal changes behind your operation.',
      ],
      [
        '02',
        'Build the plan',
        'Your route, equipment, and communication cadence are aligned before the first load.',
      ],
      [
        '03',
        'Run it consistently',
        'A repeatable plan reduces surprises and gives your team a clear point of contact.',
      ],
    ],
    insight: 'When dedicated capacity makes sense for food distribution',
  },
  'supply-chain-support': {
    name: 'Supply Chain Support',
    shortLabel: 'Cold-chain coordination',
    title: 'Practical coordination from pickup through final delivery.',
    intro:
      'When a shipment involves multiple stops, tight windows, or changing instructions, AtlanticCold helps keep the cold chain organized and moving.',
    image: '/stock/ny-loading-dock.webp',
    alt: 'Refrigerated freight truck at a loading dock',
    whyImage: '/stock/ny-winter-truck.webp',
    whyAlt: 'Refrigerated truck travelling through a New York winter route',
    ctaImage: '/stock/ct-supply-chain-truck.webp',
    ctaAlt: 'Supply-chain truck travelling through Connecticut',
    facts: [
      'Multi-stop shipment coordination',
      'Distribution and consolidation support',
      'Direct status communication',
    ],
    whyChoose: [
      ['Clear multi-stop planning', 'route'],
      ['Practical shipment visibility', 'communication'],
      ['Cold-chain focused operations', 'cold'],
      ['Support when plans change', 'shield'],
    ],
    process: [
      [
        '01',
        'Connect the moving parts',
        'We clarify the handoffs, delivery windows, contacts, and requirements before dispatch.',
      ],
      [
        '02',
        'Coordinate the movement',
        'Our team keeps the shipment details aligned as the plan moves through the Northeast.',
      ],
      [
        '03',
        'Close the loop',
        'Clear updates and delivery confirmation give your team a reliable record of the move.',
      ],
    ],
    insight: 'Three handoffs that can put a cold-chain shipment at risk',
  },
  'safety-compliance': {
    name: 'Safety & Compliance',
    shortLabel: 'Controlled handling',
    title:
      'Disciplined handling for freight where temperature and timing matter.',
    intro:
      'Food freight needs more than a truck. AtlanticCold builds practical checks, clear communication, and accountable handling into every movement.',
    image: '/stock/ct-supply-chain-truck.webp',
    alt: 'Commercial refrigerated truck travelling on a highway',
    whyImage: '/stock/nj-scenic-semi.webp',
    whyAlt: 'Semi-truck travelling through a New Jersey corridor',
    ctaImage: '/stock/pa-white-semi.webp',
    ctaAlt: 'White refrigerated semi-truck travelling through Pennsylvania',
    facts: [
      'Temperature-conscious handling',
      'Documented shipment communication',
      'Clear pickup and delivery accountability',
    ],
    whyChoose: [
      ['Controlled handling process', 'shield'],
      ['Temperature-aware operations', 'cold'],
      ['Documented communication', 'communication'],
      ['Accountability at every handoff', 'check'],
    ],
    process: [
      [
        '01',
        'Set the requirements',
        'Product, temperature, timing, and facility requirements are confirmed before loading.',
      ],
      [
        '02',
        'Follow the process',
        'Drivers and operations teams work from clear instructions at each stage of the shipment.',
      ],
      [
        '03',
        'Keep visibility',
        'Exceptions are surfaced quickly so the right people can make the right call.',
      ],
    ],
    insight: 'A practical checklist for temperature-sensitive freight',
  },
  'cross-dock-services': {
    name: 'Cross Dock Services',
    shortLabel: 'Cross-dock support',
    title: 'Fast transfer and consolidation for refrigerated food.',
    intro:
      'AtlanticCold offers cross-dock services for refrigerated and frozen food that needs to transfer, consolidate, or keep moving without unnecessary storage time.',
    image: '/stock/nj-loading-dock.webp',
    alt: 'Refrigerated truck positioned at a cross-dock loading facility',
    whyImage: '/stock/nj-snow-road.webp',
    whyAlt: 'Refrigerated truck moving through a snowy New Jersey road',
    ctaImage: '/stock/atlanticcold-truck.webp',
    ctaAlt: 'AtlanticCold refrigerated truck ready for a regional delivery',
    facts: [
      'Northeast transfer and consolidation support',
      'Refrigerated and frozen freight',
      'Transfer and consolidation support',
    ],
    whyChoose: [
      ['Purpose-built dock support', 'warehouse'],
      ['Fast transfer coordination', 'route'],
      ['Refrigerated freight handling', 'cold'],
      ['Clear inbound and outbound timing', 'time'],
    ],
    process: [
      [
        '01',
        'Schedule the move',
        'We confirm arrival timing, freight details, handling requirements, and the next destination.',
      ],
      [
        '02',
        'Transfer efficiently',
        'Loads move through the dock with practical coordination between inbound and outbound teams.',
      ],
      [
        '03',
        'Keep freight moving',
        'Consolidated shipments leave with the information and timing needed for the next leg.',
      ],
    ],
    insight: 'When cross-docking can reduce food freight handling time',
  },
} as const;

const whyChooseIcons = {
  check: ShieldCheck,
  cold: ThermometerSnowflake,
  communication: MessageCircleMore,
  route: Route,
  shield: ShieldCheck,
  time: Clock3,
  truck: Truck,
  warehouse: Warehouse,
};

type ServiceSlug = keyof typeof servicePages;

export function generateStaticParams() {
  return Object.keys(servicePages).map((service) => ({ service }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service } = await params;
  const servicePage = servicePages[service as ServiceSlug];

  if (!servicePage) return {};

  return {
    title: `${servicePage.name} | AtlanticCold Trucking`,
    description: servicePage.intro,
    openGraph: {
      title: `${servicePage.name} | AtlanticCold Trucking`,
      description: servicePage.intro,
      images: [],
    },
    twitter: {
      title: `${servicePage.name} | AtlanticCold Trucking`,
      description: servicePage.intro,
      images: [],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const servicePage = servicePages[service as ServiceSlug];

  if (!servicePage) notFound();

  return (
    <main className="service-page">
      <SiteHeader />

      <section className="service-hero" id="top">
        <div className="service-hero-media">
          <Image
            src={servicePage.image}
            alt={servicePage.alt}
            fill
            priority
            unoptimized
            sizes="100vw"
          />
        </div>
        <div className="service-hero-wash" aria-hidden="true" />
        <div className="service-hero-inner">
          <div className="service-hero-copy">
            <span className="section-label section-label-light">
              {servicePage.shortLabel}
            </span>
            <h1>{servicePage.title}</h1>
            <p>{servicePage.intro}</p>
            <div className="service-hero-actions">
              <Link className="footer-button" href="/#contact">
                Request a quote <ArrowRight size={17} />
              </Link>
              <a className="service-text-link" href="#service-details">
                See how it works <ArrowRight size={16} />
              </a>
            </div>
          </div>
          <aside className="service-hero-facts">
            <div className="service-facts-heading">
              <Snowflake size={18} aria-hidden="true" />
              <span>Service at a glance</span>
            </div>
            <ul>
              {servicePage.facts.map((fact) => (
                <li key={fact}>
                  <Check size={16} aria-hidden="true" />
                  {fact}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="service-details" id="service-details">
        <div className="service-details-heading">
          <span className="section-label">What this service covers</span>
          <h2>
            Built around the way
            <br />
            <span>your freight moves.</span>
          </h2>
        </div>
        <div className="service-details-copy">
          <p>{servicePage.intro}</p>
          <p>
            We work with your team to make the requirements clear, the timing
            realistic, and the next step easy to confirm.
          </p>
          <Link className="text-cta dark-cta" href="/#contact">
            Talk to our team <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <section className="service-process">
        <div className="service-section-heading">
          <span className="section-label">How we work</span>
          <h2>
            A clear process
            <br />
            <span>for every load.</span>
          </h2>
        </div>
        <div className="service-process-list">
          {servicePage.process.map(([number, title, copy]) => (
            <article key={number}>
              <span className="service-process-number">{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
              <ArrowRight className="service-process-arrow" size={19} />
            </article>
          ))}
        </div>
      </section>

      <section className="service-why">
        <Image
          className="service-why-background"
          src={servicePage.whyImage}
          alt={servicePage.whyAlt}
          fill
          unoptimized
          sizes="100vw"
        />
        <div className="service-why-overlay" aria-hidden="true" />
        <div className="service-why-heading">
          <div>
            <span className="section-label section-label-light">
              Why choose AtlanticCold
            </span>
            <h2>
              Built for the details
              <br />
              <span>that keep freight moving.</span>
            </h2>
          </div>
          <p>
            Temperature-controlled food freight depends on clear planning,
            dependable equipment, and fast communication when the plan changes.
          </p>
        </div>
        <div className="service-why-grid">
          {servicePage.whyChoose.map(([title, icon]) => {
            const Icon = whyChooseIcons[icon];

            return (
              <article key={title}>
                <span className="service-why-icon">
                  <Icon size={23} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <h3>{title}</h3>
              </article>
            );
          })}
        </div>
      </section>

      <section className="service-insights">
        <div className="service-insights-heading">
          <div>
            <span className="section-label">Insights</span>
            <h2>
              Useful thinking
              <br />
              <span>for cold-chain teams.</span>
            </h2>
          </div>
          <p>
            Practical guidance for planning refrigerated and frozen food
            transportation across the Northeast.
          </p>
        </div>
        <div className="service-insight-grid">
          <article>
            <span>Coming soon</span>
            <h3>{servicePage.insight}</h3>
            <p>
              Placeholder insight — practical guidance from the AtlanticCold
              team.
            </p>
          </article>
          <article>
            <span>Coming soon</span>
            <h3>What to confirm before a temperature-controlled pickup</h3>
            <p>
              Placeholder insight — practical guidance from the AtlanticCold
              team.
            </p>
          </article>
          <article>
            <span>Coming soon</span>
            <h3>Keeping Northeast delivery schedules predictable</h3>
            <p>
              Placeholder insight — practical guidance from the AtlanticCold
              team.
            </p>
          </article>
        </div>
      </section>

      <section className="service-final-cta">
        <Image
          className="service-final-cta-background"
          src={servicePage.ctaImage}
          alt={servicePage.ctaAlt}
          fill
          unoptimized
          sizes="(max-width: 820px) 100vw, 1180px"
        />
        <div className="service-final-cta-overlay" aria-hidden="true" />
        <div>
          <span className="section-label section-label-light">
            Ready to plan the move?
          </span>
          <h2>
            Tell us about
            <br />
            <span>your freight.</span>
          </h2>
        </div>
        <div>
          <p>
            Share the lane, timing, and load details. We’ll help you identify
            the right next step.
          </p>
          <Link className="footer-button" href="/#contact">
            Request a quote <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
