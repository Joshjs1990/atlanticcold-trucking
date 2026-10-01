import { ArrowRight, Mail, Phone } from 'lucide-react';

type ContactOptionsProps = {
  variant?: 'quote' | 'footer' | 'sidebar';
  location?: string;
};

export function ContactOptions({
  variant = 'quote',
  location,
}: ContactOptionsProps) {
  const subject = location ? `Freight inquiry for ${location}` : 'Freight inquiry';
  const emailHref = `mailto:MarkD@atlanticcold.com?subject=${encodeURIComponent(subject)}`;

  return (
    <div className={`contact-options contact-options-${variant}`}>
      <span className="contact-options-kicker">{location ? `Talk with us about ${location}` : 'Start a conversation'}</span>
      <h2>Let’s talk freight.</h2>
      <p>Call our team or email the details of your route, timing, product, and temperature needs.</p>
      <div className="contact-options-actions">
        <a className="contact-option-call" href="tel:+19738378585">
          <Phone size={18} /> <span>Call 973-837-8585</span> <ArrowRight size={16} />
        </a>
        <a className="contact-option-email" href={emailHref}>
          <Mail size={18} /> <span>Email MarkD@atlanticcold.com</span> <ArrowRight size={16} />
        </a>
      </div>
    </div>
  );
}
