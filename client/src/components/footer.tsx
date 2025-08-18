import { theme } from '../lib/theme';

export default function Footer() {
  return (
    <footer className="bg-black" style={{ padding: 'clamp(2rem, 5vw, 3rem) 0' }}>
      <div className="container-fluid text-center">
        <div className="text-fluid-2xl font-bold text-white mb-6" style={{fontFamily: theme.fonts.primary}}>
          2 DAYS EARLY
        </div>
        
        {/* Responsive navigation links */}
        <div className="flex flex-col md:flex-row md:justify-center gap-4 md:gap-8 lg:gap-12 mb-6">
          <a 
            href="#purpose"
            className="text-fluid-base text-white hover:text-green-400 transition-colors"
            style={{fontFamily: theme.fonts.primary}}
          >
            PURPOSE
          </a>
          <a 
            href="#principles"
            className="text-fluid-base text-white hover:text-green-400 transition-colors"
            style={{fontFamily: theme.fonts.primary}}
          >
            PRINCIPLES
          </a>
          <a 
            href="#portfolio"
            className="text-fluid-base text-white hover:text-green-400 transition-colors"
            style={{fontFamily: theme.fonts.primary}}
          >
            PORTFOLIO
          </a>
          <a 
            href="#partners"
            className="text-fluid-base text-white hover:text-green-400 transition-colors"
            style={{fontFamily: theme.fonts.primary}}
          >
            PARTNERS
          </a>
        </div>
        
        <div className="text-fluid-sm text-white" style={{fontFamily: theme.fonts.primary}}>
          © 2025 2 DAYS EARLY
        </div>
      </div>
    </footer>
  );
}