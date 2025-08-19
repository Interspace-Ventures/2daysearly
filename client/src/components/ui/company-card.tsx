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
    className="group relative block bg-white neo-border-responsive neo-shadow-responsive transition-all duration-300 hover:scale-105 overflow-hidden"
  >
    {/* Logo Display - Always visible */}
    <div className="w-full flex items-center justify-center bg-white transition-opacity duration-300 group-hover:opacity-0"
         style={{ 
           padding: 'clamp(1rem, 3vw, 2rem)',
           minHeight: 'clamp(120px, 25vw, 200px)'
         }}>
      <img
        src={company.logo}
        alt={`${company.name} logo`}
        className="object-contain max-w-full max-h-full"
        style={{
          maxWidth: 'clamp(100px, 18vw, 160px)',
          maxHeight: 'clamp(60px, 12vw, 120px)'
        }}
        onError={(e) => {
          e.currentTarget.src = IMAGES.companies.placeholder;
        }}
      />
    </div>

    {/* Hover Overlay - Only appears on hover */}
    <div className="absolute inset-0 bg-green-400 neo-border-responsive flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
         style={{ padding: 'clamp(1rem, 3vw, 1.5rem)' }}>
      <h3 className="text-fluid-xl font-bold text-black text-center mb-2" style={{fontFamily: 'Alexandria, sans-serif'}}>
        {company.name}
      </h3>
      <p className="text-fluid-sm text-black leading-tight text-center" style={{fontFamily: 'Alexandria, sans-serif'}}>
        {company.description}
      </p>
    </div>
  </a>
));

CompanyCard.displayName = 'CompanyCard';

export default CompanyCard;