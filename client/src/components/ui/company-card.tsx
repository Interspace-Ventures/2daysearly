import { memo } from 'react';
import { ExternalLink } from 'lucide-react';
import { Company } from '@/types';
import { IMAGES } from '@/lib/constants';

interface CompanyCardProps {
  company: Company;
}

const CompanyCard = memo(({ company }: CompanyCardProps) => {
  console.log(`[CompanyCard] Rendering ${company.name} with logo: ${company.logo}`);
  
  return (
    <div className="group relative bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000000] transition-all duration-300 hover:scale-105">
      {/* Debug info */}
      <div className="absolute top-2 left-2 z-50 bg-red-200 text-xs p-1">
        {company.name}
      </div>
      
      {/* Default Logo Display */}
      <div className="h-48 w-full flex items-center justify-center p-8 bg-gray-100">
        <img
          src={company.logo}
          alt={`${company.name} logo`}
          className="max-w-full max-h-full object-contain border border-blue-300"
          onLoad={() => console.log(`[Logo] Loaded successfully: ${company.logo}`)}
          onError={(e) => {
            console.log(`[Logo Error] Failed to load: ${company.logo}`);
            e.currentTarget.src = IMAGES.companies.placeholder;
          }}
          style={{ minHeight: '50px', minWidth: '50px' }}
        />
      </div>


    </div>
  );
});

CompanyCard.displayName = 'CompanyCard';

export default CompanyCard;