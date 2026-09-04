'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  Menu,
  Snowflake,
  X,
} from 'lucide-react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const heroVideo =
  'https://www.youtube.com/embed/3_wATua3mLI?autoplay=1&mute=1&controls=0&loop=1&playlist=3_wATua3mLI&playsinline=1&rel=0&modestbranding=1';
const metricsImage = '/metrics-winter-truck.webp';
const equipmentImage =
  'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1800&q=88';
const ctaImage =
  'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=2200&q=88';

const services = [
  {
    title: 'Refrigerated Transportation',
    text: 'Temperature-controlled freight that arrives in spec, across every mile.',
    image:
      'https://images.unsplash.com/photo-1765571394962-c8d03a8d0ef5?auto=format&fit=crop&w=1200&q=82',
    alt: 'Freight truck travelling on a highway',
  },
  {
    title: 'Dedicated Solutions',
    text: 'A consistent team, route, and plan built around your operation.',
    image:
      'https://images.unsplash.com/photo-1671656202170-d382ace43d3c?auto=format&fit=crop&w=1200&q=82',
    alt: 'Temperature-controlled freight at a loading dock',
  },
  {
    title: 'Supply Chain Support',
    text: 'Practical coordination that keeps the cold chain moving end to end.',
    image:
      'https://images.unsplash.com/photo-1764046155497-ad7e50737ffa?auto=format&fit=crop&w=1200&q=82',
    alt: 'Warehouse loading dock and freight pallets',
  },
  {
    title: 'Safety & Compliance',
    text: 'Disciplined processes and real visibility from pickup to delivery.',
    image:
      'https://images.unsplash.com/photo-1664382953403-fc1ac77073a0?auto=format&fit=crop&w=1200&q=82',
    alt: 'Logistics team reviewing freight operations',
  },
];

const coverageAreas = [
  {
    name: 'New York',
    short: 'NY',
    slug: 'new-york',
    className: 'coverage-card-ny',
  },
  {
    name: 'New Jersey',
    short: 'NJ',
    slug: 'new-jersey',
    className: 'coverage-card-nj',
  },
  {
    name: 'Pennsylvania',
    short: 'PA',
    slug: 'pennsylvania',
    className: 'coverage-card-pa',
  },
  {
    name: 'Connecticut',
    short: 'CT',
    slug: 'connecticut',
    className: 'coverage-card-ct',
  },
];

const metrics = [
  { value: 99.8, decimals: 1, suffix: '%', label: 'On-time delivery' },
  { value: 24, decimals: 0, suffix: '/7', label: 'Temperature monitoring' },
  { value: 150, decimals: 0, suffix: '+', label: 'Modern reefer units' },
  { value: 25, decimals: 0, suffix: '+', label: 'Years of experience' },
];

const capabilities = [
  'Multi-temperature capability',
  'Continuous shipment visibility',
  'Modern refrigerated fleet',
  'Flexible load planning',
];

