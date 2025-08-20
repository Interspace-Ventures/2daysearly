
// Simple building icon
const Building2 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-primary/5">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Built by{" "}
              <a 
                href="https://www.samir.xyz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/90 underline"
              >
                Interspace Labs
              </a>
              {" "}with{" "}
              <a 
                href="https://replit.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/90 underline"
              >
                Replit.com
              </a>
            </p>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} 2 Days Early. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
