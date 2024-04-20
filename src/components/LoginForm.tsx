// import { useState } from 'react';
import { Form, Link, useNavigation } from 'react-router-dom';
import { EnumRoutes } from '../models/enums/EnumRoutes';

const LoginForm = () => {
  const params = new URLSearchParams(location.search);
  const from = params.get('from') || '/';
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';
  // const actionData = useActionData() as { error: string } | undefined;

  return (
    <>
      <Form method="post">
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
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className="border-2 border-black"
            type="email"
            name="email"
            autoCorrect="off"
            autoCapitalize="off"
            autoComplete="email"
            required
          />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="border-2 border-black"
            type="password"
            name="password"
            autoComplete="current-password"
            required
          />
        </p>
        <div>
          <Link to={EnumRoutes.REGISTER} className="font-bold">
            Create new user
          </Link>
          <span className="px-5">or</span>
          <button type="submit" disabled={isSubmitting} className="font-bold">
            {isSubmitting ? 'Submitting...' : 'Sign in'}
          </button>
        </div>
      </Form>
    </>
  );
};

export default LoginForm;
