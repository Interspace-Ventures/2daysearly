import { memo } from "react";
import AnimatedSection from "@/components/ui/animated-section";
import { PrinciplesIcon } from "@/components/ui/section-icons";

interface PrincipleItemProps {
  number: number;
  label: string;
  text: string;
}

const PrincipleRow = memo(({ number, label, text }: PrincipleItemProps) => (
  <div
    className="group grid grid-cols-[auto_1fr] items-start border-t-2"
    style={{
      borderColor: "var(--carbon-border)",
      columnGap: "clamp(1rem, 4vw, 3rem)",
      paddingTop: "clamp(1.5rem, 4vw, 2.5rem)",
      paddingBottom: "clamp(1.5rem, 4vw, 2.5rem)",
    }}
  >
    <span
      className="sl-display font-bold leading-none tabular-nums transition-transform duration-300 group-hover:-translate-y-1"
      style={{ color: "var(--mint)", fontSize: "clamp(2rem, 6vw, 3.5rem)" }}
      aria-hidden="true"
    >
      {String(number).padStart(2, "0")}
    </span>
    <div className="flex flex-col" style={{ gap: "clamp(0.4rem, 1.5vw, 0.75rem)" }}>
      <span className="sl-label text-fluid-xs" style={{ color: "var(--mint)" }}>
        {label}
      </span>
      <p
        className="sl-body text-fluid-lg md:text-fluid-xl leading-snug"
        style={{ color: "var(--carbon-text)", maxWidth: "52ch" }}
      >
        {text}
      </p>
    </div>
  </div>
));

PrincipleRow.displayName = "PrincipleRow";

const principles = [
  {
    number: 1,
    label: "Aligned incentives",
    text: "We invest in startups that profit alongside users rather than from them",
  },
  {
    number: 2,
    label: "Trust & loyalty",
    text: "We invest in startups that create high user loyalty, engagement and trust",
  },
  {
    number: 3,
    label: "Fair by design",
    text: "We invest in startups that use transparent and fair business models to do well by doing good",
  },
];

const Principles = () => {
  return (
    <section
      id="principles"
      className="section-spacing"
      aria-labelledby="principles-heading"
    >
      <div className="container-fluid">
        <AnimatedSection>
          <div style={{ marginBottom: "clamp(2rem, 5vw, 4rem)" }}>
            <div className="flex items-center gap-3">
              <PrinciplesIcon
                className="flex-shrink-0"
                style={{
                  color: "var(--mint)",
                  width: "clamp(1.75rem, 4vw, 2.5rem)",
                  height: "clamp(1.75rem, 4vw, 2.5rem)",
                }}
              />
              <h2
                id="principles-heading"
                className="text-fluid-4xl font-bold text-left break-words"
                style={{
                  color: "var(--carbon-text)",
                  fontFamily: "var(--font-display), var(--font-outfit), sans-serif",
                }}
              >
                PRINCIPLES
              </h2>
            </div>
          </div>

          <div style={{ borderBottom: "2px solid var(--carbon-border)" }}>
            {principles.map((principle, index) => (
              <AnimatedSection
                key={principle.number}
                delay={index * 0.12}
                variant="slideUp"
                duration={0.5}
              >
                <PrincipleRow
                  number={principle.number}
                  label={principle.label}
                  text={principle.text}
                />
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default memo(Principles);
