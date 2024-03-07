// import { useState } from 'react';
import { Form, Link, useActionData, useNavigation } from 'react-router-dom';
import { EnumRoutes } from '../models/enums/EnumRoutes';

const LoginForm = () => {
  const data = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  return (
    <>
      <Form method="post">
        <h1>Log in</h1>
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
          <label htmlFor="image">Password</label>
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
          <Link to={EnumRoutes.REGISTER}>Create new user</Link>
          <button disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Save'}
          </button>
        </div>
      </Form>
    </>
  );
};

export default LoginForm;
