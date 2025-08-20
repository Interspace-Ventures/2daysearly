import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  variant?: string;
  duration?: number;
}

export default function AnimatedSection({ children, delay, variant, duration }: AnimatedSectionProps) {
  return <div>{children}</div>;
}