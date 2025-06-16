import { Button, ButtonProps } from '@/components/ui/button';
import { useNotification } from '@/hooks/useNotification';
import { BaseFC } from '@/models/interfaces/BaseFC';
import { Address } from '@/models/interfaces/User';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetcher } from 'react-router-dom';

type UserDeleteAddressFormProps = BaseFC & {
  addressId: number;
  buttonTrigger: ButtonProps & {
    children: React.ReactNode;
  };
} & Pick<Address, 'is_primary'>;

const UserDeleteAddressForm: React.FC<UserDeleteAddressFormProps> = ({
  addressId,
  buttonTrigger,
  is_primary: isPrimary,
  className,
  children,
}) => {
  const { t } = useTranslation();
  const fetcher = useFetcher();
  const { askConfirmation } = useNotification();

  const submitForm = useCallback(() => {
    const formData = new FormData();
    formData.append('addressId', addressId.toString());
    fetcher.submit(formData, { method: 'delete' });
  }, [addressId, fetcher]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault(); // Prevent default form submission

      // Use different translations based on whether it's a primary address
      const titleKey = isPrimary
        ? 'user_addresses.delete.primary_title'
        : 'user_addresses.delete.title';
      const messageKey = isPrimary
        ? 'user_addresses.delete.primary_message'
        : 'user_addresses.delete.message';

      askConfirmation({
        dialogProps: {
          title: t(titleKey),
          message: t(messageKey),
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
    [askConfirmation, t, submitForm, buttonTrigger.onClick, isPrimary]
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
