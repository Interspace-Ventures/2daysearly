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
      name: "FIZZ",
      href: "https://joinfizz.com",
      description: "SOCIAL DEBIT CARD AND FINANCIAL PLATFORM DESIGNED FOR COLLEGE STUDENTS AND YOUNG ADULTS.",
      logo: IMAGES.companies.fizz,
      color: "bg-green-400"
    },
    {
      name: "HADRIUS",
      href: "https://hadrius.ai",
      description: "AI-POWERED CYBERSECURITY PLATFORM PROVIDING INTELLIGENT THREAT DETECTION AND RESPONSE.",
      logo: IMAGES.companies.hadrius,
      color: "bg-purple-400"
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
            <div className="bg-black border-2 border-black p-8 mb-6 inline-block" style={{boxShadow: '8px 8px 0px 0px #000000'}}>
              <h2 
                id="portfolio-heading" 
                className="text-2xl md:text-5xl font-bold text-white"
                style={{fontFamily: 'Alexandria, Inter, sans-serif', color: '#ffffff'}}
              >
                WE'RE PROUD TO INVEST OUR TIME
              </h2>
              <h2 
                className="text-2xl md:text-5xl font-bold text-green-400"
                style={{fontFamily: 'Alexandria, Inter, sans-serif', color: '#4ade80'}}
              >
                AND MONEY IN OPERATORS AT
              </h2>
              <h2 
                className="text-2xl md:text-5xl font-bold text-white"
                style={{fontFamily: 'Alexandria, Inter, sans-serif', color: '#ffffff'}}
              >
                THESE STARTUPS:
              </h2>
            </div>
          </div>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <a 
              key={company.name}
              href={company.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white border-2 border-black p-8 transition-all duration-300 hover:scale-105" 
              style={{boxShadow: '4px 4px 0px 0px #000000'}}
            >
              {/* Main Logo Display */}
              <div className="aspect-square flex items-center justify-center bg-gray-50 border border-gray-200">
                <Image
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="w-32 h-16 object-contain transition-opacity duration-300 group-hover:opacity-30"
                  fallbackSrc={IMAGES.companies.placeholder}
                />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-2 bg-green-400 border-2 border-black p-4 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-all duration-300" 
                   style={{boxShadow: '2px 2px 0px 0px #000000'}}>
                <h3 className="text-lg font-bold text-black text-center mb-3" style={{fontFamily: 'Alexandria, Inter, sans-serif'}}>
                  {company.name.toUpperCase()}
                </h3>
                <p className="text-sm font-bold text-black leading-tight text-center mb-3" style={{fontFamily: 'Inter, sans-serif'}}>
                  {company.description}
                </p>
                <div className="flex items-center justify-center gap-1 text-xs font-bold text-black" style={{fontFamily: 'Alexandria, Inter, sans-serif'}}>
                  <ExternalLink className="h-3 w-3" />
                  VISIT
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}