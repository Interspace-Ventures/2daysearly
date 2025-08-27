import AnimatedSection from "@/components/ui/animated-section";

export default function Purpose() {
  return (
    <section 
      id="purpose" 
      className="bg-gradient-to-br from-green-100 via-green-200 to-green-300"
      style={{ paddingTop: '1rem', paddingBottom: '3rem' }}
      aria-labelledby="purpose-heading"
    >
      <div className="container-fluid">
        <AnimatedSection>
          <div style={{ marginBottom: 'clamp(1rem, 3vw, 2rem)' }} className="text-center">
            <h2 
              id="purpose-heading"
              className="text-fluid-4xl font-bold text-black mb-2 text-left"
              style={{fontFamily: 'Alexandria, Inter, sans-serif'}}
            >
              PURPOSE
            </h2>
            
            <div className="w-16 h-1 bg-green-500 mx-auto mb-2"></div>
            
            <h3 
              className="text-fluid-xl font-bold text-black"
              style={{fontFamily: 'Alexandria, Inter, sans-serif'}}
            >
              By operators. For operators.
            </h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                text: (
                  <>
                    We are a community of{" "}
                    <span className="bg-green-400 border-2 border-black px-2 py-1 text-white font-bold">
                      entrepreneurs, investors and operators
                    </span>
                    . We have backgrounds in growth, product, engineering, operations, and finance, determined to help startups succeed.
                  </>
                )
              },
              {
                text: (
                  <>
                    We aim to be the operator syndicate with{" "}
                    <span className="bg-green-600 border-2 border-black px-2 py-1 text-white font-bold">
                      highest value per dollar invested
                    </span>
                    . Companies we invest in get access to our experience network and commitment to empowering impactful firms.
                  </>
                )
              },
              {
                text: (
                  <>
                    We love investing in amazing founders of all backgrounds, and we're especially committed to{" "}
                    <span className="bg-green-800 border-2 border-black px-2 py-1 text-white font-bold">
                      investing in companies founded by Chime alumni
                    </span>
                    {" "}and supporting the next generation of operators.
                  </>
                )
              }
            ].map((card, index) => (
              <AnimatedSection
                key={index}
                delay={index * 0.15}
                variant="slideUp"
                duration={0.5}
              >
                <div className="bg-white border-2 border-black p-3 flex flex-col justify-start h-full" style={{backgroundColor: '#ffffff', boxShadow: '2px 2px 0px 0px #166534'}}>
                  <p className="text-fluid-base text-black leading-relaxed" style={{fontFamily: 'Alexandria, Inter, sans-serif'}}>
                    {card.text}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
        
        <div 
          className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mt-6"
        >
          <div className="neo-border neo-shadow p-2 text-center bg-white h-full flex flex-col justify-center">
            <div className="text-fluid-2xl font-bold text-green-600 mb-1" style={{fontFamily: 'Alexandria, sans-serif', color: '#059669'}}>200+</div>
            <div className="text-fluid-xs text-black" style={{fontFamily: 'Alexandria, sans-serif'}}>Chime operators in 2 Days Early syndicate</div>
          </div>
          <div className="neo-border neo-shadow p-2 text-center bg-white h-full flex flex-col justify-center">
            <div className="text-fluid-2xl font-bold text-green-600 mb-1" style={{fontFamily: 'Alexandria, sans-serif', color: '#059669'}}>60%</div>
            <div className="text-fluid-xs text-black" style={{fontFamily: 'Alexandria, sans-serif'}}>have scaled startups from 0 - 100 FTEs</div>
          </div>
          <div className="neo-border neo-shadow p-2 text-center bg-white h-full flex flex-col justify-center">
            <div className="text-fluid-2xl font-bold text-green-600 mb-1" style={{fontFamily: 'Alexandria, sans-serif', color: '#059669'}}>73%</div>
            <div className="text-fluid-xs text-black" style={{fontFamily: 'Alexandria, sans-serif'}}>have directly managed teams of 10+ people</div>
          </div>
          <div className="neo-border neo-shadow p-2 text-center bg-white h-full flex flex-col justify-center">
            <div className="text-fluid-2xl font-bold text-green-600 mb-1" style={{fontFamily: 'Alexandria, sans-serif', color: '#059669'}}>$2.5M</div>
            <div className="text-fluid-xs text-black" style={{fontFamily: 'Alexandria, sans-serif'}}>investing capacity per year</div>
          </div>
        </div>
      </div>
    </section>
  );
}