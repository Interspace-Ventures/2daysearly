import type { Submission } from '@db/schema';

// Resolve the Resend API key. Prefers the Replit "Resend" connector
// (managed credentials), falling back to a RESEND_API_KEY secret.
async function getResendApiKey(): Promise<string | null> {
  if (process.env.RESEND_API_KEY) return process.env.RESEND_API_KEY;

  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? 'repl ' + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
      ? 'depl ' + process.env.WEB_REPL_RENEWAL
      : null;

  if (!hostname || !xReplitToken) return null;

  try {
    const res = await fetch(
      `https://${hostname}/api/v2/connection?include_secrets=true&connector_names=resend`,
      { headers: { Accept: 'application/json', X_REPLIT_TOKEN: xReplitToken } },
    );
    const data = await res.json();
    const settings = data?.items?.[0]?.settings ?? {};
    return settings.api_key || settings.apiKey || settings.access_token || null;
  } catch (err) {
    console.error('Resend credential lookup failed:', err);
    return null;
  }
}

export function isEmailConfigured(): boolean {
  return Boolean(
    process.env.SLACK_INVITE_URL &&
      process.env.RESEND_FROM &&
      (process.env.RESEND_API_KEY || process.env.REPLIT_CONNECTORS_HOSTNAME),
  );
}

function inviteEmailHtml(s: Submission, inviteUrl: string): string {
  return `
  <div style="font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; max-width: 520px; margin: 0 auto; color: #0c0c0c;">
    <h2 style="margin: 0 0 16px;">You're in, ${s.firstName} 🎉</h2>
    <p style="font-size: 15px; line-height: 1.6;">
      Your application to the <strong>2 Days Early</strong> syndicate has been approved.
      Join our Slack community using the link below:
    </p>
    <p style="margin: 24px 0;">
      <a href="${inviteUrl}"
         style="background: #1dc677; color: #04210f; text-decoration: none; font-weight: 700;
                padding: 12px 22px; border: 2px solid #0c0c0c; display: inline-block;">
        Join the Slack
      </a>
    </p>
    <p style="font-size: 13px; color: #555; line-height: 1.6;">
      If the button doesn't work, paste this URL into your browser:<br />
      <a href="${inviteUrl}" style="color: #1dc677;">${inviteUrl}</a>
    </p>
    <p style="font-size: 13px; color: #555;">— The 2 Days Early team</p>
  </div>`;
}

// Sends the Slack invite link to an approved applicant. Returns true on success.
export async function sendInviteEmail(s: Submission): Promise<boolean> {
  const inviteUrl = process.env.SLACK_INVITE_URL;
  const from = process.env.RESEND_FROM;
  if (!inviteUrl || !from) {
    console.warn('Invite email skipped: SLACK_INVITE_URL or RESEND_FROM not set');
    return false;
  }

  const apiKey = await getResendApiKey();
  if (!apiKey) {
    console.warn('Invite email skipped: no Resend API key available');
    return false;
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [s.email],
      subject: "You're approved — join the 2 Days Early Slack",
      html: inviteEmailHtml(s, inviteUrl),
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    console.error('Resend send failed:', res.status, detail);
    return false;
  }
  return true;
}
