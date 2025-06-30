import { Building2, Home, Mail } from 'lucide-react';

/**
 * Returns the appropriate icon component based on address type
 * @param addressType - The type of address (e.g., 'Residential', 'Company', 'Postal')
 * @returns React component for the corresponding icon
 */
export const getAddressIcon = (addressType: string) => {
  switch (addressType) {
    case 'Residential':
      return Home;
    case 'Company':
      return Building2;
    case 'Postal':
      return Mail;
    default:
      return Home;
  }
};

/**
 * Returns the appropriate icon JSX element with specified className
 * @param addressType - The type of address
 * @param className - CSS classes to apply to the icon
 * @returns JSX element of the icon
 */
export const getAddressIconElement = (
  addressType: string,
  className?: string
) => {
  const IconComponent = getAddressIcon(addressType);
  return <IconComponent className={className} />;
};
