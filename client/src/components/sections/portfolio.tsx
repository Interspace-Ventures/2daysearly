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
        <div 
          className="bg-white text-center neo-border-responsive neo-shadow-lg-responsive"
          style={{ 
            padding: 'clamp(1.5rem, 4vw, 2.5rem)', 
            marginBottom: 'clamp(2rem, 5vw, 4rem)'
          }}
        >
          <h2 
            id="portfolio-heading"
            className="text-fluid-4xl font-bold text-black mb-4"
            style={{fontFamily: 'Alexandria, Inter, sans-serif'}}
          >
            PORTFOLIO
          </h2>
          
          <div className="w-16 h-1 bg-green-500 mx-auto mb-4"></div>
          
          <h3 
            className="text-fluid-xl text-black font-bold"
            style={{fontFamily: 'Alexandria, Inter, sans-serif'}}
          >
            We're proud to invest our time and money in operators at these startups:
          </h3>
        </div>
        
        {/* Portfolio Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8" style={{ marginRight: '4px' }}>
          {COMPANIES.map((company) => (
            <CompanyCard key={company.name} company={company} />
          ))}
        </div>
      </div>
    </section>
  );
}