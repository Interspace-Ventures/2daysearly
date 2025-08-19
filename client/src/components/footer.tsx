import { theme } from '../lib/theme';

export default function Footer() {
  return (
    <footer className="bg-black" style={{ padding: 'clamp(2rem, 5vw, 3rem) 0' }}>
      <div className="container-fluid text-center">

        
        {/* Three column layout */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 items-start">
          
          {/* Column 1: Navigation */}
          <div className="flex flex-col items-start space-y-2 md:space-y-3">
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
          
          {/* Column 2: Actions */}
          <div className="flex flex-col items-start space-y-2 md:space-y-3">
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
          
          {/* Column 3: Copyright & Social */}
          <div className="flex flex-col items-start space-y-4">
            <div className="text-fluid-sm text-white text-left" style={{fontFamily: theme.fonts.primary, fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'}}>
              © 2025 2 DAYS EARLY<br />
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
            
            {/* Social Links */}
            <div className="flex gap-3">
              <a 
                href="https://www.linkedin.com/company/106588337/admin/dashboard/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-green-100 transition-colors border-2 border-black p-2 flex items-center justify-center"
                style={{boxShadow: '2px 2px 0px 0px #000000'}}
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="https://x.com/2DaysEarly"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-green-100 transition-colors border-2 border-black p-2 flex items-center justify-center"
                style={{boxShadow: '2px 2px 0px 0px #000000'}}
                aria-label="Twitter/X"
              >
                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
}