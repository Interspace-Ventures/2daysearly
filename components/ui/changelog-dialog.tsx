'use client';

import { useEffect, useRef, useState } from 'react';
import { theme } from '@/lib/theme';
import { APP_VERSION, CHANGELOG } from '@/lib/changelog';

export default function ChangelogDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Move focus into the dialog once it's open.
    closeButtonRef.current?.focus();

    const getFocusable = () =>
      Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) ?? []
      ).filter((el) => !el.hasAttribute('disabled'));

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        return;
      }

      if (e.key === 'Tab') {
        const focusable = getFocusable();
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;

        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      // Return focus to the element that opened the dialog.
      (previouslyFocused ?? triggerRef.current)?.focus();
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        className="text-fluid-sm text-white transition-colors underline hover:text-[#1dc677]"
        style={{ fontFamily: theme.fonts.primary, fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}
        aria-haspopup="dialog"
        aria-label={`View changelog, current version ${APP_VERSION}`}
      >
        v{APP_VERSION}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-end justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setIsOpen(false)}
        >
          <div
            ref={dialogRef}
            className="changelog-drawer w-full max-w-lg max-h-[80vh] flex flex-col border-4 border-b-0"
            style={{ background: 'var(--carbon-surface)', borderColor: 'var(--carbon-border)', boxShadow: '0px -8px 0px 0px var(--carbon-shadow)' }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="changelog-title"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between border-b-4 px-5 py-4"
              style={{ backgroundColor: 'var(--mint)', borderColor: 'var(--carbon-border)' }}
            >
              <h2
                id="changelog-title"
                className="text-lg font-bold"
                style={{ color: 'var(--mint-ink)', fontFamily: theme.fonts.primary }}
              >
                CHANGELOG
              </h2>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setIsOpen(false)}
                className="border-2 px-3 py-1 text-lg font-bold leading-none"
                style={{ background: 'var(--carbon-card)', color: 'var(--carbon-text)', borderColor: 'var(--carbon-border)', boxShadow: '2px 2px 0px 0px var(--carbon-shadow)', fontFamily: theme.fonts.primary }}
                aria-label="Close changelog"
              >
                ×
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto px-5 py-5 space-y-6">
              {CHANGELOG.map((entry) => (
                <div key={entry.version}>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="sl-pill px-2 py-0.5 text-sm"
                      style={{ fontFamily: theme.fonts.primary }}
                    >
                      v{entry.version}
                    </span>
                    <span className="text-sm" style={{ color: 'var(--carbon-muted)', fontFamily: theme.fonts.secondary }}>
                      {entry.date}
                    </span>
                  </div>
                  <ul className="list-disc pl-5 space-y-1">
                    {entry.changes.map((change, i) => (
                      <li
                        key={i}
                        className="text-sm leading-relaxed"
                        style={{ color: 'var(--carbon-text)', fontFamily: theme.fonts.secondary }}
                      >
                        {change}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
