import { ApiRequestLogin } from '@/api/v1/requests/ApiRequestLogin';
import { z } from 'zod';

const email: keyof ApiRequestLogin = 'email';
const password: keyof ApiRequestLogin = 'password';

export const loginValidationSchema = z.object({
  [email]: z
    .string()
    .min(1, 'form_validation.required')
    .email('form_validation.email_invalid'),
  [password]: z.string().min(1, 'form_validation.password.required'),
});

export type TLoginFields = z.infer<typeof loginValidationSchema>;
