import { json } from 'react-router-dom';
import AuthService from '@/services/auth/AuthService';

export default async function loaderAccount() {
  try {
    const response = await new AuthService().account();

    if (response.status === 401 || !response.ok) {
      return json({ message: 'Could not load account data.' });
    }

    return json({ message: 'Email Verified@' });
  } catch (error) {
    console.error('error: ', error);
    return json({ message: 'Could not load account data.' });
  }
}
