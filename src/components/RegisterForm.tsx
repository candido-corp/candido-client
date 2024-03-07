// import { useState } from 'react';
import { Form, useActionData, useNavigation } from 'react-router-dom';

const RegisterForm = () => {
  const data = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  return (
    <>
      <Form method="post">
        {/* {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        {data && data.message && <p>{data.message}</p>} */}
        <p>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            className="border-2 border-black"
            type="text"
            name="first-name"
            autoComplete="given-name"
            required
          />
        </p>
        <p>
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            className="border-2 border-black"
            type="text"
            name="last-name"
            autoComplete="family-name"
            required
          />
        </p>
        <p>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className="border-2 border-black"
            type="email"
            name="email"
            spellCheck="false"
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
            autoComplete="new-password"
            required
          />
        </p>
        <p>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            className="border-2 border-black"
            type="password"
            name="confirm-password"
            autoComplete="new-password"
            required
          />
        </p>
        <div>
          <button disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Save'}
          </button>
        </div>
      </Form>
    </>
  );
};

export default RegisterForm;
