import { theme } from '../lib/theme';

export default function Footer() {
  return (
    <footer className="bg-black py-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="text-2xl font-bold text-white mb-6" style={{fontFamily: theme.fonts.primary}}>
          2 DAYS EARLY
        </div>
        
        <div className="flex flex-col justify-center gap-4 mb-6">
          <a 
            href="#purpose"
            className="text-white hover:text-green-400 transition-colors"
            style={{fontFamily: theme.fonts.primary}}
          >
            PURPOSE
          </a>
          <a 
            href="#principles"
            className="text-white hover:text-green-400 transition-colors"
            style={{fontFamily: theme.fonts.primary}}
          >
            PRINCIPLES
          </a>
          <a 
            href="#portfolio"
            className="text-white hover:text-green-400 transition-colors"
            style={{fontFamily: theme.fonts.primary}}
          >
            PORTFOLIO
          </a>
          <a 
            href="#partners"
            className="text-white hover:text-green-400 transition-colors"
            style={{fontFamily: theme.fonts.primary}}
          >
            PARTNERS
          </a>
        </div>
        
        <div className="text-white text-sm" style={{fontFamily: theme.fonts.primary}}>
          © 2025 2 DAYS EARLY
        </div>
      </div>
    </footer>
  );
}