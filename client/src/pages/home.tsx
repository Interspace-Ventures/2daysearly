import { memo, useEffect } from "react";
import Navigation from "@/components/navigation";
import Hero from "@/components/sections/hero";
import Purpose from "@/components/sections/purpose";
import Principles from "@/components/sections/principles";
import Portfolio from "@/components/sections/portfolio";
import Partners from "@/components/sections/partners";
import Footer from "@/components/footer";
import { motion, LazyMotion, domAnimation } from "framer-motion";
import PageTransition from "@/components/ui/page-transition";

// Performance logging utility
const logPerformance = (label: string) => {
  const startTime = performance.now();
  return () => {
    const endTime = performance.now();
    console.log(`[Performance] ${label}: ${(endTime - startTime).toFixed(2)}ms`);
  };
};

const MemoizedNavigation = memo(Navigation);
const MemoizedHero = memo(Hero);
const MemoizedPurpose = memo(Purpose);
const MemoizedPrinciples = memo(Principles);
const MemoizedPartners = memo(Partners);
const MemoizedPortfolio = memo(Portfolio);

export default function Home() {
  useEffect(() => {
    const endPageLoad = logPerformance('Page Load');
    
    // Log individual component render times
    const endNavigation = logPerformance('Navigation Component');
    setTimeout(endNavigation, 0);
    
    const endHero = logPerformance('Hero Component');
    setTimeout(endHero, 0);
    
    const endPurpose = logPerformance('Purpose Component');
    setTimeout(endPurpose, 0);
    
    const endPrinciples = logPerformance('Principles Component');
    setTimeout(endPrinciples, 0);
    
    const endPortfolio = logPerformance('Portfolio Component');
    setTimeout(endPortfolio, 0);
    
    const endPartners = logPerformance('Partners Component');
    setTimeout(endPartners, 0);
    
    setTimeout(endPageLoad, 100);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <PageTransition>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen bg-white"
        >
          <MemoizedNavigation />
          <main className="w-full">
            <MemoizedHero />
            <MemoizedPurpose />
            <MemoizedPrinciples />
            <MemoizedPortfolio />
            <MemoizedPartners />
          </main>
          <Footer />
        </motion.div>
      </PageTransition>
    </LazyMotion>
  );
}