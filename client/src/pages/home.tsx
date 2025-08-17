import { memo } from "react";
import Navigation from "@/components/navigation";
import Hero from "@/components/sections/hero";
import Purpose from "@/components/sections/purpose";
import Principles from "@/components/sections/principles";
import Portfolio from "@/components/sections/portfolio";
import Partners from "@/components/sections/partners";
import Footer from "@/components/footer";
import { motion, LazyMotion, domAnimation } from "framer-motion";
import PageTransition from "@/components/ui/page-transition";

const MemoizedNavigation = memo(Navigation);
const MemoizedHero = memo(Hero);
const MemoizedPurpose = memo(Purpose);
const MemoizedPrinciples = memo(Principles);
const MemoizedPartners = memo(Partners);
const MemoizedPortfolio = memo(Portfolio);

export default function Home() {
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