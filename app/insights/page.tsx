import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SubpageFooter } from '@/components/subpage-footer';
import { InsightCard } from '@/components/insight-card';
import { insightPosts } from './data';

const insightsHeroImage =
  'https://images.pexels.com/photos/35563167/pexels-photo-35563167/free-photo-of-winter-highway-with-trucks-and-traffic-in-motion.jpeg?auto=compress&cs=tinysrgb&w=2200';

export const metadata: Metadata = {
  title: 'Insights | AtlanticCold Trucking',
  description:
    'Practical insights about refrigerated trucking, cold-chain operations, cross-docking, and food freight planning across the Northeast.',
  keywords: [
    'refrigerated trucking insights',
    'cold-chain logistics',
    'food freight planning',
    'Northeast trucking',
  ],
};

export default function InsightsPage() {
  const [featured, ...posts] = insightPosts;

  return (
    <main className="insights-page">
      <SiteHeader />

      <section className="insights-hero" id="top">
        <div className="insights-hero-media">
          <Image
            src={insightsHeroImage}
            alt="Trucks travelling on a snowy winter highway"
            fill
            priority
            unoptimized
            sizes="100vw"
          />
        </div>
        <div className="insights-hero-overlay" />
        <div className="insights-hero-inner">
          <span className="section-label section-label-light">Insights</span>
          <h1>
            The cold chain,
            <br />
            <span>made practical.</span>
          </h1>
          <p>
            Straightforward guidance for food shippers planning refrigerated
            transportation, cross-dock transfers, and regional delivery across
            New York, New Jersey, Pennsylvania, and Connecticut.
          </p>
        </div>
      </section>

      <section className="insights-index-content">
        <div className="insights-index-heading">
          <div>
            <span className="section-label">From the road and dock</span>
            <h2>
              Recent
              <br />
              <span>insights.</span>
            </h2>
          </div>
          <p>
            Useful context for manufacturers, distributors, wholesalers, and
            retailers moving temperature-sensitive food freight.
          </p>
        </div>

        <div className="insights-featured-grid">
          <InsightCard post={featured} featured />
          <div className="insights-featured-note frosted-shell">
            <span className="section-label section-label-light">AtlanticCold</span>
            <h3>Regional knowledge for freight that cannot wait.</h3>
            <p>
              Our team supports refrigerated and frozen food transportation,
              dedicated routes, supply-chain coordination, and cross-dock
              services throughout the Northeast.
            </p>
            <Link className="text-cta" href="/contact">
              Talk to our team <ArrowRight size={17} />
            </Link>
          </div>
        </div>

        <div className="insights-grid">
          {posts.map((post) => (
            <InsightCard post={post} key={post.slug} />
          ))}
        </div>
      </section>

      <SubpageFooter />
    </main>
  );
}
