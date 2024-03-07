import { json, redirect } from 'react-router-dom';
import { API_V1_logout } from '../../api/v1/auth/API_V1_logout';

export default async function action() {
  const response = await API_V1_logout();

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not authenticate user.' }, { status: 500 });
  }

  // const resData = await response.json();

  return redirect('/');
}
