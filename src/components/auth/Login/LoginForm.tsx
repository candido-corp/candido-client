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
import { Button } from '@/components/ui/button';
import { loginValidationSchema, TLoginFields } from '.';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { Loader2 } from 'lucide-react';
import { ApiRequestLogin } from '@/api/v1/requests/ApiRequestLogin';
import { BaseFC } from '@/models/interfaces/BaseFC';

export const LoginForm: React.FC<BaseFC> = () => {
  const { t } = useTranslation();
  const submit = useSubmit();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';
  // const actionData = useActionData() as { error: string } | undefined;

  const resolver = zodResolver(loginValidationSchema);
  const defaultValues: TLoginFields = {
    email: '',
    password: '',
  };

  const form = useForm<TLoginFields>({
    resolver,
    defaultValues,
  });

  const { handleSubmit, control } = form;

  const onSubmit: SubmitHandler<ApiRequestLogin> = (data) => {
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
                <div className="flex items-center">
                  <FormLabel>{t('form_fields.password')}</FormLabel>
                  <Link
                    to={EnumRoutes.FORGOT_PASSWORD}
                    className="ml-auto inline-block text-sm underline"
                  >
                    {t('login.forgot_password')}
                  </Link>
                </div>
                <FormControl>
                  <Input
                    placeholder={t('form_fields.password')}
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t('login.sign_in')}
          </Button>
        </form>
      </Form>
    </>
  );
};
