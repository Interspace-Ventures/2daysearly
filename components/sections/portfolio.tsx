import React from 'react';
import CompanyCard from "@/components/ui/company-card";
import AnimatedSection from "@/components/ui/animated-section";
import { PortfolioIcon } from "@/components/ui/section-icons";
import { COMPANIES } from "@/lib/constants";

export default function Portfolio() {
  return (
    <section 
      id="portfolio" 
      style={{ paddingTop: '3rem', paddingBottom: '3rem' }}
      aria-labelledby="portfolio-heading"
    >
      <div className="container-fluid">
        {/* Section Header */}
        <div style={{ marginBottom: 'clamp(2rem, 5vw, 4rem)' }}>
          <div className="flex items-center gap-3 mb-4">
            <PortfolioIcon className="flex-shrink-0" style={{ color: 'var(--mint)', width: 'clamp(1.75rem, 4vw, 2.5rem)', height: 'clamp(1.75rem, 4vw, 2.5rem)' }} />
            <h2 
              id="portfolio-heading"
              className="text-fluid-4xl font-bold text-left"
              style={{ color: 'var(--carbon-text)', fontFamily: 'var(--font-archivo), var(--font-outfit), sans-serif'}}
            >
              PORTFOLIO
            </h2>
          </div>
          
          
          <h3 
            className="text-fluid-xl font-bold text-left"
            style={{ color: 'var(--carbon-muted)', fontFamily: 'var(--font-archivo), var(--font-outfit), sans-serif'}}
          >
            We're proud to invest our time and money in operators at these startups:
          </h3>
        </div>
        
        {/* Portfolio Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {COMPANIES.map((company, index) => (
            <AnimatedSection
              key={company.name}
              delay={index * 0.1}
              variant="slideUp"
              duration={0.5}
            >
              <CompanyCard company={company} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}