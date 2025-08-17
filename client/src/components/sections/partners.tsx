import { memo } from "react";
import AnimatedSection from "@/components/ui/animated-section";
import Image from "@/components/ui/image";

interface PartnerCardProps {
  name: string;
  bio: React.ReactNode;
  image: string;
  imageClassName?: string;
}

const PartnerCard = memo(({ name, bio, image, imageClassName }: PartnerCardProps) => (
  <div className="neo-card p-8 bg-white text-center">
    <div className="bg-gradient-to-br from-green-400 to-green-600 neo-border neo-shadow p-6 mb-6">
      <div className="w-32 h-32 mx-auto bg-white neo-border rounded-full overflow-hidden">
        <Image
          src={image}
          alt={`${name}'s portrait`}
          className={`w-full h-full object-cover ${imageClassName || ''}`}
          fallbackSrc="/images/2-days-early-logo-2025.png"
        />
      </div>
    </div>
    
    <div className="bg-green-400 neo-border neo-shadow p-4 mb-4">
      <h3 className="text-3xl font-bold text-black font-mono">{name}</h3>
    </div>
    
    <div className="bg-gray-100 neo-border p-4">
      <div className="text-black font-bold font-mono text-sm leading-relaxed text-left">
        {bio}
      </div>
    </div>
  </div>
));

PartnerCard.displayName = "PartnerCard";

const partners = [
  {
    name: "MAIA",
    bio: (
      <>
        BUILDS COOL FINTECH STUFF AT CHIME (AFTER THEY ACQUIRED HER CREDIT-BUILDING STARTUP PINCH). PREVIOUSLY FOUNDED ROCKSBOX (ALSO ACQUIRED). NOW BACKS FOUNDERS AT XFACTOR & PARCEL B. PROBABLY SHARING{" "}
        <span className="bg-green-600 neo-border-thin px-1 text-white">
          <a href="https://x.com/maiab" target="_blank" rel="noopener noreferrer" className="text-white font-bold underline">
            TMI TWEETS
          </a>
        </span>{" "}
        ABOUT RAISING HER TWO AMAZING DAUGHTERS.
      </>
    ),
    image: "/images/Maia.png"
  },
  {
    name: "BAISHI",
    bio: "AT CHIME, SHAPES LENDING PRODUCTS HELPING MILLIONS GET THE CREDIT THEY DESERVE. PREVIOUSLY REVOLUTIONIZED MORTGAGES AT LENDINGHOME AND HOME SEARCH AT COMPASS. BUILDING GREAT FINTECH WHILE RAISING TINY HUMANS.",
    image: "/images/Baishi.png"
  },
  {
    name: "SAMIR",
    bio: (
      <>
        FINANCE NERD BUILDING MONEY SUPERPOWERS AT CASH APP. PREVIOUSLY SHAPED STRATEGIC FINANCE AT HRT, UNIT, AND CHIME AFTER STARTING AT JP MORGAN. WRITES{" "}
        <span className="bg-green-800 neo-border-thin px-1 text-white">
          <a href="https://interspace.samir.xyz" target="_blank" rel="noopener noreferrer" className="text-white font-bold underline">
            OVER-ENGINEERED FINTECH TAKES
          </a>
        </span>{" "}
        AND IS LEARNING TO CODE AT THE SPEED OF THOUGHT WITH REPLIT.
      </>
    ),
    image: "/images/Samir-Desai-min.png",
    imageClassName: "scale-[0.8]"
  }
];

const Partners = () => {
  return (
    <section 
      id="partners" 
      className="neo-section bg-gradient-to-br from-green-100 via-green-200 to-green-300"
      aria-labelledby="partners-heading"
    >
      <div className="max-w-7xl mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="bg-white neo-border neo-shadow-lg p-8 mb-6 inline-block">
              <h2 
                id="partners-heading"
                className="text-4xl md:text-6xl font-bold text-black font-mono"
              >
                PARTNERS
              </h2>
              <div className="bg-green-600 neo-border h-4 mx-auto w-24 mt-4"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partners.map((partner) => (
              <PartnerCard key={partner.name} {...partner} />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default memo(Partners);