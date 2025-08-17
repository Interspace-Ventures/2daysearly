import { memo } from 'react';

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
  >
    {/* Logo Display - Always visible */}
    <div className="h-48 w-full flex items-center justify-center p-8 bg-white">
      <img
        src={company.logo}
        alt={`${company.name} logo`}
        className="max-w-full max-h-full object-contain transition-opacity duration-300 group-hover:opacity-20"
        onError={(e) => {
          e.currentTarget.src = IMAGES.companies.placeholder;
        }}
        style={{ 
          maxWidth: '160px',
          maxHeight: '120px'
        }}
      />
    </div>

    {/* Hover Overlay - Only on hover */}
    <div className="absolute inset-0 bg-green-400 border-2 border-black p-4 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
      <h3 className="text-lg font-bold text-black text-center mb-3" style={{fontFamily: 'Alexandria, sans-serif'}}>
        {company.name}
      </h3>
      <p className="text-sm font-bold text-black leading-tight text-center" style={{fontFamily: 'Alexandria, sans-serif'}}>
        {company.description}
      </p>
    </div>
  </a>
));

CompanyCard.displayName = 'CompanyCard';

export default CompanyCard;