'use client';

import { useState, type ComponentProps } from 'react';
import { ArrowRight } from 'lucide-react';

type FormSubmitEvent = Parameters<NonNullable<ComponentProps<'form'>['onSubmit']>>[0];

type ContactFormProps = {
  variant: 'quote' | 'footer';
  location?: string;
};

export function ContactForm({ variant, location }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const isQuote = variant === 'quote';

  async function handleSubmit(event: FormSubmitEvent) {
    event.preventDefault();
    setStatus('sending');

    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, location, source: location ? `${location} service area` : variant }),
      });

      if (!response.ok) throw new Error('Unable to send inquiry');
      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <form
      className={isQuote ? 'location-quote-form' : 'footer-form'}
      onSubmit={handleSubmit}
    >
      <div className="contact-form-honeypot" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {isQuote ? (
        <>
          <span className="location-form-kicker">Request a quote</span>
          <h2>Tell us about the load.</h2>
          <div className="location-form-grid">
            <label>
              <span>Name</span>
              <input name="name" type="text" autoComplete="name" required />
            </label>
            <label>
              <span>Email</span>
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>
              <span>Company</span>
              <input name="company" type="text" autoComplete="organization" />
            </label>
            <label>
              <span>Phone</span>
              <input name="phone" type="tel" autoComplete="tel" />
            </label>
            <label className="location-form-wide">
              <span>Pickup, destination, and freight details</span>
              <textarea name="message" rows={5} required />
            </label>
          </div>
        </>
      ) : (
        <>
          <span className="footer-form-label">Start a conversation</span>
          <div className="footer-form-grid">
            <label>
              <span>Name</span>
              <input name="name" type="text" autoComplete="name" required />
            </label>
            <label>
              <span>Email</span>
              <input name="email" type="email" autoComplete="email" required />
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
        </>
      )}

      <button
        className={isQuote ? undefined : 'footer-form-submit'}
        type="submit"
        disabled={status === 'sending'}
      >
        {status === 'sending' ? 'Sending…' : 'Send inquiry'} <ArrowRight size={isQuote ? 17 : 18} />
      </button>
      <output className={`contact-form-status is-${status}`} aria-live="polite">
        {status === 'success' && 'Thanks — your inquiry has been sent.'}
        {status === 'error' && 'We could not send that yet. Please email hello@atlanticcold.com.'}
      </output>
    </form>
  );
}
