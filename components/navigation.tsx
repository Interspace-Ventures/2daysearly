import { useState, useEffect } from 'react';
import { openTallyForm } from '@/lib/tally';
import { PurposeIcon, PrinciplesIcon, PortfolioIcon, PartnersIcon } from '@/components/ui/section-icons';
// Simple inline SVG icons
const Menu = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const X = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ExternalLink = ({ style, className }: { style?: React.CSSProperties; className?: string }) => (
  <svg style={style} className={className} width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const Loader2 = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

function scrollToElement(elementId: string) {
  const element = document.getElementById(elementId);
  if (element) {
    const navHeight = 96; // Clears the floating SL-style bar + its offset shadow
    const elementPosition = element.offsetTop - navHeight;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
}

function getActiveSection(): string {
  const sections = ['hero', 'purpose', 'principles', 'portfolio', 'partners'];
  const scrollPosition = window.scrollY + 100;
  
  for (let i = sections.length - 1; i >= 0; i--) {
    const element = document.getElementById(sections[i]);
    if (element && element.offsetTop <= scrollPosition) {
      return sections[i];
    }
  }
  
  return 'hero';
}

declare global {
  interface Window {
    Tally?: {
      openPopup: (formId: string, options?: { 
        width?: number; 
        alignLeft?: boolean; 
        hideTitle?: boolean; 
        emoji?: { text: string; animation: string; }; 
      }) => void;
    };
    TallyConfig?: {
      hideTitle?: boolean;
      formId?: string;
    };
    loadTally?: () => void;
  }
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isTallyLoading, setIsTallyLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setActiveSection(getActiveSection());
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    scrollToElement(sectionId);
    setIsOpen(false);
  };

  const handleJoinClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsTallyLoading(true);
    openTallyForm(() => setIsTallyLoading(false));
  };

  const navItems = [
    { id: 'purpose', label: 'PURPOSE', icon: <PurposeIcon className="h-4 w-4" /> },
    { id: 'principles', label: 'PRINCIPLES', icon: <PrinciplesIcon className="h-4 w-4" /> },
    { id: 'portfolio', label: 'PORTFOLIO', icon: <PortfolioIcon className="h-4 w-4" /> },
    { id: 'partners', label: 'PARTNERS', icon: <PartnersIcon className="h-4 w-4" /> }
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        fontFamily: 'var(--font-display), var(--font-outfit), sans-serif',
        padding: 'clamp(0.5rem, 1.6vw, 0.9rem) clamp(0.75rem, 4vw, 2rem) 0'
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 'min(1200px, 100%)' }}>
        {/* Floating SL-style glass bar */}
        <div
          className="sl-nav-glass flex items-center justify-between w-full min-w-0"
          style={{
            height: 'clamp(3.25rem, 6vw, 4rem)',
            paddingLeft: 'clamp(0.6rem, 1.5vw, 0.9rem)',
            paddingRight: 'clamp(0.6rem, 1.5vw, 0.9rem)'
          }}
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, 'hero')}
            className="flex-shrink-0"
          >
            <div
              className="flex items-center"
              style={{
                padding: 'clamp(0.35rem, 1vw, 0.5rem)',
                gap: 'clamp(0.3rem, 1vw, 0.5rem)',
                background: 'var(--carbon-card)',
                border: '1px solid var(--carbon-border)',
                boxShadow: '3px 3px 0px 0px var(--carbon-shadow)'
              }}
            >
              <img
                src="/images/2-days-early-calendar-icon-2025.png"
                alt="2 Days Early Calendar Icon"
                className="object-contain"
                style={{ width: 'clamp(1.1rem, 2.6vw, 1.4rem)', height: 'clamp(1.1rem, 2.6vw, 1.4rem)' }}
              />
              <span
                className="sl-display font-bold whitespace-nowrap"
                style={{
                  color: 'var(--carbon-text)',
                  fontSize: 'clamp(0.8rem, 1.9vw, 1.05rem)'
                }}
              >
                2 DAYS EARLY
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center flex-1 justify-end min-w-0">
            {/* Text links */}
            <div className="flex items-center" style={{ gap: 'clamp(0.5rem, 1.6vw, 1.4rem)' }}>
              {navItems.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToElement(id);
                  }}
                  data-active={activeSection === id}
                  className="sl-nav-link sl-label relative whitespace-nowrap"
                  style={{
                    fontSize: 'clamp(0.66rem, 1.25vw, 0.78rem)',
                    padding: '0.4rem 0.1rem'
                  }}
                >
                  {label}
                  {/* Animated mint underline for active section */}
                  <span
                    className="absolute left-0 -bottom-0.5 h-0.5 transition-all duration-300 ease-out"
                    style={{
                      width: activeSection === id ? '100%' : '0',
                      background: 'var(--mint)'
                    }}
                  />
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center" style={{ gap: 'clamp(0.4rem, 1vw, 0.65rem)', marginLeft: 'clamp(0.75rem, 2.2vw, 1.6rem)' }}>
              <a
                href="mailto:pitch@daysearly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="sl-nav-ghost sl-label flex items-center whitespace-nowrap"
                style={{
                  fontSize: 'clamp(0.66rem, 1.25vw, 0.78rem)',
                  gap: 'clamp(0.25rem, 0.5vw, 0.4rem)',
                  textDecoration: 'none',
                  padding: 'clamp(0.4rem, 0.9vw, 0.55rem) clamp(0.6rem, 1.4vw, 0.9rem)'
                }}
              >
                PITCH
                <ExternalLink style={{ width: 'clamp(0.7rem, 1.4vw, 0.9rem)', height: 'clamp(0.7rem, 1.4vw, 0.9rem)' }} />
              </a>
              <button
                onClick={handleJoinClick}
                disabled={isTallyLoading}
                className="sl-nav-cta sl-label flex items-center whitespace-nowrap"
                style={{
                  fontSize: 'clamp(0.66rem, 1.25vw, 0.78rem)',
                  gap: 'clamp(0.25rem, 0.5vw, 0.4rem)',
                  padding: 'clamp(0.4rem, 0.9vw, 0.55rem) clamp(0.7rem, 1.6vw, 1rem)'
                }}
              >
                {isTallyLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                {isTallyLoading ? 'LOADING...' : 'JOIN*'}
              </button>
            </div>
          </div>

          {/* Mobile/Tablet Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            className="sl-nav-toggle lg:hidden flex items-center justify-center"
            style={{
              padding: '0.5rem',
              background: 'var(--carbon-card)',
              border: '1px solid var(--carbon-border)',
              boxShadow: '3px 3px 0px 0px var(--carbon-shadow)',
              color: 'var(--carbon-text)'
            }}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile/Tablet dropdown */}
        {isOpen && (
          <div
            className="lg:hidden mt-2"
            style={{
              background: 'var(--carbon-surface)',
              border: '1px solid var(--carbon-border)',
              boxShadow: '4px 4px 0px 0px var(--carbon-shadow)'
            }}
          >
            <div className="px-4 py-5 space-y-3">
              {/* Navigation Links */}
              <div className="space-y-2.5">
                {navItems.map(({ id, label, icon }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={(e) => handleNavClick(e, id)}
                    data-active={activeSection === id}
                    className="sl-mnav-link sl-label flex items-center justify-center gap-2 py-3 px-4 text-base text-center"
                    style={{ textDecoration: 'none' }}
                  >
                    <span className="flex-shrink-0" aria-hidden="true">{icon}</span>
                    {label}
                  </a>
                ))}
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: 'var(--carbon-border)', margin: '1.25rem 0' }} />

              {/* Action Cards */}
              <div className="space-y-2.5">
                <a
                  href="mailto:pitch@daysearly.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sl-nav-ghost sl-label w-full block py-3 px-4 text-base text-center"
                  style={{ textDecoration: 'none' }}
                >
                  <span className="flex items-center justify-center gap-2">
                    PITCH
                    <ExternalLink className="h-4 w-4" />
                  </span>
                </a>
                <button
                  onClick={handleJoinClick}
                  disabled={isTallyLoading}
                  className="sl-nav-cta sl-label w-full block py-3 px-4 text-base text-center"
                >
                  <span className="flex items-center justify-center gap-2">
                    {isTallyLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                    {isTallyLoading ? 'LOADING...' : 'JOIN*'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}