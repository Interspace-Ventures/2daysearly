import { memo } from 'react';
import { Partner } from '@/types';
import { theme, getNeoBrutalistStyle } from '@/lib/theme';
import Image from '@/components/ui/image';

interface PartnerCardProps {
  partner: Partner;
}

const PartnerCard = memo(({ partner }: PartnerCardProps) => (
  <div className="bg-white overflow-hidden border-2 border-black h-full" style={{ boxShadow: '2px 2px 0px 0px #000000' }}>
    {/* Mobile: side-by-side layout, Desktop: vertical layout */}
    <div className="flex sm:flex-col h-full">
      {/* Image and Name Section */}
      <div className="flex sm:flex-col flex-row">
        {/* Profile Image */}
        <div className="w-28 h-28 sm:w-full sm:h-48 bg-gray-50 flex items-center justify-center p-2 sm:p-4 flex-shrink-0">
          <img
            src={partner.image}
            alt={`${partner.name}'s portrait`}
            className={`max-w-full max-h-full object-contain rounded-full sm:rounded-none ${partner.imageClassName || ''}`}
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />
        </div>
        
        {/* Partner Name - Below image on mobile, centered on desktop */}
        <div className="px-2 pb-1 sm:px-4 sm:pb-3 sm:border-b-2 sm:border-black bg-white">
          <h3 
            className="text-base sm:text-lg font-bold text-black text-center"
            style={{ fontFamily: theme.fonts.primary }}
          >
            {partner.name}
          </h3>
        </div>
      </div>
      
      {/* Bio Content */}
      <div className="p-3 sm:p-4 bg-white flex-1 border-l-2 sm:border-l-0 border-black">
        <div 
          className="text-black text-sm sm:text-base leading-relaxed"
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