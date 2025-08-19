import React from 'react';
import { Company } from '@/types';

interface CompanyCardProps {
  company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className="group relative bg-white border-4 border-black shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
      {/* Default state: Show logo */}
      <div className="p-8 h-48 flex items-center justify-center">
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

      {/* Hover state: Show company details */}
      <div className="absolute inset-0 bg-green-400 border-4 border-black p-6 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-xl font-bold text-black text-center mb-3" style={{ fontFamily: 'Alexandria, sans-serif' }}>
          {company.name}
        </h3>
        <p className="text-sm text-black text-center leading-relaxed" style={{ fontFamily: 'Alexandria, sans-serif' }}>
          {company.description}
        </p>
      </div>

      {/* Optional: Make it clickable */}
      <a
        href={company.href}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-10"
        aria-label={`Visit ${company.name} website`}
      />
    </div>
  );
}