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
    [password]: z.string().min(1, 'form_validation.password_required'),
    [confirm_password]: z.string().min(1, 'form_validation.password_required'),
  })
  .refine(
    (values) => {
      return values.password === values.confirm_password;
    },
    {
      message: 'form_validation.password_match',
      path: ['confirm_password'],
    }
  );

export type TLoginValidationFields = z.infer<typeof registerValidationSchema>;
