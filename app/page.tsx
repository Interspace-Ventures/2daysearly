'use client';

import { memo } from "react";
import Navigation from "@/components/navigation";
import Hero from "@/components/sections/hero";
import Purpose from "@/components/sections/purpose";
import Principles from "@/components/sections/principles";
import Portfolio from "@/components/sections/portfolio";
import Partners from "@/components/sections/partners";
import Footer from "@/components/footer";

// Memoize section components to avoid unnecessary re-renders
const MemoizedNavigation = memo(Navigation);
const MemoizedHero = memo(Hero);
const MemoizedPurpose = memo(Purpose);
const MemoizedPrinciples = memo(Principles);
const MemoizedPortfolio = memo(Portfolio);
const MemoizedPartners = memo(Partners);

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <MemoizedNavigation />
      <main>
        <MemoizedHero />
        <MemoizedPurpose />
        <MemoizedPrinciples />
        <MemoizedPortfolio />
        <MemoizedPartners />
        {/* Visual spacer bridging the dark-green Partners section into the footer */}
        <section aria-hidden="true" style={{ backgroundColor: '#166534', height: '200px' }} />
      </main>
      <Footer />
    </div>
  );
}