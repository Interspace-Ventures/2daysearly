import React from 'react';
import CompanyCard from "@/components/ui/company-card";
import { COMPANIES } from "@/lib/constants";

export default function Portfolio() {
  return (
    <section 
      id="portfolio" 
      className="bg-white"
      style={{ paddingTop: '3rem', paddingBottom: '3rem' }}
      aria-labelledby="portfolio-heading"
    >
      <div className="container-fluid" style={{ marginRight: '4px' }}>
        {/* Section Header */}
        <div className="bg-white border-4 border-black p-8 mb-12 text-center" 
             style={{ boxShadow: '8px 8px 0px 0px #000000' }}>
          <h2 
            id="portfolio-heading"
            className="text-4xl font-bold text-black mb-4"
            style={{fontFamily: 'Alexandria, Inter, sans-serif'}}
          >
            PORTFOLIO
          </h2>
          
          <div className="w-16 h-1 bg-green-500 mx-auto mb-4"></div>
          
          <h3 
            className="text-xl text-black font-bold"
            style={{fontFamily: 'Alexandria, Inter, sans-serif'}}
          >
            We're proud to invest our time and money in operators at these startups:
          </h3>
        </div>
        
        {/* Portfolio Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" style={{ marginRight: '4px' }}>
          {COMPANIES.map((company) => (
            <CompanyCard key={company.name} company={company} />
          ))}
        </div>
      </div>
    </section>
  );
}