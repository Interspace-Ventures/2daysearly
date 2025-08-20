import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const navItems = [
    { id: 'purpose', label: 'PURPOSE' },
    { id: 'principles', label: 'PRINCIPLES' },
    { id: 'portfolio', label: 'PORTFOLIO' },
    { id: 'partners', label: 'PARTNERS' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-black">
      <div className="container-fluid">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button 
            onClick={() => scrollTo('hero')}
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
                onClick={() => scrollTo(item.id)}
                className="text-fluid-sm font-medium hover:text-green-600 transition-colors"
                style={{ fontFamily: 'Alexandria, Inter, sans-serif' }}
              >
                {item.label}
              </button>
            ))}
            <a
              href="mailto:pitch@daysearly.com"
              className="px-6 py-2 bg-green-500 text-white font-bold border-3 border-black shadow-neo hover:shadow-neo-hover transition-all"
              style={{ fontFamily: 'Alexandria, Inter, sans-serif' }}
            >
              JOIN
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 border-3 border-black bg-white hover:bg-gray-100 transition-colors"
          >
            {isOpen ? '✕' : '☰'}
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
                onClick={() => scrollTo(item.id)}
                className="block w-full text-left py-3 text-fluid-lg font-medium hover:text-green-600 transition-colors"
                style={{ fontFamily: 'Alexandria, Inter, sans-serif' }}
              >
                {item.label}
              </button>
            ))}
            <a
              href="mailto:pitch@daysearly.com"
              className="block w-full text-center py-3 bg-green-500 text-white font-bold border-3 border-black shadow-neo"
              style={{ fontFamily: 'Alexandria, Inter, sans-serif' }}
            >
              JOIN
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}