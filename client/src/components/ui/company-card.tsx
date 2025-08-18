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
    className="group relative block bg-white neo-border-responsive neo-shadow-responsive transition-all duration-300 hover:scale-105"
  >
    {/* Logo Display with responsive sizing */}
    <div className="card-responsive-sm w-full flex items-center justify-center bg-white">
      <img
        src={company.logo}
        alt={`${company.name} logo`}
        className="block object-contain transition-opacity duration-300 group-hover:opacity-20"
        style={{
          maxWidth: 'clamp(120px, 20vw, 180px)',
          maxHeight: 'clamp(80px, 15vw, 140px)',
          display: 'block',
          minHeight: 'clamp(40px, 10vw, 80px)'
        }}
        onError={(e) => {
          e.currentTarget.src = IMAGES.companies.placeholder;
        }}
      />
    </div>

    {/* Hover Overlay with fluid typography */}
    <div className="absolute inset-0 bg-green-400 neo-border-responsive flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
         style={{ padding: 'clamp(0.75rem, 2.5vw, 1.5rem)' }}>
      <h3 className="text-fluid-lg font-bold text-black text-center mb-3" style={{fontFamily: 'Alexandria, sans-serif'}}>
        {company.name}
      </h3>
      <p className="text-fluid-sm font-bold text-black leading-tight text-center" style={{fontFamily: 'Alexandria, sans-serif'}}>
        {company.description}
      </p>
    </div>
  </a>
));

CompanyCard.displayName = 'CompanyCard';

export default CompanyCard;