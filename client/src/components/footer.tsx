import { theme } from '../lib/theme';

export default function Footer() {
  return (
    <footer className="bg-black" style={{ padding: 'clamp(2rem, 5vw, 3rem) 0' }}>
      <div className="container-fluid text-center">

        
        {/* First row: Section navigation links */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 justify-items-center mb-6">
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
        
        {/* Second row: Action links */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 justify-items-center mb-6">
          <a 
            href="mailto:pitch@daysearly.com"
            className="text-fluid-base text-white hover:text-green-400 transition-colors"
            style={{fontFamily: theme.fonts.primary}}
          >
            PITCH
          </a>
          <a 
            href="https://interspace.samir.xyz/p/101-everything-you-wanted-to-know"
            target="_blank"
            rel="noopener noreferrer"
            className="text-fluid-base text-white hover:text-green-400 transition-colors"
            style={{fontFamily: theme.fonts.primary}}
          >
            LEARN
          </a>
          <button
            className="text-fluid-base text-white hover:text-green-400 transition-colors"
            style={{fontFamily: theme.fonts.primary, background: 'none', border: 'none', padding: 0}}
          >
            JOIN
          </button>
        </div>
        
        <div className="text-fluid-sm text-white text-center" style={{fontFamily: theme.fonts.primary}}>
          <div className="mb-2">© 2025 2 DAYS EARLY</div>
          <div>
            Built by{" "}
            <a 
              href="https://interspace.ventures" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 transition-colors underline"
            >
              Interspace Ventures
            </a>
            {" "}at the speed of thought with{" "}
            <a 
              href="https://replit.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 transition-colors underline"
            >
              Replit
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}