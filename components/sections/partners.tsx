import AnimatedSection from "@/components/ui/animated-section";
import PartnerCard from "@/components/ui/partner-card";
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
    bio: "At Chime, shapes lending products helping millions get the credit they deserve. Previously revolutionized mortgages at LendingHome and home search at Compass. Building great fintech while raising tiny humans.",
    image: "/images/Baishi.png"
  },
  {
    name: "SAMIR",
    bio: (
      <>
        Finance nerd building money superpowers at Cash App. Previously shaped strategic finance at HRT, Unit, and Chime after starting at JP Morgan. Writes{" "}
        <span className="bg-green-800 border-2 border-black px-1 text-white">
          <a href="https://interspace.samir.xyz" target="_blank" rel="noopener noreferrer" className="text-white font-bold underline">
            over-engineered fintech takes
          </a>
        </span>{" "}
        and loves building models in Python.
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
      style={{ backgroundColor: '#166534', paddingTop: '2rem', paddingBottom: '2rem' }}
      aria-labelledby="partners-heading"
    >
      <div className="container-fluid">
        <AnimatedSection>
          <div style={{ marginBottom: 'clamp(1rem, 3vw, 2rem)' }}>
            <h2 
              id="partners-heading"
              className="text-fluid-4xl font-bold text-white text-left"
              style={{fontFamily: 'Alexandria, Inter, sans-serif'}}
            >
              PARTNERS
            </h2>
            
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