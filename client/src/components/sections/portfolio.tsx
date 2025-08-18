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
          <SectionHeader
            id="portfolio-heading"
            title={[
              "WE'RE PROUD TO INVEST OUR TIME",
              "AND MONEY IN OPERATORS AT", 
              "THESE STARTUPS:"
            ]}
          />
        </AnimatedSection>
        
        <div className="grid-responsive-3">
          {COMPANIES.map((company) => (
            <CompanyCard key={company.name} company={company} />
          ))}
        </div>
      </div>
    </section>
  );
}