// import { useState } from 'react';
import { RequestRegisterData } from '@/models/requests/RequestRegisterData';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useActionData, useNavigation, useSubmit } from 'react-router-dom';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { SubmitTarget } from 'react-router-dom/dist/dom';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { registerValidationSchema } from '../../validation/registration';

const RegisterForm = () => {
  const { t } = useTranslation();
  const submit = useSubmit();
  const navigation = useNavigation();

  const params = new URLSearchParams(location.search);
  const from = params.get('from') || '/';
  const isSubmitting = navigation.state === 'submitting';
  // const data = useActionData();

  const resolver = zodResolver(registerValidationSchema);
  const defaultValues: RequestRegisterData = {
    email: '',
    password: '',
  };

  const form = useForm<RequestRegisterData>({
    resolver,
    defaultValues,
  });

  const { handleSubmit, control } = form;

  const onSubmit: SubmitHandler<RequestRegisterData> = (data) => {
    submit(data as SubmitTarget, { method: 'post' });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <input type="hidden" name="redirectTo" value={from} />
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
                <FormItem className="grid gap-2">
                  <FormLabel>{t('form_fields.first_name')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('form_fields.first_name')}
                      id="firstName"
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
                <FormItem className="grid gap-2">
                  <FormLabel>{t('form_fields.last_name')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('form_fields.last_name')}
                      id="lastName"
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
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Submitting...' : t('register.sign_up')}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default RegisterForm;
