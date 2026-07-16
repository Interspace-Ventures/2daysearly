// Tremendous payout client.
//
// Credentials come from a standard TREMENDOUS_API_KEY secret. The environment defaults to
// **sandbox** so no real money moves during testing — set
// `TREMENDOUS_ENV=production` to go live.
//
// Recipient choice (Venmo / PayPal / prepaid Visa / bank) is driven by a
// Tremendous *campaign*: set `TREMENDOUS_CAMPAIGN_ID` to a campaign that offers
// those payout options. The funding source is auto-detected (account balance)
// unless `TREMENDOUS_FUNDING_SOURCE_ID` is set.

const SANDBOX_BASE = 'https://testflight.tremendous.com/api/v2';
const PROD_BASE = 'https://api.tremendous.com/api/v2';

type TremendousCreds = { apiKey: string; baseUrl: string };

export function tremendousIsProduction(): boolean {
  return process.env.TREMENDOUS_ENV === 'production';
}

function tremendousBaseUrl(): string {
  return tremendousIsProduction() ? PROD_BASE : SANDBOX_BASE;
}

async function getCreds(): Promise<TremendousCreds | null> {
  const apiKey = process.env.TREMENDOUS_API_KEY || null;
  if (!apiKey) return null;
  return { apiKey, baseUrl: tremendousBaseUrl() };
}

export async function isTremendousConfigured(): Promise<boolean> {
  return Boolean(await getCreds());
}

function authHeaders(creds: TremendousCreds): Record<string, string> {
  return {
    Authorization: `Bearer ${creds.apiKey}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
}

async function getDefaultFundingSourceId(
  creds: TremendousCreds,
): Promise<string | null> {
  if (process.env.TREMENDOUS_FUNDING_SOURCE_ID) {
    return process.env.TREMENDOUS_FUNDING_SOURCE_ID;
  }
  try {
    const res = await fetch(`${creds.baseUrl}/funding_sources`, {
      headers: authHeaders(creds),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const list: any[] = data.funding_sources || [];
    const balance = list.find((f) => f.method === 'balance') || list[0];
    return balance?.id || null;
  } catch {
    return null;
  }
}

export type PayoutResult = {
  ok: boolean;
  orderId?: string;
  error?: string;
};

// Create a single reward order. `externalId` makes the call idempotent on
// Tremendous's side, so a retry won't double-pay.
export async function sendReferralPayout(opts: {
  email: string;
  name: string;
  amountCents: number;
  externalId: string;
}): Promise<PayoutResult> {
  const creds = await getCreds();
  if (!creds) {
    return { ok: false, error: 'Tremendous is not configured.' };
  }

  const fundingSourceId = await getDefaultFundingSourceId(creds);
  if (!fundingSourceId) {
    return { ok: false, error: 'No Tremendous funding source available.' };
  }

  const reward: Record<string, any> = {
    value: {
      denomination: opts.amountCents / 100,
      currency_code: 'USD',
    },
    recipient: { name: opts.name, email: opts.email },
    delivery: { method: 'EMAIL' },
  };
  const campaignId = process.env.TREMENDOUS_CAMPAIGN_ID;
  if (campaignId) reward.campaign_id = campaignId;

  const body = {
    external_id: opts.externalId,
    payment: { funding_source_id: fundingSourceId },
    rewards: [reward],
  };

  try {
    const res = await fetch(`${creds.baseUrl}/orders`, {
      method: 'POST',
      headers: authHeaders(creds),
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const message =
        data?.errors?.message ||
        data?.error ||
        `Tremendous returned ${res.status}`;
      return { ok: false, error: String(message) };
    }
    const orderId = data?.order?.id || data?.order?.external_id;
    return { ok: true, orderId };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Payout request failed.',
    };
  }
}
