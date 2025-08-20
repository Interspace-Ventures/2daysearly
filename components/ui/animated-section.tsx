import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  variant?: string;
  duration?: number;
}

export default function AnimatedSection({ children, delay, variant, duration }: AnimatedSectionProps) {
  // Lightweight wrapper - animations handled by CSS
  const delayStyle = delay ? { animationDelay: `${delay}s` } : {};
  
  return (
    <div 
      className="animate-fade-in-up"
      style={delayStyle}
    >
      {children}
    </div>
  );
}