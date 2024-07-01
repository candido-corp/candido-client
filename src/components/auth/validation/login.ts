import { z } from 'zod';
import { RequestLoginData } from '../../../models/requests/RequestLoginData';

const email: keyof RequestLoginData = 'email';
const password: keyof RequestLoginData = 'password';

export const loginValidationSchema = z.object({
  [email]: z
    .string()
    .min(1, 'form_validation.required')
    .email('form_validation.email_invalid'),
  [password]: z.string().min(1, 'form_validation.password_required'),
});

export type TLoginValidationFields = z.infer<typeof loginValidationSchema>;
