import { memo } from 'react';

import { Company } from '@/types';
import { IMAGES } from '@/lib/constants';

interface CompanyCardProps {
  company: Company;
}

const CompanyCard = memo(({ company }: CompanyCardProps) => {
  return (
    <a 
      href={company.href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'block',
        position: 'relative',
        backgroundColor: 'white',
        border: '2px solid black',
        boxShadow: '4px 4px 0px 0px #000000',
        transition: 'all 0.3s ease',
        textDecoration: 'none',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      {/* Logo Display */}
      <div style={{
        height: '192px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        backgroundColor: 'white'
      }}>
        <img
          src={company.logo}
          alt={`${company.name} logo`}
          style={{
            maxWidth: '160px',
            maxHeight: '120px',
            objectFit: 'contain',
            display: 'block'
          }}
          onError={(e) => {
            e.currentTarget.src = IMAGES.companies.placeholder;
          }}
        />
      </div>

      {/* Hover Overlay */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#4ade80',
          border: '2px solid black',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          opacity: 0,
          transition: 'opacity 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '1';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '0';
        }}
      >
        <h3 style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: 'black',
          textAlign: 'center',
          marginBottom: '12px',
          fontFamily: 'Alexandria, sans-serif'
        }}>
          {company.name}
        </h3>
        <p style={{
          fontSize: '14px',
          fontWeight: 'bold',
          color: 'black',
          lineHeight: '1.4',
          textAlign: 'center',
          fontFamily: 'Alexandria, sans-serif'
        }}>
          {company.description}
        </p>
      </div>
    </a>
  );
});

CompanyCard.displayName = 'CompanyCard';

export default CompanyCard;