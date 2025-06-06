import { Button, ButtonProps } from '@/components/ui/button';
import { useNotification } from '@/hooks/useNotification';
import { BaseFC } from '@/models/interfaces/BaseFC';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetcher } from 'react-router-dom';

/**
 * Props interface for UserDeleteAddressForm component
 */
type UserDeleteAddressFormProps = BaseFC & {
  addressId: number;
  buttonTrigger: ButtonProps & {
    children: React.ReactNode;
  };
};

/**
 * User Delete Address Form Component
 * Provides a confirmation dialog and form for deleting user addresses
 */
const UserDeleteAddressForm: React.FC<UserDeleteAddressFormProps> = ({
  addressId,
  buttonTrigger,
  className,
  children,
}) => {
  const { t } = useTranslation();
  const fetcher = useFetcher();
  const { askConfirmation } = useNotification();

  /**
   * Memoized function to handle form submission
   */
  const submitForm = useCallback(() => {
    const formData = new FormData();
    formData.append('addressId', addressId.toString());
    fetcher.submit(formData, { method: 'delete' });
  }, [addressId, fetcher]);

  /**
   * Handles the click event with confirmation dialog
   */
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault(); // Prevent default form submission

      askConfirmation({
        dialogProps: {
          title: 'Delete Address',
          message: 'Are you sure you want to delete this address?',
        },
        actionButtons: [
          {
            name: t('notifications.confirm'),
            action: () => {
              submitForm();
              // Call the original onClick if present
              if (buttonTrigger.onClick) {
                buttonTrigger.onClick(e);
              }
            },
          },
        ],
      });
    },
    [askConfirmation, t, submitForm, buttonTrigger.onClick]
  );

  return (
    <fetcher.Form method="delete" className={className}>
      <input type="hidden" name="addressId" value={addressId} />
      <Button {...buttonTrigger} type="submit" onClick={handleClick}>
        {buttonTrigger.children}
      </Button>
      {children}
    </fetcher.Form>
  );
};

export default UserDeleteAddressForm;
