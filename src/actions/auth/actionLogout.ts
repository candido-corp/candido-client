import { json, redirect } from 'react-router-dom';
import AuthService from '../../services/auth/AuthService';

export default async function action() {
  const response = await new AuthService().logout();

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not authenticate user.' }, { status: 500 });
  }

  // const resData = await response.json();

  return redirect('/');
}
