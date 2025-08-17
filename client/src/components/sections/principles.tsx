import { memo } from "react";
import AnimatedSection from "@/components/ui/animated-section";

interface PrincipleItemProps {
  number: number;
  text: string;
}

const PrincipleItem = memo(({ number, text }: PrincipleItemProps) => (
  <div className="bg-white border-2 border-black p-6 mb-6" style={{boxShadow: '4px 4px 0px 0px #000000'}}>
    <div className="flex items-start gap-6">
      <div className="bg-green-500 border-2 border-black p-4 flex-shrink-0" style={{boxShadow: '4px 4px 0px 0px #000000'}}>
        <span className="text-4xl font-bold text-white" style={{fontFamily: 'Alexandria, Inter, sans-serif'}}>
          {number}
        </span>
      </div>
      <div className="flex-1">
        <p className="text-2xl font-bold text-black leading-relaxed" style={{fontFamily: 'Alexandria, Inter, sans-serif'}}>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="bg-white border-2 border-black p-8 mb-8 text-center" style={{boxShadow: '8px 8px 0px 0px #000000'}}>
            <h2 
              id="principles-heading"
              className="text-4xl md:text-6xl font-bold text-black mb-4"
              style={{fontFamily: 'Alexandria, Inter, sans-serif'}}
            >
              OPERATING PRINCIPLES
            </h2>
            <div className="bg-green-600 border-2 border-black h-4 mx-auto w-32" style={{boxShadow: '4px 4px 0px 0px #000000'}}></div>
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