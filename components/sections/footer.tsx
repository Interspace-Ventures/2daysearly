
import { Building2 } from "lucide-react";

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
