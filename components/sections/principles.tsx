import { memo } from "react";
import AnimatedSection from "@/components/ui/animated-section";
import { PrinciplesIcon } from "@/components/ui/section-icons";

interface PrincipleItemProps {
  number: number;
  text: string;
}

const PrincipleItem = memo(({ number, text }: PrincipleItemProps) => (
  <div className="neo-border-responsive neo-shadow-responsive frosted-glass overflow-hidden mb-4 h-full" style={{ background: 'var(--carbon-card)', padding: 'clamp(1rem, 3vw, 1.5rem)' }}>
    <div className="flex flex-col items-center text-center" style={{ gap: 'clamp(0.75rem, 3vw, 1.5rem)' }}>
      <div className="neo-border-responsive neo-shadow-responsive" 
           style={{ backgroundColor: 'var(--mint)', padding: 'clamp(0.5rem, 2vw, 1rem)' }}>
        <span className="text-fluid-xl font-bold" style={{ color: 'var(--mint-ink)', fontFamily: 'var(--font-display), var(--font-outfit), sans-serif'}}>
          {number}
        </span>
      </div>
      <div className="w-full">
        <p className="text-fluid-base md:text-fluid-lg leading-relaxed sl-body" style={{ color: 'var(--carbon-text)' }}>
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
      className="section-spacing"
      aria-labelledby="principles-heading"
    >
      <div className="container-fluid">
        <AnimatedSection>
          <div style={{ marginBottom: 'clamp(2rem, 5vw, 4rem)' }}>
            <div className="flex items-center gap-3">
              <PrinciplesIcon className="flex-shrink-0" style={{ color: 'var(--mint)', width: 'clamp(1.75rem, 4vw, 2.5rem)', height: 'clamp(1.75rem, 4vw, 2.5rem)' }} />
              <h2 
                id="principles-heading"
                className="text-fluid-4xl font-bold text-left break-words"
                style={{ color: 'var(--carbon-text)', fontFamily: 'var(--font-display), var(--font-outfit), sans-serif'}}
              >
                PRINCIPLES
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8">
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