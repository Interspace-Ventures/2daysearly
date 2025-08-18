import { memo } from 'react';
import { Partner } from '@/types';
import { theme, getNeoBrutalistStyle } from '@/lib/theme';
import Image from '@/components/ui/image';

interface PartnerCardProps {
  partner: Partner;
}

const PartnerCard = memo(({ partner }: PartnerCardProps) => (
  <div className="bg-white flex flex-col" style={getNeoBrutalistStyle('md')}>
    {/* Profile Image */}
    <div className="w-full h-48 bg-white flex items-center justify-center p-4">
      <Image
        src={partner.image}
        alt={`${partner.name}'s portrait`}
        className={`max-w-full max-h-full object-contain ${partner.imageClassName || ''}`}
        fallbackSrc="/images/2-days-early-logo-2025.png"
      />
    </div>
    
    {/* Content */}
    <div className="p-4 flex-1 bg-white border-t-2 border-black">
      <h3 
        className="text-fluid-base font-bold text-black mb-2 text-center"
        style={{ fontFamily: theme.fonts.primary }}
      >
        {partner.name}
      </h3>
      
      <div 
        className="text-black text-fluid-xs leading-relaxed text-left"
        style={{ fontFamily: theme.fonts.primary }}
      >
        {partner.bio}
      </div>
    </div>
  </div>
));

PartnerCard.displayName = 'PartnerCard';

export default PartnerCard;