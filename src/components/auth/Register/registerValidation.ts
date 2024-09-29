import { ApiRequestRegister } from '@/api/v1/requests/ApiRequestRegister';
import { z } from 'zod';

const first_name: keyof ApiRequestRegister = 'first_name';
const last_name: keyof ApiRequestRegister = 'last_name';
const email: keyof ApiRequestRegister = 'email';
const password: keyof ApiRequestRegister = 'password';
const confirm_password: keyof ApiRequestRegister = 'confirm_password';

export const registerValidationSchema = z
  .object({
    [first_name]: z.string().min(1, 'form_validation.required'),
    [last_name]: z.string().min(1, 'form_validation.required'),
    [email]: z
      .string()
      .min(1, 'form_validation.required')
      .email('form_validation.email_invalid'),
    [password]: z
      .string()
      .min(8, 'form_validation.password.min_length')
      .max(16, 'form_validation.password.max_length')
      .regex(/[A-Z]/, 'form_validation.password.uppercase')
      .regex(/[a-z]/, 'form_validation.password.lowercase')
      .regex(/\d/, 'form_validation.password.digit')
      .regex(/[@]/, 'form_validation.password.special')
      .regex(/^\S*$/, 'form_validation.password.no_whitespace'),
    [confirm_password]: z.string().min(1, 'form_validation.password.required'),
  })
  .refine(
    (values) => {
      return values.password === values.confirm_password;
    },
    {
      message: 'form_validation.password.match',
      path: ['confirm_password'],
    }
  );

export type TRegisterFields = z.infer<typeof registerValidationSchema>;
