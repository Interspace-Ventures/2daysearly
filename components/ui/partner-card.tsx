import { memo } from 'react';
import { Partner } from '@/types';
import { theme, getNeoBrutalistStyle } from '@/lib/theme';
import Image from '@/components/ui/image';

interface PartnerCardProps {
  partner: Partner;
}

const PartnerCard = memo(({ partner }: PartnerCardProps) => (
  <div className="bg-white overflow-hidden border-2 border-black h-full" style={{ boxShadow: '2px 2px 0px 0px #000000' }}>
    {/* Mobile: side-by-side layout, Desktop: stacked layout */}
    <div className="flex sm:flex-col h-full">
      {/* Profile Image */}
      <div className="w-24 h-24 sm:w-full sm:h-48 bg-gray-50 flex items-center justify-center p-2 sm:p-3 flex-shrink-0">
        <img
          src={partner.image}
          alt={`${partner.name}'s portrait`}
          className={`max-w-full max-h-full object-contain rounded-full sm:rounded-none ${partner.imageClassName || ''}`}
          style={{ maxWidth: '100%', maxHeight: '100%' }}
        />
      </div>
      
      {/* Content */}
      <div className="p-3 sm:p-4 bg-white sm:border-t-2 sm:border-black flex-1">
        <h3 
          className="text-sm sm:text-lg font-bold text-black mb-1 sm:mb-3 sm:text-center"
          style={{ fontFamily: theme.fonts.primary }}
        >
          {partner.name}
        </h3>
        
        <div 
          className="text-black text-xs sm:text-base leading-relaxed"
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