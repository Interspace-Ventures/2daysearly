import { memo } from 'react';
import { Partner } from '@/types';
import { theme, getNeoBrutalistStyle } from '@/lib/theme';
import Image from '@/components/ui/image';

interface PartnerCardProps {
  partner: Partner;
}

const PartnerCard = memo(({ partner }: PartnerCardProps) => (
  <div className="bg-white overflow-hidden border-4 border-black" style={{ boxShadow: '6px 6px 0px 0px #000000' }}>
    {/* Mobile: side-by-side layout, Desktop: stacked layout */}
    <div className="flex md:flex-col">
      {/* Profile Image */}
      <div className="w-24 h-24 md:w-full md:h-48 bg-gray-50 flex items-center justify-center p-2 md:p-3 flex-shrink-0">
        <img
          src={partner.image}
          alt={`${partner.name}'s portrait`}
          className={`max-w-full max-h-full object-contain rounded-full md:rounded-none ${partner.imageClassName || ''}`}
          style={{ maxWidth: '100%', maxHeight: '100%' }}
        />
      </div>
      
      {/* Content */}
      <div className="p-3 md:p-4 bg-white md:border-t-2 md:border-black flex-1">
        <h3 
          className="text-sm md:text-lg font-bold text-black mb-1 md:mb-3 md:text-center"
          style={{ fontFamily: theme.fonts.primary }}
        >
          {partner.name}
        </h3>
        
        <div 
          className="text-black text-xs md:text-base leading-relaxed"
          style={{ fontFamily: theme.fonts.primary }}
        >
          {partner.bio}
        </div>
      </div>
    </div>
  </div>
));

PartnerCard.displayName = 'PartnerCard';

export default PartnerCard;