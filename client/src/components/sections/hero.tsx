import AnimatedSection from "@/components/ui/animated-section";
import Image from "@/components/ui/image";
import { IMAGES } from "@/lib/constants";

export default function Hero() {
  return (
    <section id="hero" className="w-full bg-gradient-to-br from-green-50 via-green-100 to-green-200 pt-24 pb-4">
      <div className="container-fluid">
        <AnimatedSection className="text-center w-full" delay={0.2}>
          <div className="flex flex-col items-center justify-center">
            <Image
              src={IMAGES.logo.src}
              alt="2 Days Early Logo"
              className="max-w-full object-contain"
              style={{ 
                height: 'clamp(10rem, 18vw, 15rem)',
                maxWidth: 'min(600px, 90vw)'
              }}
              fallbackSrc={IMAGES.logo.fallback}
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}