'use client';

import { useEffect } from 'react';
import { captureRefFromUrl } from '@/lib/referral-client';

// Invisible mount: captures `?ref=CODE` on first load and persists it so the
// join form can attribute the application to the referrer.
export default function ReferralCapture() {
  useEffect(() => {
    captureRefFromUrl();
  }, []);
  return null;
}
