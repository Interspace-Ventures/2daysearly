import { useState, useEffect } from 'react';

const Menu = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const X = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ExternalLink = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

function scrollToElement(elementId: string) {
  const element = document.getElementById(elementId);
  if (element) {
    const navHeight = 80;
    const elementPosition = element.offsetTop - navHeight;
    window.scrollTo({ top: elementPosition, behavior: 'smooth' });
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

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => setActiveSection(getActiveSection());
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openTallyForm = () => {
    // Create elements
    const overlay = document.createElement('div');
    const container = document.createElement('div');
    const header = document.createElement('div');
    const iframe = document.createElement('iframe');
    
    // Apply CSS classes
    overlay.className = 'tally-overlay';
    container.className = 'tally-container';
    header.className = 'tally-header';
    
    // Setup header content
    header.innerHTML = `
      <h2 style="margin:0;font-size:1.125rem;font-weight:bold;color:white;font-family:Alexandria,Inter,sans-serif">
        2 DAYS EARLY SYNDICATE ONBOARDING
      </h2>
      <button class="tally-close">×</button>
    `;
    
    // Setup iframe
    iframe.src = 'https://tally.so/embed/nP1v8e?alignLeft=1&transparentBackground=1&hideTitle=1';
    iframe.style.cssText = 'width:100%;height:calc(100% - 5rem);border:none;padding:1.5rem';
    iframe.title = '2 Days Early Syndicate Onboarding';
    
    // Cleanup function
    const cleanup = () => {
      container.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(container);
        document.body.removeChild(overlay);
        document.body.style.overflow = 'auto';
      }, 300);
    };
    
    // Event listeners
    overlay.onclick = cleanup;
    header.querySelector('.tally-close')!.onclick = cleanup;
    
    // Assemble and show
    container.appendChild(header);
    container.appendChild(iframe);
    document.body.appendChild(overlay);
    document.body.appendChild(container);
    document.body.style.overflow = 'hidden';
    
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
      container.style.transform = 'translateX(0)';
    });
  };

  const navItems = [
    { id: 'purpose', label: 'PURPOSE' },
    { id: 'principles', label: 'PRINCIPLES' },
    { id: 'portfolio', label: 'PORTFOLIO' },
    { id: 'partners', label: 'PARTNERS' }
  ];

  const actionButtons = [
    { href: "mailto:pitch@daysearly.com", label: "PITCH", external: true },
    { href: "https://posts.interspace.ventures/p/101-everything-you-wanted-to-know", label: "LEARN", external: true },
    { onClick: openTallyForm, label: "JOIN", primary: true }
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
                  <ExternalLink />
                </a>
              ) : (
                <button
                  key={index}
                  onClick={button.onClick}
                  className={`px-6 py-2 font-bold border-3 border-black shadow-neo hover:shadow-neo-hover transition-all ${
                    button.primary ? 'bg-green-500 text-white' : 'bg-white text-black'
                  }`}
                  style={{ fontFamily: 'Alexandria, Inter, sans-serif' }}
                >
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
            {isOpen ? <X /> : <Menu />}
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
                    <ExternalLink />
                  </a>
                ) : (
                  <button
                    key={index}
                    onClick={() => {
                      button.onClick?.();
                      setIsOpen(false);
                    }}
                    className={`w-full py-3 font-bold border-3 border-black shadow-neo ${
                      button.primary ? 'bg-green-500 text-white' : 'bg-white text-black'
                    }`}
                    style={{ fontFamily: 'Alexandria, Inter, sans-serif' }}
                  >
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