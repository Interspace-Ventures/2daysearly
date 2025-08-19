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

// Clean component setup without artificial performance logging

const MemoizedNavigation = memo(Navigation);
const MemoizedHero = memo(Hero);
const MemoizedPurpose = memo(Purpose);
const MemoizedPrinciples = memo(Principles);
const MemoizedPartners = memo(Partners);
const MemoizedPortfolio = memo(Portfolio);

export default function Home() {
  useEffect(() => {
    // Performance metrics logging
    const loadStartTime = performance.timeOrigin;
    const currentTime = performance.now();
    
    console.log(`🚀 React App Initialized: ${currentTime.toFixed(2)}ms`);
    console.log(`📊 Page Load Start to React: ${(loadStartTime + currentTime - performance.timeOrigin).toFixed(2)}ms`);
    
    // Log when all resources are loaded
    window.addEventListener('load', () => {
      const totalLoadTime = performance.now() - performance.timeOrigin;
      console.log(`✅ Total Load Time: ${totalLoadTime.toFixed(2)}ms`);
      
      // Get navigation timing info
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        console.log(`🌐 DNS Lookup: ${(navigation.domainLookupEnd - navigation.domainLookupStart).toFixed(2)}ms`);
        console.log(`🔗 Connection: ${(navigation.connectEnd - navigation.connectStart).toFixed(2)}ms`);
        console.log(`📥 Response: ${(navigation.responseEnd - navigation.responseStart).toFixed(2)}ms`);
        console.log(`🎨 DOM Complete: ${navigation.domComplete.toFixed(2)}ms`);
      }
    }, { once: true });
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <PageTransition>
        <div className="min-h-screen bg-white">
          <MemoizedNavigation />
          <main className="w-full">
            <MemoizedHero />
            <MemoizedPurpose />
            <MemoizedPrinciples />
            <MemoizedPortfolio />
            <MemoizedPartners />
          </main>
          <Footer />
        </div>
      </PageTransition>
    </LazyMotion>
  );
}