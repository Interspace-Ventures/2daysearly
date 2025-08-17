import { memo } from 'react';
import { ExternalLink } from 'lucide-react';
import { Company } from '@/types';
import { IMAGES } from '@/lib/constants';

interface CompanyCardProps {
  company: Company;
}

const CompanyCard = memo(({ company }: CompanyCardProps) => {
  console.log(`[CompanyCard Render] ${company.name} with logo: ${company.logo}`);
  
  return (
    <div className="w-full h-48 bg-red-100 border-4 border-red-500 p-4 mb-4">
      {/* Big obvious test content */}
      <div className="bg-yellow-300 p-4 text-center font-bold text-2xl">
        TEST CARD: {company.name}
      </div>
      
      {/* Logo test */}
      <div className="bg-blue-200 p-2 flex items-center justify-center">
        <img
          src={company.logo}
          alt={`${company.name} logo`}
          className="max-w-32 max-h-16 object-contain bg-white border-2 border-green-500"
          onLoad={() => console.log(`[Test Logo] Loaded: ${company.logo}`)}
          onError={(e) => {
            console.log(`[Test Logo] Failed: ${company.logo}`);
            e.currentTarget.src = IMAGES.companies.placeholder;
          }}
        />
      </div>
    </div>
  );
});

CompanyCard.displayName = 'CompanyCard';

export default CompanyCard;