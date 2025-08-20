import { useState, useEffect } from 'react';

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
    const navHeight = 80;
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenTallyForm = () => {
    setIsTallyLoading(true);
    
    const formContainer = document.createElement('div');
    formContainer.style.position = 'fixed';
    formContainer.style.top = '0';
    formContainer.style.right = '0';
    formContainer.style.width = '90%';
    formContainer.style.maxWidth = '600px';
    formContainer.style.height = '100%';
    formContainer.style.maxHeight = '100vh';
    formContainer.style.maxWidth = '100vw';
    formContainer.style.backgroundColor = 'white';
    formContainer.style.border = '4px solid #000000';
    formContainer.style.boxShadow = '-4px 0 0px 0px #000000';
    formContainer.style.zIndex = '9999';
    formContainer.style.transform = 'translateX(100%)';
    formContainer.style.transition = 'transform 0.3s ease-in-out';

    const titleContainer = document.createElement('div');
    titleContainer.style.padding = '1.5rem';
    titleContainer.style.borderBottom = '4px solid #000000';
    titleContainer.style.display = 'flex';
    titleContainer.style.justifyContent = 'space-between';
    titleContainer.style.alignItems = 'center';
    titleContainer.style.backgroundColor = '#10b981';

    const title = document.createElement('h2');
    title.textContent = '2 DAYS EARLY SYNDICATE ONBOARDING';
    title.style.margin = '0';
    title.style.fontSize = '1.125rem';
    title.style.fontWeight = 'bold';
    title.style.color = 'white';
    title.style.fontFamily = 'Alexandria, Inter, sans-serif';

    const closeButton = document.createElement('button');
    closeButton.innerHTML = '×';
    closeButton.style.fontSize = '20px';
    closeButton.style.border = '3px solid #000000';
    closeButton.style.background = 'white';
    closeButton.style.cursor = 'pointer';
    closeButton.style.padding = '0.5rem 0.75rem';
    closeButton.style.lineHeight = '1';
    closeButton.style.color = 'black';
    closeButton.style.fontWeight = 'bold';
    closeButton.style.fontFamily = 'Alexandria, Inter, sans-serif';
    closeButton.style.boxShadow = '3px 3px 0px 0px #000000';
    closeButton.style.transition = 'all 0.1s ease';

    const cleanup = () => {
      if (document.body.contains(formContainer)) {
        formContainer.style.transform = 'translateX(100%)';
        setTimeout(() => {
          document.body.removeChild(formContainer);
          document.body.removeChild(overlay);
          document.body.style.overflow = 'auto';
        }, 300);
      }
    };

    closeButton.onclick = cleanup;

    const iframe = document.createElement('iframe');
    iframe.src = 'https://tally.so/embed/nP1v8e?alignLeft=1&transparentBackground=1&hideTitle=1';
    iframe.style.width = '100%';
    iframe.style.height = 'calc(100% - 5rem)';
    iframe.style.border = 'none';
    iframe.style.padding = '1.5rem';
    iframe.title = "2 Days Early Syndicate Onboarding";

    iframe.onload = () => {
      setIsTallyLoading(false);
    };

    titleContainer.appendChild(title);
    titleContainer.appendChild(closeButton);
    formContainer.appendChild(titleContainer);
    formContainer.appendChild(iframe);

    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.zIndex = '9998';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.3s ease-in-out';
    overlay.onclick = cleanup;

    document.body.appendChild(overlay);
    document.body.appendChild(formContainer);
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
      formContainer.style.transform = 'translateX(0)';
    });
  };

  const navItems = [
    { id: 'purpose', label: 'PURPOSE' },
    { id: 'principles', label: 'PRINCIPLES' },
    { id: 'portfolio', label: 'PORTFOLIO' },
    { id: 'partners', label: 'PARTNERS' }
  ];

  const actionButtons = [
    { href: "mailto:pitch@daysearly.com", label: "PITCH" },
    { href: "https://posts.interspace.ventures/p/101-everything-you-wanted-to-know", label: "LEARN" },
    { onClick: handleOpenTallyForm, label: "JOIN", loading: isTallyLoading }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-black">
      <div className="container-fluid">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button 
            onClick={() => scrollToElement('hero')}
            className="text-fluid-xl font-bold tracking-tight hover:opacity-80 transition-opacity"
            style={{ fontFamily: 'Alexandria, Inter, sans-serif' }}
          >
            2 DAYS EARLY
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToElement(item.id)}
                className={`text-fluid-sm font-medium transition-colors ${
                  activeSection === item.id 
                    ? 'text-green-600 font-bold' 
                    : 'text-black hover:text-green-600'
                }`}
                style={{ fontFamily: 'Alexandria, Inter, sans-serif' }}
              >
                {item.label}
              </button>
            ))}
            
            {actionButtons.map((button, index) => (
              button.href ? (
                <a
                  key={index}
                  href={button.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black font-bold border-3 border-black shadow-neo hover:shadow-neo-hover transition-all"
                  style={{ fontFamily: 'Alexandria, Inter, sans-serif' }}
                >
                  {button.label}
                  <ExternalLink style={{ width: '16px', height: '16px' }} />
                </a>
              ) : (
                <button
                  key={index}
                  onClick={button.onClick}
                  disabled={button.loading}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-green-500 text-white font-bold border-3 border-black shadow-neo hover:shadow-neo-hover transition-all disabled:opacity-50"
                  style={{ fontFamily: 'Alexandria, Inter, sans-serif' }}
                >
                  {button.loading && <Loader2 className="animate-spin" />}
                  {button.label}
                </button>
              )
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 border-3 border-black bg-white hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-white border-r-4 border-black z-40">
          <div className="p-6 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  scrollToElement(item.id);
                  setIsOpen(false);
                }}
                className={`block w-full text-left py-3 text-fluid-lg font-medium transition-colors ${
                  activeSection === item.id 
                    ? 'text-green-600 font-bold' 
                    : 'text-black hover:text-green-600'
                }`}
                style={{ fontFamily: 'Alexandria, Inter, sans-serif' }}
              >
                {item.label}
              </button>
            ))}
            
            <div className="pt-4 space-y-3">
              {actionButtons.map((button, index) => (
                button.href ? (
                  <a
                    key={index}
                    href={button.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-white text-black font-bold border-3 border-black shadow-neo"
                    style={{ fontFamily: 'Alexandria, Inter, sans-serif' }}
                  >
                    {button.label}
                    <ExternalLink style={{ width: '16px', height: '16px' }} />
                  </a>
                ) : (
                  <button
                    key={index}
                    onClick={() => {
                      button.onClick?.();
                      setIsOpen(false);
                    }}
                    disabled={button.loading}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 text-white font-bold border-3 border-black shadow-neo disabled:opacity-50"
                    style={{ fontFamily: 'Alexandria, Inter, sans-serif' }}
                  >
                    {button.loading && <Loader2 className="animate-spin" />}
                    {button.label}
                  </button>
                )
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}