import { Link, useNavigation, useSubmit } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SubmitTarget } from 'react-router-dom/dist/dom';
import { useTranslation } from 'react-i18next';
import { EnumRoutes } from '@/models/enums/EnumRoutes';
import { RequestLoginData } from '@/models/requests/RequestLoginData';
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
import { loginValidationSchema } from '.';

export const LoginForm = () => {
  const { t } = useTranslation();
  const submit = useSubmit();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';
  // const actionData = useActionData() as { error: string } | undefined;

  const resolver = zodResolver(loginValidationSchema);
  const defaultValues: RequestLoginData = {
    email: '',
    password: '',
  };

  const form = useForm<RequestLoginData>({
    resolver,
    defaultValues,
  });

  const { handleSubmit, control } = form;

  const onSubmit: SubmitHandler<RequestLoginData> = (data) => {
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
                    to={EnumRoutes.RESET_PASSWORD}
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <FormControl>
                  <Input
                    placeholder={t('form_fields.password')}
                    id="password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Submitting...' : t('login.sign_in')}
          </Button>
        </form>
      </Form>
    </>
  );
};
