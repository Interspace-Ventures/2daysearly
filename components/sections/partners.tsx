import AnimatedSection from "@/components/ui/animated-section";
import PartnerCard from "@/components/ui/partner-card";
import { PartnersIcon } from "@/components/ui/section-icons";
import { Partner } from "@/types";

// Partners data with JSX components
const partners: Partner[] = [
  {
    name: "MAIA",
    bio: (
      <>
        Builds cool fintech stuff at Chime (after they acquired her credit-building startup Pinch). Previously founded Rocksbox (also acquired). Now backs founders at XFactor & Parcel B. Probably sharing{" "}
        <span className="bg-green-600 border-2 border-black px-1 text-white">
          <a href="https://x.com/maiab" target="_blank" rel="noopener noreferrer" className="text-white font-bold underline">
            TMI tweets
          </a>
        </span>{" "}
        about raising her two amazing daughters.
      </>
    ),
    image: "/images/Maia.png"
  },
  {
    name: "BAISHI",
    bio: (
      <>
        At Chime, shapes lending products helping millions get the credit they deserve. Previously revolutionized mortgages at LendingHome and home search at Compass.{" "}
        <span className="bg-green-600 border-2 border-black px-1 text-white font-bold">
          Building great fintech while raising tiny humans.
        </span>
      </>
    ),
    image: "/images/Baishi.png"
  },
  {
    name: "SAMIR",
    bio: (
      <>
        Building{" "}
        <span className="bg-green-800 border-2 border-black px-1 text-white">
          <a href="https://interspace.ventures" target="_blank" rel="noopener noreferrer" className="text-white font-bold underline">
            Interspace Ventures
          </a>
        </span>
        . Previously led strategic finance at Block, HRT, Unit, and Chime after starting at JP Morgan. Writes{" "}
        <span className="bg-green-800 border-2 border-black px-1 text-white">
          <a href="https://interspace.samir.xyz" target="_blank" rel="noopener noreferrer" className="text-white font-bold underline">
            over-engineered fintech takes
          </a>
        </span>{" "}
        and is learning to raise a fintech-nerd newborn.
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
      style={{ background: 'linear-gradient(180deg, #1a7a3e 0%, #134e2b 100%)', paddingTop: '2rem', paddingBottom: '2rem' }}
      aria-labelledby="partners-heading"
    >
      <div className="container-fluid">
        <AnimatedSection>
          <div style={{ marginBottom: 'clamp(1rem, 3vw, 2rem)' }}>
            <div className="flex items-center gap-3">
              <PartnersIcon className="text-white flex-shrink-0" style={{ width: 'clamp(1.75rem, 4vw, 2.5rem)', height: 'clamp(1.75rem, 4vw, 2.5rem)' }} />
              <h2 
                id="partners-heading"
                className="text-fluid-4xl font-bold text-white text-left"
                style={{fontFamily: 'var(--font-archivo), var(--font-outfit), sans-serif'}}
              >
                PARTNERS
              </h2>
            </div>
            
            <div className="w-16 h-1 bg-green-500 mt-2"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {partners.map((partner, index) => (
              <AnimatedSection
                key={partner.name}
                delay={index * 0.15}
                variant="slideUp"
                duration={0.5}
              >
                <PartnerCard partner={partner} />
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}