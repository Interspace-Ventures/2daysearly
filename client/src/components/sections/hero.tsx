import AnimatedSection from "@/components/ui/animated-section";

export default function Hero() {
  return (
    <section id="hero" className="w-full bg-gradient-to-br from-green-300 via-green-400 to-green-500 pt-24 pb-16">
      <div className="container mx-auto">
        <AnimatedSection className="text-center w-full max-w-4xl mx-auto" delay={0.2}>
          <div className="bg-white border-2 border-black p-8 mx-4" style={{boxShadow: '4px 4px 0px 0px #000000'}}>
            <div className="bg-green-400 border-2 border-black p-6 mb-6" style={{boxShadow: '4px 4px 0px 0px #000000'}}>
              <h1 className="text-4xl md:text-8xl font-bold text-black mb-4 leading-tight" style={{fontFamily: 'Alexandria, Inter, sans-serif', color: '#000000'}}>
                2 DAYS EARLY
              </h1>
              <div className="bg-white border-2 border-black p-4 inline-block" style={{boxShadow: '4px 4px 0px 0px #000000'}}>
                <p className="text-xl md:text-3xl font-bold text-black" style={{fontFamily: 'Alexandria, Inter, sans-serif', color: '#000000'}}>
                  OPERATOR SYNDICATE
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-green-500 border-2 border-black p-4" style={{boxShadow: '4px 4px 0px 0px #000000'}}>
                <div className="text-white font-bold text-lg" style={{fontFamily: 'Alexandria, Inter, sans-serif', color: '#ffffff'}}>INVEST</div>
                <div className="text-white text-sm" style={{fontFamily: 'Inter, sans-serif', color: '#ffffff'}}>IN THE FUTURE</div>
              </div>
              <div className="bg-green-600 border-2 border-black p-4" style={{boxShadow: '4px 4px 0px 0px #000000'}}>
                <div className="text-white font-bold text-lg" style={{fontFamily: 'Alexandria, Inter, sans-serif', color: '#ffffff'}}>BUILD</div>
                <div className="text-white text-sm" style={{fontFamily: 'Inter, sans-serif', color: '#ffffff'}}>TOGETHER</div>
              </div>
              <div className="bg-green-800 border-2 border-black p-4" style={{boxShadow: '4px 4px 0px 0px #000000'}}>
                <div className="text-white font-bold text-lg" style={{fontFamily: 'Alexandria, Inter, sans-serif', color: '#ffffff'}}>WIN</div>
                <div className="text-white text-sm" style={{fontFamily: 'Inter, sans-serif', color: '#ffffff'}}>AS ONE</div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}