import { theme } from '../lib/theme';

export default function Footer() {
  return (
    <footer className="bg-black neo-border-thin border-b-0 border-l-0 border-r-0 py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="bg-green-400 neo-border neo-shadow-lg p-8 mb-8 inline-block">
          <div className="text-4xl font-bold text-black mb-4" style={{fontFamily: theme.fonts.primary}}>
            2 DAYS EARLY
          </div>
          <div className="text-lg font-bold text-black" style={{fontFamily: theme.fonts.primary}}>
            BY OPERATORS. FOR OPERATORS.
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="neo-card p-6 bg-green-600">
            <h3 className="text-xl font-bold text-white mb-2" style={{fontFamily: theme.fonts.primary}}>LEARN MORE</h3>
            <a 
              href="https://interspace.samir.xyz/p/101-everything-you-wanted-to-know" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white text-sm underline hover:no-underline"
              style={{fontFamily: theme.fonts.primary}}
            >
              READ OUR STORY
            </a>
          </div>
          
          <div className="neo-card p-6 bg-green-700">
            <h3 className="text-xl font-bold text-white mb-2" style={{fontFamily: theme.fonts.primary}}>JOIN US</h3>
            <p className="text-white text-sm" style={{fontFamily: theme.fonts.primary}}>
              CLICK JOIN BUTTON ABOVE
            </p>
          </div>
          
          <div className="neo-card p-6 bg-green-800">
            <h3 className="text-xl font-bold text-white mb-2" style={{fontFamily: theme.fonts.primary}}>CONTACT</h3>
            <a 
              href="mailto:pitch@2daysearly.com"
              className="text-white text-sm underline hover:no-underline"
              style={{fontFamily: theme.fonts.primary}}
            >
              EMAIL US
            </a>
          </div>
        </div>
        
        <div className="bg-white neo-border p-4">
          <p className="text-black font-bold text-sm" style={{fontFamily: theme.fonts.primary}}>
            © 2025 2 DAYS EARLY
          </p>
        </div>
      </div>
    </footer>
  );
}