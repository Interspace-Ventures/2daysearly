import AnimatedSection from "@/components/ui/animated-section";
import SectionHeader from "@/components/ui/section-header";
import CompanyCard from "@/components/ui/company-card";
import { COMPANIES } from "@/lib/constants";

export default function Portfolio() {
  return (
    <section 
      id="portfolio" 
      className="neo-section bg-white relative z-0"
      aria-labelledby="portfolio-heading"
      style={{ overflow: 'visible' }}
    >
      <div className="container-fluid">
        <AnimatedSection>
          <div style={{ margin: '0 clamp(0.5rem, 2vw, 1rem)' }}>
            <SectionHeader
              id="portfolio-heading"
              title={[
                "WE'RE PROUD TO INVEST OUR TIME",
                "AND MONEY IN OPERATORS AT", 
                "THESE STARTUPS:"
              ]}
            />
          </div>
        </AnimatedSection>
        
        <div className="grid-responsive-3" style={{ margin: 'clamp(1rem, 3vw, 2rem) 0' }}>
          {COMPANIES.map((company) => (
            <CompanyCard key={company.name} company={company} />
          ))}
        </div>
      </div>
    </section>
  );
}