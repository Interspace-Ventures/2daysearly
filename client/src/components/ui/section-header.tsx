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
      className={`${backgroundColor} p-8 mb-16 text-center ${className}`}
      style={getNeoBrutalistStyle('lg')}
    >
      {titleLines.map((line, index) => (
        <h2
          key={index}
          id={index === 0 ? id : undefined}
          className={`text-2xl md:text-5xl font-bold ${textColor}`}
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