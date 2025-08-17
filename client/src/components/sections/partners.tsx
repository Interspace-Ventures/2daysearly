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
      className="neo-section bg-gradient-to-br from-green-100 via-green-200 to-green-300"
      aria-labelledby="partners-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="bg-white border-2 border-black p-8 mb-16 text-center" style={{boxShadow: '8px 8px 0px 0px #000000'}}>
            <h2 
              id="partners-heading"
              className="text-4xl md:text-6xl font-bold text-black mb-4"
              style={{fontFamily: 'Alexandria, Inter, sans-serif'}}
            >
              PARTNERS
            </h2>
            <div className="bg-green-600 border-2 border-black h-4 mx-auto w-32" style={{boxShadow: '4px 4px 0px 0px #000000'}}></div>
          </div>
          
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