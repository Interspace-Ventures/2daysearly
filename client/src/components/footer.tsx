import { theme } from '../lib/theme';

export default function Footer() {
  return (
    <footer className="bg-black" style={{ padding: 'clamp(2rem, 5vw, 3rem) 0' }}>
      <div className="container-fluid text-center">
        <div className="text-fluid-2xl font-bold text-white mb-6" style={{fontFamily: theme.fonts.primary}}>
          2 DAYS EARLY
        </div>
        
        {/* Responsive navigation links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-center mb-6">
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