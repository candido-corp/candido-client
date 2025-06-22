import NetworkClient from '@/api/v1/NetworkClient';
import { ApiRequestAccountDetailsAddress } from '@/api/v1/requests/ApiRequestAccountDetailsAddress';
import {
  accountAddressValidationSchema,
  TAccountAddressFields,
} from '@/components/user/Address/userAddressValidation';
import { Address, UserAddressType } from '@/models/interfaces/User';
import { TerritoryOption } from '@/pages/user/UserAddressesPage';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigation, useSubmit } from 'react-router-dom';
import { SubmitTarget } from 'react-router-dom/dist/dom';

interface UseUserAddressProps {
  address: Address | null;
  countries: TerritoryOption[];
  addressTypes: UserAddressType[];
}

interface UseUserAddressReturn {
  // Form state
  form: ReturnType<typeof useForm<TAccountAddressFields>>;

  // Loading states
  isSubmitting: boolean;
  isInitializingEdit: boolean;

  // Territory options
  countryOptions: TerritoryOption[];
  regionOptions: TerritoryOption[];
  provinceOptions: TerritoryOption[];
  municipalityOptions: TerritoryOption[];

  // Selected values
  selectedCountry: number | null;
  selectedRegion: number | null;
  selectedProvince: number | null;
  selectedMunicipality: number | null;

  // Handlers
  handleCountryChange: (value: string) => void;
  handleRegionChange: (value: string) => void;
  handleProvinceChange: (value: string) => void;
  handleMunicipalityChange: (value: string) => void;
  onSubmit: SubmitHandler<TAccountAddressFields>;
}

/**
 * Custom hook for managing user address form logic
 * Handles territory selection, form validation, and address submission
 */
