import { useState, useEffect } from 'react';
import { Menu, X, ExternalLink, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "@/components/ui/image";

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
    Tally?: any;
    TallyConfig?: {
      formId: string;
    };
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

    if (!window.Tally) {
      toast({
        variant: "destructive",
        title: "Error loading form",
        description: "Please refresh the page and try again.",
      });
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-green-400 border-b-2 border-black" style={{fontFamily: 'Courier New, monospace'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, 'hero')}
            className="flex-shrink-0"
          >
            <div className="bg-white px-4 py-2 border-2 border-black" style={{boxShadow: '4px 4px 0px 0px #000000', fontFamily: 'Courier New, monospace'}}>
              <span className="text-xl font-bold text-black">
                2 DAYS EARLY
              </span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              {navItems.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => handleNavClick(e, id)}
                  className={`border-2 border-black px-4 py-2 font-bold text-sm transition-all duration-100 ${
                    activeSection === id 
                      ? 'bg-green-500 text-white' 
                      : 'bg-white text-black hover:transform hover:translate-x-1 hover:translate-y-1'
                  }`}
                  style={activeSection === id ? {boxShadow: '4px 4px 0px 0px #000000', fontFamily: 'Courier New, monospace'} : {fontFamily: 'Courier New, monospace'}}
                >
                  {label}
                </a>
              ))}
            </div>

            <div className="w-px h-8 bg-black mx-4"></div>

            <div className="flex items-center gap-2">
              {actionButtons.map((button) => (
                <button
                  key={button.label}
                  onClick={button.onClick || (button.href ? () => window.open(button.href, '_blank') : undefined)}
                  className={`border-2 border-black px-6 py-3 font-bold text-lg transition-all duration-100 ${
                    button.primary
                      ? 'bg-green-500 text-white'
                      : 'bg-green-600 text-white'
                  }`}
                  style={{boxShadow: '4px 4px 0px 0px #000000', fontFamily: 'Courier New, monospace'}}
                >
                  {button.label} 
                  {button.href && <ExternalLink className="h-4 w-4 ml-1" />}
                  {button.icon && <span className="ml-1">{button.icon}</span>}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden border-2 border-black bg-white p-2"
            style={{boxShadow: '4px 4px 0px 0px #000000'}}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-white neo-border neo-shadow mt-2 mb-4">
            <div className="px-4 pt-4 pb-6 space-y-4">
              {navItems.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => handleNavClick(e, id)}
                  className={`block neo-border px-4 py-3 font-bold text-center transition-all duration-100 ${
                    activeSection === id 
                      ? 'bg-primary text-white neo-shadow' 
                      : 'bg-white text-black hover:neo-shadow'
                  }`}
                >
                  {label}
                </a>
              ))}
              
              <div className="h-px bg-black my-4"></div>
              
              {actionButtons.map((button) => (
                <button
                  key={button.label}
                  onClick={button.onClick || (button.href ? () => window.open(button.href, '_blank') : undefined)}
                  className={`w-full neo-button ${
                    button.primary
                      ? 'bg-primary text-white'
                      : 'bg-secondary text-black'
                  }`}
                >
                  {button.label} 
                  {button.href && <ExternalLink className="h-4 w-4 ml-1" />}
                  {button.icon && <span className="ml-1">{button.icon}</span>}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}