/* oxlint-disable next/no-html-link-for-pages */
'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import Image from 'next/image';

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
    <a href="/" className="brand-mark" aria-label="AtlanticCold Trucking home">
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

export function SiteHeader({ darkOnTop = false }: { darkOnTop?: boolean }) {
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

  const toggleMegaMenu = (menu: 'services' | 'coverage') => {
    setOpenMegaMenu((current) => (current === menu ? null : menu));
  };

  return (
    <header
      className={`site-header${scrolled ? ' is-scrolled' : ''}${darkOnTop ? ' is-light-top' : ''}`}
    >
      <BrandMark variant={scrolled || darkOnTop ? 'dark' : 'light'} />
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
                <a href={`/services/${slug}`} onClick={closeMenu} key={title}>
                  <strong>{title}</strong>
                  <small>{copy}</small>
                </a>
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
              <a href="/#coverage" onClick={closeMenu}>
                View all coverage <ArrowRight size={13} />
              </a>
            </div>
            <div className="mega-menu-links">
              {coverageLinks.map(([name, code, slug]) => (
                <a
                  href={`/service-areas/${slug}`}
                  onClick={closeMenu}
                  key={slug}
                >
                  <strong>{name}</strong>
                  <small>{code} service area</small>
                </a>
              ))}
            </div>
          </div>
        </div>
        <a href="/equipment" onClick={closeMenu}>
          Equipment
        </a>
        <a href="/insights" onClick={closeMenu}>
          Insights
        </a>
        <a href="/about" onClick={closeMenu}>
          About
        </a>
        <a href="/forms" onClick={closeMenu}>
          Forms
        </a>
        <a href="/contact" onClick={closeMenu}>
          Contact
        </a>
        <a className="mobile-quote" href="/contact" onClick={closeMenu}>
          Request a quote <ArrowRight size={15} />
        </a>
      </nav>
      <a className="header-quote" href="/contact">
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
