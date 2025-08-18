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
          <div 
            className="bg-black text-center neo-border-responsive neo-shadow-lg-responsive"
            style={{ 
              padding: 'clamp(1.5rem, 4vw, 2.5rem)', 
              marginBottom: 'clamp(2rem, 5vw, 4rem)'
            }}
          >
            <h2 
              id="portfolio-heading"
              className="text-fluid-4xl font-bold text-white"
              style={{fontFamily: 'Alexandria, Inter, sans-serif'}}
            >
              PORTFOLIO
            </h2>
          </div>
          
          <div className="bg-green-500 border-2 border-black p-6 mb-8" style={{boxShadow: '4px 4px 0px 0px #000000'}}>
            <h3 
              className="text-fluid-4xl font-bold text-white text-center"
              style={{fontFamily: 'Alexandria, Inter, sans-serif', color: '#ffffff'}}
            >
              WE'RE PROUD TO INVEST OUR TIME AND MONEY IN OPERATORS AT THESE STARTUPS:
            </h3>
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