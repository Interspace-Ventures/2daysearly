import { Theme } from '@/types';

export const theme: Theme = {
  fonts: {
    primary: 'var(--font-archivo), var(--font-outfit), sans-serif',
    secondary: 'var(--font-outfit), sans-serif'
  },
  colors: {
    primary: '#059669', // Chime green
    secondary: '#047857', // Dark green
    accent: '#10b981' // Light green
  },
  shadows: {
    neo: '4px 4px 0px 0px #000000',
    neoLg: '8px 8px 0px 0px #000000',
    neoXl: '12px 12px 0px 0px #000000'
  }
} as const;

export const getNeoBrutalistStyle = (shadowSize: 'sm' | 'md' | 'lg' = 'md') => ({
  border: '2px solid #000000',
  boxShadow: shadowSize === 'sm' ? theme.shadows.neo : 
             shadowSize === 'lg' ? theme.shadows.neoXl : 
             theme.shadows.neoLg
});