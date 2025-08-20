import { memo } from "react";
import AnimatedSection from "@/components/ui/animated-section";

interface PrincipleItemProps {
  number: number;
  text: string;
}

const PrincipleItem = memo(({ number, text }: PrincipleItemProps) => (
  <div className="bg-green-100 neo-border-responsive neo-shadow-responsive mb-4 h-full" style={{ padding: 'clamp(1rem, 3vw, 1.5rem)' }}>
    <div className="flex items-start" style={{ gap: 'clamp(0.75rem, 3vw, 1.5rem)' }}>
      <div className="bg-green-500 neo-border-responsive neo-shadow-responsive flex-shrink-0" 
           style={{ padding: 'clamp(0.5rem, 2vw, 1rem)' }}>
        <span className="text-fluid-2xl font-bold text-white" style={{fontFamily: 'Alexandria, Inter, sans-serif'}}>
          {number}
        </span>
      </div>
      <div className="flex-1">
        <p className="text-fluid-base md:text-fluid-xl text-black leading-relaxed" style={{fontFamily: 'Alexandria, Inter, sans-serif'}}>
          {text}
        </p>
      </div>
    </div>
  </div>
));

PrincipleItem.displayName = "PrincipleItem";

const principles = [
  {
    number: 1,
    text: "We invest in startups that profit alongside users rather than from them",
  },
  {
    number: 2,
    text: "We invest in startups that create high user loyalty, engagement and trust",
  },
  {
    number: 3,
    text: "We invest in startups that use transparent and fair business models to do well by doing good",
  },
];

const Principles = () => {
  return (
    <section 
      id="principles" 
      className="neo-section bg-green-400"
      aria-labelledby="principles-heading"
    >
      <div className="container-fluid">
        <AnimatedSection>
          <div style={{ marginBottom: 'clamp(2rem, 5vw, 4rem)' }}>
            <h2 
              id="principles-heading"
              className="text-fluid-4xl font-bold text-black text-left"
              style={{fontFamily: 'Alexandria, Inter, sans-serif', whiteSpace: 'nowrap'}}
            >
              OPERATING PRINCIPLES
            </h2>
            
            <div className="w-16 h-1 bg-green-500 mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {principles.map((principle, index) => (
              <AnimatedSection
                key={principle.number}
                delay={index * 0.15}
                variant="slideUp"
                duration={0.5}
              >
                <PrincipleItem
                  number={principle.number}
                  text={principle.text}
                />
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default memo(Principles);