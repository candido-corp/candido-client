import { Link, useNavigation, useSubmit } from 'react-router-dom';
import { EnumRoutes } from '../../models/enums/EnumRoutes';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginValidationSchema } from './validation/login';
import { RequestLoginData } from '../../models/requests/RequestLoginData';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { SubmitTarget } from 'react-router-dom/dist/dom';
import { useTranslation } from 'react-i18next';

const LoginForm = () => {
  const { t } = useTranslation();
  const submit = useSubmit();
  const navigation = useNavigation();

  const params = new URLSearchParams(location.search);
  const from = params.get('from') || EnumRoutes.HOME;
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="redirectTo" value={from} />
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
              <FormItem>
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
              <FormItem>
                <FormLabel>{t('form_fields.password')}</FormLabel>
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
          <div className="pt-5">
            <Link to={EnumRoutes.REGISTER} className="font-bold">
              {t('login.register')}
            </Link>
            <span className="px-5">or</span>
            <Button type="submit" disabled={isSubmitting} className="font-bold">
              {isSubmitting ? 'Submitting...' : t('login.sign_in')}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;
