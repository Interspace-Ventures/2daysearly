import AnimatedSection from "@/components/ui/animated-section";
import Image from "@/components/ui/image";
import { IMAGES } from "@/lib/constants";

export default function Hero() {
  return (
    <section id="hero" className="w-full bg-gradient-to-br from-green-300 via-green-400 to-green-500 pt-24 pb-16">
      <div className="container mx-auto">
        <AnimatedSection className="text-center w-full max-w-4xl mx-auto" delay={0.2}>
          <div className="bg-white border-2 border-black p-8 mx-4" style={{boxShadow: '4px 4px 0px 0px #000000'}}>
            <div className="bg-green-400 border-2 border-black p-6 mb-6" style={{boxShadow: '4px 4px 0px 0px #000000'}}>
              <div className="flex flex-col items-center justify-center mb-4">
                <Image
                  src={IMAGES.logo.src}
                  alt="2 Days Early Logo"
                  className="max-w-full h-24 md:h-32 object-contain mb-4"
                  fallbackSrc={IMAGES.logo.fallback}
                />
              </div>
              <div className="bg-white border-2 border-black p-4 inline-block" style={{boxShadow: '4px 4px 0px 0px #000000'}}>
                <p className="text-xl md:text-3xl font-bold text-black" style={{fontFamily: 'Alexandria, Inter, sans-serif', color: '#000000'}}>
                  OPERATOR SYNDICATE
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}