function usePremiumMotion(pageRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);
    const cleanups: Array<() => void> = [];
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (reduceMotion) {
      root
        .querySelectorAll<HTMLElement>('[data-counter]')
        .forEach((counter) => {
          counter.textContent = Number(counter.dataset.value).toFixed(
            Number(counter.dataset.decimals ?? 0),
          );
        });
      return;
    }

    const context = gsap.context(() => {
      const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTimeline
        .from('.hero .eyebrow', { opacity: 0, y: 18, duration: 0.65 })
        .from('.hero-kicker', { opacity: 0, y: 24, duration: 0.7 }, '-=0.34')
        .from(
          '.hero-line',
          {
            yPercent: 110,
            rotate: 2,
            opacity: 0,
            stagger: 0.11,
            duration: 1.05,
          },
          '-=0.38',
        )
        .from(
          '.hero-description, .hero .text-cta',
          { opacity: 0, y: 25, stagger: 0.1, duration: 0.72 },
          '-=0.52',
        );

      gsap.to('.hero-video-motion-layer', {
        scale: 1.17,
        yPercent: 4,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      const hero = root.querySelector<HTMLElement>('.hero');
      const videoLayer = root.querySelector<HTMLElement>(
        '.hero-video-motion-layer',
      );
      const supportsPointer = window.matchMedia('(pointer: fine)').matches;
      if (hero && videoLayer && supportsPointer) {
        const xTo = gsap.quickTo(videoLayer, 'x', {
          duration: 0.85,
          ease: 'power3.out',
        });
        const yTo = gsap.quickTo(videoLayer, 'y', {
          duration: 0.85,
          ease: 'power3.out',
        });
        const onPointerMove = (event: PointerEvent) => {
          const bounds = hero.getBoundingClientRect();
          const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 28;
          const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 20;
          xTo(x);
          yTo(y);
        };
        const onPointerLeave = () => {
          xTo(0);
          yTo(0);
        };
        hero.addEventListener('pointermove', onPointerMove);
        hero.addEventListener('pointerleave', onPointerLeave);
        cleanups.push(() => {
          hero.removeEventListener('pointermove', onPointerMove);
          hero.removeEventListener('pointerleave', onPointerLeave);
        });
      }

      gsap.from('.services-heading > *', {
        opacity: 0,
        y: 45,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-heading',
          start: 'top 82%',
          once: true,
        },
      });

      gsap.from('.service-card', {
        opacity: 0,
        y: 68,
        stagger: 0.1,
        duration: 0.95,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-cards',
          start: 'top 82%',
          once: true,
        },
      });

      gsap.fromTo(
        '.service-card-image img',
        { scale: 1.09 },
        {
          scale: 1,
          stagger: 0.08,
          duration: 1.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-cards',
            start: 'top 82%',
            once: true,
          },
        },
      );

      gsap.to('.metrics-background img', {
        yPercent: 7,
        scale: 1.07,
        ease: 'none',
        scrollTrigger: {
          trigger: '.metrics-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      gsap.from('.metrics-content', {
        opacity: 0,
        y: 55,
        scale: 0.985,
        duration: 1.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.metrics-content',
          start: 'top 80%',
          once: true,
        },
      });

      root
        .querySelectorAll<HTMLElement>('[data-counter]')
        .forEach((element) => {
          const target = Number(element.dataset.value ?? 0);
          const decimals = Number(element.dataset.decimals ?? 0);
          const state = { value: 0 };
          element.textContent = (0).toFixed(decimals);
          gsap.to(state, {
            value: target,
            duration: 1.65,
            ease: 'power2.out',
            onUpdate: () => {
              element.textContent = state.value.toFixed(decimals);
            },
            scrollTrigger: { trigger: element, start: 'top 86%', once: true },
          });
        });

      gsap.from('.equipment-heading, .equipment-copy', {
        opacity: 0,
        y: 52,
        stagger: 0.13,
        duration: 0.95,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.equipment-intro',
          start: 'top 82%',
          once: true,
        },
      });

      gsap.from('.equipment-visual', {
        clipPath: 'inset(12% 0 0 0 round 16px)',
        opacity: 0,
        y: 34,
        duration: 1.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.equipment-stage',
          start: 'top 80%',
          once: true,
        },
      });

      gsap.from('.capability-item', {
        opacity: 0,
        x: 24,
        stagger: 0.08,
        duration: 0.65,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.equipment-capabilities',
          start: 'top 82%',
          once: true,
        },
      });

      gsap.from('.testimonial-content > *', {
        opacity: 0,
        y: 38,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.testimonial-content',
          start: 'top 80%',
          once: true,
        },
      });

      gsap.to('.footer-image img', {
        scale: 1.08,
        yPercent: 3,
        ease: 'none',
        scrollTrigger: {
          trigger: '.site-footer',
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: 1.2,
        },
      });

      gsap.from('.footer-cta > *', {
        opacity: 0,
        y: 48,
        stagger: 0.14,
        duration: 0.95,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.footer-cta', start: 'top 80%', once: true },
      });
    }, root);

    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 350);
    return () => {
      window.clearTimeout(refreshTimer);
      cleanups.forEach((cleanup) => cleanup());
      context.revert();
    };
  }, [pageRef]);
}

