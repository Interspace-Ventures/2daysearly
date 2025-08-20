import { memo } from 'react';
import { Partner } from '@/types';
import { theme, getNeoBrutalistStyle } from '@/lib/theme';
import Image from '@/components/ui/image';

interface PartnerCardProps {
  partner: Partner;
}

const PartnerCard = memo(({ partner }: PartnerCardProps) => (
  <div className="bg-white overflow-hidden border-2 border-black h-full" style={{ boxShadow: '2px 2px 0px 0px #000000' }}>
    {/* Mobile: improved layout, Desktop: vertical layout */}
    <div className="flex sm:flex-col h-full">
      {/* Mobile: Side-by-side with better proportions */}
      <div className="flex sm:flex-col w-full">
        {/* Profile Image - Larger on mobile */}
        <div className="w-20 h-20 sm:w-full sm:h-48 bg-gray-50 flex items-center justify-center p-2 sm:p-4 flex-shrink-0">
          <img
            src={partner.image}
            alt={`${partner.name}'s portrait`}
            className={`max-w-full max-h-full object-contain rounded-full sm:rounded-none ${partner.imageClassName || ''}`}
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />
        </div>
        
        {/* Content Area - Mobile: right side, Desktop: below image */}
        <div className="flex-1 sm:w-full">
          {/* Partner Name */}
          <div className="px-3 py-2 sm:px-4 sm:py-3 sm:border-b-2 sm:border-black bg-white border-b sm:border-b-2 border-black sm:text-center">
            <h3 
              className="text-sm sm:text-lg font-bold text-black"
              style={{ fontFamily: theme.fonts.primary }}
            >
              {partner.name}
            </h3>
          </div>
          
          {/* Bio Content */}
          <div className="p-3 sm:p-4 bg-white">
            <div 
              className="text-black text-xs sm:text-base leading-relaxed"
              style={{ fontFamily: theme.fonts.primary }}
            >
              {partner.bio}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
));

PartnerCard.displayName = 'PartnerCard';

export default PartnerCard;