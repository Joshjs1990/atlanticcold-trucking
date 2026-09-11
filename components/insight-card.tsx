import Image from 'next/image';
import Link from 'next/link';
import type { InsightPost } from '@/app/insights/data';
import { ArrowUpRight } from 'lucide-react';

export function InsightCard({
  post,
  featured = false,
}: {
  post: InsightPost;
  featured?: boolean;
}) {
  return (
    <article className={`insight-card${featured ? ' is-featured' : ''}`}>
      <Link className="insight-card-image" href={`/insights/${post.slug}`}>
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          unoptimized
          sizes={featured ? '(max-width: 900px) 100vw, 62vw' : '(max-width: 900px) 100vw, 31vw'}
        />
        <span className="insight-card-image-wash" aria-hidden="true" />
      </Link>
      <div className="insight-card-body">
        <div className="insight-card-meta">
          <span>{post.category}</span>
          <span>{post.readTime}</span>
        </div>
        <h3>
          <Link href={`/insights/${post.slug}`}>{post.title}</Link>
        </h3>
        <p>{post.excerpt}</p>
        <Link className="text-cta dark-cta" href={`/insights/${post.slug}`}>
          Read insight <ArrowUpRight size={16} />
        </Link>
      </div>
    </article>
  );
}
