import AnimatedSection from "@/components/ui/animated-section";
import { IMAGES } from "@/lib/constants";
import { openTallyForm } from "@/lib/tally";

export default function Hero() {
  return (
    <section id="hero" className="w-full pt-24 pb-12" style={{ backgroundColor: '#4bdc7f' }}>
      <div className="container-fluid">
        <AnimatedSection className="text-center w-full" delay={0.2}>
          <div className="flex flex-col items-center justify-center">
            <img
              src={IMAGES.logo.src}
              alt="2 Days Early Logo"
              className="max-w-full object-contain"
              style={{
                height: 'clamp(8rem, 15vw, 12rem)',
                maxWidth: 'min(560px, 90vw)'
              }}
            />

            <h1
              className="font-bold text-black"
              style={{
                fontFamily: 'Alexandria, Inter, sans-serif',
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                lineHeight: 1.1,
                marginTop: 'clamp(1rem, 3vw, 1.75rem)',
                maxWidth: '20ch'
              }}
            >
              Operator-led investing in early-stage fintech
            </h1>

            <p
              className="text-black"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                marginTop: 'clamp(0.75rem, 2vw, 1rem)',
                maxWidth: '46ch',
                lineHeight: 1.5
              }}
            >
              We&apos;re Chime alumni and fintech operators backing the founders building the future of money.
            </p>

            <div
              className="flex flex-col sm:flex-row items-center justify-center w-full sm:w-auto"
              style={{ gap: 'clamp(0.75rem, 2vw, 1rem)', marginTop: 'clamp(1.5rem, 4vw, 2.25rem)' }}
            >
              <button
                type="button"
                onClick={() => openTallyForm()}
                className="w-full sm:w-auto bg-black text-white border-2 border-black font-bold whitespace-nowrap transition-transform hover:-translate-y-0.5"
                style={{
                  fontFamily: 'Alexandria, Inter, sans-serif',
                  fontSize: 'clamp(0.875rem, 1.6vw, 1rem)',
                  padding: '0.75rem 1.5rem',
                  boxShadow: '4px 4px 0px 0px #166534'
                }}
              >
                APPLY TO JOIN
              </button>

              <a
                href="mailto:pitch@daysearly.com"
                className="w-full sm:w-auto text-center bg-white text-black border-2 border-black font-bold whitespace-nowrap transition-transform hover:-translate-y-0.5"
                style={{
                  fontFamily: 'Alexandria, Inter, sans-serif',
                  fontSize: 'clamp(0.875rem, 1.6vw, 1rem)',
                  padding: '0.75rem 1.5rem',
                  boxShadow: '4px 4px 0px 0px #166534',
                  textDecoration: 'none'
                }}
              >
                PITCH YOUR STARTUP
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
