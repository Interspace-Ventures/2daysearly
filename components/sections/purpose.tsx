import AnimatedSection from "@/components/ui/animated-section";
import { PurposeIcon } from "@/components/ui/section-icons";

export default function Purpose() {
  return (
    <section 
      id="purpose" 
      style={{ paddingTop: '1rem', paddingBottom: '3rem' }}
      aria-labelledby="purpose-heading"
    >
      <div className="container-fluid">
        <AnimatedSection>
          <div style={{ marginBottom: 'clamp(1rem, 3vw, 2rem)' }}>
            <div className="flex items-center gap-3 mb-2">
              <PurposeIcon className="flex-shrink-0" style={{ color: 'var(--mint)', width: 'clamp(1.75rem, 4vw, 2.5rem)', height: 'clamp(1.75rem, 4vw, 2.5rem)' }} />
              <h2 
                id="purpose-heading"
                className="text-fluid-4xl font-bold text-left"
                style={{ color: 'var(--carbon-text)', fontFamily: 'var(--font-archivo), var(--font-outfit), sans-serif'}}
              >
                PURPOSE
              </h2>
            </div>
            
            <div className="w-16 h-1 mb-2" style={{ backgroundColor: 'var(--mint)' }}></div>
            
            <h3 
              className="text-fluid-xl font-bold"
              style={{ color: 'var(--carbon-text)', fontFamily: 'var(--font-archivo), var(--font-outfit), sans-serif'}}
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
                    <span className="sl-pill px-2 py-1">
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
                    <span className="sl-pill px-2 py-1">
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
                    <span className="sl-pill px-2 py-1">
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
                <div className="glass-sheen overflow-hidden border-2 p-3 flex flex-col justify-start h-full" style={{ background: 'var(--carbon-card)', borderColor: 'var(--carbon-border)', boxShadow: '2px 2px 0px 0px var(--carbon-shadow)'}}>
                  <p className="text-fluid-base leading-relaxed sl-body" style={{ color: 'var(--carbon-text)' }}>
                    {card.text}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
        
        {/* Small spacing between purpose cards and KPI cards */}
        <div style={{ height: 'clamp(1.5rem, 3vw, 2.5rem)' }} />
        
        <AnimatedSection delay={0.6}>
          <div 
            className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mt-6"
          >
            {[
              { number: "200+", text: "Chime operators in 2 Days Early syndicate" },
              { number: "60%", text: "have scaled startups from 0 - 100 FTEs" },
              { number: "73%", text: "have directly managed teams of 10+ people" },
              { number: "$2.5M", text: "investing capacity per year" }
            ].map((kpi, index) => (
              <AnimatedSection key={index} delay={0.8 + (index * 0.1)} variant="slideUp">
                <div className="neo-border neo-shadow glass-sheen overflow-hidden p-2 text-center h-full flex flex-col justify-center" style={{ background: 'var(--carbon-card)' }}>
                  <div className="text-fluid-2xl font-bold mb-1" style={{fontFamily: 'var(--font-archivo), var(--font-outfit), sans-serif', color: 'var(--mint)'}}>{kpi.number}</div>
                  <div className="text-fluid-xs sl-body" style={{ color: 'var(--carbon-muted)' }}>{kpi.text}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}