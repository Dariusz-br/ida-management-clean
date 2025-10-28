'use client'

import ReactCountryFlag from 'react-country-flag'

interface FlatFlagProps {
  country: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function FlatFlag({ country, size = 'md', className = '' }: FlatFlagProps) {
  const sizeClasses = {
    sm: { width: '16px', height: '12px' },
    md: { width: '24px', height: '18px' },
    lg: { width: '32px', height: '24px' }
  }

  const getCountryCode = (country: string): string => {
    if (!country) return 'XX'
    switch (country.toLowerCase()) {
      case 'united states':
      case 'usa':
      case 'us':
        return 'US'
      case 'united kingdom':
      case 'uk':
      case 'britain':
        return 'GB'
      case 'canada':
        return 'CA'
      case 'germany':
        return 'DE'
      case 'australia':
        return 'AU'
      case 'france':
        return 'FR'
      case 'netherlands':
        return 'NL'
      case 'spain':
        return 'ES'
      case 'italy':
        return 'IT'
      case 'brazil':
        return 'BR'
      case 'china':
        return 'CN'
      case 'japan':
        return 'JP'
      case 'south korea':
        return 'KR'
      case 'india':
        return 'IN'
      case 'russia':
        return 'RU'
      case 'mexico':
        return 'MX'
      case 'argentina':
        return 'AR'
      case 'south africa':
        return 'ZA'
      case 'egypt':
        return 'EG'
      case 'nigeria':
        return 'NG'
      case 'turkey':
        return 'TR'
      case 'poland':
        return 'PL'
      case 'sweden':
        return 'SE'
      case 'norway':
        return 'NO'
      case 'denmark':
        return 'DK'
      case 'finland':
        return 'FI'
      case 'switzerland':
        return 'CH'
      case 'austria':
        return 'AT'
      case 'belgium':
        return 'BE'
      case 'portugal':
        return 'PT'
      case 'greece':
        return 'GR'
      case 'ireland':
        return 'IE'
      case 'new zealand':
        return 'NZ'
      case 'thailand':
        return 'TH'
      case 'singapore':
        return 'SG'
      case 'malaysia':
        return 'MY'
      case 'indonesia':
        return 'ID'
      case 'philippines':
        return 'PH'
      case 'vietnam':
        return 'VN'
      case 'taiwan':
        return 'TW'
      case 'hong kong':
        return 'HK'
      case 'israel':
        return 'IL'
      case 'saudi arabia':
        return 'SA'
      case 'uae':
      case 'united arab emirates':
        return 'AE'
      case 'qatar':
        return 'QA'
      case 'kuwait':
        return 'KW'
      case 'bahrain':
        return 'BH'
      case 'oman':
        return 'OM'
      case 'jordan':
        return 'JO'
      case 'lebanon':
        return 'LB'
      case 'cyprus':
        return 'CY'
      case 'malta':
        return 'MT'
      case 'iceland':
        return 'IS'
      case 'luxembourg':
        return 'LU'
      case 'slovakia':
        return 'SK'
      case 'slovenia':
        return 'SI'
      case 'croatia':
        return 'HR'
      case 'romania':
        return 'RO'
      case 'bulgaria':
        return 'BG'
      case 'estonia':
        return 'EE'
      case 'latvia':
        return 'LV'
      case 'lithuania':
        return 'LT'
      case 'czech republic':
        return 'CZ'
      case 'hungary':
        return 'HU'
      default:
        return 'XX' // Unknown country code
    }
  }

  const countryCode = getCountryCode(country)
  const dimensions = sizeClasses[size]

  if (countryCode === 'XX') {
    return (
      <div 
        className={`${className} rounded-sm overflow-hidden bg-gray-300 flex items-center justify-center`}
        style={dimensions}
      >
        <span className="text-xs text-gray-600">?</span>
      </div>
    )
  }

  return (
    <div className={`${className} rounded-sm overflow-hidden`}>
      <ReactCountryFlag
        countryCode={countryCode}
        svg
        style={{
          width: dimensions.width,
          height: dimensions.height,
          objectFit: 'cover'
        }}
        title={country}
      />
    </div>
  )
}
