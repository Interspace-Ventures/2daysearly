import AnimatedSection from "@/components/ui/animated-section";
import Image from "@/components/ui/image";
import { ExternalLink } from "lucide-react";
import { IMAGES } from "@/lib/constants";

export default function Portfolio() {
  const companies = [
    {
      name: "BACKPACK",
      href: "https://www.backpack529.com/",
      description: "SIMPLIFYING 529 PLAN MANAGEMENT FOR FAMILIES AND ADVISORS WITH INNOVATIVE PAYMENT SOLUTIONS.",
      logo: IMAGES.companies.backpack,
      color: "bg-blue-400"
    },
    {
      name: "JUNO", 
      href: "https://juno.finance/",
      description: "MODERN BANKING FOR THE CRYPTO-NATIVE, WITH SEAMLESS ON-RAMPS AND A FOCUS ON USER EXPERIENCE.",
      logo: IMAGES.companies.juno,
      color: "bg-purple-400"
    },
    {
      name: "HARPER",
      href: "https://www.harperinsure.com/",
      description: "MODERN INSURANCE PLATFORM ENABLING EMBEDDED INSURANCE EXPERIENCES FOR INNOVATIVE BUSINESSES.",
      logo: IMAGES.companies.harper,
      color: "bg-green-400"
    },
    {
      name: "KARTERA",
      href: "https://www.kartera.com",
      description: "EMPOWERING FINANCIAL ADVISORS WITH DIGITAL-FIRST SOLUTIONS TO SERVE THE NEXT GENERATION OF WEALTH.",
      logo: IMAGES.companies.kartera,
      color: "bg-yellow-400"
    },
    {
      name: "SUNDAE",
      href: "https://www.sundae.com",
      description: "MARKETPLACE CONNECTING HOMEOWNERS LOOKING TO SELL WITH PROPERTY INVESTORS FOR FAIR, OFF-MARKET DEALS.",
      logo: IMAGES.companies.sundae,
      color: "bg-orange-400"
    },
    {
      name: "WALDO",
      href: "https://www.waldo.ai/",
      description: "AI-POWERED FRAUD PREVENTION THAT AUTOMATES COMPLIANCE AND KEEPS YOUR BUSINESS SAFE.",
      logo: IMAGES.companies.waldo,
      color: "bg-red-400"
    }
  ];

  return (
    <section 
      id="portfolio" 
      className="neo-section bg-white"
      aria-labelledby="portfolio-heading"
    >
      <div className="max-w-7xl mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="bg-black neo-shadow-lg p-8 mb-6 inline-block">
              <h2 
                id="portfolio-heading" 
                className="text-3xl md:text-5xl font-bold text-white font-mono"
              >
                WE'RE PROUD TO INVEST OUR TIME
              </h2>
              <h2 
                className="text-3xl md:text-5xl font-bold text-yellow-400 font-mono"
              >
                AND MONEY IN OPERATORS AT
              </h2>
              <h2 
                className="text-3xl md:text-5xl font-bold text-white font-mono"
              >
                THESE STARTUPS:
              </h2>
            </div>
          </div>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {companies.map((company) => (
            <div key={company.name} className="neo-card bg-white p-6 hover:neo-shadow-lg transition-all duration-200">
              <a 
                href={company.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className={`${company.color} neo-border neo-shadow p-4 mb-4 text-center`}>
                  <div className="w-16 h-16 mx-auto mb-4 bg-white neo-border rounded-full flex items-center justify-center">
                    <Image
                      src={company.logo}
                      alt={`${company.name} logo`}
                      className="w-10 h-10 object-contain"
                      fallbackSrc="/images/2-days-early-logo-2025.png"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-black font-mono">{company.name}</h3>
                </div>
                
                <div className="bg-gray-100 neo-border p-4 mb-4">
                  <p className="text-sm font-bold text-black font-mono leading-tight">
                    {company.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-center">
                  <div className="bg-blue-500 neo-border neo-shadow px-4 py-2 text-white font-bold font-mono text-sm flex items-center gap-2">
                    VISIT SITE <ExternalLink className="h-4 w-4" />
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}