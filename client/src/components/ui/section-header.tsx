import { memo } from 'react';
import { theme, getNeoBrutalistStyle } from '@/lib/theme';

interface SectionHeaderProps {
  id?: string;
  title: string | string[];
  backgroundColor?: string;
  textColor?: string;
  className?: string;
}

const SectionHeader = memo(({ 
  id, 
  title, 
  backgroundColor = 'bg-black', 
  textColor = 'text-white',
  className = ''
}: SectionHeaderProps) => {
  const titleLines = Array.isArray(title) ? title : [title];
  
  return (
    <div 
      className={`${backgroundColor} text-center ${className} neo-border-responsive neo-shadow-lg-responsive`}
      style={{ 
        padding: 'clamp(1.5rem, 4vw, 2.5rem)', 
        marginBottom: 'clamp(2rem, 5vw, 4rem)',
        margin: 'clamp(0.5rem, 2vw, 1rem) 0 clamp(2rem, 5vw, 4rem) 0'
      }}
    >
      {titleLines.map((line, index) => (
        <h2
          key={index}
          id={index === 0 ? id : undefined}
          className={`text-fluid-4xl font-bold ${textColor}`}
          style={{ fontFamily: theme.fonts.primary }}
        >
          {line}
        </h2>
      ))}
    </div>
  );
});

SectionHeader.displayName = 'SectionHeader';

export default SectionHeader;