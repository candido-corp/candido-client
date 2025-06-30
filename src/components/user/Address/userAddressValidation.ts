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
  [display_name]: z.string().optional(),
  [territory_id]: z.number().refine((val) => val > 0, {
    message: 'Please select a valid location',
  }),
  [type_id]: z.number().min(1, 'form_validation.required'),
  [zip]: z.string().min(1, 'form_validation.required'),
  [street]: z.string().min(1, 'form_validation.required'),
  [house_number]: z.string().min(1, 'form_validation.required'),
  [is_primary]: z.boolean(),
});

export type TAccountAddressFields = z.infer<
  typeof accountAddressValidationSchema
>;
