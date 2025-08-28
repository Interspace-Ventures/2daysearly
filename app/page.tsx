'use client';

import { memo, useEffect } from "react";
import Navigation from "@/components/navigation";
import Hero from "@/components/sections/hero";
import Purpose from "@/components/sections/purpose";
import Principles from "@/components/sections/principles";
import Portfolio from "@/components/sections/portfolio";
import Partners from "@/components/sections/partners";
import Footer from "@/components/footer";

// Memoize components for better performance
const MemoizedNavigation = memo(Navigation);
const MemoizedHero = memo(Hero);
const MemoizedPurpose = memo(Purpose);
const MemoizedPrinciples = memo(Principles);
const MemoizedPartners = memo(Partners);
const MemoizedPortfolio = memo(Portfolio);

export default function Home() {
  useEffect(() => {
    // Performance metrics logging
    const currentTime = performance.now();
    
    console.log(`🚀 Next.js App Hydrated: ${currentTime.toFixed(2)}ms`);
    
    // Log when all resources are loaded
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        const totalLoadTime = performance.now();
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
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <MemoizedNavigation />
      <main>
        <MemoizedHero />
        <MemoizedPurpose />
        <MemoizedPrinciples />
        <MemoizedPortfolio />
        <MemoizedPartners />
        {/* Spacer section with appropriate background color */}
        <section style={{ backgroundColor: '#166534', height: 'clamp(6rem, 12vw, 10rem)' }} />
      </main>
      <Footer />
    </div>
  );
}