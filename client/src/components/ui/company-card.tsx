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
      className="group relative block bg-white border-2 border-black cursor-pointer transition-all duration-300 md:hover:scale-105" 
      style={{ boxShadow: '2px 2px 0px 0px #000000' }}
      aria-label={`Visit ${company.name} website`}
    >
      {/* Logo container - visible by default */}
      <div className="p-4 h-28 md:h-32 flex items-center justify-center bg-white">
        <img
          src={company.logo}
          alt={`${company.name} logo`}
          className="max-w-full max-h-full object-contain"
          onError={(e) => {
            console.error(`Failed to load image: ${company.logo}`);
            e.currentTarget.src = '/images/company-placeholder.svg';
          }}
        />
      </div>

      {/* Text overlay - appears on hover for desktop only */}
      <div className="hidden md:block absolute inset-0 bg-green-400 p-4 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-lg font-bold text-black text-center mb-2" style={{ fontFamily: 'Alexandria, sans-serif' }}>
          {company.name}
        </h3>
        <p className="text-xs md:text-sm font-bold text-black text-center leading-tight" style={{ fontFamily: 'Alexandria, sans-serif' }}>
          {company.description}
        </p>
      </div>
    </a>
  );
}