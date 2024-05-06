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
} from '../ui/form';
import { SubmitTarget } from 'react-router-dom/dist/dom';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { registerValidationSchema } from './validation/registration';

const RegisterForm = () => {
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
          <p>
            <FormField
              control={control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" id="firstName" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </p>
          <p>
            <FormField
              control={control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" id="lastName" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </p>
          <p>
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" id="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </p>
          <p>
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      id="password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </p>
          <p>
            <FormField
              control={control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm Password"
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
          </p>
          <div className="pt-5">
            <Button disabled={isSubmitting} className="font-bold">
              {isSubmitting ? 'Submitting...' : 'Sign up'}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default RegisterForm;
