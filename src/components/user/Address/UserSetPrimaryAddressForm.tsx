import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { useCallback } from 'react';
import { useFetcher } from 'react-router-dom';

interface UserSetPrimaryAddressFormProps {
  addressId: number;
  isPrimary: boolean;
}

export const PRIMARY_ADDRESS_ACTION = 'toggle-primary';

/**
 * Component to set an address as primary
 * Shows a filled star for primary addresses (disabled) and empty star for non-primary (clickable)
 * Primary addresses cannot be unset, only other addresses can be made primary
 */
const UserSetPrimaryAddressForm: React.FC<UserSetPrimaryAddressFormProps> = ({
  addressId,
  isPrimary,
}) => {
  const fetcher = useFetcher();

  const isLoading = fetcher.state === 'submitting';

  const submitForm = useCallback(() => {
    const formData = new FormData();
    formData.append('addressId', addressId.toString());
    formData.append('actionType', PRIMARY_ADDRESS_ACTION);
    fetcher.submit(formData, { method: 'put' });
  }, [addressId, fetcher]);

  const handleToggle = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      submitForm();
    },
    [submitForm]
  );

  return (
    <fetcher.Form method="put" className="!mt-0">
      <input type="hidden" name="addressId" value={addressId} />
      <input type="hidden" name="actionType" value={PRIMARY_ADDRESS_ACTION} />
      <Button
        variant="ghost"
        size="sm"
        onClick={handleToggle}
        disabled={isLoading || isPrimary}
        className="h-8 w-8 p-0 hover:bg-amber-50 hover:text-amber-600 disabled:opacity-100"
        title={
          isPrimary ? 'This is your primary address' : 'Set as primary address'
        }
        type="submit"
      >
        <Star
          className={`h-4 w-4 transition-colors ${
            isPrimary
              ? 'fill-amber-400 text-amber-400'
              : 'text-muted-foreground hover:text-amber-600'
          }`}
        />
      </Button>
    </fetcher.Form>
  );
};

export default UserSetPrimaryAddressForm;
