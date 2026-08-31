'use client';

import { useState } from 'react';
import { ArrowDownRight, ArrowRight, CircleArrowOutUpRight, Menu, X } from 'lucide-react';
import Image from 'next/image';

const heroImage = 'https://files.lewisbrisbois.com/production/general/Truck_on_Road_Late_at_Night_SMALL.jpg';
const dockImage = 'https://images.unsplash.com/photo-1671656202170-d382ace43d3c?auto=format&fit=crop&w=1800&q=85';
const ctaImage = 'https://www.frachtportal.com/_next/image?q=75&url=%2Fimages%2Finformation%2Flkw%2Fkuhltransport%2Fhero.jpg&w=2400';

const services = [
  ['01', 'Refrigerated Transportation', 'Temperature-controlled freight that arrives in spec, across every mile.'],
  ['02', 'Dedicated Solutions', 'A consistent team, route, and plan built around your operation.'],
  ['03', 'Supply Chain Support', 'Practical coordination that keeps the cold chain moving end to end.'],
  ['04', 'Safety & Compliance', 'Disciplined processes and real visibility from pickup to delivery.'],
];

function BrandMark() {
  return <a href="#top" className="brand-mark" aria-label="AtlanticCold Trucking home"><Image src="/atlanticcold-logo.svg" alt="AtlanticCold Trucking" width={174} height={61} priority /></a>;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [['Services', '#services'], ['Equipment', '#equipment'], ['About', '#about'], ['Careers', '#careers'], ['Contact', '#contact']];
  return <header className="site-header" aria-label="Primary navigation">
    <BrandMark />
    <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'}>{navItems.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}<a className="mobile-quote" href="#contact" onClick={() => setMenuOpen(false)}>Request a quote <ArrowRight size={14} /></a></nav>
    <a className="header-quote" href="#contact"><span>Request a quote</span><ArrowRight size={15} /></a>
    <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
  </header>;
}

function Hero() {
  return <section className="hero" id="top">
    <div className="hero-image-wrap"><Image className="hero-image" src={heroImage} alt="Truck moving down a wet highway at dusk" fill priority unoptimized sizes="71vw" /><div className="hero-image-wash" /><div className="route-lines" aria-hidden="true"><span /><span /><span /></div><div className="hero-coordinate">42° 21′ 37″ N &nbsp; / &nbsp; 71° 03′ 27″ W</div></div>
    <div className="hero-panel">
      <div className="hero-panel-top"><div className="eyebrow"><i /> Temperature controlled freight</div><div className="hero-status"><span className="pulse-dot" /> Live network / 24.7°F</div></div>
      <div className="hero-copy"><p className="hero-kicker">Freight, kept moving.</p><h1>Cooler<br />thinking.<br /><span>Stronger</span><br />delivery.</h1><p className="hero-description">The steady hand behind temperature-sensitive freight. Built for the miles, the moments, and everything in between.</p><a className="text-cta" href="#contact">Start a conversation <ArrowDownRight size={18} /></a></div>
      <div className="hero-panel-bottom"><span>AtlanticCold / North America</span><a href="#services">Scroll to explore <ArrowDownRight size={16} /></a></div>
    </div>
    <div className="hero-side-label">Built for the cold chain <span>↘</span></div>
  </section>;
}

function ServicesSection() {
  return <section className="services-section section-light" id="services"><div className="section-intro"><p className="section-index">01 <span>/</span> What we do</p><div><h2>Built around<br /><span>what matters.</span></h2><p className="intro-copy">From coast to coast, AtlanticCold provides temperature-controlled transportation you can count on.</p></div></div><div className="services-list">{services.map(([number, title, text]) => <a className="service-row" href="#contact" key={number}><span className="service-number">{number}</span><span className="service-title">{title}</span><span className="service-text">{text}</span><span className="service-arrow"><ArrowRight size={18} /></span></a>)}</div></section>;
}

function MetricsSection() {
  return <section className="metrics-section" id="about"><div className="metrics-image"><Image src={dockImage} alt="Cold storage loading bay with cool blue light" fill unoptimized sizes="41vw" /><div className="metrics-image-overlay" /><div className="image-caption">The details are the difference.</div></div><div className="metrics-content"><p className="section-index light-index">02 <span>/</span> Why AtlanticCold</p><h2>Experience that<br /><span>delivers confidence.</span></h2><p className="metrics-copy">When the temperature matters, there is no room for guesswork. Our people, processes, and equipment are aligned around one simple promise: keep your freight moving exactly as it should.</p><div className="metric-grid"><div className="metric-item"><strong>99.8<span>%</span></strong><small>On-time delivery</small></div><div className="metric-item"><strong>24<span>/7</span></strong><small>Temperature monitoring</small></div><div className="metric-item"><strong>150<span>+</span></strong><small>Modern reefer units</small></div><div className="metric-item"><strong>25<span>+</span></strong><small>Years of experience</small></div></div></div></section>;
}

function EquipmentSection() {
  return <section className="equipment-section section-light" id="equipment"><div className="equipment-topline"><p className="section-index">03 <span>/</span> The fleet</p><span className="equipment-note">Purpose-built for every degree between pickup and delivery</span></div><div className="equipment-layout"><div className="equipment-heading"><h2>The right<br /><span>temperature.</span></h2></div><div className="equipment-copy"><p>Our modern reefer fleet is ready for the freight that cannot wait, with the visibility and flexibility to match the way your business moves.</p><a className="text-cta dark-cta" href="#contact">Explore our equipment <CircleArrowOutUpRight size={17} /></a></div><div className="temperature-readout"><span>SET POINT</span><strong>-20°<sup>F</sup></strong><i /><small>Cold chain active</small></div></div></section>;
}

function TestimonialSection() {
  return <section className="testimonial-section section-light" id="careers"><div className="trust-rail"><span>Trusted by cold-chain teams</span><span className="trust-line" /><span>that cannot afford delays</span></div><div className="testimonial-content"><div className="quote-mark">“</div><blockquote>AtlanticCold is more than a carrier — they’re a true partner in our supply chain. Reliable, responsive, and committed to keeping our business moving.</blockquote><div className="quote-attribution"><span /><div><strong>Director of Logistics</strong><small>National Food Distributor</small></div></div></div><div className="testimonial-controls"><button aria-label="Previous testimonial"><ArrowRight size={17} className="flip-x" /></button><button aria-label="Next testimonial"><ArrowRight size={17} /></button><span>01 <i /> 01</span></div></section>;
}

function CTAFooter() {
  return <footer className="site-footer" id="contact"><div className="footer-image"><Image src={ctaImage} alt="Refrigerated truck being loaded at a warehouse" fill unoptimized sizes="100vw" /><div /></div><div className="footer-content"><div className="footer-cta"><p className="section-index light-index">04 <span>/</span> Let’s move</p><h2>Your freight.<br /><span>Our priority.</span></h2><a className="footer-button" href="mailto:hello@atlanticcold.com">Request a quote <ArrowRight size={18} /></a></div><div className="footer-bottom"><BrandMark /><div className="footer-links"><a href="#services">Services</a><a href="#equipment">Equipment</a><a href="#about">About</a><a href="#careers">Careers</a><a href="#contact">Contact</a></div><div className="footer-meta"><span>© 2025 AtlanticCold Trucking</span><span><a href="#contact">Privacy</a> / <a href="#contact">Terms</a></span></div></div></div></footer>;
}

export default function Home() {
  return <main><Header /><Hero /><ServicesSection /><MetricsSection /><EquipmentSection /><TestimonialSection /><CTAFooter /></main>;
}