export const useUserAddress = ({
  address,
  countries,
  addressTypes,
}: UseUserAddressProps): UseUserAddressReturn => {
  const submit = useSubmit();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  // Form setup with memoized resolver and default values
  const resolver = zodResolver(accountAddressValidationSchema);

  const defaultValues: TAccountAddressFields = useMemo(
    () => ({
      display_name: address?.display_name || '',
      territory_id: address?.territories?.[0]?.territory_id || 0,
      type_id: address?.type_id || addressTypes[0]?.address_type_id || 1,
      zip: address?.zip || '',
      street: address?.street || '',
      house_number: address?.house_number || '',
      is_primary: address?.is_primary || false,
    }),
    [address, addressTypes]
  );

  const form = useForm<TAccountAddressFields>({
    resolver,
    defaultValues,
  });

  // Territory options state - stores available options for each level
  const [countryOptions, setCountryOptions] = useState<TerritoryOption[]>([]);
  const [regionOptions, setRegionOptions] = useState<TerritoryOption[]>([]);
  const [provinceOptions, setProvinceOptions] = useState<TerritoryOption[]>([]);
  const [municipalityOptions, setMunicipalityOptions] = useState<
    TerritoryOption[]
  >([]);

  // Selected values state - tracks current selections for each territory level
  const [selectedCountry, setSelectedCountry] = useState<number | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<number | null>(null);
  const [selectedMunicipality, setSelectedMunicipality] = useState<
    number | null
  >(null);

  // Loading state for address initialization during edit
  const [isInitializingEdit, setIsInitializingEdit] = useState(false);

  // Cache for API responses to avoid repeated calls for the same territory
  const [territoryCache, setTerritoryCache] = useState<
    Record<number, TerritoryOption[]>
  >({});

  // Memoized country options to prevent unnecessary re-renders
  const memoizedCountryOptions = useMemo(() => {
    return countries.length > 0 ? countries : [];
  }, [countries]);

  // Initialize countries when they become available
  useEffect(() => {
    if (memoizedCountryOptions.length > 0) {
      setCountryOptions(memoizedCountryOptions);
    }
  }, [memoizedCountryOptions]);

  /**
   * Load regions for a selected country (with caching)
   * @param countryId - The country territory ID
   * @param isEdit - Whether this is called during edit initialization
   */
  const loadRegions = useCallback(
    async (countryId: number, isEdit = false) => {
      // Check cache first to avoid unnecessary API calls
      if (territoryCache[countryId]) {
        const cachedRegions = territoryCache[countryId];
        if (cachedRegions.length > 0) {
          setRegionOptions(cachedRegions);
        } else if (!isEdit) {
          // No regions available, set country as final territory
          form.setValue('territory_id', countryId);
        }
        return;
      }

      // Reset dependent options if not in edit mode
      if (!isEdit) {
        setRegionOptions([]);
        setProvinceOptions([]);
        setMunicipalityOptions([]);
        setSelectedRegion(null);
        setSelectedProvince(null);
        setSelectedMunicipality(null);
      }

      try {
        // Fetch child territories (regions) for the selected country
        const response = await NetworkClient.getCountriesChildren({
          pathParams: { geoId: countryId },
        });

        // Transform API response to our TerritoryOption format
        const regions: TerritoryOption[] = response.data.territory_list.map(
          (territory) => ({
            territory_id: territory.territory_id,
            territory_name: territory.territory_name,
          })
        );

        // Cache the result for future use
        setTerritoryCache((prev) => ({ ...prev, [countryId]: regions }));

        if (regions.length > 0) {
          setRegionOptions(regions);
        } else if (!isEdit) {
          // If no regions and not initializing edit, country is the final territory
          form.setValue('territory_id', countryId);
        }
      } catch (error) {
        console.error('Error loading regions:', error);
        if (!isEdit) {
          // On error, set country as final territory
          form.setValue('territory_id', countryId);
        }
      }
    },
    [territoryCache, form]
  );

  /**
   * Load provinces for a selected region (with caching)
   * @param regionId - The region territory ID
   * @param isEdit - Whether this is called during edit initialization
   */
  const loadProvinces = useCallback(
    async (regionId: number, isEdit = false) => {
      // Check cache first to avoid unnecessary API calls
      if (territoryCache[regionId]) {
        const cachedProvinces = territoryCache[regionId];
        if (cachedProvinces.length > 0) {
          setProvinceOptions(cachedProvinces);
        } else if (!isEdit) {
          // No provinces available, set region as final territory
          form.setValue('territory_id', regionId);
        }
        return;
      }

      // Reset dependent options if not in edit mode
      if (!isEdit) {
        setProvinceOptions([]);
        setMunicipalityOptions([]);
        setSelectedProvince(null);
        setSelectedMunicipality(null);
      }

      try {
        // Fetch child territories (provinces) for the selected region
        const response = await NetworkClient.getCountriesChildren({
          pathParams: { geoId: regionId },
        });

        // Transform API response to our TerritoryOption format
        const provinces: TerritoryOption[] = response.data.territory_list.map(
          (territory) => ({
            territory_id: territory.territory_id,
            territory_name: territory.territory_name,
          })
        );

        // Cache the result for future use
        setTerritoryCache((prev) => ({ ...prev, [regionId]: provinces }));

        if (provinces.length > 0) {
          setProvinceOptions(provinces);
        } else if (!isEdit) {
          // If no provinces and not initializing edit, region is the final territory
          form.setValue('territory_id', regionId);
        }
      } catch (error) {
        console.error('Error loading provinces:', error);
        if (!isEdit) {
          // On error, set region as final territory
          form.setValue('territory_id', regionId);
        }
      }
    },
    [territoryCache, form]
  );

  /**
   * Load municipalities for a selected province (with caching)
   * @param provinceId - The province territory ID
   * @param isEdit - Whether this is called during edit initialization
   */
  const loadMunicipalities = useCallback(
    async (provinceId: number, isEdit = false) => {
      // Check cache first to avoid unnecessary API calls
      if (territoryCache[provinceId]) {
        const cachedMunicipalities = territoryCache[provinceId];
        if (cachedMunicipalities.length > 0) {
          setMunicipalityOptions(cachedMunicipalities);
        } else if (!isEdit) {
          // No municipalities available, set province as final territory
          form.setValue('territory_id', provinceId);
        }
        return;
      }

      // Reset dependent options if not in edit mode
      if (!isEdit) {
        setMunicipalityOptions([]);
        setSelectedMunicipality(null);
      }

      try {
        // Fetch child territories (municipalities) for the selected province
        const response = await NetworkClient.getCountriesChildren({
          pathParams: { geoId: provinceId },
        });

        // Transform API response to our TerritoryOption format
        const municipalities: TerritoryOption[] =
          response.data.territory_list.map((territory) => ({
            territory_id: territory.territory_id,
            territory_name: territory.territory_name,
          }));

        // Cache the result for future use
        setTerritoryCache((prev) => ({
          ...prev,
          [provinceId]: municipalities,
        }));

        if (municipalities.length > 0) {
          setMunicipalityOptions(municipalities);
        } else if (!isEdit) {
          // If no municipalities and not initializing edit, province is the final territory
          form.setValue('territory_id', provinceId);
        }
      } catch (error) {
        console.error('Error loading municipalities:', error);
        if (!isEdit) {
          // On error, set province as final territory
          form.setValue('territory_id', provinceId);
        }
      }
    },
    [territoryCache, form]
  );

  /**
   * Initialize address data for editing mode
   * Loads all territory levels based on existing address territories
   */
  const initializeEditAddress = useCallback(async () => {
    if (!address || !address.territories) return;

    setIsInitializingEdit(true);

    try {
      // Sort territories by order_id (country=1, region=2, province=3, municipality=4)
      const sortedTerritories = [...address.territories].sort(
        (a, b) => a.order_id - b.order_id
      );

      // Load territories sequentially to maintain proper hierarchy
      for (let i = 0; i < sortedTerritories.length; i++) {
        const territory = sortedTerritories[i];

        switch (territory.order_id) {
          case 1: // Country
            setSelectedCountry(territory.territory_id);
            // Load regions if there are more territories to process
            if (i < sortedTerritories.length - 1) {
              await loadRegions(territory.territory_id, true);
            }
            break;
          case 2: // Region
            setSelectedRegion(territory.territory_id);
            // Load provinces if there are more territories to process
            if (i < sortedTerritories.length - 1) {
              await loadProvinces(territory.territory_id, true);
            }
            break;
          case 3: // Province
            setSelectedProvince(territory.territory_id);
            // Load municipalities if there are more territories to process
            if (i < sortedTerritories.length - 1) {
              await loadMunicipalities(territory.territory_id, true);
            }
            break;
          case 4: // Municipality
            setSelectedMunicipality(territory.territory_id);
            break;
        }
      }

      // Set the most specific territory as the form value
      const finalTerritory = sortedTerritories[sortedTerritories.length - 1];
      form.setValue('territory_id', finalTerritory.territory_id);
    } catch (error) {
      console.error('Error initializing edit address:', error);
    } finally {
      setIsInitializingEdit(false);
    }
  }, [address, loadRegions, loadProvinces, loadMunicipalities, form]);

  // Initialize edit address data when address and countries are available
  useEffect(() => {
    if (address && countries.length > 0) {
      initializeEditAddress();
    }
  }, [address, countries, initializeEditAddress]);

  /**
   * Handle country selection change
   * Resets dependent territory selections and loads regions
   */
  const handleCountryChange = useCallback(
    (value: string) => {
      const countryId = parseInt(value);
      setSelectedCountry(countryId);
      loadRegions(countryId);
    },
    [loadRegions]
  );

  /**
   * Handle region selection change
   * Resets dependent territory selections and loads provinces
   */
  const handleRegionChange = useCallback(
    (value: string) => {
      const regionId = parseInt(value);
      setSelectedRegion(regionId);
      loadProvinces(regionId);
    },
    [loadProvinces]
  );

  /**
   * Handle province selection change
   * Resets dependent territory selections and loads municipalities
   */
  const handleProvinceChange = useCallback(
    (value: string) => {
      const provinceId = parseInt(value);
      setSelectedProvince(provinceId);
      loadMunicipalities(provinceId);
    },
    [loadMunicipalities]
  );

  /**
   * Handle municipality selection change
   * Sets the municipality as the final territory
   */
  const handleMunicipalityChange = useCallback(
    (value: string) => {
      const municipalityId = parseInt(value);
      setSelectedMunicipality(municipalityId);
      // Municipality is the most specific level, set it as territory_id
      form.setValue('territory_id', municipalityId);
    },
    [form]
  );

  /**
   * Form submission handler
   * Prepares address data and submits via router action
   */
  const onSubmit: SubmitHandler<TAccountAddressFields> = useCallback(
    (data) => {
      // Territory_id is already set in the last valid select
      const payload: ApiRequestAccountDetailsAddress & { addressId?: number } =
        {
          ...data,
        };

      // Determine HTTP method based on whether we're creating or updating
      const method = address ? 'put' : 'post';

      // Add addressId for update operations
      if (address && address.address_id) {
        payload.addressId = address.address_id;
      }

      // Submit the form data using React Router's submit function
      submit(payload as SubmitTarget, { method });
    },
    [address, submit]
  );

  return {
    // Form state
    form,

    // Loading states
    isSubmitting,
    isInitializingEdit,

    // Territory options
    countryOptions,
    regionOptions,
    provinceOptions,
    municipalityOptions,

    // Selected values
    selectedCountry,
    selectedRegion,
    selectedProvince,
    selectedMunicipality,

    // Handlers
    handleCountryChange,
    handleRegionChange,
    handleProvinceChange,
    handleMunicipalityChange,
    onSubmit,
  };
};
