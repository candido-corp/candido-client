import { ApiRequestResetPasswordChangePassword } from '@/api/v1/requests/ApiRequestResetPasswordChangePassword';
import { z } from 'zod';

const password: keyof ApiRequestResetPasswordChangePassword = 'password';
const confirm_password: keyof ApiRequestResetPasswordChangePassword =
  'confirm_password';

export const resetPasswordValidationSchema = z
  .object({
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

export type TResetPasswordFields = z.infer<
  typeof resetPasswordValidationSchema
>;
