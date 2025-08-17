import { memo } from 'react';

import { Company } from '@/types';
import { IMAGES } from '@/lib/constants';

interface CompanyCardProps {
  company: Company;
}

const CompanyCard = memo(({ company }: CompanyCardProps) => {
  return (
    <div style={{ 
      width: '300px', 
      height: '200px', 
      border: '3px solid red', 
      backgroundColor: 'yellow',
      padding: '20px',
      margin: '10px'
    }}>
      <div style={{ fontSize: '12px', color: 'red', marginBottom: '10px' }}>
        CARD: {company.name}
      </div>
      <div style={{ fontSize: '10px', color: 'blue', marginBottom: '10px' }}>
        PATH: {company.logo}
      </div>
      <img
        src={company.logo}
        alt={company.name}
        style={{
          width: '100px',
          height: '60px',
          border: '2px solid green',
          backgroundColor: 'white',
          display: 'block'
        }}
        onLoad={() => console.log(`[VISIBLE] ${company.name} image displayed`)}
        onError={() => console.log(`[FAIL] ${company.name} image failed`)}
      />
      <div style={{ fontSize: '14px', fontWeight: 'bold', marginTop: '10px' }}>
        {company.name}
      </div>
    </div>
  );
});

CompanyCard.displayName = 'CompanyCard';

export default CompanyCard;