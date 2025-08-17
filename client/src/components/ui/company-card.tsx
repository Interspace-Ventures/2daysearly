import { memo } from 'react';
import { ExternalLink } from 'lucide-react';
import { Company } from '@/types';
import { IMAGES } from '@/lib/constants';

interface CompanyCardProps {
  company: Company;
}

const CompanyCard = memo(({ company }: CompanyCardProps) => {
  return (
    <div className="group relative bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000000] transition-all duration-300 hover:scale-105">
      {/* Default Logo Display */}
      <div className="h-48 w-full flex items-center justify-center p-8 bg-white">
        <img
          src={company.logo}
          alt={`${company.name} logo`}
          className="max-w-full max-h-full object-contain"
          onError={(e) => {
            console.log(`[Logo Error] Failed to load: ${company.logo}`);
            e.currentTarget.src = IMAGES.companies.placeholder;
          }}
        />
      </div>

      {/* Hover Overlay - Only appears on hover */}
      <div className="absolute inset-0 bg-green-400 border-2 border-black p-4 flex flex-col justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
        <h3 className="text-lg font-bold text-black text-center mb-3" style={{fontFamily: 'Alexandria, sans-serif'}}>
          {company.name}
        </h3>
        <p className="text-sm font-bold text-black leading-tight text-center mb-3" style={{fontFamily: 'Alexandria, sans-serif'}}>
          {company.description}
        </p>
        <a 
          href={company.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1 text-xs font-bold text-black hover:underline"
          style={{fontFamily: 'Alexandria, sans-serif'}}
        >
          <ExternalLink className="h-3 w-3" />
          VISIT
        </a>
      </div>
    </div>
  );
});

CompanyCard.displayName = 'CompanyCard';

export default CompanyCard;