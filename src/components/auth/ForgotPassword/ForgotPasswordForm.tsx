import { Link, useNavigation, useSubmit } from 'react-router-dom';
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
import { Button, buttonVariants } from '@/components/ui/button';
import {
  ForgotPasswordValidationSchema,
  TForgotPasswordFields,
} from './forgotPasswordValidation';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { Loader2 } from 'lucide-react';
import { ApiRequestResetPasswordSend } from '@/api/v1/requests/ApiRequestResetPasswordSend';

export const ForgotPasswordForm = () => {
  const { t } = useTranslation();
  const submit = useSubmit();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  const resolver = zodResolver(ForgotPasswordValidationSchema);
  const defaultValues: TForgotPasswordFields = {
    email: '',
  };

  const form = useForm<TForgotPasswordFields>({
    resolver,
    defaultValues,
  });

  const { handleSubmit, control } = form;

  const onSubmit: SubmitHandler<ApiRequestResetPasswordSend> = (data) => {
    submit(data as SubmitTarget, { method: 'post' });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel>{t('form_fields.email')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('form_fields.email')}
                    id="email"
                    autoComplete="email"
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
      <Link
        className={buttonVariants({ variant: 'link' })}
        to={EnumRoutes.LOGIN}
      >
        {t('forgot_password.back_to_login')}
      </Link>
    </>
  );
};
