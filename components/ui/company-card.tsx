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
      className="group relative block bg-white border-2 border-black cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-1 h-full" 
      style={{ 
        boxShadow: '2px 2px 0px 0px #000000',
        backfaceVisibility: 'hidden',
        transformStyle: 'preserve-3d'
      }}
      aria-label={`Visit ${company.name} website`}
    >
      {/* Logo container - visible by default */}
      <div className="p-4 h-28 md:h-32 flex items-center justify-center bg-gray-50 transition-all duration-300 group-hover:bg-gray-100">
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
      <div className="absolute inset-0 bg-green-400 p-4 flex flex-col justify-center opacity-0 group-hover:opacity-95 transition-all duration-300 border-2 border-black">
        <h3 className="text-lg font-bold text-black text-center mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300" style={{ fontFamily: 'Alexandria, sans-serif' }}>
          {company.name}
        </h3>
        <p className="text-xs md:text-sm font-bold text-black text-center leading-tight transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75" style={{ fontFamily: 'Alexandria, sans-serif' }}>
          {company.description}
        </p>
      </div>
    </a>
  );
}