function BrandMark({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const logo =
    variant === 'light'
      ? '/ArcticColdLogowhite.webp'
      : '/3ff43494-c173-41f4-a936-ac4dab49aba7.webp';
  const dimensions =
    variant === 'light'
      ? { width: 140, height: 56 }
      : { width: 140, height: 47 };

  return (
    <a
      href="#top"
      className="brand-mark"
      aria-label="AtlanticCold Trucking home"
    >
      <Image
        src={logo}
        alt="AtlanticCold Trucking"
        width={dimensions.width}
        height={dimensions.height}
        priority
      />
    </a>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const navItems = [
    ['Equipment', '#equipment'],
    ['About', '#about'],
    ['Careers', '#careers'],
    ['Contact', '#contact'],
  ];

  return (
    <header className={scrolled ? 'site-header is-scrolled' : 'site-header'}>
      <BrandMark variant={scrolled ? 'dark' : 'light'} />
      <nav
        id="primary-navigation"
        className={menuOpen ? 'main-nav is-open' : 'main-nav'}
        aria-label="Primary navigation"
      >
        <div className="nav-mega-group">
          <a href="#services" onClick={() => setMenuOpen(false)}>
            Services
          </a>
          <div className="mega-menu mega-menu-services">
            <div className="mega-menu-intro">
              <span>Cold-chain services</span>
              <p>
                Refrigerated and frozen food transportation for the Northeast.
              </p>
            </div>
            <div className="mega-menu-links">
              {services.map((service) => (
                <a
                  href="#services"
                  onClick={() => setMenuOpen(false)}
                  key={service.title}
                >
                  <strong>{service.title}</strong>
                  <small>{service.text}</small>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="nav-mega-group">
          <a href="#coverage" onClick={() => setMenuOpen(false)}>
            Coverage
          </a>
          <div className="mega-menu mega-menu-coverage">
            <div className="mega-menu-intro">
              <span>Northeast coverage</span>
              <p>
                Serving New York, New Jersey, Pennsylvania, and Connecticut.
              </p>
            </div>
            <div className="mega-menu-links">
              {coverageAreas.map((area) => (
                <a
                  href={`/service-areas/${area.slug}`}
                  onClick={() => setMenuOpen(false)}
                  key={area.slug}
                >
                  <strong>{area.name}</strong>
                  <small>{area.short} service area</small>
                </a>
              ))}
            </div>
          </div>
        </div>
        {navItems.map(([label, href]) => (
          <a key={label} href={href} onClick={() => setMenuOpen(false)}>
            {label}
          </a>
        ))}
        <a
          className="mobile-quote"
          href="#contact"
          onClick={() => setMenuOpen(false)}
        >
          Request a quote <ArrowRight size={15} />
        </a>
      </nav>
      <a className="header-quote" href="#contact">
        <span>Request a quote</span>
        <ArrowRight size={15} />
      </a>
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-controls="primary-navigation"
        aria-expanded={menuOpen}
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-image-wrap" aria-hidden="true">
        <div className="hero-video-motion-layer">
          <div className="hero-video-poster" />
          <iframe
            className="hero-video"
            src={heroVideo}
            title="AtlanticCold refrigerated trucking in winter"
            allow="autoplay; encrypted-media; picture-in-picture"
            tabIndex={-1}
          />
        </div>
        <div className="hero-image-wash" />
        <div className="hero-atmosphere" />
      </div>
      <div className="hero-panel">
        <div className="hero-copy">
          <div className="eyebrow">
            <i /> Refrigerated &amp; frozen food freight
          </div>
          <h1>
            <span className="hero-line-mask">
              <span className="hero-line">Refrigerated freight.</span>
            </span>
            <span className="hero-line-mask">
              <span className="hero-line hero-line-accent">
                Across the Northeast.
              </span>
            </span>
          </h1>
          <p className="hero-description">
            AtlanticCold transports refrigerated and frozen food throughout New
            York, New Jersey, Pennsylvania, and Connecticut.
          </p>
          <a className="text-cta" href="#contact">
            Request a quote <ArrowDownRight size={18} />
          </a>
        </div>
      </div>
      <div className="frost-overlay" aria-hidden="true" />
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="services-section section-light" id="services">
      <div className="services-heading">
        <div>
          <span className="section-label">Cold-chain services</span>
          <h2>
            Refrigerated freight
            <br />
            <span>services.</span>
          </h2>
        </div>
        <div className="services-heading-copy">
          <p>
            We transport refrigerated and frozen food with the equipment,
            communication, and regional coverage your shipments require.
          </p>
          <a className="text-cta dark-cta" href="#contact">
            Talk to our team <ArrowRight size={17} />
          </a>
        </div>
      </div>
      <div className="services-cards">
        {services.map((service) => (
          <a className="service-card" href="#contact" key={service.title}>
            <div className="service-card-image">
              <Image
                src={service.image}
                alt={service.alt}
                fill
                unoptimized
                sizes="(max-width: 680px) 100vw, (max-width: 900px) 50vw, 25vw"
              />
              <span className="service-card-sheen" aria-hidden="true" />
            </div>
            <div className="service-card-body">
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <span className="service-card-link">
                Explore service <ArrowRight size={16} />
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function CoverageSection() {
  return (
    <section className="coverage-section section-light" id="coverage">
      <div className="coverage-heading">
        <span className="section-label">Where we cover</span>
        <h2>
          Serving NY, NJ, PA
          <br />
          <span>&amp; Connecticut.</span>
        </h2>
        <p>
          AtlanticCold covers the Northeast with refrigerated and frozen food
          transportation across New York, New Jersey, Pennsylvania, and
          Connecticut.
        </p>
      </div>

      <div className="coverage-map-stage">
        <svg className="coverage-map" viewBox="0 0 620 620" aria-hidden="true">
          <image
            className="coverage-map-image"
            href="/actmap.webp"
            x="50"
            y="0"
            width="520"
            height="620"
            preserveAspectRatio="none"
          />
          <g className="coverage-hotspot coverage-hotspot-ny">
            <circle cx="331" cy="229" r="8" />
            <circle cx="331" cy="229" r="18" />
          </g>
          <g className="coverage-hotspot coverage-hotspot-ct">
            <circle cx="435" cy="229" r="8" />
            <circle cx="435" cy="229" r="18" />
          </g>
          <g className="coverage-hotspot coverage-hotspot-pa">
            <circle cx="237" cy="354" r="8" />
            <circle cx="237" cy="354" r="18" />
          </g>
          <g className="coverage-hotspot coverage-hotspot-nj">
            <circle cx="336" cy="322" r="8" />
            <circle cx="336" cy="322" r="18" />
          </g>
        </svg>

        <svg
          className="coverage-connectors"
          viewBox="0 0 1220 600"
          aria-hidden="true"
        >
          <path d="M254 101 C380 101 500 167 629 227" />
          <path d="M254 383 C390 383 510 340 544 340" />
          <path d="M966 209 C850 209 790 224 723 227" />
          <path d="M966 479 C860 438 750 340 633 311" />
          <circle cx="629" cy="227" r="4" />
          <circle cx="633" cy="311" r="4" />
          <circle cx="544" cy="340" r="4" />
          <circle cx="723" cy="227" r="4" />
        </svg>

        {coverageAreas.map((area) => (
          <a
            className={`coverage-card ${area.className}`}
            href={`/service-areas/${area.slug}`}
            key={area.slug}
          >
            <span className="coverage-card-code">{area.short}</span>
            <span>
              <strong>{area.name}</strong>
              <small>Explore coverage</small>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

function MetricsSection() {
  return (
    <section className="metrics-section" id="about">
      <div className="metrics-background">
        <Image
          src={metricsImage}
          alt="Refrigerated truck travelling through winter conditions"
          fill
          unoptimized
          sizes="100vw"
        />
      </div>
      <div className="metrics-content frosted-shell">
        <div className="metrics-inner">
          <span className="section-label section-label-light">
            Built on consistency
          </span>
          <h2>
            Experience that
            <br />
            <span>delivers confidence.</span>
          </h2>
          <p className="metrics-copy">
            When the temperature matters, there is no room for guesswork. Our
            people, processes, and equipment are aligned around one simple
            promise: keep your freight moving exactly as it should.
          </p>
          <div className="metric-grid">
            {metrics.map((metric) => (
              <div className="metric-item" key={metric.label}>
                <strong>
                  <span
                    data-counter
                    data-value={metric.value}
                    data-decimals={metric.decimals}
                  >
                    {metric.value.toFixed(metric.decimals)}
                  </span>
                  <em>{metric.suffix}</em>
                </strong>
                <small>{metric.label}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EquipmentSection() {
  return (
    <section className="equipment-section section-light" id="equipment">
      <div className="equipment-intro">
        <div className="equipment-heading">
          <span className="section-label">Purpose-built fleet</span>
          <h2>
            Refrigerated equipment
            <br />
            <span>for the load.</span>
          </h2>
        </div>
        <div className="equipment-copy">
          <p>
            Our reefer units are built to move refrigerated and frozen food
            safely through the Northeast, with clear communication from pickup
            to delivery.
          </p>
          <a className="text-cta dark-cta" href="#contact">
            Explore our equipment <ArrowRight size={17} />
          </a>
        </div>
      </div>
      <div className="equipment-stage">
        <div className="equipment-visual">
          <Image
            src={equipmentImage}
            alt="Modern refrigerated truck on the open road"
            fill
            unoptimized
            sizes="(max-width: 680px) 100vw, 72vw"
          />
          <div className="equipment-visual-wash" />
          <p>Modern reefers. Regional coverage. Direct communication.</p>
        </div>
        <div className="equipment-capabilities frosted-shell">
          <div className="capabilities-heading">
            <Snowflake size={18} aria-hidden="true" />
            <span>Cold-chain capability</span>
          </div>
          <div className="capabilities-list">
            {capabilities.map((capability) => (
              <div className="capability-item" key={capability}>
                <Check size={16} aria-hidden="true" />
                <span>{capability}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialSection() {
  return (
    <section className="testimonial-section section-light" id="careers">
      <div className="testimonial-content">
        <div className="quote-mark" aria-hidden="true">
          “
        </div>
        <blockquote>
          AtlanticCold is more than a carrier — they’re a true partner in our
          supply chain. Reliable, responsive, and committed to keeping our
          business moving.
        </blockquote>
        <div className="quote-attribution">
          <span />
          <div>
            <strong>Director of Logistics</strong>
            <small>National Food Distributor</small>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTAFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-panel">
        <div className="footer-image">
          <Image
            src={ctaImage}
            alt="Cold-chain warehouse loading area"
            fill
            unoptimized
            sizes="100vw"
          />
          <div />
        </div>
        <div className="footer-content">
          <div className="footer-cta">
            <span className="section-label section-label-light">
              Northeast refrigerated trucking
            </span>
            <h3>
              Your freight.
              <br />
              <span>Our priority.</span>
            </h3>
            <p className="footer-description">
              AtlanticCold is a refrigerated and frozen food trucking company
              serving New York, New Jersey, Pennsylvania, and Connecticut.
            </p>
          </div>
          <form
            className="footer-form"
            action="mailto:hello@atlanticcold.com"
            method="post"
            encType="text/plain"
          >
            <span className="footer-form-label">Start a conversation</span>
            <div className="footer-form-grid">
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
                <span>How can we help?</span>
                <textarea name="message" rows={3} required />
              </label>
            </div>
            <button className="footer-form-submit" type="submit">
              Send inquiry <ArrowRight size={18} />
            </button>
          </form>
          <div className="footer-bottom">
            <BrandMark variant="light" />
            <div className="footer-links">
              <a href="#services">Services</a>
              <a href="#equipment">Equipment</a>
              <a href="#about">About</a>
              <a href="#careers">Careers</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="footer-meta">
              <span>© 2025 AtlanticCold Trucking</span>
              <span>
                <a href="#contact">Privacy</a> / <a href="#contact">Terms</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const pageRef = useRef<HTMLElement>(null);
  usePremiumMotion(pageRef);

  return (
    <main ref={pageRef} className="site-page">
      <Header />
      <Hero />
      <ServicesSection />
      <CoverageSection />
      <MetricsSection />
      <EquipmentSection />
      <TestimonialSection />
      <CTAFooter />
    </main>
  );
}
