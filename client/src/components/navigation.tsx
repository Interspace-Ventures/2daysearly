import { useState, useEffect } from 'react';
import { Menu, X, ExternalLink, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "@/components/ui/image";

function scrollToElement(elementId: string) {
  const element = document.getElementById(elementId);
  if (element) {
    const navHeight = 64; // Updated to match new navigation height
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

    // Load Tally script if not already loaded
    if (!window.Tally) {
      if (typeof window.loadTally === 'function') {
        window.loadTally();
        // Wait for Tally to load
        const checkTally = setInterval(() => {
          if (window.Tally) {
            clearInterval(checkTally);
            openTallyForm();
          }
        }, 100);
        // Timeout after 5 seconds
        setTimeout(() => {
          clearInterval(checkTally);
          if (!window.Tally) {
            toast({
              variant: "destructive",
              title: "Error loading form",
              description: "Please refresh the page and try again.",
            });
            setIsTallyLoading(false);
          }
        }, 5000);
        return;
      } else {
        toast({
          variant: "destructive",
          title: "Error loading form",
          description: "Please refresh the page and try again.",
        });
        setIsTallyLoading(false);
        return;
      }
    }
    
    openTallyForm();
  };

  const openTallyForm = () => {

    const formContainer = document.createElement('div');
    formContainer.id = 'tally-form-container';
    formContainer.style.position = 'fixed';
    formContainer.style.top = '0';
    formContainer.style.right = '0';
    formContainer.style.height = '100vh';
    formContainer.style.width = '600px';
    formContainer.style.maxWidth = '100vw';
    formContainer.style.backgroundColor = 'white';
    formContainer.style.border = '3px solid #000000';
    formContainer.style.boxShadow = '-8px 0 0px 0px #000000';
    formContainer.style.zIndex = '9999';
    formContainer.style.transform = 'translateX(100%)';
    formContainer.style.transition = 'transform 0.3s ease-in-out';

    const titleContainer = document.createElement('div');
    titleContainer.style.padding = '1.5rem';
    titleContainer.style.borderBottom = '3px solid #000000';
    titleContainer.style.display = 'flex';
    titleContainer.style.justifyContent = 'space-between';
    titleContainer.style.alignItems = 'center';
    titleContainer.style.backgroundColor = '#ef4444';

    const title = document.createElement('h2');
    title.textContent = '2 DAYS EARLY SYNDICATE ONBOARDING';
    title.style.margin = '0';
    title.style.fontSize = '1.25rem';
    title.style.fontWeight = 'bold';
    title.style.color = 'white';
    title.style.fontFamily = 'Courier New, monospace';

    const closeButton = document.createElement('button');
    closeButton.innerHTML = '×';
    closeButton.style.fontSize = '24px';
    closeButton.style.border = '2px solid #000000';
    closeButton.style.background = 'white';
    closeButton.style.cursor = 'pointer';
    closeButton.style.padding = '0.5rem';
    closeButton.style.lineHeight = '1';
    closeButton.style.color = 'black';
    closeButton.style.fontWeight = 'bold';
    closeButton.style.boxShadow = '2px 2px 0px 0px #000000';

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
    iframe.src = `https://tally.so/embed/${window.TallyConfig?.formId || 'nP1v8e'}?alignLeft=1&transparentBackground=1&hideTitle=1`;
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
    { href: "https://interspace.samir.xyz/p/101-everything-you-wanted-to-know", label: "LEARN", primary: false },
    {
      label: isTallyLoading ? "LOADING..." : "JOIN*",
      primary: false,
      onClick: handleJoinClick,
      icon: isTallyLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : undefined
    },
    { href: "mailto:pitch@daysearly.com", label: "PITCH", primary: true }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-green-400 border-b-2 border-black" style={{fontFamily: 'Alexandria, Inter, sans-serif'}}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, 'hero')}
            className="flex-shrink-0"
          >
            <div className="bg-white px-4 py-2 border-2 border-black flex items-center gap-2" style={{boxShadow: '2px 2px 0px 0px #000000'}}>
              <Image
                src="/images/2-days-early-calendar-icon-2025.png"
                alt="2 Days Early Calendar Icon"
                className="w-6 h-6 object-contain"
                fallbackSrc="/images/2-days-early-calendar-icon-2025.png"
              />
              <span className="text-lg font-bold text-black" style={{fontFamily: 'Alexandria, Inter, sans-serif'}}>
                2 DAYS EARLY
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => handleNavClick(e, id)}
                className={`px-2 py-1 font-bold text-sm transition-all duration-100 ${
                  activeSection === id 
                    ? 'text-green-800 underline underline-offset-4' 
                    : 'text-black hover:text-green-800'
                }`}
                style={{fontFamily: 'Alexandria, Inter, sans-serif'}}
              >
                {label}
              </a>
            ))}
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2 ml-4">
              {actionButtons.map((button) => (
                <button
                  key={button.label}
                  onClick={button.onClick || (button.href ? () => window.open(button.href, '_blank') : undefined)}
                  disabled={isTallyLoading && !!button.onClick}
                  className={`border-2 border-black px-4 py-2 font-bold text-sm transition-all duration-100 flex items-center gap-1 ${
                    button.primary
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-white text-black hover:bg-gray-100'
                  }`}
                  style={{boxShadow: '2px 2px 0px 0px #000000', fontFamily: 'Alexandria, Inter, sans-serif'}}
                >
                  {button.icon && button.icon}
                  {button.label}
                  {button.href && <ExternalLink className="h-3 w-3" />}
                </button>
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
                    className={`block py-2 px-4 font-bold text-base text-center border-2 border-black transition-all duration-100 ${
                      activeSection === id 
                        ? 'bg-green-600 text-white' 
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
              
              {/* Action Buttons */}
              <div className="space-y-3">
                {actionButtons.map((button) => (
                  <button
                    key={button.label}
                    onClick={button.onClick || (button.href ? () => window.open(button.href, '_blank') : undefined)}
                    disabled={isTallyLoading && !!button.onClick}
                    className={`w-full border-2 border-black px-4 py-2 font-bold text-base flex items-center justify-center gap-2 transition-all duration-100 ${
                      button.primary
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-white text-black hover:bg-gray-100'
                    }`}
                    style={{boxShadow: '2px 2px 0px 0px #000000', fontFamily: 'Alexandria, Inter, sans-serif'}}
                  >
                    {button.icon && button.icon}
                    {button.label}
                    {button.href && <ExternalLink className="h-4 w-4" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}