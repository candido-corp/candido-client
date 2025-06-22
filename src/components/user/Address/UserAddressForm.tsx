import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useUserAddress } from '@/hooks/useUserAddress';
import { Address, UserAddressType } from '@/models/interfaces/User';
import { TerritoryOption } from '@/pages/user/UserAddressesPage';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

/**
 * Skeleton component for loading select elements
 */
const SelectSkeleton: React.FC<{ label: string }> = ({ label }) => (
  <div className="space-y-2">
    <FormLabel>{label}</FormLabel>
    <Skeleton className="h-10 w-full" />
  </div>
);

interface UserAddressFormProps {
  address: Address | null;
  setShowAddressForm: (show: boolean) => void;
  countries: TerritoryOption[];
  isLoadingCountries: boolean;
  addressTypes: UserAddressType[];
}

const UserAddressForm: React.FC<UserAddressFormProps> = ({
  address,
  setShowAddressForm,
  countries,
  isLoadingCountries,
  addressTypes,
}) => {
  const { t } = useTranslation();

  // Use the custom hook for all business logic
  const {
    form,
    isSubmitting,
    isInitializingEdit,
    countryOptions,
    regionOptions,
    provinceOptions,
    municipalityOptions,
    selectedCountry,
    selectedRegion,
    selectedProvince,
    selectedMunicipality,
    handleCountryChange,
    handleRegionChange,
    handleProvinceChange,
    handleMunicipalityChange,
    onSubmit,
  } = useUserAddress({ address, countries, addressTypes });

  const { handleSubmit, control } = form;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col">
        <div className="max-h-[50vh] flex-1 space-y-4 overflow-y-auto px-1 pb-4">
          {/* Display Name Field */}
          <FormField
            control={control}
            name="display_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter a name for this address (e.g., Home, Work, Office)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Territory Selects */}
          <div className="space-y-2">
            <FormLabel>Country</FormLabel>

            {/* Country Select */}
            {isInitializingEdit ? (
              <SelectSkeleton label="" />
            ) : (
              <Select
                disabled={isLoadingCountries || isInitializingEdit}
                onValueChange={handleCountryChange}
                value={selectedCountry?.toString() || ''}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      isLoadingCountries
                        ? 'Loading countries...'
                        : 'Select country...'
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {countryOptions.map((option) => (
                    <SelectItem
                      key={option.territory_id}
                      value={option.territory_id.toString()}
                    >
                      {option.territory_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Region Select */}
          {(regionOptions.length > 0 ||
            selectedRegion ||
            isInitializingEdit) && (
            <div className="space-y-2">
              <FormLabel>Region</FormLabel>
              {isInitializingEdit ? (
                <SelectSkeleton label="" />
              ) : (
                <Select
                  disabled={isInitializingEdit}
                  onValueChange={handleRegionChange}
                  value={selectedRegion?.toString() || ''}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={'Select region...'} />
                  </SelectTrigger>
                  <SelectContent>
                    {regionOptions.map((option) => (
                      <SelectItem
                        key={option.territory_id}
                        value={option.territory_id.toString()}
                      >
                        {option.territory_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          )}

          {/* Province Select */}
          {(provinceOptions.length > 0 ||
            selectedProvince ||
            isInitializingEdit) && (
            <div className="space-y-2">
              <FormLabel>Province</FormLabel>
              {isInitializingEdit ? (
                <SelectSkeleton label="" />
              ) : (
                <Select
                  disabled={isInitializingEdit}
                  onValueChange={handleProvinceChange}
                  value={selectedProvince?.toString() || ''}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={'Select province...'} />
                  </SelectTrigger>
                  <SelectContent>
                    {provinceOptions.map((option) => (
                      <SelectItem
                        key={option.territory_id}
                        value={option.territory_id.toString()}
                      >
                        {option.territory_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          )}

          {/* Municipality Select */}
          {(municipalityOptions.length > 0 ||
            selectedMunicipality ||
            isInitializingEdit) && (
            <div className="space-y-2">
              <FormLabel>Municipality</FormLabel>
              {isInitializingEdit ? (
                <SelectSkeleton label="" />
              ) : (
                <Select
                  disabled={isInitializingEdit}
                  onValueChange={handleMunicipalityChange}
                  value={selectedMunicipality?.toString() || ''}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={'Select municipality...'} />
                  </SelectTrigger>
                  <SelectContent>
                    {municipalityOptions.map((option) => (
                      <SelectItem
                        key={option.territory_id}
                        value={option.territory_id.toString()}
                      >
                        {option.territory_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          )}

          <FormField
            control={control}
            name="type_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address Type</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(parseInt(value))}
                  value={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select address type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {addressTypes.map((addressType) => (
                      <SelectItem
                        key={addressType.address_type_id}
                        value={addressType.address_type_id.toString()}
                      >
                        {addressType.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-5 gap-2">
            <FormField
              control={control}
              name="street"
              render={({ field }) => (
                <FormItem className="col-span-4">
                  <FormLabel>{t('form_fields.street')}</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter street name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="house_number"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>{t('form_fields.house_number')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nr."
                      id="house_number"
                      autoComplete="house-number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name="zip"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel>{t('form_fields.zip')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ZIP Code"
                    id="zip"
                    autoComplete="postal-code"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="is_primary"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                <FormControl>
                  <Input
                    type="checkbox"
                    className="h-4 w-4"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                </FormControl>
                <FormLabel className="font-normal">
                  {t('form_fields.is_primary')}
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Fixed footer with buttons */}
        <div className="flex justify-end space-x-2 border-t pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowAddressForm(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-1"
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {address ? 'Update Address' : 'Add Address'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserAddressForm;
