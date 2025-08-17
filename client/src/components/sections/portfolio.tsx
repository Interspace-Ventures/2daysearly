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
      <div className="w-full">
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
        
        {/* TEMPORARY: Single card test for Backpack */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10" style={{ overflow: 'visible' }}>
          <div className="w-full h-48 bg-white border-4 border-red-500 p-4 relative">
            <div className="text-center mb-4 font-bold text-lg">BACKPACK TEST CARD</div>
            <div className="flex items-center justify-center h-32 bg-yellow-200 border-2 border-blue-500">
              <img
                src="/images/backpack.png"
                alt="Backpack logo"
                className="max-w-full max-h-full object-contain"
                style={{ 
                  width: '100px', 
                  height: '60px',
                  border: '3px solid green',
                  backgroundColor: 'white'
                }}
                onLoad={() => console.log('[TEST] Backpack logo loaded and visible')}
                onError={() => console.log('[TEST] Backpack logo failed to load')}
              />
            </div>
          </div>
          
          {/* Hide other cards temporarily */}
          {COMPANIES.slice(1).map((company) => (
            <div key={company.name} style={{ display: 'none' }}>
              <CompanyCard company={company} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}