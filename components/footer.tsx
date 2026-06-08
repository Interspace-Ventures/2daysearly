import ChangelogDialog from '@/components/ui/changelog-dialog';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--carbon-surface)', borderTop: '1px solid var(--carbon-border)', padding: 'clamp(2rem, 5vw, 3rem) 0' }}>
      <div className="container-fluid">

        
        {/* Responsive layout: stacked only at extremely narrow (<200px), 1/3-1/3-1/3 mobile, 1/4-1/4-1/2 desktop */}
        <div className="grid grid-cols-1 min-[200px]:grid-cols-3 sm:grid-cols-12 gap-4 min-[200px]:gap-4 sm:gap-8 items-start text-left">
          
          {/* Column 1: Navigation */}
          <div className="min-[200px]:col-span-1 sm:col-span-3 flex flex-col items-start space-y-3 min-[200px]:space-y-2 sm:space-y-2">
            <a 
              href="#purpose"
              className="sl-label text-fluid-base text-white transition-colors hover:text-[#1dc677]"
            >
              PURPOSE
            </a>
            <a 
              href="#principles"
              className="sl-label text-fluid-base text-white transition-colors hover:text-[#1dc677]"
            >
              PRINCIPLES
            </a>
            <a 
              href="#portfolio"
              className="sl-label text-fluid-base text-white transition-colors hover:text-[#1dc677]"
            >
              PORTFOLIO
            </a>
            <a 
              href="#partners"
              className="sl-label text-fluid-base text-white transition-colors hover:text-[#1dc677]"
            >
              PARTNERS
            </a>
          </div>
          
          {/* Column 2: Actions */}
          <div className="min-[200px]:col-span-1 sm:col-span-3 flex flex-col items-start space-y-3 min-[200px]:space-y-2 sm:space-y-2">
            <a 
              href="mailto:pitch@daysearly.com"
              className="sl-label text-fluid-base text-white transition-colors hover:text-[#1dc677]"
            >
              PITCH
            </a>
            <a 
              href="https://posts.interspace.ventures/p/101-everything-you-wanted-to-know"
              target="_blank"
              rel="noopener noreferrer"
              className="sl-label text-fluid-base text-white transition-colors hover:text-[#1dc677]"
            >
              LEARN
            </a>
            <button
              className="sl-label text-fluid-base text-white transition-colors hover:text-[#1dc677]"
              style={{background: 'none', border: 'none', padding: 0}}
            >
              JOIN
            </button>
          </div>
          
          {/* Column 3: Social & Copyright */}
          <div className="min-[200px]:col-span-1 sm:col-span-6 flex flex-col items-start space-y-4 min-[200px]:space-y-3 sm:space-y-3">
            {/* Social Links */}
            <div className="flex gap-4 sm:gap-3">
              <a 
                href="https://www.linkedin.com/company/106588337/admin/dashboard/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white transition-colors border-2 p-2 flex items-center justify-center"
                style={{ borderColor: 'var(--carbon-border)', boxShadow: '2px 2px 0px 0px var(--carbon-shadow)'}}
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
                className="bg-white transition-colors border-2 p-2 flex items-center justify-center"
                style={{ borderColor: 'var(--carbon-border)', boxShadow: '2px 2px 0px 0px var(--carbon-shadow)'}}
                aria-label="Twitter"
              >
                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
            
          </div>
          
        </div>

        {/* Full-width copyright row */}
        <div className="text-fluid-sm text-white text-left leading-relaxed sl-body mt-8 pt-6" style={{fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)', borderTop: '1px solid var(--carbon-border)'}}>
          <div className="mb-2 flex items-center gap-3">
            <span className="sl-label" style={{letterSpacing: '0.08em'}}>© 2026 2 DAYS EARLY</span>
            <ChangelogDialog />
          </div>
          <div>
            2 Days Early is an{" "}
            <a 
              href="https://interspace.ventures" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-colors underline text-[#1dc677] hover:text-[#179e5f]"
            >
              Interspace Venture
            </a>
            {" "}built at the speed of thought using{" "}
            <a 
              href="https://replit.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-colors underline text-[#1dc677] hover:text-[#179e5f]"
            >
              Replit
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}