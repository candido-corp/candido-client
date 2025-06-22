import { ApiRequestAccountDetailsAddress } from '@/api/v1/requests/ApiRequestAccountDetailsAddress';
import { z } from 'zod';

const display_name: keyof ApiRequestAccountDetailsAddress = 'display_name';
const territory_id: keyof ApiRequestAccountDetailsAddress = 'territory_id';
const type_id: keyof ApiRequestAccountDetailsAddress = 'type_id';
const zip: keyof ApiRequestAccountDetailsAddress = 'zip';
const street: keyof ApiRequestAccountDetailsAddress = 'street';
const house_number: keyof ApiRequestAccountDetailsAddress = 'house_number';
const is_primary: keyof ApiRequestAccountDetailsAddress = 'is_primary';

export const accountAddressValidationSchema = z.object({
  [display_name]: z.string(),
  [territory_id]: z.number(),
  [type_id]: z.number(),
  [zip]: z.string(),
  [street]: z.string(),
  [house_number]: z.string(),
  [is_primary]: z.boolean(),
});

export type TAccountAddressFields = z.infer<
  typeof accountAddressValidationSchema
>;
