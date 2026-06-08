import React from 'react';
import { Company } from '@/types';

interface CompanyCardProps {
  company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <a
      href={company.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block glass-sheen overflow-hidden border-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-1 h-full" 
      style={{ 
        background: 'var(--carbon-card)',
        borderColor: 'var(--carbon-border)',
        boxShadow: '2px 2px 0px 0px var(--carbon-shadow)',
        backfaceVisibility: 'hidden',
        transformStyle: 'preserve-3d'
      }}
      aria-label={`Visit ${company.name} website`}
    >
      {/* Logo container - light plate keeps black-on-transparent logos visible */}
      <div className="p-4 h-28 md:h-32 flex items-center justify-center bg-white transition-all duration-300 group-hover:bg-white">
        <img
          src={company.logo}
          alt={`${company.name} logo`}
          className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:scale-110"
          onError={(e) => {
            console.error(`Failed to load image: ${company.logo}`);
            e.currentTarget.src = '/images/company-placeholder.svg';
          }}
        />
      </div>

      {/* Text overlay - appears on hover for desktop */}
      <div className="absolute inset-0 p-2 sm:p-4 flex flex-col justify-center opacity-0 group-hover:opacity-95 transition-all duration-300 border-2" style={{ backgroundColor: 'var(--mint)', borderColor: 'var(--mint)', color: 'var(--mint-ink)' }}>
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-center mb-1 sm:mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300" style={{ color: 'var(--mint-ink)', fontFamily: 'var(--font-archivo), var(--font-outfit), sans-serif' }}>
          {company.name}
        </h3>
        <p className="text-xs font-bold text-center leading-tight transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75 sl-body" style={{ color: 'var(--mint-ink)' }}>
          {company.description}
        </p>
      </div>
    </a>
  );
}