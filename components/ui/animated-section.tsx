import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: "fadeIn" | "slideUp" | "scaleUp";
  duration?: number;
}

const variants: Record<string, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  }
};

export default function AnimatedSection({ 
  children, 
  className = "", 
  delay = 0,
  variant = "slideUp",
  duration = 0.6 
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px",
    amount: 0.3
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[variant]}
      transition={{ 
        duration, 
        ease: [0.25, 0.1, 0.25, 1],
        delay 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}