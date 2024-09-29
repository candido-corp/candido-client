import { ApiRequestResetPasswordSend } from '@/api/v1/requests/ApiRequestResetPasswordSend';
import { z } from 'zod';

const email: keyof ApiRequestResetPasswordSend = 'email';

export const ForgotPasswordValidationSchema = z.object({
  [email]: z
    .string()
    .min(1, 'form_validation.required')
    .email('form_validation.email_invalid'),
});

export type TForgotPasswordFields = z.infer<
  typeof ForgotPasswordValidationSchema
>;
