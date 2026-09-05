'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const serviceLinks = [
  [
    'Refrigerated Transportation',
    'Temperature-controlled food freight.',
    'refrigerated-transportation',
  ],
  [
    'Dedicated Solutions',
    'Consistent routes, teams, and capacity.',
    'dedicated-solutions',
  ],
  [
    'Supply Chain Support',
    'Cold-chain coordination from pickup to delivery.',
    'supply-chain-support',
  ],
  [
    'Safety & Compliance',
    'Disciplined handling and shipment visibility.',
    'safety-compliance',
  ],
  [
    'Cross Dock Services',
    'Transfer and consolidation support.',
    'cross-dock-services',
  ],
];

const coverageLinks = [
  ['New York', 'NY', 'new-york'],
  ['New Jersey', 'NJ', 'new-jersey'],
  ['Pennsylvania', 'PA', 'pennsylvania'],
  ['Connecticut', 'CT', 'connecticut'],
];

export function BrandMark({
  variant = 'light',
}: {
  variant?: 'light' | 'dark';
}) {
  const logo =
    variant === 'light'
      ? '/ArcticColdLogowhite.webp'
      : '/3ff43494-c173-41f4-a936-ac4dab49aba7.webp';
  const dimensions =
    variant === 'light'
      ? { width: 140, height: 56 }
      : { width: 140, height: 47 };

  return (
    <Link
      href="/"
      className="brand-mark"
      aria-label="AtlanticCold Trucking home"
      onClick={(event) => {
        event.preventDefault();
        window.location.assign('/');
      }}
    >
      <Image
        src={logo}
        alt="AtlanticCold Trucking"
        width={dimensions.width}
        height={dimensions.height}
        priority
      />
    </Link>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMegaMenu, setOpenMegaMenu] = useState<
    'services' | 'coverage' | null
  >(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen && !openMegaMenu) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setOpenMegaMenu(null);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen, openMegaMenu]);

  const closeMenu = () => {
    setMenuOpen(false);
    setOpenMegaMenu(null);
  };

  const closeMobileMenu = () => setMenuOpen(false);

  const toggleMegaMenu = (menu: 'services' | 'coverage') => {
    setOpenMegaMenu((current) => (current === menu ? null : menu));
  };

  return (
    <header className={scrolled ? 'site-header is-scrolled' : 'site-header'}>
      <BrandMark variant={scrolled ? 'dark' : 'light'} />
      <nav
        id="primary-navigation"
        className={menuOpen ? 'main-nav is-open' : 'main-nav'}
        aria-label="Primary navigation"
      >
        <div
          className={`nav-mega-group ${openMegaMenu === 'services' ? 'is-open' : ''}`}
        >
          <button
            className="mega-trigger"
            type="button"
            onClick={() => toggleMegaMenu('services')}
            aria-haspopup="true"
            aria-expanded={openMegaMenu === 'services'}
            aria-controls="services-mega-menu"
          >
            Services
          </button>
          <div id="services-mega-menu" className="mega-menu mega-menu-services">
            <div className="mega-menu-intro">
              <span>Cold-chain services</span>
              <p>
                Refrigerated and frozen food transportation for the Northeast.
              </p>
            </div>
            <div className="mega-menu-links">
              {serviceLinks.map(([title, copy, slug]) => (
                <Link
                  href={`/services/${slug}`}
                  onClick={closeMenu}
                  key={title}
                >
                  <strong>{title}</strong>
                  <small>{copy}</small>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div
          className={`nav-mega-group ${openMegaMenu === 'coverage' ? 'is-open' : ''}`}
        >
          <button
            className="mega-trigger"
            type="button"
            onClick={() => toggleMegaMenu('coverage')}
            aria-haspopup="true"
            aria-expanded={openMegaMenu === 'coverage'}
            aria-controls="coverage-mega-menu"
          >
            Coverage
          </button>
          <div id="coverage-mega-menu" className="mega-menu mega-menu-coverage">
            <div className="mega-menu-intro">
              <span>Northeast coverage</span>
              <p>
                Serving New York, New Jersey, Pennsylvania, and Connecticut.
              </p>
              <Link href="/#coverage" onClick={closeMobileMenu}>
                View all coverage <ArrowRight size={13} />
              </Link>
            </div>
            <div className="mega-menu-links">
              {coverageLinks.map(([name, code, slug]) => (
                <Link
                  href={`/service-areas/${slug}`}
                  onClick={(event) => {
                    event.preventDefault();
                    closeMenu();
                    window.location.assign(`/service-areas/${slug}`);
                  }}
                  key={slug}
                >
                  <strong>{name}</strong>
                  <small>{code} service area</small>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <Link href="/#equipment" onClick={closeMenu}>
          Equipment
        </Link>
        <Link href="/#about" onClick={closeMenu}>
          About
        </Link>
        <Link href="/#contact" onClick={closeMenu}>
          Contact
        </Link>
        <Link className="mobile-quote" href="/#contact" onClick={closeMenu}>
          Request a quote <ArrowRight size={15} />
        </Link>
      </nav>
      <Link className="header-quote" href="/#contact">
        <span>Request a quote</span>
        <ArrowRight size={15} />
      </Link>
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
