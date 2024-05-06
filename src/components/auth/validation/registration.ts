import { RequestRegisterData } from '@/models/requests/RequestRegisterData';
import { z } from 'zod';

const first_name: keyof RequestRegisterData = 'first_name';
const last_name: keyof RequestRegisterData = 'last_name';
const email: keyof RequestRegisterData = 'email';
const password: keyof RequestRegisterData = 'password';
const confirm_password: keyof RequestRegisterData = 'confirm_password';

export const registerValidationSchema = z
  .object({
    [first_name]: z.string().min(1, 'La password è obbligatoria'),
    [last_name]: z.string().min(1, 'La password è obbligatoria'),
    [email]: z
      .string()
      .min(1, 'Il campo è obbligatorio')
      .email('Il formato non è valido'),
    [password]: z.string().min(1, 'La password è obbligatoria'),
    [confirm_password]: z.string().min(1, 'La password è obbligatoria'),
  })
  .refine(
    (values) => {
      return values.password === values.confirm_password;
    },
    {
      message: 'Passwords must match!',
      path: ['confirm_password'],
    }
  );

export type TLoginValidationFields = z.infer<typeof registerValidationSchema>;
