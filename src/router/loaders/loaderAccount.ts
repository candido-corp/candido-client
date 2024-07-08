import { json } from 'react-router-dom';
import NetworkClient from '@/api/v1/NetworkClient.ts';

export default async function loaderAccount() {
  const response = await NetworkClient.getAccount();
  return json(response.data);
}