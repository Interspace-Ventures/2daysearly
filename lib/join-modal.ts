'use client';

// Lightweight, event-based opener so any button on the page can launch the
// native join form without prop-drilling. Mirrors the old openTallyForm() API.
export const JOIN_FORM_EVENT = 'open-join-form';

export function openJoinForm() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(JOIN_FORM_EVENT));
  }
}
