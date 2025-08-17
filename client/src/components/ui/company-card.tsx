import { memo } from 'react';
import { ExternalLink } from 'lucide-react';
import { Company } from '@/types';
import { IMAGES } from '@/lib/constants';

interface CompanyCardProps {
  company: Company;
}

const CompanyCard = memo(({ company }: CompanyCardProps) => (
  <a 
    href={company.href}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative block bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000000] transition-all duration-300 hover:scale-105"
    style={{ minHeight: '200px', backgroundColor: '#f0f0f0' }}  // Temporary: make cards visible
  >
    {/* Logo Display */}
    <div className="h-48 w-full flex items-center justify-center p-8 bg-gray-100 relative z-10 border border-blue-500">  {/* Temporary: visible container */}
      <img
        src={company.logo}
        alt={`${company.name} logo`}
        className="max-w-full max-h-full object-contain transition-opacity duration-300 group-hover:opacity-20 relative z-20 portfolio-logo"
        onLoad={() => console.log(`[Logo Visible Test] ${company.name} logo loaded and should be visible`)}
        onError={(e) => {
          console.log(`[Logo Error] ${company.name} logo failed to load`);
          e.currentTarget.src = IMAGES.companies.placeholder;
        }}
        style={{ minWidth: '50px', minHeight: '30px' }}
      />
    </div>

    {/* Hover Overlay */}
    <div className="absolute inset-0 bg-green-400 border-2 border-black p-4 flex flex-col justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-30">
      <h3 className="text-lg font-bold text-black text-center mb-3" style={{fontFamily: 'Alexandria, sans-serif'}}>
        {company.name}
      </h3>
      <p className="text-sm font-bold text-black leading-tight text-center mb-3" style={{fontFamily: 'Alexandria, sans-serif'}}>
        {company.description}
      </p>
      <div className="flex items-center justify-center" style={{fontFamily: 'Alexandria, sans-serif'}}>
        <ExternalLink className="h-4 w-4" />
      </div>
    </div>
  </a>
));

CompanyCard.displayName = 'CompanyCard';

export default CompanyCard;