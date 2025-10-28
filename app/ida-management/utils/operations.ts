// Operation assignment logic based on shipping destination
export const getOperationByCountry = (country: string): 'UK OP' | 'China OP' => {
  // UK Operation: Europe, North America, South America
  const ukOpCountries = [
    // Europe
    'UK', 'United Kingdom', 'Germany', 'France', 'Spain', 'Italy', 'Netherlands', 'Belgium', 'Switzerland', 'Austria', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Poland', 'Czech Republic', 'Hungary', 'Portugal', 'Greece', 'Ireland', 'Luxembourg', 'Slovakia', 'Slovenia', 'Croatia', 'Romania', 'Bulgaria', 'Estonia', 'Latvia', 'Lithuania',
    
    // North America
    'USA', 'United States', 'Canada', 'Mexico',
    
    // South America
    'Brazil', 'Argentina', 'Chile', 'Colombia', 'Peru', 'Venezuela', 'Ecuador', 'Bolivia', 'Paraguay', 'Uruguay', 'Guyana', 'Suriname', 'French Guiana'
  ]
  
  // China Operation: Asia, Africa, Oceania, and all other countries
  return ukOpCountries.some(ukCountry => 
    country.toLowerCase().includes(ukCountry.toLowerCase())
  ) ? 'UK OP' : 'China OP'
}

export const getOperationColor = (operation: 'UK OP' | 'China OP'): string => {
  return operation === 'UK OP' 
    ? 'bg-blue-100 text-blue-800' 
    : 'bg-red-100 text-red-800'
}

export const getOperationIcon = (operation: 'UK OP' | 'China OP'): string => {
  return operation === 'UK OP' ? '🇬🇧' : '🇨🇳'
}

export const getOperationFlagCountry = (operation: 'UK OP' | 'China OP'): string => {
  return operation === 'UK OP' ? 'United Kingdom' : 'China'
}

