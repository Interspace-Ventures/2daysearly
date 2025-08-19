import AnimatedSection from "@/components/ui/animated-section";
import SectionHeader from "@/components/ui/section-header";
import CompanyCard from "@/components/ui/company-card";
import { COMPANIES } from "@/lib/constants";

export default function Portfolio() {
  console.log('Portfolio component rendering, COMPANIES:', COMPANIES);
  
  return (
    <section 
      id="portfolio" 
      className="py-16 bg-white relative z-0"
      aria-labelledby="portfolio-heading"
    >
      <div className="container-fluid">
        <div className="text-center mb-12">
          <h2 
            id="portfolio-heading"
            className="text-4xl font-bold text-black mb-4"
            style={{fontFamily: 'Alexandria, Inter, sans-serif'}}
          >
            PORTFOLIO
          </h2>
          
          <div className="w-16 h-1 bg-green-500 mx-auto mb-4"></div>
          
          <h3 
            className="text-xl text-black"
            style={{fontFamily: 'Alexandria, Inter, sans-serif'}}
          >
            We're proud to invest our time and money in operators at these startups:
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMPANIES.map((company) => (
            <CompanyCard key={company.name} company={company} />
          ))}
        </div>
      </div>
    </section>
  );
}