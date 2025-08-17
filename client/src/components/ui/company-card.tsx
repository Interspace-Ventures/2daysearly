import { memo } from 'react';
import { ExternalLink } from 'lucide-react';
import { Company } from '@/types';
import { theme, getNeoBrutalistStyle } from '@/lib/theme';
import { IMAGES } from '@/lib/constants';

interface CompanyCardProps {
  company: Company;
}

const CompanyCard = memo(({ company }: CompanyCardProps) => {
  console.log(`[Company Card Debug] Rendering ${company.name} with logo: ${company.logo}`);
  
  return (
    <a 
      href={company.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block bg-white transition-all duration-300 hover:scale-105"
      style={getNeoBrutalistStyle('md')}
    >
      {/* Logo Container */}
      <div className="h-48 w-full flex items-center justify-center p-8 bg-white border border-red-200">
        <img
          src={company.logo}
          alt={`${company.name} logo`}
          className="max-w-full max-h-full object-contain transition-opacity duration-300 group-hover:opacity-20 border border-blue-200"
          onLoad={() => console.log(`[Company Logo] Successfully loaded: ${company.logo}`)}
          onError={(e) => {
            console.log(`[Company Logo] Failed to load: ${company.logo}, switching to placeholder`);
            e.currentTarget.src = IMAGES.companies.placeholder;
          }}
          style={{ minWidth: '50px', minHeight: '50px' }}
        />
        {/* Debug info */}
        <div className="absolute bottom-2 left-2 text-xs bg-yellow-200 p-1">
          {company.name}
        </div>
      </div>

    {/* Hover Overlay */}
    <div 
      className="absolute inset-0 bg-green-400 p-4 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
      style={getNeoBrutalistStyle('sm')}
    >
      <h3 
        className="text-lg font-bold text-black text-center mb-3"
        style={{ fontFamily: theme.fonts.primary }}
      >
        {company.name}
      </h3>
      <p 
        className="text-sm font-bold text-black leading-tight text-center mb-3"
        style={{ fontFamily: theme.fonts.primary }}
      >
        {company.description}
      </p>
      <div 
        className="flex items-center justify-center gap-1 text-xs font-bold text-black"
        style={{ fontFamily: theme.fonts.primary }}
      >
        <ExternalLink className="h-3 w-3" />
        VISIT
      </div>
    </div>
  </a>
  );
});

CompanyCard.displayName = 'CompanyCard';

export default CompanyCard;