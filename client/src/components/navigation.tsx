import { useState, useEffect } from 'react';
import { Menu, X, ExternalLink, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "@/components/ui/image";

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
    Tally?: any;
    TallyConfig?: {
      formId: string;
      hideTitle?: boolean;
      autoOpen?: boolean;
    };
    loadTally?: () => void;
  }
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isTallyLoading, setIsTallyLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setActiveSection(getActiveSection());
    };
    window.addEventListener("scroll", handleScroll);

    const handleTallyLoad = () => {
      setIsTallyLoading(false);
    };

    window.addEventListener('tally-loaded', handleTallyLoad);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('tally-loaded', handleTallyLoad);
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
    openTallyForm();
  };

  const openTallyForm = () => {
    // Check if form is already open
    const existingForm = document.getElementById('tally-form-container');
    if (existingForm) {
      setIsTallyLoading(false);
      return;
    }

    const formContainer = document.createElement('div');
    formContainer.id = 'tally-form-container';
    formContainer.style.position = 'fixed';
    formContainer.style.top = '0';
    formContainer.style.right = '0';
    formContainer.style.height = '100vh';
    formContainer.style.width = '600px';
    formContainer.style.maxWidth = '100vw';
    formContainer.style.backgroundColor = 'white';
    formContainer.style.border = '4px solid #000000';
    formContainer.style.boxShadow = '-6px 0 0px 0px #000000';
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
    { href: "https://interspace.samir.xyz/p/101-everything-you-wanted-to-know", label: "LEARN" },
    {
      label: isTallyLoading ? "LOADING..." : "JOIN*",
      onClick: handleJoinClick,
      icon: isTallyLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : undefined
    }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-green-400 neo-border-responsive" style={{fontFamily: 'Alexandria, Inter, sans-serif'}}>
      <div className="container-fluid">
        <div className="flex items-center justify-between w-full min-w-0" style={{ height: 'clamp(4rem, 8vw, 5rem)' }}>
          {/* Logo - Prevent shrinking too much */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, 'hero')}
            className="flex-shrink-0"
          >
            <div className="bg-white neo-border-responsive neo-shadow-responsive flex items-center" 
                 style={{ padding: 'clamp(0.5rem, 1.5vw, 0.75rem)', gap: 'clamp(0.25rem, 1vw, 0.5rem)' }}>
              <Image
                src="/images/2-days-early-calendar-icon-2025.png"
                alt="2 Days Early Calendar Icon"
                className="object-contain"
                style={{ width: 'clamp(1rem, 2.5vw, 1.25rem)', height: 'clamp(1rem, 2.5vw, 1.25rem)' }}
                fallbackSrc="/images/2-days-early-calendar-icon-2025.png"
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

          {/* Desktop Navigation - Fixed overflow issues */}
          <div className="hidden md:flex items-center flex-1 justify-end min-w-0">
            {/* Navigation Links - Scale down on smaller screens */}
            <div className="flex items-center" style={{ gap: 'clamp(0.5rem, 2vw, 2rem)' }}>
              {navItems.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToElement(id);
                  }}
                  className={`transition-all duration-100 whitespace-nowrap lg:border-0 lg:shadow-none lg:bg-transparent ${
                    activeSection === id 
                      ? 'lg:bg-black lg:text-white font-bold lg:px-3 lg:py-1 lg:border-2 lg:border-black' 
                      : 'text-black hover:text-green-800'
                  }`}
                  style={{
                    fontFamily: 'Alexandria, Inter, sans-serif',
                    fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                    padding: activeSection === id ? 'clamp(0.25rem, 1vw, 0.5rem)' : '0'
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
            
            {/* Action Links - Clean styling */}
            <div className="flex items-center ml-4" style={{ gap: 'clamp(0.75rem, 2vw, 1.5rem)' }}>
              {actionButtons.map((button) => (
                button.onClick ? (
                  <button
                    key={button.label}
                    onClick={button.onClick}
                    disabled={isTallyLoading}
                    className="transition-all duration-100 flex items-center whitespace-nowrap text-black hover:text-green-800 font-bold"
                    style={{
                      fontFamily: 'Alexandria, Inter, sans-serif',
                      fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                      gap: 'clamp(0.25rem, 0.5vw, 0.375rem)',
                      background: 'none',
                      border: 'none',
                      padding: '0'
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
                    className="transition-all duration-100 flex items-center whitespace-nowrap text-black hover:text-green-800 font-bold"
                    style={{
                      fontFamily: 'Alexandria, Inter, sans-serif',
                      fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                      gap: 'clamp(0.25rem, 0.5vw, 0.375rem)',
                      textDecoration: 'none'
                    }}
                  >
                    {button.label}
                    <ExternalLink style={{ width: 'clamp(0.75rem, 1.5vw, 1rem)', height: 'clamp(0.75rem, 1.5vw, 1rem)' }} />
                  </a>
                )
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden border-2 border-black bg-white p-2"
            style={{boxShadow: '2px 2px 0px 0px #000000'}}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-2 border-black mt-2 mx-4 mb-4" style={{boxShadow: '4px 4px 0px 0px #000000'}}>
            <div className="px-4 py-6 space-y-4">
              {/* Navigation Links */}
              <div className="space-y-3">
                {navItems.map(({ id, label }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={(e) => handleNavClick(e, id)}
                    className={`block py-2 px-4 text-base text-center border-2 border-black transition-all duration-100 ${
                      activeSection === id 
                        ? 'bg-green-600 text-white font-bold' 
                        : 'bg-white text-black hover:bg-green-100'
                    }`}
                    style={{boxShadow: '2px 2px 0px 0px #000000', fontFamily: 'Alexandria, Inter, sans-serif'}}
                  >
                    {label}
                  </a>
                ))}
              </div>
              
              {/* Divider */}
              <div className="h-0.5 bg-black my-6"></div>
              
              {/* Action Links */}
              <div className="space-y-3">
                {actionButtons.map((button) => (
                  button.onClick ? (
                    <button
                      key={button.label}
                      onClick={button.onClick}
                      disabled={isTallyLoading}
                      className="w-full text-left p-3 font-bold transition-all duration-100 text-black hover:text-green-800 bg-transparent border-none"
                      style={{
                        fontFamily: 'Alexandria, Inter, sans-serif',
                        fontSize: '1rem'
                      }}
                    >
                      <span className="flex items-center gap-2">
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
                      className="w-full text-left p-3 font-bold transition-all duration-100 text-black hover:text-green-800 block"
                      style={{
                        fontFamily: 'Alexandria, Inter, sans-serif',
                        fontSize: '1rem',
                        textDecoration: 'none'
                      }}
                    >
                      <span className="flex items-center justify-between">
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