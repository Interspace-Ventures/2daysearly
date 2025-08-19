import React from 'react';
import { Company } from '@/types';

interface CompanyCardProps {
  company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className="group relative bg-white border-4 border-black cursor-pointer transition-all duration-300 hover:scale-105" 
         style={{ boxShadow: '8px 8px 0px 0px #000000' }}>
      
      {/* Default state: Show logo - Always visible on mobile, hidden on hover for desktop */}
      <div className="p-6 h-48 flex items-center justify-center group-hover:md:opacity-0 transition-opacity duration-300">
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

      {/* Hover overlay: Show company details - Only on desktop hover */}
      <div className="absolute inset-0 bg-green-400 border-4 border-black p-6 flex flex-col justify-center opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none md:pointer-events-auto"
           style={{ boxShadow: '8px 8px 0px 0px #000000' }}>
        <h3 className="text-xl font-bold text-black text-center mb-3" style={{ fontFamily: 'Alexandria, sans-serif' }}>
          {company.name}
        </h3>
        <p className="text-sm font-bold text-black text-center leading-tight" style={{ fontFamily: 'Alexandria, sans-serif' }}>
          {company.description}
        </p>
      </div>

      {/* Clickable link */}
      <a
        href={company.href}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-20"
        aria-label={`Visit ${company.name} website`}
      />
    </div>
  );
}