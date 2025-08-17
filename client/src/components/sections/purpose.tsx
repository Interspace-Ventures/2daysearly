import AnimatedSection from "@/components/ui/animated-section";

export default function Purpose() {
  return (
    <section 
      id="purpose" 
      className="neo-section bg-white"
      aria-labelledby="purpose-heading"
    >
      <div className="w-full">
        <AnimatedSection>
          <div className="bg-green-500 border-2 border-black p-6 mb-8" style={{boxShadow: '4px 4px 0px 0px #000000'}}>
            <h2 
              id="purpose-heading"
              className="text-2xl md:text-6xl font-bold text-white text-center"
              style={{fontFamily: 'Alexandria, Inter, sans-serif', color: '#ffffff'}}
            >
              BY OPERATORS. FOR OPERATORS.
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-green-50 border-2 border-black p-6" style={{boxShadow: '4px 4px 0px 0px #000000'}}>
              <p className="text-xl font-bold text-black leading-relaxed" style={{fontFamily: 'Alexandria, Inter, sans-serif'}}>
                WE ARE A COMMUNITY OF{" "}
                <span className="bg-green-400 border-2 border-black px-2 py-1 text-white">
                  ENTREPRENEURS, INVESTORS AND OPERATORS
                </span>
                . WE HAVE BACKGROUNDS IN GROWTH, PRODUCT, ENGINEERING, OPERATIONS, FINANCE, ANALYTICS AND MORE, DETERMINED TO HELPING STARTUPS SUCCEED LIKE WE DID AT CHIME.
              </p>
            </div>
            
            <div className="bg-green-100 border-2 border-black p-6" style={{boxShadow: '4px 4px 0px 0px #000000'}}>
              <p className="text-xl font-bold text-black leading-relaxed" style={{fontFamily: 'Alexandria, Inter, sans-serif'}}>
                WE AIM TO BE THE OPERATOR SYNDICATE WITH{" "}
                <span className="bg-green-600 border-2 border-black px-2 py-1 text-white">
                  HIGHEST VALUE PER DOLLAR INVESTED.
                </span>{" "}
                COMPANIES WE INVEST IN GET ACCESS TO OUR EXPERIENCE NETWORK, AND OUR COMMITMENT TO EMPOWER IMPACTFUL FIRMS THAT PROVIDE BETTER OPTIONS FOR EVERYDAY PEOPLE.
              </p>
            </div>
            
            <div className="bg-green-200 border-2 border-black p-6" style={{boxShadow: '4px 4px 0px 0px #000000'}}>
              <p className="text-xl font-bold text-black leading-relaxed" style={{fontFamily: 'Alexandria, Inter, sans-serif'}}>
                WE LOVE INVESTING IN AMAZING FOUNDERS OF ALL BACKGROUNDS, AND WE&apos;RE ESPECIALLY COMMITTED TO{" "}
                <span className="bg-green-800 border-2 border-black px-2 py-1 text-white">
                  INVEST IN FUTURE COMPANIES FOUNDED BY CHIME ALUMNI.
                </span>
              </p>
            </div>
          </div>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-12">
          <div className="neo-card p-6 text-center bg-white">
            <div className="text-7xl font-bold text-green-600 mb-4" style={{fontFamily: 'Alexandria, sans-serif', color: '#059669'}}>200+</div>
            <div className="text-lg font-bold text-black" style={{fontFamily: 'Alexandria, sans-serif'}}>CHIME OPERATORS IN 2 DAYS EARLY SYNDICATE</div>
          </div>
          <div className="neo-card p-6 text-center bg-white">
            <div className="text-7xl font-bold text-green-600 mb-4" style={{fontFamily: 'Alexandria, sans-serif', color: '#059669'}}>40%</div>
            <div className="text-lg font-bold text-black" style={{fontFamily: 'Alexandria, sans-serif'}}>HAVE EXPERIENCE SCALING STARTUPS FROM 0 - 100 FTES</div>
          </div>
          <div className="neo-card p-6 text-center bg-white">
            <div className="text-7xl font-bold text-green-600 mb-4" style={{fontFamily: 'Alexandria, sans-serif', color: '#059669'}}>73%</div>
            <div className="text-lg font-bold text-black" style={{fontFamily: 'Alexandria, sans-serif'}}>HAVE DIRECTLY MANAGED TEAMS OF 10+ PEOPLE</div>
          </div>
          <div className="neo-card p-6 text-center bg-white">
            <div className="text-7xl font-bold text-green-600 mb-4" style={{fontFamily: 'Alexandria, sans-serif', color: '#059669'}}>$2.5M</div>
            <div className="text-lg font-bold text-black" style={{fontFamily: 'Alexandria, sans-serif'}}>INVESTING CAPACITY PER YEAR</div>
          </div>
        </div>
      </div>
    </section>
  );
}