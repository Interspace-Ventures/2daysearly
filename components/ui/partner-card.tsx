import { memo } from 'react';
import { Partner } from '@/types';
import { theme, getNeoBrutalistStyle } from '@/lib/theme';
import Image from '@/components/ui/image';

interface PartnerCardProps {
  partner: Partner;
}

const PartnerCard = memo(({ partner }: PartnerCardProps) => (
  <div className="bg-white overflow-hidden border-2 border-black h-full" style={{ boxShadow: '2px 2px 0px 0px #000000' }}>
    <div className="flex h-full">
      {/* Left side: Image and Name */}
      <div className="flex flex-col">
        {/* Profile Image */}
        <div className="w-32 h-32 bg-gray-50 flex items-center justify-center p-3 flex-shrink-0">
          <img
            src={partner.image}
            alt={`${partner.name}'s portrait`}
            className={`max-w-full max-h-full object-contain rounded-full ${partner.imageClassName || ''}`}
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />
        </div>
        
        {/* Partner Name - Directly below image */}
        <div className="px-3 pb-2">
          <h3 
            className="text-lg font-bold text-black text-center"
            style={{ fontFamily: theme.fonts.primary }}
          >
            {partner.name}
          </h3>
        </div>
      </div>
      
      {/* Right side: Bio Content */}
      <div className="p-4 bg-white flex-1 border-l-2 border-black">
        <div 
          className="text-black text-base leading-relaxed"
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