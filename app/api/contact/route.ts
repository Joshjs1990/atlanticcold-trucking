const RESEND_ENDPOINT = 'https://api.resend.com/emails';

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  message?: string;
  location?: string;
  source?: string;
  website?: string;
};

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    };
    return entities[character];
  });
}

function clean(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }

  if (clean(payload.website)) {
    return Response.json({ ok: true });
  }

  const name = clean(payload.name);
  const email = clean(payload.email);
  const company = clean(payload.company);
  const phone = clean(payload.phone);
  const message = clean(payload.message);
  const location = clean(payload.location);
  const source = clean(payload.source) || 'website contact form';

  if (!name || !email || !message || !/^\S+@\S+\.\S+$/.test(email)) {
    return Response.json(
      { error: 'Please provide a name, valid email, and message.' },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.RESEND_TO_EMAIL || 'hello@atlanticcold.com';
  const sender = process.env.RESEND_FROM_EMAIL || 'AtlanticCold website <onboarding@resend.dev>';

  if (!apiKey) {
    return Response.json({ error: 'Email delivery is not configured.' }, { status: 503 });
  }

  const subject = `New ${source} inquiry from ${name}`;
  const detailRows = [
    ['Name', name],
    ['Email', email],
    ['Company', company || 'Not provided'],
    ['Phone', phone || 'Not provided'],
    ['Location', location || 'Not specified'],
  ];
  const html = `<h2>${escapeHtml(subject)}</h2>${detailRows
    .map(([label, value]) => `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`)
    .join('')}<h3>Message</h3><p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>`;
  const text = `${subject}\n\n${detailRows.map(([label, value]) => `${label}: ${value}`).join('\n')}\n\nMessage:\n${message}`;

  let response: Response;

  try {
    response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: email,
        subject,
        html,
        text,
      }),
    });
  } catch {
    return Response.json({ error: 'Email provider is unavailable.' }, { status: 502 });
  }

  if (!response.ok) {
    return Response.json({ error: 'Email provider rejected the message.' }, { status: 502 });
  }

  return Response.json({ ok: true });
}
