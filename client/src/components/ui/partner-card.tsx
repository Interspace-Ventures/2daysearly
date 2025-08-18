import { memo } from 'react';
import { Partner } from '@/types';
import { theme, getNeoBrutalistStyle } from '@/lib/theme';
import Image from '@/components/ui/image';

interface PartnerCardProps {
  partner: Partner;
}

const PartnerCard = memo(({ partner }: PartnerCardProps) => (
  <div className="bg-white" style={getNeoBrutalistStyle('md')}>
    {/* Profile Image */}
    <div className="w-full h-56 overflow-hidden">
      <Image
        src={partner.image}
        alt={`${partner.name}'s portrait`}
        className={`w-full h-full object-cover ${partner.imageClassName || ''}`}
        fallbackSrc="/images/2-days-early-logo-2025.png"
      />
    </div>
    
    {/* Content */}
    <div className="p-5 text-center">
      <h3 
        className="text-fluid-xl font-bold text-black mb-4"
        style={{ fontFamily: theme.fonts.primary }}
      >
        {partner.name}
      </h3>
      
      <div 
        className="text-black text-fluid-sm leading-relaxed text-left"
        style={{ fontFamily: theme.fonts.primary }}
      >
        {partner.bio}
      </div>
    </div>
  </div>
));

PartnerCard.displayName = 'PartnerCard';

export default PartnerCard;