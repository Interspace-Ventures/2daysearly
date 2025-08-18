import { memo } from "react";
import AnimatedSection from "@/components/ui/animated-section";

interface PrincipleItemProps {
  number: number;
  text: string;
}

const PrincipleItem = memo(({ number, text }: PrincipleItemProps) => (
  <div className="bg-white neo-border-responsive neo-shadow-responsive card-responsive-sm mb-6">
    <div className="flex items-start" style={{ gap: 'clamp(1rem, 4vw, 2rem)' }}>
      <div className="bg-green-500 neo-border-responsive neo-shadow-responsive flex-shrink-0" 
           style={{ padding: 'clamp(0.75rem, 3vw, 1.5rem)' }}>
        <span className="text-fluid-3xl font-bold text-white" style={{fontFamily: 'Alexandria, Inter, sans-serif'}}>
          {number}
        </span>
      </div>
      <div className="flex-1">
        <p className="text-fluid-xl font-bold text-black leading-relaxed" style={{fontFamily: 'Alexandria, Inter, sans-serif'}}>
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
    text: "We recognize the value of profiting with users, rather than from them",
  },
  {
    number: 2,
    text: "We invest in businesses that create high member loyalty and earn trust",
  },
  {
    number: 3,
    text: "We believe in doing well by doing good with transparent and sustainable operating models",
  },
];

const Principles = () => {
  return (
    <section 
      id="principles" 
      className="neo-section bg-gradient-to-br from-green-200 via-green-300 to-green-400"
      aria-labelledby="principles-heading"
    >
      <div className="container-fluid">
        <AnimatedSection>
          <div className="bg-white neo-border-responsive neo-shadow-lg-responsive text-center card-responsive mb-8">
            <h2 
              id="principles-heading"
              className="text-fluid-5xl font-bold text-black mb-4"
              style={{fontFamily: 'Alexandria, Inter, sans-serif'}}
            >
              OPERATING PRINCIPLES
            </h2>
            <div className="bg-green-600 neo-border-responsive mx-auto" 
                 style={{ height: 'clamp(0.75rem, 2vw, 1rem)', width: 'clamp(6rem, 15vw, 8rem)', boxShadow: 'clamp(2px, 0.5vw, 4px) clamp(2px, 0.5vw, 4px) 0px 0px #000000' }}></div>
          </div>
          
          <div className="space-y-6">
            {principles.map((principle) => (
              <PrincipleItem
                key={principle.number}
                number={principle.number}
                text={principle.text}
              />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default memo(Principles);