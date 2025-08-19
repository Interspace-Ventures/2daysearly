import AnimatedSection from "@/components/ui/animated-section";

export default function Purpose() {
  return (
    <section 
      id="purpose" 
      className="neo-section bg-white"
      aria-labelledby="purpose-heading"
    >
      <div className="container-fluid">
        <AnimatedSection>
          <div 
            className="bg-white text-center neo-border-responsive neo-shadow-lg-responsive"
            style={{ 
              padding: 'clamp(1.5rem, 4vw, 2.5rem)', 
              marginBottom: 'clamp(2rem, 5vw, 4rem)'
            }}
          >
            <h2 
              id="purpose-heading"
              className="text-fluid-4xl font-bold text-black mb-4"
              style={{fontFamily: 'Alexandria, Inter, sans-serif'}}
            >
              PURPOSE
            </h2>
            
            <div className="w-16 h-1 bg-green-500 mx-auto mb-4"></div>
            
            <h3 
              className="text-fluid-2xl font-bold text-black"
              style={{fontFamily: 'Alexandria, Inter, sans-serif'}}
            >
              By operators. For operators.
            </h3>
          </div>
          
          <div className="space-y-6">
            <div className="p-6" style={{backgroundColor: '#bbf7d0', boxShadow: '4px 4px 0px 0px #000000'}}>
              <p className="text-fluid-lg text-black leading-relaxed" style={{fontFamily: 'Alexandria, Inter, sans-serif'}}>
                We are a community of{" "}
                <span className="bg-green-400 border-2 border-black px-2 py-1 text-white font-bold">
                  entrepreneurs, investors and operators
                </span>
                . We have backgrounds in growth, product, engineering, operations, finance, analytics and more, determined to helping startups succeed like we did at Chime.
              </p>
            </div>
            
            <div className="p-6" style={{backgroundColor: '#bbf7d0', boxShadow: '4px 4px 0px 0px #000000'}}>
              <p className="text-fluid-lg text-black leading-relaxed" style={{fontFamily: 'Alexandria, Inter, sans-serif'}}>
                We aim to be the operator syndicate with{" "}
                <span className="bg-green-600 border-2 border-black px-2 py-1 text-white font-bold">
                  highest value per dollar invested
                </span>
                . Companies we invest in get access to our experience network, and our commitment to empower impactful firms that provide better options for everyday people.
              </p>
            </div>
            
            <div className="p-6" style={{backgroundColor: '#bbf7d0', boxShadow: '4px 4px 0px 0px #000000'}}>
              <p className="text-fluid-lg text-black leading-relaxed" style={{fontFamily: 'Alexandria, Inter, sans-serif'}}>
                We love investing in amazing founders of all backgrounds, and we're especially committed to{" "}
                <span className="bg-green-800 border-2 border-black px-2 py-1 text-white font-bold">
                  invest in future companies founded by Chime alumni
                </span>
                .
              </p>
            </div>
          </div>
        </AnimatedSection>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 mt-12">
          <div className="neo-card p-2 text-center bg-white">
            <div className="text-fluid-3xl font-bold text-green-600 mb-1" style={{fontFamily: 'Alexandria, sans-serif', color: '#059669'}}>200+</div>
            <div className="text-fluid-xs text-black" style={{fontFamily: 'Alexandria, sans-serif'}}>Chime operators in 2 Days Early syndicate</div>
          </div>
          <div className="neo-card p-2 text-center bg-white">
            <div className="text-fluid-3xl font-bold text-green-600 mb-1" style={{fontFamily: 'Alexandria, sans-serif', color: '#059669'}}>40%</div>
            <div className="text-fluid-xs text-black" style={{fontFamily: 'Alexandria, sans-serif'}}>have experience scaling startups from 0 - 100 FTEs</div>
          </div>
          <div className="neo-card p-2 text-center bg-white">
            <div className="text-fluid-3xl font-bold text-green-600 mb-1" style={{fontFamily: 'Alexandria, sans-serif', color: '#059669'}}>73%</div>
            <div className="text-fluid-xs text-black" style={{fontFamily: 'Alexandria, sans-serif'}}>have directly managed teams of 10+ people</div>
          </div>
          <div className="neo-card p-2 text-center bg-white">
            <div className="text-fluid-3xl font-bold text-green-600 mb-1" style={{fontFamily: 'Alexandria, sans-serif', color: '#059669'}}>$2.5M</div>
            <div className="text-fluid-xs text-black" style={{fontFamily: 'Alexandria, sans-serif'}}>investing capacity per year</div>
          </div>
        </div>
      </div>
    </section>
  );
}