import { memo } from 'react';

import { Company } from '@/types';
import { IMAGES } from '@/lib/constants';

interface CompanyCardProps {
  company: Company;
}

const CompanyCard = memo(({ company }: CompanyCardProps) => {
  console.log(`[DEBUG] Rendering ${company.name} with logo: ${company.logo}`);
  
  return (
    <a 
      href={company.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000000] transition-all duration-300 hover:scale-105 overflow-visible"
      style={{ minHeight: '192px' }}
    >
      {/* Logo Display - Should be visible by default */}
      <div 
        className="h-48 w-full flex items-center justify-center p-8 bg-white relative"
        style={{ zIndex: 10 }}
      >
        <img
          src={company.logo}
          alt={`${company.name} logo`}
          className="portfolio-logo"
          onLoad={() => console.log(`[LOGO] ${company.name} loaded successfully`)}
          onError={(e) => {
            console.log(`[LOGO ERROR] ${company.name} failed to load`);
            e.currentTarget.src = IMAGES.companies.placeholder;
          }}
          style={{ 
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            zIndex: 50,
            position: 'relative'
          }}
        />
      </div>

      {/* Hover Overlay - Should only appear on hover */}
      <div 
        className="absolute inset-0 bg-green-400 border-2 border-black p-4 flex flex-col justify-center transition-all duration-300"
        style={{ 
          opacity: 0,
          visibility: 'hidden',
          zIndex: 20
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '1';
          e.currentTarget.style.visibility = 'visible';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '0';
          e.currentTarget.style.visibility = 'hidden';
        }}
      >
        <h3 className="text-lg font-bold text-black text-center mb-3" style={{fontFamily: 'Alexandria, sans-serif'}}>
          {company.name}
        </h3>
        <p className="text-sm font-bold text-black leading-tight text-center" style={{fontFamily: 'Alexandria, sans-serif'}}>
          {company.description}
        </p>
      </div>
    </a>
  );
});

CompanyCard.displayName = 'CompanyCard';

export default CompanyCard;