import { memo } from 'react';
import { Partner } from '@/types';
import { theme, getNeoBrutalistStyle } from '@/lib/theme';
import Image from '@/components/ui/image';

interface PartnerCardProps {
  partner: Partner;
}

const PartnerCard = memo(({ partner }: PartnerCardProps) => (
  <div className="bg-white overflow-hidden" style={getNeoBrutalistStyle('md')}>
    {/* Profile Image */}
    <div className="w-full h-48 sm:h-56 bg-gray-50 flex items-center justify-center p-3">
      <img
        src={partner.image}
        alt={`${partner.name}'s portrait`}
        className={`max-w-full max-h-full object-contain ${partner.imageClassName || ''}`}
        style={{ maxWidth: '100%', maxHeight: '100%' }}
      />
    </div>
    
    {/* Content */}
    <div className="p-4 bg-white border-t-2 border-black">
      <h3 
        className="text-base sm:text-lg font-bold text-black mb-3 text-center"
        style={{ fontFamily: theme.fonts.primary }}
      >
        {partner.name}
      </h3>
      
      <div 
        className="text-black text-sm sm:text-base leading-relaxed text-left"
        style={{ fontFamily: theme.fonts.primary }}
      >
        {partner.bio}
      </div>
    </div>
  </div>
));

PartnerCard.displayName = 'PartnerCard';

export default PartnerCard;