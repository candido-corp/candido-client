import { Territory } from './Geo';

export type User = {
  first_name: string;
  last_name: string;
  email: string;
  gender: Gender;
  address: Address | null;
  birthdate: string;
  mobile_number: string;
  phone_number: string;
  created_at: string;
  can_change_name: boolean;
};

export type Gender = {
  id: number;
  description: string;
};

export type Address = {
  address_id: number;
  type_id: number;
  territories: Territory[];
  type: string;
  zip: string;
  street: string;
  house_number: string;
  updated_at: string;
};
