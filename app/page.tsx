'use client';

import { memo } from "react";
import Navigation from "@/components/navigation";
import Hero from "@/components/sections/hero";
import Purpose from "@/components/sections/purpose";
import Principles from "@/components/sections/principles";
import Portfolio from "@/components/sections/portfolio";
import Partners from "@/components/sections/partners";
import Footer from "@/components/footer";
import JoinFormModal from "@/components/forms/join-form";
import ReferralCapture from "@/components/referral-capture";

// Memoize section components to avoid unnecessary re-renders
const MemoizedNavigation = memo(Navigation);
const MemoizedHero = memo(Hero);
const MemoizedPurpose = memo(Purpose);
const MemoizedPrinciples = memo(Principles);
const MemoizedPortfolio = memo(Portfolio);
const MemoizedPartners = memo(Partners);

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--carbon-bg)' }}>
      <MemoizedNavigation />
      <main className="site-body-surface">
        <MemoizedHero />
        <MemoizedPurpose />
        <MemoizedPrinciples />
        <MemoizedPortfolio />
        <MemoizedPartners />
      </main>
      <Footer />
      <JoinFormModal />
      <ReferralCapture />
    </div>
  );
}
