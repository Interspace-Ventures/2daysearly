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
    const navHeight = 80; // Updated to match new navigation height
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

  const actionButtons = [
    { href: "mailto:pitch@daysearly.com", label: "PITCH" },
    { href: "https://posts.interspace.ventures/p/101-everything-you-wanted-to-know", label: "LEARN" },
    {
      label: isTallyLoading ? "LOADING..." : "JOIN*",
      onClick: handleJoinClick,
      icon: isTallyLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : undefined
    }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b-2 border-black" style={{fontFamily: 'Alexandria, Inter, sans-serif'}}>
      <div
        className="w-full mx-auto"
        style={{ maxWidth: 'min(1280px, 100%)', paddingLeft: 'clamp(1rem, 4vw, 2rem)', paddingRight: 'clamp(1rem, 4vw, 2rem)' }}
      >
        <div className="flex items-center justify-between w-full min-w-0" style={{ height: 'clamp(4rem, 8vw, 5rem)' }}>
          {/* Logo - Prevent shrinking too much */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, 'hero')}
            className="flex-shrink-0"
          >
            <div className="bg-white border-2 border-black flex items-center" 
                 style={{ padding: 'clamp(0.5rem, 1.5vw, 0.75rem)', gap: 'clamp(0.25rem, 1vw, 0.5rem)', boxShadow: '2px 2px 0px 0px #166534' }}>
              <img
                src="/images/2-days-early-calendar-icon-2025.png"
                alt="2 Days Early Calendar Icon"
                className="object-contain"
                style={{ width: 'clamp(1.25rem, 3vw, 1.5rem)', height: 'clamp(1.25rem, 3vw, 1.5rem)' }}
              />
              <span className="font-bold text-black whitespace-nowrap" 
                    style={{
                      fontFamily: 'Alexandria, Inter, sans-serif',
                      fontSize: 'clamp(0.875rem, 2vw, 1.125rem)'
                    }}>
                2 DAYS EARLY
              </span>
            </div>
          </a>

          {/* Desktop Navigation - Only show when there's enough space */}
          <div className="hidden lg:flex items-center flex-1 justify-end min-w-0">
            {/* Navigation Links - Scale down on smaller screens */}
            <div className="flex items-center" style={{ gap: 'clamp(0.25rem, 1vw, 1rem)' }}>
              {navItems.map(({ id, label, icon }) => (
                <button
                  key={id}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToElement(id);
                  }}
                  className={`relative flex items-center gap-1.5 transition-all duration-300 whitespace-nowrap lg:border-0 lg:shadow-none lg:bg-transparent ${
                    activeSection === id 
                      ? 'text-white font-bold' 
                      : 'text-white hover:text-green-300'
                  }`}
                  style={{
                    fontFamily: 'Alexandria, Inter, sans-serif',
                    fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                    padding: 'clamp(0.25rem, 1vw, 0.5rem)'
                  }}
                >
                  <span className="flex-shrink-0" aria-hidden="true">{icon}</span>
                  {label}
                  {/* Animated underline for active section */}
                  <div 
                    className={`absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300 ease-out ${
                      activeSection === id ? 'w-full' : 'w-0'
                    }`}
                  />
                </button>
              ))}
            </div>
            
            {/* Action Links - Clean styling */}
            <div className="flex items-center ml-2" style={{ gap: 'clamp(0.25rem, 1vw, 0.75rem)' }}>
              {actionButtons.map((button) => (
                button.onClick ? (
                  <button
                    key={button.label}
                    onClick={button.onClick}
                    disabled={isTallyLoading}
                    className="transition-all duration-100 flex items-center whitespace-nowrap text-black hover:text-green-800 font-bold border-2 border-black bg-white hover:bg-gray-100"
                    style={{
                      fontFamily: 'Alexandria, Inter, sans-serif',
                      fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                      gap: 'clamp(0.25rem, 0.5vw, 0.375rem)',
                      padding: 'clamp(0.25rem, 1vw, 0.5rem) clamp(0.5rem, 1.5vw, 0.75rem)',
                      boxShadow: '2px 2px 0px 0px #166534'
                    }}
                  >
                    {button.icon && button.icon}
                    {button.label}
                  </button>
                ) : (
                  <a
                    key={button.label}
                    href={button.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-all duration-100 flex items-center whitespace-nowrap text-black hover:text-green-800 font-bold border-2 border-black bg-white hover:bg-gray-100"
                    style={{
                      fontFamily: 'Alexandria, Inter, sans-serif',
                      fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                      gap: 'clamp(0.25rem, 0.5vw, 0.375rem)',
                      textDecoration: 'none',
                      padding: 'clamp(0.25rem, 1vw, 0.5rem) clamp(0.5rem, 1.5vw, 0.75rem)',
                      boxShadow: '2px 2px 0px 0px #166534'
                    }}
                  >
                    {button.label}
                    <ExternalLink style={{ width: 'clamp(0.75rem, 1.5vw, 1rem)', height: 'clamp(0.75rem, 1.5vw, 1rem)' }} />
                  </a>
                )
              ))}
            </div>
          </div>

          {/* Mobile/Tablet Menu Button - Show when nav links would overlap */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden border-2 border-black bg-white p-2"
            style={{boxShadow: '2px 2px 0px 0px #166534'}}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Sidebar Menu - Shows for mobile and tablet */}
        {isOpen && (
          <div className="lg:hidden bg-green-100 border-2 border-black mt-2 mb-4" style={{boxShadow: '2px 2px 0px 0px #166534'}}>
            <div className="px-4 py-6 space-y-4">
              {/* Navigation Links */}
              <div className="space-y-3">
                {navItems.map(({ id, label, icon }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={(e) => handleNavClick(e, id)}
                    className={`flex items-center justify-center gap-2 py-3 px-4 text-base text-center border-2 border-black transition-all duration-100 ${
                      activeSection === id 
                        ? 'bg-green-600 text-white font-bold' 
                        : 'bg-white text-black hover:bg-gray-100'
                    }`}
                    style={{boxShadow: '1px 1px 0px 0px #166534', fontFamily: 'Alexandria, Inter, sans-serif'}}
                  >
                    <span className="flex-shrink-0" aria-hidden="true">{icon}</span>
                    {label}
                  </a>
                ))}
              </div>
              
              {/* Divider */}
              <div className="h-0.5 bg-black my-6"></div>
              
              {/* Action Cards */}
              <div className="space-y-3">
                {actionButtons.map((button) => (
                  button.onClick ? (
                    <button
                      key={button.label}
                      onClick={button.onClick}
                      disabled={isTallyLoading}
                      className="w-full block py-3 px-4 text-base text-center border-2 border-black transition-all duration-100 bg-white text-black hover:bg-gray-100 font-bold"
                      style={{boxShadow: '1px 1px 0px 0px #166534', fontFamily: 'Alexandria, Inter, sans-serif'}}
                    >
                      <span className="flex items-center justify-center gap-2">
                        {button.icon && button.icon}
                        {button.label}
                      </span>
                    </button>
                  ) : (
                    <a
                      key={button.label}
                      href={button.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full block py-3 px-4 text-base text-center border-2 border-black transition-all duration-100 bg-white text-black hover:bg-gray-100 font-bold"
                      style={{boxShadow: '1px 1px 0px 0px #166534', fontFamily: 'Alexandria, Inter, sans-serif', textDecoration: 'none'}}
                    >
                      <span className="flex items-center justify-center gap-2">
                        {button.label}
                        <ExternalLink className="h-4 w-4" />
                      </span>
                    </a>
                  )
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}