import { memo } from 'react';
import { ExternalLink } from 'lucide-react';
import { Company } from '@/types';
import { theme, getNeoBrutalistStyle } from '@/lib/theme';
import { IMAGES } from '@/lib/constants';

interface CompanyCardProps {
  company: Company;
}

const CompanyCard = memo(({ company }: CompanyCardProps) => {
  console.log(`[Debug] Rendering card for ${company.name} with logo: ${company.logo}`);
  
  return (
    <a 
      href={company.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000000] transition-all duration-300 hover:scale-105"
    >
      {/* Logo Container */}
      <div className="h-48 w-full flex items-center justify-center p-8 bg-white">
        <img
          src={company.logo}
          alt={`${company.name} logo`}
          className="max-w-full max-h-full object-contain"
          onLoad={() => console.log(`[Logo] Successfully loaded: ${company.logo}`)}
          onError={(e) => {
            console.log(`[Logo] Failed to load: ${company.logo}`);
            e.currentTarget.src = IMAGES.companies.placeholder;
          }}
        />
      </div>

      {/* Hover Overlay */}
      <div 
        className="absolute inset-0 bg-green-400 border-2 border-black p-4 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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