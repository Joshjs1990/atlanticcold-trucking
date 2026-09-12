import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { notFound } from 'next/navigation';
import { InsightCard } from '@/components/insight-card';
import { SiteHeader } from '@/components/site-header';
import { SubpageFooter } from '@/components/subpage-footer';
import { getInsightPost, insightPosts } from '../data';

type InsightPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return insightPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getInsightPost(slug);
  if (!post) return {};

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: 'article',
      images: [{ url: post.image, alt: post.imageAlt }],
    },
  };
}

export default async function InsightPostPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const post = getInsightPost(slug);
  if (!post) notFound();

  const relatedPosts = insightPosts.filter((item) => item.slug !== post.slug).slice(0, 2);
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    image: [post.image],
    datePublished: '2026-09-01',
    dateModified: '2026-09-01',
    author: { '@type': 'Organization', name: 'AtlanticCold Trucking' },
    publisher: { '@type': 'Organization', name: 'AtlanticCold Trucking' },
    mainEntityOfPage: `https://atlanticcold-trucking.joshstewart90.workers.dev/insights/${post.slug}`,
  };

  return (
    <main className="insight-post-page">
      <SiteHeader />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <header className="insight-post-hero">
        <div className="insight-post-hero-media">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            priority
            unoptimized
            sizes="100vw"
          />
        </div>
        <div className="insight-post-hero-overlay" />
        <div className="insight-post-hero-inner">
          <Link className="insight-back-link" href="/insights">
            <ArrowLeft size={15} /> Back to insights
          </Link>
          <div className="insight-post-hero-meta">
            <span>{post.category}</span>
            <span>{post.readTime}</span>
            <time>{post.published}</time>
          </div>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
        </div>
      </header>

      <div className="insight-post-layout">
        <article className="insight-article">
          <p className="insight-article-intro">{post.intro}</p>

          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets ? (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>
                      <Check size={16} aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <div className="insight-takeaway">
            <span className="section-label">The takeaway</span>
            <p>{post.takeaway}</p>
          </div>

          <div className="insight-article-cta">
            <span className="section-label">Plan the next move</span>
            <h2>
              Have a load
              <br />
              <span>to discuss?</span>
            </h2>
            <p>
              Share the route, product, timing, and temperature requirement.
              AtlanticCold will help identify the right next step.
            </p>
            <Link className="text-cta dark-cta" href="/contact">
              Start a conversation <ArrowRight size={17} />
            </Link>
          </div>
        </article>

      </div>

      <section className="related-insights">
        <div className="related-insights-heading">
          <span className="section-label">Keep reading</span>
          <h2>
            More cold-chain
            <br />
            <span>insights.</span>
          </h2>
        </div>
        <div className="related-insights-grid">
          {relatedPosts.map((relatedPost) => (
            <InsightCard post={relatedPost} key={relatedPost.slug} />
          ))}
        </div>
      </section>

      <SubpageFooter />
    </main>
  );
}
