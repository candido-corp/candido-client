import {
  ApiRequestRegister,
  RequestRegisterType,
} from '@/api/v1/requests/ApiRequestRegister';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigation, useSubmit } from 'react-router-dom';
import { SubmitTarget } from 'react-router-dom/dist/dom';
import {
  registerValidationSchema,
  TRegisterFields,
} from './registerValidation';

export const RegisterForm = () => {
  const { t } = useTranslation();
  const submit = useSubmit();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';
  // const data = useActionData();

  const resolver = zodResolver(registerValidationSchema);
  const defaultValues: TRegisterFields = {
    email: '',
    password: '',
    confirm_password: '',
    first_name: '',
    last_name: '',
    a: RequestRegisterType.EMAIL,
  };

  const form = useForm<TRegisterFields>({
    resolver,
    defaultValues,
  });

  const { handleSubmit, control } = form;

  const onSubmit: SubmitHandler<ApiRequestRegister> = (data) => {
    submit(data as SubmitTarget, { method: 'post' });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          {/* {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        {data && data.message && <p>{data.message}</p>} */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={control}
              name="first_name"
              render={({ field }) => (
                <FormItem className="grid gap-2 self-start">
                  <FormLabel>{t('form_fields.first_name')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('form_fields.first_name')}
                      id="first_name"
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
              render={({ field }) => (
                <FormItem className="grid gap-2 self-start">
                  <FormLabel>{t('form_fields.last_name')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('form_fields.last_name')}
                      id="last_name"
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
          <Button disabled={isSubmitting} className="w-full">
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t('register.sign_up')}
          </Button>
        </form>
      </Form>
    </>
  );
};
