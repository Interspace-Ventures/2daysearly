import { memo } from 'react';
import { Partner } from '@/types';
import { theme } from '@/lib/theme';

interface PartnerCardProps {
  partner: Partner;
}

const PartnerCard = memo(({ partner }: PartnerCardProps) => (
  <div className="bg-white overflow-hidden border-2 border-black h-full" style={{ boxShadow: '2px 2px 0px 0px #000000' }}>
    {/* Mobile: side-by-side, Desktop: vertical */}
    <div className="flex sm:flex-col h-full">
      {/* Left side on mobile (image + title), Top section on desktop */}
      <div className="flex flex-col sm:w-full">
        {/* Profile Image */}
        <div className="w-20 h-20 sm:w-full sm:h-48 bg-white flex items-center justify-center p-2 sm:p-4 flex-shrink-0">
          <img
            src={partner.image}
            alt={`${partner.name}'s portrait`}
            className={`max-w-full max-h-full object-contain rounded-full sm:rounded-none ${partner.imageClassName || ''}`}
            style={{ maxWidth: '100%', maxHeight: '100%', backgroundColor: 'transparent' }}
          />
        </div>
        
        {/* Partner Name - Under image on both mobile and desktop */}
        <div className="px-2 py-1 sm:px-4 sm:py-3 bg-white text-center">
          <h3 
            className="text-xs sm:text-lg font-bold text-black"
            style={{ fontFamily: theme.fonts.primary }}
          >
            {partner.name}
          </h3>
        </div>
      </div>
      
      {/* Bio Content - Right side on mobile, bottom on desktop */}
      <div className="flex-1 p-3 sm:p-4 bg-white">
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