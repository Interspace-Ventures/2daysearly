import AnimatedSection from "@/components/ui/animated-section";
import Image from "@/components/ui/image";
import { IMAGES } from "@/lib/constants";

export default function Hero() {
  return (
    <section id="hero" className="w-full bg-gradient-to-br from-green-300 via-green-400 to-green-500 pt-24 pb-16">
      <div className="w-full px-2">
        <AnimatedSection className="text-center w-full" delay={0.2}>
          <div className="flex flex-col items-center justify-center">
            <Image
              src={IMAGES.logo.src}
              alt="2 Days Early Logo"
              className="max-w-full h-32 md:h-48 object-contain"
              fallbackSrc={IMAGES.logo.fallback}
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}