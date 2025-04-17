import { ApiRequestAccountChangeDetails } from '@/api/v1/requests/ApiRequestAccountChangeDetails';
import { z } from 'zod';

const first_name: keyof ApiRequestAccountChangeDetails = 'first_name';
const last_name: keyof ApiRequestAccountChangeDetails = 'last_name';
const gender_id: keyof ApiRequestAccountChangeDetails = 'gender_id';
const birthdate: keyof ApiRequestAccountChangeDetails = 'birthdate';
const mobile_number: keyof ApiRequestAccountChangeDetails = 'mobile_number';
const phone_number: keyof ApiRequestAccountChangeDetails = 'phone_number';

export const accountChangeDetailsValidationSchema = z.object({
  [first_name]: z.string().optional(),
  [last_name]: z.string().optional(),
  [gender_id]: z.coerce.number().optional(),
  [birthdate]: z.date().optional(),
  [mobile_number]: z.string().optional(),
  [phone_number]: z.string().optional(),
});

export type TAccountChangeDetailsFields = z.infer<
  typeof accountChangeDetailsValidationSchema
>;
