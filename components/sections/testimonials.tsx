import { memo } from "react";
import AnimatedSection from "@/components/ui/animated-section";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

// PLACEHOLDER testimonials — replace the quotes, names, roles, and companies
// with real founder quotes before publishing.
const testimonials: Testimonial[] = [
  {
    quote:
      "They wrote the first check and then actually showed up — intros, hiring help, and honest feedback when we needed it most. The most operator-minded investors on our cap table.",
    name: "Founder Name",
    role: "Co-founder & CEO",
    company: "Portfolio Company",
  },
  {
    quote:
      "Having people who've built fintech at scale in your corner changes everything. They get the hard parts of the work because they've lived them.",
    name: "Founder Name",
    role: "Co-founder",
    company: "Portfolio Company",
  },
];

const QuoteMark = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="#16a34a"
    aria-hidden="true"
    className="flex-shrink-0"
  >
    <path d="M7.17 6A5.17 5.17 0 002 11.17V18h6.83v-6.83H5.5A1.67 1.67 0 017.17 9.5V6zm9 0a5.17 5.17 0 00-5.17 5.17V18h6.83v-6.83H14.5a1.67 1.67 0 011.67-1.67V6z" />
  </svg>
);

const TestimonialCard = memo(({ quote, name, role, company }: Testimonial) => (
  <div
    className="bg-white border-2 border-black h-full flex flex-col"
    style={{ padding: "clamp(1.25rem, 3vw, 2rem)", boxShadow: "8px 8px 0px 0px #166534" }}
  >
    <QuoteMark />
    <p
      className="text-fluid-base md:text-fluid-lg text-black leading-relaxed mt-4 flex-grow"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {quote}
    </p>
    <div className="mt-6 pt-4 border-t-2 border-black">
      <div className="font-bold text-black" style={{ fontFamily: "Alexandria, Inter, sans-serif" }}>
        {name}
      </div>
      <div className="text-sm text-gray-700" style={{ fontFamily: "Inter, sans-serif" }}>
        {role}, {company}
      </div>
    </div>
  </div>
));

TestimonialCard.displayName = "TestimonialCard";

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      style={{ backgroundColor: "#4bdc7f", paddingTop: "3rem", paddingBottom: "3rem" }}
      aria-labelledby="testimonials-heading"
    >
      <div className="container-fluid">
        <AnimatedSection>
          <div style={{ marginBottom: "clamp(1.5rem, 4vw, 3rem)" }}>
            <h2
              id="testimonials-heading"
              className="text-fluid-4xl font-bold text-black text-left break-words"
              style={{ fontFamily: "Alexandria, Inter, sans-serif" }}
            >
              WHAT FOUNDERS SAY
            </h2>
            <div className="w-16 h-1 bg-green-800 mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection
                key={`${testimonial.name}-${index}`}
                delay={index * 0.15}
                variant="slideUp"
                duration={0.5}
              >
                <TestimonialCard {...testimonial} />
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default memo(Testimonials);
