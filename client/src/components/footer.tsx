export default function Footer() {
  return (
    <footer className="bg-black neo-border-thin border-b-0 border-l-0 border-r-0 py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="bg-green-400 neo-border neo-shadow-lg p-8 mb-8 inline-block">
          <div className="text-4xl font-bold text-black font-mono mb-4">
            2 DAYS EARLY
          </div>
          <div className="text-lg font-bold text-black font-mono">
            BY OPERATORS. FOR OPERATORS.
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="neo-card p-6 bg-primary">
            <h3 className="text-xl font-bold text-white font-mono mb-2">LEARN</h3>
            <a 
              href="https://interspace.samir.xyz/p/101-everything-you-wanted-to-know" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white font-mono text-sm underline hover:no-underline"
            >
              EVERYTHING YOU WANTED TO KNOW
            </a>
          </div>
          
          <div className="neo-card p-6 bg-green-600">
            <h3 className="text-xl font-bold text-white font-mono mb-2">JOIN</h3>
            <p className="text-white font-mono text-sm">
              CLICK JOIN BUTTON ABOVE TO GET STARTED
            </p>
          </div>
          
          <div className="neo-card p-6 bg-green-800">
            <h3 className="text-xl font-bold text-white font-mono mb-2">PITCH</h3>
            <a 
              href="mailto:pitch@daysearly.com"
              className="text-white font-mono text-sm underline hover:no-underline"
            >
              PITCH@DAYSEARLY.COM
            </a>
          </div>
        </div>
        
        <div className="bg-white neo-border p-4">
          <p className="text-black font-bold font-mono text-sm">
            © 2025 2 DAYS EARLY SYNDICATE. ALL RIGHTS RESERVED.
          </p>
          <p className="text-black font-mono text-xs mt-1">
            POWERED BY NEOBRUTALISM DESIGN PRINCIPLES
          </p>
        </div>
      </div>
    </footer>
  );
}