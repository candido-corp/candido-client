import { ApiRequestAccountChangeDetails } from '@/api/v1/requests/ApiRequestAccountChangeDetails';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { userGenders } from '@/config/ConfigUser';
import { User } from '@/models/interfaces/User';
import { cn } from '@/utils/shadcn';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigation, useSubmit } from 'react-router-dom';
import { SubmitTarget } from 'react-router-dom/dist/dom';
import {
  accountChangeDetailsValidationSchema,
  TAccountChangeDetailsFields,
} from './userChangeDetailsValidation';

type UserChangeDetailsFormProps = {
  userData: User;
  handleIsEditing: (isEditing: boolean) => void;
};

const UserChangeDetailsForm: React.FC<UserChangeDetailsFormProps> = ({
  userData,
  handleIsEditing,
}) => {
  const { t } = useTranslation();
  const submit = useSubmit();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  const resolver = zodResolver(accountChangeDetailsValidationSchema);
  const defaultValues: TAccountChangeDetailsFields = {
    first_name: userData.first_name,
    last_name: userData.last_name,
    gender_id: userData.gender?.id || undefined,
    birthdate: userData.birthdate ? new Date(userData.birthdate) : undefined,
    mobile_number: userData.mobile_number || '',
    phone_number: userData.phone_number || '',
  };

  const form = useForm<TAccountChangeDetailsFields>({
    resolver,
    defaultValues,
  });

  const { handleSubmit, control } = form;

  const onSubmit: SubmitHandler<TAccountChangeDetailsFields> = (data) => {
    const payload: ApiRequestAccountChangeDetails = {
      ...data,
      birthdate: data.birthdate
        ? data.birthdate.toISOString().split('T')[0]
        : undefined, // format date to string to avoid type error
    };
    submit(payload as SubmitTarget, { method: 'put' });
    handleIsEditing(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={control}
              name="first_name"
              defaultValue={userData.first_name}
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>{t('form_fields.first_name')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('form_fields.first_name')}
                      id="first_name"
                      autoComplete="first_name"
                      readOnly={!userData.can_change_name}
                      className={cn(
                        !userData.can_change_name &&
                          'read-only:cursor-not-allowed read-only:opacity-50'
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="last_name"
              defaultValue={userData.last_name}
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>{t('form_fields.last_name')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('form_fields.last_name')}
                      id="last_name"
                      autoComplete="last_name"
                      readOnly={!userData.can_change_name}
                      className={cn(
                        !userData.can_change_name &&
                          'read-only:cursor-not-allowed read-only:opacity-50'
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="gender_id"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>{t('form_fields.gender_id')}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue>
                          {t(`user.gender.${field.value}`)}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {userGenders.map((gender) => {
                        const genderId = gender as unknown as string;
                        return (
                          <SelectItem value={genderId} key={genderId}>
                            {t(`user.gender.${genderId}`)}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="birthdate"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>{t('form_fields.birthdate')}</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="mobile_number"
              defaultValue={userData.mobile_number}
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>{t('form_fields.mobile_number')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('form_fields.mobile_number')}
                      id="mobile_number"
                      autoComplete="mobile_number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="phone_number"
              defaultValue={userData.phone_number}
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel>{t('form_fields.phone_number')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('form_fields.phone_number')}
                      id="phone_number"
                      autoComplete="phone_number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => handleIsEditing(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-1"
            >
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save Changes
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default UserChangeDetailsForm;
