import AnimatedSection from "@/components/ui/animated-section";
import SectionHeader from "@/components/ui/section-header";
import PartnerCard from "@/components/ui/partner-card";
import { Partner } from "@/types";

// Partners data with JSX components
const partners: Partner[] = [
  {
    name: "MAIA",
    bio: (
      <>
        BUILDS COOL FINTECH STUFF AT CHIME (AFTER THEY ACQUIRED HER CREDIT-BUILDING STARTUP PINCH). PREVIOUSLY FOUNDED ROCKSBOX (ALSO ACQUIRED). NOW BACKS FOUNDERS AT XFACTOR & PARCEL B. PROBABLY SHARING{" "}
        <span className="bg-green-600 border-2 border-black px-1 text-white">
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
        <span className="bg-green-800 border-2 border-black px-1 text-white">
          <a href="https://interspace.samir.xyz" target="_blank" rel="noopener noreferrer" className="text-white font-bold underline">
            OVER-ENGINEERED FINTECH TAKES
          </a>
        </span>{" "}
        AND LOVES BUILDING MODELS IN PYTHON.
      </>
    ),
    image: "/images/Samir-Desai-min.png",
    imageClassName: "scale-[0.8]"
  }
];

export default function Partners() {
  return (
    <section 
      id="partners" 
      className="neo-section bg-gradient-to-br from-green-100 via-green-200 to-green-300"
      aria-labelledby="partners-heading"
    >
      <div className="w-full">
        <AnimatedSection>
          <SectionHeader
            id="partners-heading"
            title="PARTNERS"
            backgroundColor="bg-white"
            textColor="text-black"
            className="mb-16"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partners.map((partner) => (
              <PartnerCard key={partner.name} partner={partner} />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}