import AnimatedSection from "@/components/ui/animated-section";

export default function Hero() {
  return (
    <section id="hero" className="w-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 pt-24 pb-16">
      <div className="container mx-auto">
        <AnimatedSection className="text-center w-full max-w-4xl mx-auto" delay={0.2}>
          <div className="neo-card p-8 mx-4">
            <div className="bg-yellow-400 neo-border neo-shadow p-6 mb-6">
              <h1 className="text-6xl md:text-8xl font-bold text-black font-mono mb-4 leading-tight">
                2 DAYS EARLY
              </h1>
              <div className="bg-white neo-border neo-shadow p-4 inline-block">
                <p className="text-2xl md:text-3xl font-bold text-black font-mono">
                  OPERATOR SYNDICATE
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-primary neo-border neo-shadow p-4">
                <div className="text-white font-bold text-xl font-mono">INVEST</div>
                <div className="text-white font-mono text-sm">IN THE FUTURE</div>
              </div>
              <div className="bg-secondary neo-border neo-shadow p-4">
                <div className="text-black font-bold text-xl font-mono">BUILD</div>
                <div className="text-black font-mono text-sm">TOGETHER</div>
              </div>
              <div className="bg-accent neo-border neo-shadow p-4">
                <div className="text-white font-bold text-xl font-mono">WIN</div>
                <div className="text-white font-mono text-sm">AS ONE</div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}