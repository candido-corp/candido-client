import { useLoaderData, useNavigation, useSubmit } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SubmitTarget } from 'react-router-dom/dist/dom';
import { useTranslation } from 'react-i18next';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { ApiRequestResetPasswordChangePassword } from '@/api/v1/requests/ApiRequestResetPasswordChangePassword';
import {
  resetPasswordValidationSchema,
  TResetPasswordFields,
} from './resetPasswordValidation';

export const ResetPasswordForm = () => {
  const { t } = useTranslation();
  const submit = useSubmit();
  const navigation = useNavigation();
  const loaderData = useLoaderData() as Pick<
    ApiRequestResetPasswordChangePassword,
    't' | 'e'
  >;

  const isSubmitting = navigation.state === 'submitting';

  const resolver = zodResolver(resetPasswordValidationSchema);
  const defaultValues: TResetPasswordFields = {
    password: '',
    confirm_password: '',
  };

  const form = useForm<TResetPasswordFields>({
    resolver,
    defaultValues,
  });

  const { handleSubmit, control } = form;

  const onSubmit: SubmitHandler<ApiRequestResetPasswordChangePassword> = (
    data
  ) => {
    submit({ ...loaderData, ...data } as SubmitTarget, { method: 'post' });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel>{t('form_fields.password')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('form_fields.password')}
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    maxLength={16}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel>{t('form_fields.confirm_password')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('form_fields.confirm_password')}
                    id="confirm_password"
                    type="password"
                    autoComplete="new-password"
                    maxLength={16}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t('form_fields.submit')}
          </Button>
        </form>
      </Form>
    </>
  );
};
