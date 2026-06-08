import AnimatedSection from "@/components/ui/animated-section";
import { IMAGES } from "@/lib/constants";
import { openTallyForm } from "@/lib/tally";

export default function Hero() {
  return (
    <section id="hero" className="w-full pt-24 pb-12">
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
              className="font-bold"
              style={{
                color: 'var(--carbon-text)',
                fontFamily: 'var(--font-display), var(--font-outfit), sans-serif',
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                lineHeight: 1.1,
                marginTop: 'clamp(1rem, 3vw, 1.75rem)',
                maxWidth: '20ch'
              }}
            >
              Operator-led investing in early-stage fintech
            </h1>

            <p
              style={{
                color: 'var(--carbon-muted)',
                fontFamily: 'var(--font-outfit), sans-serif',
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                marginTop: 'clamp(0.75rem, 2vw, 1rem)',
                maxWidth: '46ch',
                lineHeight: 1.5
              }}
            >
              We&apos;re Chime alumni and fintech operators backing the founders building the future of money.
            </p>

            <div
              className="flex flex-row flex-wrap items-center justify-center"
              style={{ gap: 'clamp(0.75rem, 2vw, 1rem)', marginTop: 'clamp(1.5rem, 4vw, 2.25rem)' }}
            >
              <button
                type="button"
                onClick={() => openTallyForm()}
                className="sl-nav-cta sl-label w-auto font-bold whitespace-nowrap"
                style={{
                  fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)',
                  padding: '0.75rem 1.5rem'
                }}
              >
                JOIN
              </button>

              <a
                href="mailto:pitch@daysearly.com"
                className="sl-nav-ghost sl-label w-auto text-center font-bold whitespace-nowrap"
                style={{
                  fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)',
                  padding: '0.75rem 1.5rem',
                  textDecoration: 'none',
                  boxShadow: '3px 3px 0px 0px var(--carbon-shadow)'
                }}
              >
                PITCH
              </a>

              <a
                href="https://posts.interspace.ventures/p/101-everything-you-wanted-to-know"
                target="_blank"
                rel="noopener noreferrer"
                className="sl-nav-ghost sl-label w-auto text-center font-bold whitespace-nowrap"
                style={{
                  fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)',
                  padding: '0.75rem 1.5rem',
                  textDecoration: 'none',
                  boxShadow: '3px 3px 0px 0px var(--carbon-shadow)'
                }}
              >
                LEARN
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
