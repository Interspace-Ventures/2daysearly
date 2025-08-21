import { ReactNode, useEffect, useRef, useState } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  variant?: string;
  duration?: number;
  className?: string;
}

export default function AnimatedSection({ children, delay = 0, variant = 'slideUp', duration = 0.5, className }: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay * 1000);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const getAnimationStyle = () => {
    const baseStyle = {
      transition: `all ${duration}s ease-out`,
      willChange: 'transform, opacity',
    };

    if (!isVisible) {
      switch (variant) {
        case 'slideUp':
          return {
            ...baseStyle,
            opacity: 0,
            transform: 'translateY(20px)',
          };
        case 'slideInLeft':
          return {
            ...baseStyle,
            opacity: 0,
            transform: 'translateX(-20px)',
          };
        case 'fade':
          return {
            ...baseStyle,
            opacity: 0,
          };
        default:
          return {
            ...baseStyle,
            opacity: 0,
            transform: 'translateY(20px)',
          };
      }
    }

    return {
      ...baseStyle,
      opacity: 1,
      transform: 'translateY(0) translateX(0)',
    };
  };

  return (
    <div ref={ref} style={getAnimationStyle()} className={className}>
      {children}
    </div>
  );
}