import { RequestRegisterData } from '@/models/requests/RequestRegisterData';
import { z } from 'zod';

const first_name: keyof RequestRegisterData = 'first_name';
const last_name: keyof RequestRegisterData = 'last_name';
const email: keyof RequestRegisterData = 'email';
const password: keyof RequestRegisterData = 'password';
const confirm_password: keyof RequestRegisterData = 'confirm_password';

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

export type TLoginValidationFields = z.infer<typeof registerValidationSchema>;
