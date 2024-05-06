import { z } from 'zod';
import { RequestLoginData } from '../../../models/requests/RequestLoginData';

const email: keyof RequestLoginData = 'email';
const password: keyof RequestLoginData = 'password';

export const loginValidationSchema = z.object({
  [email]: z
    .string()
    .min(1, 'Il campo è obbligatorio')
    .email('Il formato non è valido'),
  [password]: z.string().min(1, 'La password è obbligatoria'),
});

export type TLoginValidationFields = z.infer<typeof loginValidationSchema>;
